# API Documentation

## Contact Form API Reference

### Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

---

## Endpoints

### 1. Submit Contact Form

**POST** `/api/contact`

Submit a new contact message.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Dhiraj Kumar Gupta",
  "email": "example@email.com",
  "phone": "+91 7464023592",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project...",
  "honeypot": ""
}
```

#### Field Validation

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| name | string | Yes | Min: 2, Max: 100 chars |
| email | string | Yes | Valid email format |
| phone | string | No | Valid phone format |
| subject | string | Yes | Min: 3, Max: 200 chars |
| message | string | Yes | Min: 10, Max: 5000 chars |
| honeypot | string | No | Should be empty (spam detection) |

#### Response - Success

**Status:** 200 OK

```json
{
  "success": true,
  "message": "Message sent successfully! I will respond to you soon."
}
```

#### Response - Validation Error

**Status:** 400 Bad Request

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

#### Response - Rate Limited

**Status:** 429 Too Many Requests

```json
{
  "success": false,
  "message": "Too many requests. Please try again in 45 seconds."
}
```

#### Response - Server Error

**Status:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "An unexpected error occurred. Please try again later."
}
```

#### Example Requests

**cURL:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "subject": "Collaboration Request",
    "message": "I would like to collaborate on a machine learning project.",
    "honeypot": ""
  }'
```

**JavaScript/Fetch:**
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    subject: 'Collaboration Request',
    message: 'I would like to collaborate on a machine learning project.',
    honeypot: '',
  }),
});

const data = await response.json();
console.log(data);
```

**Python/Requests:**
```python
import requests

data = {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "subject": "Collaboration Request",
    "message": "I would like to collaborate on a machine learning project.",
    "honeypot": ""
}

response = requests.post(
    'http://localhost:3000/api/contact',
    json=data
)

print(response.json())
```

---

### 2. Get Analytics (Protected)

**GET** `/api/analytics`

Retrieve contact form submission analytics.

#### Request

**Headers:**
```
Authorization: Bearer your_analytics_key
```

#### Query Parameters

None

#### Response - Success

**Status:** 200 OK

```json
{
  "success": true,
  "data": {
    "timestamp": "2026-01-15T10:30:00Z",
    "totalSubmissions": 42,
    "successfulSubmissions": 40,
    "failedSubmissions": 2,
    "recentSubmissions": [
      {
        "timestamp": "2026-01-15T10:25:00Z",
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Project Inquiry",
        "ip": "192.168.1.1",
        "userAgent": "Mozilla/5.0..."
      }
    ]
  }
}
```

#### Response - Unauthorized

**Status:** 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

#### Example Request

**cURL:**
```bash
curl -X GET http://localhost:3000/api/analytics \
  -H "Authorization: Bearer your_analytics_key"
```

**JavaScript:**
```javascript
const response = await fetch('/api/analytics', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
  },
});

const data = await response.json();
console.log(data);
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Limit:** 5 requests per 60 seconds per IP
- **Header:** `X-RateLimit-Remaining: 4`
- **Status Code:** 429 Too Many Requests

### Example Response

```
HTTP/1.1 429 Too Many Requests

{
  "success": false,
  "message": "Too many requests. Please try again in 45 seconds."
}
```

---

## Security Headers

All API responses include security headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | Submission received |
| 400 | Bad Request | Fix validation errors |
| 401 | Unauthorized | Check API key |
| 429 | Too Many Requests | Wait before retrying |
| 500 | Server Error | Try again later |

---

## Validation Rules

### Name
- **Type:** String
- **Required:** Yes
- **Min Length:** 2 characters
- **Max Length:** 100 characters
- **Example:** "Dhiraj Kumar Gupta"

### Email
- **Type:** String
- **Required:** Yes
- **Format:** Valid email (user@domain.com)
- **Example:** "dhirajkumarg413@gmail.com"

### Phone
- **Type:** String
- **Required:** No
- **Format:** Valid phone number with country code
- **Example:** "+91 7464023592"

### Subject
- **Type:** String
- **Required:** Yes
- **Min Length:** 3 characters
- **Max Length:** 200 characters
- **Example:** "AI Project Collaboration"

### Message
- **Type:** String
- **Required:** Yes
- **Min Length:** 10 characters
- **Max Length:** 5000 characters
- **Example:** "I'm interested in collaborating on an AI/ML project..."

### Honeypot
- **Type:** String
- **Required:** No
- **Should Be:** Empty (spam detection)
- **Example:** "" (empty string)

---

## Email Notifications

### Admin Notification

When a contact form is submitted successfully:

1. **Admin receives email:**
   - From: noreply@your-domain.com
   - To: dhirajkumarg413@gmail.com
   - Subject: "New Portfolio Contact Request: {subject}"
   - Content: Full submission details

2. **Auto-reply sent to visitor:**
   - From: noreply@your-domain.com
   - To: {visitor_email}
   - Subject: "Thank You for Contacting Dhiraj Kumar Gupta"
   - Content: Acknowledgment message

---

## Environment Variables

Required for API to function:

```env
# Required
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_DOMAIN=your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=dhirajkumarg413@gmail.com

# Optional
ANALYTICS_API_KEY=your_analytics_key_here
```

---

## Testing the API

### 1. Using Postman

1. Create new POST request
2. URL: `http://localhost:3000/api/contact`
3. Headers: 
   - Key: `Content-Type`
   - Value: `application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "phone": "",
     "subject": "Test",
     "message": "This is a test message from Postman"
   }
   ```
5. Click Send

### 2. Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method to POST
4. Set URL to `http://localhost:3000/api/contact`
5. Add headers and body
6. Send

### 3. Using VS Code REST Client

Create file `test.http`:
```
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "",
  "subject": "API Test",
  "message": "Testing the contact API with REST Client extension"
}
```

Install extension and click "Send Request"

---

## API Limits & Quotas

### Resend (Free Tier)
- **Emails/day:** 100
- **API calls:** Unlimited
- **Cost:** Free

### Rate Limiting
- **Requests/minute:** 5 per IP
- **Sliding window:** Yes

### Storage
- **Recent submissions stored:** Last 1000
- **Retention period:** Current session

---

## Webhooks (Future)

Planned webhook events:
- `submission.created`
- `submission.failed`
- `email.sent`
- `email.bounced`

---

## API Changelog

### v1.0.0 (Current)
- Initial release
- Contact form submission
- Email delivery
- Analytics endpoint
- Rate limiting
- Input validation

### Planned Features
- [ ] Webhooks support
- [ ] Database persistence
- [ ] Advanced analytics
- [ ] File upload support
- [ ] Custom templates

---

## Support

For API issues:
1. Check the [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md)
2. Review error messages
3. Check browser console (F12)
4. Check server logs (`npm run dev`)
5. Verify environment variables

---

**API Version:** 1.0.0
**Last Updated:** January 2026
**Status:** ✅ Production Ready
