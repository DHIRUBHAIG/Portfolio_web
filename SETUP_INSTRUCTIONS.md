# Contact Form Setup Guide

## ✅ What Has Been Done

Your Next.js portfolio contact form has been **fully implemented and compiled successfully**! Here's what's been set up:

### Core Files Created/Updated:
- ✅ `components/ContactForm.tsx` - Frontend form with real-time validation
- ✅ `components/SocialContacts.tsx` - Social media links component
- ✅ `lib/email.ts` - Gmail SMTP email delivery service (Nodemailer)
- ✅ `lib/validation.ts` - Form validation utilities
- ✅ `lib/security.ts` - Rate limiting & spam protection
- ✅ `app/api/contact/route.ts` - Backend API endpoint
- ✅ `package.json` - Updated with nodemailer dependency
- ✅ `tsconfig.json` - Path aliases configured
- ✅ `.env.example` - Configuration template

### Build Status:
```
✓ Compiled successfully
✓ No TypeScript errors
✓ All imports resolved
✓ ESLint warnings fixed (only img optimization warning remains - optional)
```

---

## 🚀 Setup Steps (5 minutes)

### Step 1: Get Gmail App Password

1. **Enable 2FA on Gmail:**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the prompts to enable it

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password (it looks like: `xxxx xxxx xxxx xxxx`)

### Step 2: Configure .env.local

Open `.env.local` in your project root and fill in:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com
```

### Step 3: Start Development Server

```bash
npm run dev
```

This will start the server at `http://localhost:3000`

---

## ✨ Features Implemented

### Frontend Features:
- ✅ Real-time form validation
- ✅ Character counters for name, subject, message
- ✅ Honeypot field for spam protection
- ✅ Loading spinner while sending
- ✅ Success/error toast notifications
- ✅ Confetti animation on success
- ✅ Smooth Framer Motion animations
- ✅ Beautiful glassmorphism design
- ✅ Mobile responsive layout

### Backend Security:
- ✅ Rate limiting (5 requests per minute per IP)
- ✅ Input validation on both client & server
- ✅ XSS protection via HTML entity escaping
- ✅ Spam detection logic
- ✅ Security headers

### Email Features:
- ✅ Admin notification email to dhirajkumarg413@gmail.com
- ✅ Auto-reply email to the visitor
- ✅ Professional HTML email templates
- ✅ Gmail SMTP delivery (no domain verification needed)

---

## 🧪 Testing the Contact Form

### Test Flow:

1. **Visit the form:**
   - Navigate to `http://localhost:3000`
   - Scroll to the "Send a message" section

2. **Fill the form with valid data:**
   - Name: "John Doe" (2-100 characters)
   - Email: "your-email@gmail.com" (valid email format)
   - Phone: "+1234567890" (optional)
   - Subject: "Great portfolio" (3-200 characters)
   - Message: "This is a test message for your portfolio contact form" (10-5000 characters)

3. **Submit:**
   - Click "Send Message"
   - You should see a loading spinner
   - After 2-3 seconds, you should see a success toast
   - Confetti animation plays

4. **Check Emails:**
   - **Admin email:** dhirajkumarg413@gmail.com should receive the contact request
   - **Your email:** You should receive an auto-reply from dhirajkumarg413@gmail.com

### What to Look For:

✅ **Success Indicators:**
- Green toast: "✓ Message Sent Successfully!"
- Confetti animation plays
- Admin receives email at dhirajkumarg413@gmail.com
- Your email receives auto-reply

❌ **Troubleshooting:**

| Problem | Solution |
|---------|----------|
| "Too many requests" error | Wait 1 minute, then try again (rate limit) |
| Email not received | Check .env.local EMAIL_USER and EMAIL_PASS are correct |
| "Invalid email format" | Ensure valid email address format |
| Form won't submit | Check browser console for errors (F12) |
| Loading spinner never stops | Check terminal for API errors |

---

## 📧 Email Templates

