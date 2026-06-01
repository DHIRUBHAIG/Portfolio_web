# Deployment Guide - Production Checklist

Complete deployment guide for multiple platforms.

## ☑️ Pre-Deployment Checklist

### Code Quality
- [ ] No console errors or warnings
- [ ] All validation tests pass
- [ ] Email templates render correctly
- [ ] Mobile responsiveness verified
- [ ] Dark mode tested
- [ ] Accessibility checked

### Security
- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in source code
- [ ] All inputs validated
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] HTTPS enforced

### Configuration
- [ ] Resend API key obtained
- [ ] Domain configured in Resend
- [ ] DNS records verified
- [ ] Email templates customized
- [ ] Social links updated
- [ ] Contact email verified

### Testing
- [ ] Contact form validates correctly
- [ ] Emails deliver to inbox
- [ ] Auto-reply works
- [ ] Analytics endpoint protected
- [ ] Rate limiting works
- [ ] Mobile works on real devices

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Pros:**
- Easiest deployment
- Free tier available
- Built-in analytics
- Preview deployments
- Automatic SSL

**Steps:**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production: contact form deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repo
   - Click "Import"

3. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add `RESEND_API_KEY`
   - Add `ANALYTICS_API_KEY`
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit deployment URL

5. **Configure Domain**
   - Go to "Settings" → "Domains"
   - Add your domain
   - Follow DNS instructions
   - Wait 24-48 hours for propagation

**Cost:** Free ($20/month with Pro features)

**URL:** https://dashboard.vercel.com

---

### Option 2: Netlify

**Pros:**
- Free tier
- GitHub integration
- Form handling
- Analytics

**Steps:**

1. **Deploy**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub repo
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

2. **Add Environment Variables**
   - Site settings → Build & Deploy → Environment
   - Add your keys

3. **Configure Domain**
   - Domain settings → Custom domain
   - Add your domain

**Cost:** Free

---

### Option 3: Railway

**Pros:**
- Easy deployment
- Database integration
- Good for beginners

**Steps:**

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "GitHub Repo"

2. **Add Environment Variables**
   - Project settings → Variables
   - Add your keys

3. **Deploy**
   - Click "Deploy"
   - View logs in dashboard

**Cost:** Free tier (~$5/month)

---

### Option 4: Self-Hosted (AWS, DigitalOcean, Linode)

**Pros:**
- Full control
- Scalable
- No vendor lock-in

**Requires:**
- Node.js 18+ on server
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)

**Steps:**

1. **SSH into Server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

4. **Install Packages**
   ```bash
   npm install
   npm run build
   ```

5. **Create Environment File**
   ```bash
   nano .env.local
   # Add your variables
   ```

6. **Install PM2**
   ```bash
   npm install -g pm2
   ```

7. **Start Application**
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Setup SSL**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

10. **Restart Nginx**
    ```bash
    sudo systemctl restart nginx
    ```

**Cost:** $5-20/month depending on provider

---

## 📊 Post-Deployment Verification

### 1. Test Contact Form
- [ ] Navigate to contact section
- [ ] Fill form with valid data
- [ ] Submit
- [ ] Check email delivery
- [ ] Verify auto-reply

### 2. Check Performance
- [ ] Page load time < 3s
- [ ] Form submit < 2s
- [ ] Mobile performance good
- [ ] No console errors

### 3. Monitor Analytics
```bash
# Check submission count
curl https://your-domain.com/api/analytics \
  -H "Authorization: Bearer your_analytics_key"
```

### 4. Verify Security
- [ ] HTTPS working
- [ ] Security headers present
- [ ] No sensitive data in URL
- [ ] Rate limiting active

---

## 🔍 Monitoring Setup

### Vercel Analytics (Built-in)
- Automatic performance monitoring
- Real User Monitoring (RUM)
- Core Web Vitals tracking

### Custom Analytics
```typescript
// Add to your API responses
fetch('/api/analytics?auth=key')
  .then(r => r.json())
  .then(data => console.log(data.analytics))
```

### Email Monitoring
- Check Resend dashboard for:
  - Delivery rates
  - Bounce rates
  - Engagement metrics

---

## 🛡️ Security Hardening

### Enable Security Headers
Already configured in `/lib/security.ts`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### Rate Limiting
Currently set to 5 requests/minute per IP
Adjust in `/app/api/contact/route.ts`

### Add reCAPTCHA (Optional)
```bash
npm install react-google-recaptcha
```

### Enable CORS (If needed)
```typescript
// Add to route.ts
const headers = {
  'Access-Control-Allow-Origin': 'https://your-domain.com',
  'Access-Control-Allow-Methods': 'POST',
};
```

---

## 📈 Scaling Considerations

### Database Integration
If you need persistent storage:
```bash
npm install @prisma/client
npm install -D prisma
```

### Cache Layer
For high traffic:
```bash
npm install redis
```

### Email Queue
For reliability:
```bash
npm install bullmq
```

### CDN Setup
- Use Vercel's built-in CDN (automatic)
- Or Cloudflare for custom domains

---

## 🚨 Rollback Plan

If deployment fails:

### Vercel
1. Go to Deployments
2. Select previous working deployment
3. Click "Promote to Production"

### Other Platforms
1. Keep previous version tagged
2. Roll back to previous git commit
3. Redeploy

```bash
# Rollback steps
git log --oneline | head -10
git checkout <commit-hash>
git push origin main --force
```

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue: "Build failed"**
- Solution: Check Node.js version >= 18
- Solution: Run `npm install` locally first

**Issue: "API key not found"**
- Solution: Verify environment variables in deployment platform
- Solution: Restart deployment after adding variables

**Issue: "Emails not sending"**
- Solution: Verify API key in Resend dashboard
- Solution: Check domain DNS configuration
- Solution: Review Resend email logs

**Issue: "Too many requests"**
- Solution: Rate limiting is working (expected)
- Solution: Wait 60 seconds or clear localStorage

---

## 📋 Maintenance Schedule

### Daily
- Monitor error logs
- Check email deliverability
- Test contact form

### Weekly
- Review analytics
- Check performance metrics
- Backup configuration

### Monthly
- Security audit
- Dependency updates
- Performance optimization

---

## 🎯 Success Metrics

Track these KPIs:

- Emails delivered: 99%+
- Response time: < 1s
- Form submissions: Growing
- Error rate: < 0.1%
- User satisfaction: 4.5+/5

---

## 📞 Getting Help

- **Resend Support:** https://resend.com/support
- **Vercel Support:** https://vercel.com/support
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Issues:** Create an issue in your repo

---

**Last Updated:** January 2026
**Status:** ✅ Production Ready
