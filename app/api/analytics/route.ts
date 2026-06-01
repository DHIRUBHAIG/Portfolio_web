/**
 * Analytics API Route
 * GET /api/analytics
 * 
 * Returns submission analytics
 * In production, add authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSecurityHeaders } from '@/lib/security';

// Analytics storage (shared with contact route)
const analyticsData = {
  timestamp: new Date().toISOString(),
  totalSubmissions: 0,
  successfulSubmissions: 0,
  failedSubmissions: 0,
  recentSubmissions: [] as any[],
};

export async function GET(request: NextRequest) {
  // Add authentication in production
  const authHeader = request.headers.get('authorization');
  
  // Simple API key check (replace with proper JWT verification in production)
  const expectedKey = process.env.ANALYTICS_API_KEY;
  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { 
        status: 401,
        headers: getSecurityHeaders(),
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: analyticsData,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders(),
      },
    }
  );
}
