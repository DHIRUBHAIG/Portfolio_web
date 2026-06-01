# Contact Form Setup Guide

This guide will help you set up the production-ready contact form system with email delivery, validation, and security features.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Email Service Setup](#email-service-setup)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Security Features](#security-features)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 18+ and npm/yarn
- A domain name (for email sending)
- Resend API account (or alternative email service)

---

## Installation

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

This installs the required packages including:
- `framer-motion` - animations
- `react-icons` - icons
- `resend` - email delivery

### 2. Verify File Structure

Ensure these files exist:

```
app/
├── api/
│   ├── contact/
│   │   └── route.ts          # Contact form handler
│   └── analytics/
│       └── route.ts          # Analytics endpoint
components/
├── ContactForm.tsx           # Main contact form component
└── SocialContacts.tsx        # Social media links component
lib/
├── validation.ts             # Form validation utilities
├── security.ts               # Security & rate limiting
└── email.ts                  # Email service configuration
```

---

## Configuration

### 1. Email Domain Setup (Resend)

#### Step 1: Create Resend Account
- Go to [resend.com](https://resend.com)
- Sign up for a free account
- Verify your email

#### Step 2: Add Domain
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `dhirajkumargupta.com`)
4. Follow DNS configuration instructions

#### Step 3: Verify DNS Records
Add these DNS records to your domain registrar:

```
Type: MX
Name: @
Value: feedback-smtp.{region}.amazonses.com.

Type: CNAME
Name: default._domainkey.{yourdomain}
Value: default._domainkey.{yourdomain}.dkim.amazonses.net.
```

Wait 24-48 hours for DNS propagation.

---

## Environment Variables

Create `.env.local` file in the project root:

```env
# Email Service Configuration
RESEND_API_KEY=your_resend_api_key_here

# Analytics (Optional)
ANALYTICS_API_KEY=your_analytics_key_here

# Email Configuration
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com
NEXT_PUBLIC_DOMAIN=your-domain.com

# Environment
NODE_ENV=production
```

### Getting RESEND_API_KEY:

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it (e.g., "Portfolio Contact Form")
4. Copy and paste into `.env.local`

### DO NOT commit `.env.local` to GitHub!

Add to `.gitignore`:
```
.env.local
.env.*.local
```

---

## Email Service Setup

### Option 1: Resend (Recommended) ✅

**Advantages:**
- Free tier: 100 emails/day
- Simple API
- Good for portfolios
- No credit card required for free tier

**Setup:**
```bash
npm install resend
```

API endpoint: `/api/contact`

### Option 2: Nodemailer + Gmail SMTP

**Alternative implementation if you prefer:**

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password, not regular password
  },
});
```

**Setup:**
1. Enable 2-Factor Authentication on Gmail
2. Create App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Copy the 16-character password
4. Add to `.env.local`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### Option 3: SendGrid

Alternative API:
```env
SENDGRID_API_KEY=your_key_here
```

---

## Testing

### 1. Local Testing

```bash
npm run dev
```

Navigate to `http://localhost:3000` and test the contact form.

### Test Cases:

#### Valid Submission
```
Name: Dhiraj Kumar Gupta
Email: test@example.com
Phone: +91 7464023592
Subject: Test Message
Message: This is a test message to verify the contact form is working correctly.
```

Expected: ✅ Success message, email received

#### Invalid Email
```
Email: invalid-email
```

Expected: ❌ "Please enter a valid email"

#### Too Short Message
```
Message: Hi
```

Expected: ❌ "Message must be at least 10 characters"

#### Rate Limiting Test
Submit 6 times in 60 seconds

Expected: ❌ "Too many requests" on 6th attempt

#### Honeypot Test
(Automated - shouldn't happen in normal usage)

Expected: Silent failure (spam detection)

### 2. API Testing with cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "phone": "+91 7464023592",
    "subject": "Test",
    "message": "This is a test message",
    "honeypot": ""
  }'
```

### 3. Email Verification

1. Fill the form with a **real email address**
2. Submit
3. Check your email for:
   - Confirmation that message was received
   - Auto-reply from your portfolio

---

## Deployment

### 1. Vercel (Recommended for Next.js)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Add contact form"
git push origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

**Step 3: Add Environment Variables**
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   RESEND_API_KEY = your_key_here
   ANALYTICS_API_KEY = your_key_here
   ```
3. Click "Deploy"

### 2. Other Platforms

#### Netlify
- Connect your GitHub repo
- Add environment variables in Site settings
- Deploy

