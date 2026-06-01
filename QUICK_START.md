# Quick Start Guide - Contact Form Setup

Get your production-ready contact form running in 5 minutes!

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Resend API Key
1. Visit [resend.com](https://resend.com)
2. Sign up (free)
3. Go to [API Keys](https://resend.com/api-keys)
4. Create API Key
5. Copy the key

### 3. Configure Environment
```bash
# Create .env.local file
cp .env.example .env.local
```

Edit `.env.local`:
```env
RESEND_API_KEY=your_api_key_here
NEXT_PUBLIC_DOMAIN=your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test Contact Form
1. Open http://localhost:3000
2. Scroll to "Send a message" section
3. Fill out the form
4. Click "Send Message"
5. Check your email for notifications

✅ Done! Your contact form is working!

---

## 🔧 Features Overview

- ✅ Real-time validation
- ✅ Email delivery to admin
- ✅ Auto-reply to sender
- ✅ Beautiful animations
- ✅ Mobile responsive
- ✅ Spam protection
- ✅ Rate limiting
- ✅ Analytics tracking

---

## 📧 Email Testing

### Test 1: Valid Submission
```
Name: Your Name
Email: your-email@example.com
Subject: Test Message
Message: This is a test message to verify the contact form works!
```

### Test 2: Invalid Email
```
Email: not-an-email
```
Expected: ❌ Error message

### Test 3: Rate Limiting
Submit 6 times in 60 seconds
Expected: ❌ "Too many requests" on 6th attempt

---

## 🌐 Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add production contact form"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Click "Import"

### Step 3: Add Environment Variables
1. Go to "Settings" → "Environment Variables"
2. Add:
   - Key: `RESEND_API_KEY`
   - Value: `your_api_key`
3. Click "Deploy"

### Step 4: Verify Deployment
1. Visit your deployed site
2. Test the contact form
3. Check email delivery

✅ Your contact form is now live!

---

## 📱 Mobile Testing

The contact form is fully responsive:
- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

Test on different screen sizes:
```bash
# Open DevTools
F12 or Ctrl+Shift+I

# Click device toolbar
Ctrl+Shift+M
```

---

## 🔐 Security Checklist

- ✅ Input validation
- ✅ Email format validation
- ✅ Phone format validation
- ✅ Honeypot field (spam protection)
- ✅ Rate limiting (5 requests/minute)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Security headers

---

## 🐛 Troubleshooting

### Problem: "RESEND_API_KEY is not configured"
**Solution:**
1. Check `.env.local` exists
2. Verify `RESEND_API_KEY=` is set
3. Restart: `npm run dev`

### Problem: Emails not sending
**Solution:**
1. Check API key is correct
2. Verify domain is added in Resend dashboard
3. Check browser console for errors

### Problem: Form validation too strict
**Solution:**
Edit `/lib/validation.ts` to adjust rules

### Problem: Rate limiting blocking legitimate users
**Solution:**
Edit `/app/api/contact/route.ts`:
```typescript
const rateLimitCheck = rateLimit(clientIP, 10, 60000); // 10 requests/min
```

---

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Full Setup Guide](./CONTACT_FORM_SETUP.md)

---

## ✨ Next Steps

1. ✅ Deploy to production
2. ✅ Monitor submissions
3. ✅ Collect feedback
4. ✅ Customize styling
5. ✅ Add more features

---

## 💡 Pro Tips

1. **Monitor Analytics**
   ```bash
   curl http://localhost:3000/api/analytics
   ```

2. **Customize Email Templates**
   Edit `/lib/email.ts` > `generateEmailHTML()`

3. **Add reCAPTCHA**
   ```bash
   npm install react-google-recaptcha
   ```

4. **Update Social Links**
   Edit `/components/SocialContacts.tsx`

---

## Support

Need help? Check:
1. Browser console (F12)
2. Terminal logs (`npm run dev`)
3. Full setup guide: [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md)

---

**Status:** ✅ Production Ready
**Last Updated:** January 2026
