/**
 * Form Validation Utilities
 * Comprehensive validation for contact form fields
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone.trim()) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '')
    .trim();
};

/**
 * Validate entire form
 */
export const validateContactForm = (data: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Honeypot check (spam protection)
  if (data.honeypot && data.honeypot.trim()) {
    return errors; // Silently return - likely a bot
  }

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
  }

  // Email validation
  if (!data.email || !data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  // Phone validation (optional)
  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number format' });
  }

  // Subject validation
  if (!data.subject || !data.subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (data.subject.trim().length < 3) {
    errors.push({ field: 'subject', message: 'Subject must be at least 3 characters' });
  } else if (data.subject.length > 200) {
    errors.push({ field: 'subject', message: 'Subject must not exceed 200 characters' });
  }

  // Message validation
  if (!data.message || !data.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (data.message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must not exceed 5000 characters' });
  }

  return errors;
};

/**
 * Prepare sanitized form data
 */
export const prepareSafeFormData = (data: FormData): FormData => {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    phone: sanitizeInput(data.phone),
    subject: sanitizeInput(data.subject),
    message: sanitizeInput(data.message),
    honeypot: data.honeypot || '',
  };
};
