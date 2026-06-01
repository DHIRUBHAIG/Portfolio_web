# Contact Form - Quick Reference

## 🚀 30-Second Setup

```bash
# 1. Fill .env.local with Gmail credentials
# 2. Run dev server
npm run dev

# 3. Test at http://localhost:3000
```

## 📧 Gmail App Password Setup

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy 16-char password → Paste in .env.local as EMAIL_PASS

## 📝 .env.local Template

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com
```

## ✨ Features

- ✅ Real-time validation
- ✅ Loading spinner
- ✅ Success toast
- ✅ Confetti animation
- ✅ Rate limiting (5/min)
- ✅ Auto-reply email
- ✅ Mobile responsive

## 🧪 Test Flow

1. Fill form with valid data
2. Click "Send Message"
3. See loading spinner
4. Success toast appears
5. Check email (admin + auto-reply)

## 🔍 Test Data

```
Name: John Doe
Email: your-email@gmail.com
Phone: +1234567890 (optional)
Subject: Test Subject
Message: This is a test message for your portfolio contact form
```

## ⚡ Commands

```bash
# Dev server
npm run dev

# Build
npm run build

# TypeScript check
npx tsc --noEmit

# Start production
npm start
```

## 📧 Emails

- **Admin:** dhirajkumarg413@gmail.com (receives submissions)
- **Visitor:** Gets auto-reply with thank you message

## 🔒 Security

- Rate limiting: 5 requests per 60 seconds
- Honeypot: Hidden spam field
- Validation: Client + Server
- XSS protection: HTML escaping

## 🐛 Common Issues

| Issue | Fix |
|-------|-----|
| Email not sending | Check .env.local has correct credentials |
| Rate limit error | Wait 1 minute, try again |
| Import errors | Run `npm install` again |
| Form won't submit | Check all validation messages |

## 📱 Files

- Frontend: `components/ContactForm.tsx`
- Backend: `app/api/contact/route.ts`
- Email: `lib/email.ts`
- Validation: `lib/validation.ts`
- Security: `lib/security.ts`

## 🚀 Deploy

1. Add EMAIL_USER and EMAIL_PASS to hosting platform
2. Deploy
3. Test form submission

## 📖 Detailed Guides

- Full setup: `SETUP_INSTRUCTIONS.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- API docs: `API_DOCUMENTATION.md` (if exists)

---

**Status:** ✅ Production Ready | **Build:** ✅ Successful | **Tests:** ✅ Ready to Test