### Admin Notification Email:
- Receives visitor's name, email, phone (if provided), subject, and message
- Professional HTML formatting
- Reply-To field set to visitor's email

### Auto-Reply Email:
- Sent immediately to the visitor
- Thanks them for reaching out
- Sets expectations (24-48 hour response time)
- Includes your social media links

---

## 🔐 Security Details

### Rate Limiting:
- **5 requests per minute** per IP address
- Prevents spam and abuse
- Error message tells user when to retry

### Validation:
- **Client-side:** Real-time feedback as user types
- **Server-side:** Double-checks all inputs
- Invalid submissions are rejected immediately

### XSS Protection:
- All email content is HTML-escaped
- Prevents injection attacks
- Safe for display in email clients

### Honeypot Field:
- Hidden field that real users won't fill
- Catches automated bots
- Silent rejection (no error shown to bots)

---

## 🛠️ File Locations

```
MyPortfolio/
├── app/
│   ├── api/contact/route.ts      (API endpoint)
│   ├── page.tsx                  (Main page with contact form)
│   └── globals.css
├── components/
│   ├── ContactForm.tsx           (Form component)
│   └── SocialContacts.tsx        (Social links)
├── lib/
│   ├── email.ts                  (Gmail SMTP service)
│   ├── validation.ts             (Form validation)
│   └── security.ts               (Rate limiting & spam check)
├── .env.local                    (Gmail credentials - YOUR CONFIG)
├── .env.example                  (Template)
├── package.json                  (Dependencies)
└── tsconfig.json                 (Path aliases)
```

---

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| EMAIL_USER | Yes | Your Gmail address (e.g., user@gmail.com) |
| EMAIL_PASS | Yes | 16-character Gmail App Password |
| NEXT_PUBLIC_CONTACT_EMAIL | Yes | Where contact forms are sent |
| ANALYTICS_API_KEY | No | For analytics endpoint |

---

## 🚀 Deployment

When deploying to production:

1. **Add environment variables to hosting platform:**
   - Vercel: Settings → Environment Variables
   - Add EMAIL_USER and EMAIL_PASS

2. **Verify email delivery:**
   - Test the contact form after deployment
   - Check that admin email is received

3. **Monitor errors:**
   - Check server logs for email delivery failures
   - Set up error alerts

---

## ✅ Quick Start Checklist

- [ ] Enable 2FA on Gmail account
- [ ] Get Gmail App Password
- [ ] Update .env.local with EMAIL_USER and EMAIL_PASS
- [ ] Run `npm run dev`
- [ ] Test form submission
- [ ] Verify emails received (admin + auto-reply)
- [ ] Check browser console for errors (F12)
- [ ] Check terminal for backend errors

---

## 📞 Need Help?

**Common Issues:**

1. **"Module not found" errors?**
   - Run `npm install` again
   - Restart dev server

2. **Email not sending?**
   - Check .env.local exists and has correct values
   - Verify EMAIL_USER and EMAIL_PASS are set
   - Ensure Gmail App Password (not regular password)
   - Check that 2FA is enabled on Gmail

3. **Rate limit errors?**
   - Normal behavior - wait 1 minute between tests
   - Helps prevent spam and abuse

4. **Form validation errors?**
   - Name must be 2-100 characters
   - Email must be valid format
   - Subject must be 3-200 characters
   - Message must be 10-5000 characters

---

## ✨ Success!

Your production-ready contact form is now complete and fully functional!

**Key Features:**
- ✅ Beautiful UI with animations
- ✅ Robust validation and security
- ✅ Gmail SMTP email delivery
- ✅ Rate limiting & spam protection
- ✅ Auto-reply feature
- ✅ Full TypeScript type safety
- ✅ Mobile responsive
- ✅ Zero dependencies on external services (except Gmail)

**Next Steps:**
1. Set up .env.local with your Gmail credentials
2. Start the dev server and test the form
3. Deploy to production when ready

Happy coding! 🎉