#### Self-hosted (VPS/Server)
```bash
npm run build
npm run start
```

---

## Security Features Implemented

### 1. **Input Validation**
- Required field checks
- Email format validation
- Phone number format validation
- Character length limits (name: 100, subject: 200, message: 5000)
- Minimum message length (10 characters)

### 2. **Spam Protection**
- **Honeypot field** - Hidden field that bots fill, form silently fails
- **Rate limiting** - 5 requests per 60 seconds per IP
- **Spam pattern detection** - Detects common spam keywords
- **Submission timing** - Validates human-like interaction

### 3. **XSS Protection**
- Input sanitization - Removes angle brackets and script tags
- Output escaping - HTML escapes in email templates
- Content Security Policy headers

### 4. **Security Headers**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 5. **Rate Limiting**
- In-memory store (upgrade to Redis in production)
- 5 requests per minute per IP
- Automatic cleanup of old entries

### 6. **CSRF Protection**
- Configured for POST requests
- Next.js built-in protection

---

## Features Overview

### Frontend Features
- ✅ Real-time validation
- ✅ Field error messages
- ✅ Character counters
- ✅ Loading state
- ✅ Success animation with confetti
- ✅ Glassmorphism design
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ Accessibility support

### Backend Features
- ✅ Input sanitization
- ✅ Rate limiting
- ✅ Spam detection
- ✅ Email delivery to admin
- ✅ Auto-reply to visitor
- ✅ Analytics tracking
- ✅ Error handling
- ✅ Security headers

### Email Features
- ✅ Contact notification email
- ✅ Auto-reply to sender
- ✅ Beautiful HTML templates
- ✅ Timestamp tracking
- ✅ Reply-to configuration

---

## Customization

### Change Recipient Email

Edit `/lib/email.ts`:
```typescript
to: 'your-email@example.com', // Change this
```

### Customize Email Templates

Edit `generateEmailHTML()` and `generateAutoReplyHTML()` in `/lib/email.ts`

### Adjust Rate Limiting

Edit `/app/api/contact/route.ts`:
```typescript
const rateLimitCheck = rateLimit(clientIP, 10, 60000); // 10 requests per minute
```

### Add reCAPTCHA

Install package:
```bash
npm install react-google-recaptcha
```

Add to form:
```typescript
import ReCAPTCHA from "react-google-recaptcha";

<ReCAPTCHA
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  onChange={handleRecaptchaChange}
/>
```

---

## Troubleshooting

### Issue: "RESEND_API_KEY is not configured"

**Solution:**
1. Check `.env.local` exists
2. Verify `RESEND_API_KEY=` is set
3. Restart dev server: `npm run dev`

### Issue: Emails not sending

**Solution:**
1. Check API key is correct
2. Verify domain is added in Resend
3. Check DNS records are properly configured
4. Look at browser console for errors
5. Check `/api/contact` response

### Issue: Rate limiting too strict

**Solution:**
- Increase limit in `/app/api/contact/route.ts`
- Change from `rateLimit(clientIP, 5, 60000)` to higher number

### Issue: Form validation too strict

**Solution:**
- Edit validation rules in `/lib/validation.ts`
- Modify character limits and patterns

### Issue: Styling looks wrong

**Solution:**
1. Ensure Tailwind CSS is properly configured
2. Run `npm run dev` and clear browser cache
3. Check that `globals.css` is imported in `layout.tsx`

---

## Performance Tips

1. **Lazy load SocialContacts component**
   ```typescript
   const SocialContacts = dynamic(() => import('@/components/SocialContacts'), {
     loading: () => <div>Loading...</div>,
   });
   ```

2. **Enable email caching**
   - Set Cache-Control headers for analytics endpoint
   - Cache validation results client-side

3. **Monitor analytics**
   - Check `/api/analytics` endpoint
   - Export data monthly for analysis

---

## Monitoring & Analytics

View submission analytics at:
```
GET /api/analytics?auth=your_analytics_key
```

Response includes:
- Total submissions
- Successful submissions
- Failed submissions
- Recent submissions with details

---

## Next Steps

1. ✅ Deploy to production
2. ✅ Test with real emails
3. ✅ Monitor submissions
4. ✅ Collect feedback
5. ✅ Iterate on design

---

## Support

For issues or questions:
1. Check documentation above
2. Review browser console errors
3. Check server logs: `npm run dev`
4. Verify all environment variables

---

## License

This contact form system is part of your portfolio website.

---

**Last Updated:** January 2026
**Status:** Production Ready ✅
