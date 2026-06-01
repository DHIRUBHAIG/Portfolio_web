/**
 * Email Service Configuration
 * Handles sending emails via Nodemailer (Gmail SMTP)
 */

import nodemailer from 'nodemailer';

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface ContactEmail {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

/**
 * Escape HTML to prevent XSS (Node.js version)
 */
export const escapeHTMLNode = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
};

/**
 * Create Nodemailer transporter
 */
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

/**
 * Send contact email to admin
 */
export const sendContactEmail = async (data: ContactEmail): Promise<EmailResponse> => {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      return {
        success: false,
        error: 'Email service not configured. Missing EMAIL_USER or EMAIL_PASS.',
      };
    }

    const emailContent = generateEmailHTML(data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dhirajkumarg413@gmail.com', // Admin email
      subject: `New Portfolio Contact Request: ${data.subject}`,
      html: emailContent,
      replyTo: data.email,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Contact email sent successfully:', info.response);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Send auto-reply email to visitor
 */
export const sendAutoReply = async (data: ContactEmail): Promise<EmailResponse> => {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    const emailContent = generateAutoReplyHTML(data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Thank You for Contacting Dhiraj Kumar Gupta',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Auto-reply email sent successfully:', info.response);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Generate HTML for contact notification email (to admin)
 */
const generateEmailHTML = (data: ContactEmail): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
            margin: -20px -20px 20px -20px;
        }
        .header h2 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px 0;
        }
        .field {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #667eea;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
        }
        .value {
            color: #333;
            font-size: 16px;
            word-break: break-word;
            line-height: 1.5;
        }
        .message-box {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #667eea;
            border-radius: 4px;
            margin-top: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
        a {
            color: #667eea;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📬 New Portfolio Contact Request</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Sender Name</span>
                <div class="value">${escapeHTMLNode(data.name)}</div>
            </div>
            
            <div class="field">
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${escapeHTMLNode(data.email)}">${escapeHTMLNode(data.email)}</a></div>
            </div>
            
            ${
              data.phone
                ? `
            <div class="field">
                <span class="label">Phone Number</span>
                <div class="value">${escapeHTMLNode(data.phone)}</div>
            </div>
            `
                : ''
            }
            
            <div class="field">
                <span class="label">Subject</span>
                <div class="value">${escapeHTMLNode(data.subject)}</div>
            </div>
            
            <div class="field">
                <span class="label">Message</span>
                <div class="message-box">${escapeHTMLNode(data.message)}</div>
            </div>
            
            <div class="field">
                <span class="label">Submitted At</span>
                <div class="value">${data.submittedAt}</div>
            </div>
        </div>
        <div class="footer">
            <p>This is an automated notification from your portfolio contact form.</p>
            <p>To reply to this message, use the sender's email address above.</p>
        </div>
    </div>
</body>
</html>
  `;
};

/**
 * Generate HTML for auto-reply email (to visitor)
 */
const generateAutoReplyHTML = (data: ContactEmail): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
            margin: -20px -20px 20px -20px;
        }
        .header h2 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px 0;
        }
        .message {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            line-height: 1.8;
        }
        .message h3 {
            color: #667eea;
            margin-top: 0;
        }
        .message p {
            margin: 15px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            padding: 8px 16px;
            border: 1px solid #667eea;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        .social-links a:hover {
            background-color: #667eea;
            color: white;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
        a {
            color: #667eea;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>✨ Thank You for Contacting Me</h2>
        </div>
        <div class="content">
            <div class="message">
                <h3>Hello ${escapeHTMLNode(data.name)},</h3>
                
                <p>Thank you for reaching out through my portfolio! 🙏</p>
                
                <p>I have received your message regarding <strong>"${escapeHTMLNode(data.subject)}"</strong> and will review it shortly.</p>
                
                <p>I'm committed to responding to all inquiries as quickly as possible. You can expect to hear back from me within <strong>24-48 hours</strong>.</p>
                
                <p>In the meantime, feel free to explore more of my work on my portfolio or connect with me on social media.</p>
                
                <hr>
                
                <p>Best regards,</p>
                
                <p>
                    <strong>Dhiraj Kumar Gupta</strong><br>
                    CSE-AIML Student | Software Developer<br>
                    <a href="mailto:dhirajkumarg413@gmail.com">dhirajkumarg413@gmail.com</a>
                </p>
            </div>
            
            <div class="social-links">
                <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Connect with me on:</p>
                <a href="https://github.com">GitHub</a>
                <a href="https://linkedin.com">LinkedIn</a>
                <a href="https://leetcode.com">LeetCode</a>
            </div>
        </div>
        <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>&copy; 2026 Dhiraj Kumar Gupta. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
};

