/**
 * Contact Form API Route
 * POST /api/contact
 * 
 * Handles contact form submissions with:
 * - Input validation
 * - Spam protection (honeypot, rate limiting)
 * - Email delivery
 * - Auto-reply
 * - Analytics logging
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, prepareSafeFormData, FormData } from '@/lib/validation';
import { rateLimit, getClientIP, isSpam, getSecurityHeaders } from '@/lib/security';
import { sendContactEmail, sendAutoReply, escapeHTMLNode } from '@/lib/email';

// Analytics storage (in production, use a database)
const analytics = {
  totalSubmissions: 0,
  successfulSubmissions: 0,
  failedSubmissions: 0,
  submissions: [] as any[],
};

export async function POST(request: NextRequest) {
  try {
    // Security headers
    const headers = {
      ...getSecurityHeaders(),
      'Content-Type': 'application/json',
    };

    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Rate limiting check
    const rateLimitCheck = rateLimit(clientIP, 5, 60000); // 5 requests per minute
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many requests. Please try again in ${Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000)} seconds.`,
        },
        { status: 429, headers }
      );
    }

    // Parse request body
    const body: FormData = await request.json();

    // Validate form data
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      analytics.failedSubmissions++;
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationErrors,
        },
        { status: 400, headers }
      );
    }

    // Prepare safe form data (sanitize inputs)
    const safeData = prepareSafeFormData(body);

    // Spam detection
    if (isSpam(safeData.message)) {
      console.warn('Spam detected from IP:', clientIP);
      // Return success to avoid exposing spam detection to attackers
      return NextResponse.json(
        {
          success: true,
          message: 'Message received',
        },
        { status: 200, headers }
      );
    }

    // Prepare email data
    const emailData = {
      ...safeData,
      submittedAt: new Date().toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      }),
    };

    // Send contact email to admin
    const contactEmailResult = await sendContactEmail(emailData);
    if (!contactEmailResult.success) {
      console.error('Failed to send contact email:', contactEmailResult.error);
      analytics.failedSubmissions++;
      
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email. Please try again later.',
        },
        { status: 500, headers }
      );
    }

    // Send auto-reply to visitor
    const autoReplyResult = await sendAutoReply(emailData);
    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply:', autoReplyResult.error);
      // Don't fail - contact email was sent successfully
    }

    // Update analytics
    analytics.totalSubmissions++;
    analytics.successfulSubmissions++;
    analytics.submissions.push({
      timestamp: new Date().toISOString(),
      name: safeData.name,
      email: safeData.email,
      subject: safeData.subject,
      ip: clientIP,
      userAgent: request.headers.get('user-agent'),
    });

    // Keep only last 1000 submissions
    if (analytics.submissions.length > 1000) {
      analytics.submissions = analytics.submissions.slice(-1000);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! I will respond to you soon.',
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    analytics.failedSubmissions++;

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...getSecurityHeaders(),
        },
      }
    );
  }
}

/**
 * GET /api/contact - Get analytics (optional, for admin dashboard)
 * In production, add authentication and rate limiting
 */
export async function GET(request: NextRequest) {
  // TODO: Add authentication check here
  // const authToken = request.headers.get('authorization');
  // if (!authToken || !verifyAuthToken(authToken)) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  return NextResponse.json(
    {
      analytics: {
        totalSubmissions: analytics.totalSubmissions,
        successfulSubmissions: analytics.successfulSubmissions,
        failedSubmissions: analytics.failedSubmissions,
        recentSubmissions: analytics.submissions.slice(-10),
      },
    },
    { status: 200 }
  );
}
