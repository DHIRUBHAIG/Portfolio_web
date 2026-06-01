/**
 * Security Utilities
 * Rate limiting, spam protection, and security headers
 */

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

// In-memory store for rate limiting (consider using Redis in production)
const rateLimitStore: RateLimitStore = {};

/**
 * Rate limiting implementation
 * Default: 5 requests per 60 seconds per IP
 */
export const rateLimit = (
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } => {
  const now = Date.now();
  const key = `rate-limit:${ip}`;

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs };
    return { allowed: true, remaining: maxRequests - 1, resetTime: rateLimitStore[key].resetTime };
  }

  const record = rateLimitStore[key];

  // Check if window has expired
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return { allowed: true, remaining: maxRequests - 1, resetTime: record.resetTime };
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  const remaining = maxRequests - record.count;
  return { allowed: true, remaining, resetTime: record.resetTime };
};

/**
 * Get client IP from request headers
 */
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
};

/**
 * Detect spam patterns
 */
export const isSpam = (message: string): boolean => {
  // Common spam patterns
  const spamPatterns = [
    /viagra|cialis|casino|lottery/gi,
    /click here|buy now|special offer/gi,
    /(http|https):\/\/[^\s]+/g, // Multiple URLs
    /[A-Z]{50,}/, // Excessive caps
  ];

  const spamCount = spamPatterns.filter(pattern => pattern.test(message)).length;
  return spamCount > 1;
};

/**
 * Validate form submission timing
 * Prevent suspiciously fast submissions
 */
export const validateSubmissionTiming = (submissionTime: number): boolean => {
  // Minimum 2 seconds to fill form (in milliseconds)
  const minTime = 2000;
  return submissionTime >= minTime;
};

/**
 * Generate security headers
 */
export const getSecurityHeaders = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };
};

/**
 * CSRF token validation (simple implementation)
 */
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Clean rate limit store periodically
 */
export const cleanupRateLimitStore = () => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach(key => {
    if (now > rateLimitStore[key].resetTime) {
      delete rateLimitStore[key];
    }
  });
};

// Cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
