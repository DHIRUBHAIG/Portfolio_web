'use client';

import { FormEvent, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  errors?: ValidationError[];
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Spam protection: track submission attempts
  useEffect(() => {
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      if (timeDiff < 3000) {
        // 3 seconds cooldown
        setSubmitCount(prev => prev + 1);
      }
    }
  }, []);

  const validateForm = (data: FormData): ValidationError[] => {
    const validationErrors: ValidationError[] = [];

    // Spam protection: honeypot
    if (data.honeypot) {
      console.warn('Honeypot field triggered');
      return validationErrors; // Silently fail
    }

    // Name validation
    if (!data.name.trim()) {
      validationErrors.push({ field: 'name', message: 'Name is required' });
    } else if (data.name.length < 2) {
      validationErrors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    } else if (data.name.length > 100) {
      validationErrors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      validationErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!emailRegex.test(data.email)) {
      validationErrors.push({ field: 'email', message: 'Please enter a valid email' });
    }

    // Phone validation (optional)
    if (data.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      if (!phoneRegex.test(data.phone)) {
        validationErrors.push({ field: 'phone', message: 'Please enter a valid phone number' });
      }
    }

    // Subject validation
    if (!data.subject.trim()) {
      validationErrors.push({ field: 'subject', message: 'Subject is required' });
    } else if (data.subject.length < 3) {
      validationErrors.push({ field: 'subject', message: 'Subject must be at least 3 characters' });
    } else if (data.subject.length > 200) {
      validationErrors.push({ field: 'subject', message: 'Subject must not exceed 200 characters' });
    }

    // Message validation
    if (!data.message.trim()) {
      validationErrors.push({ field: 'message', message: 'Message is required' });
    } else if (data.message.length < 10) {
      validationErrors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    } else if (data.message.length > 5000) {
      validationErrors.push({ field: 'message', message: 'Message must not exceed 5000 characters' });
    }

    return validationErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors.some(err => err.field === name)) {
      setErrors(prev => prev.filter(err => err.field !== name));
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Rate limiting
    const now = Date.now();
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    
    if (lastSubmitTime && now - parseInt(lastSubmitTime) < 3000) {
      setErrorMessage('Please wait a few seconds before submitting again');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setErrorMessage('Please fix the errors above');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrors([]);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: SubmissionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      
      // Store submission time for rate limiting
      localStorage.setItem('lastSubmitTime', now.toString());

      triggerConfetti();

      // Auto-reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unable to send message. Please try again later.';
      setErrorMessage(errorMsg);
      setStatus('error');
    }
  };

  const getErrorMessage = (fieldName: string) => {
    return errors.find(err => err.field === fieldName)?.message;
  };

  return (
    <div className="relative">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="pointer-events-none fixed w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  backgroundColor: ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b'][Math.floor(Math.random() * 4)],
                }}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 0, y: 100, x: (Math.random() - 0.5) * 200 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div 
        className="glass-panel relative rounded-3xl border border-slate-700/60 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/90">Let&apos;s build something together</p>
            <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Send a message</h3>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 p-4 flex items-center gap-3"
              >
                <FaCheck className="text-green-400 text-xl flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-300">Message Sent Successfully! ✨</p>
                  <p className="text-sm text-green-200">Thank you! I&apos;ll respond to your message soon.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 p-4 flex items-start gap-3"
              >
                <FaTimes className="text-red-400 text-xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-300">Unable to Send Message</p>
                  <p className="text-sm text-red-200">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit} className={`mt-8 grid gap-4 transition-opacity ${status === 'success' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name Field */}
              <motion.label 
                className="block"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm text-slate-300 font-medium">
                  Full Name <span className="text-red-400">*</span>
                </span>
                <motion.input
                  required
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={status === 'sending'}
                  className={`mt-2 w-full rounded-xl border px-4 py-3 text-white outline-none transition backdrop-blur-sm ${
                    getErrorMessage('name')
                      ? 'border-red-500/70 bg-red-500/10 focus:border-red-400/70'
                      : 'border-white/10 bg-slate-900/70 focus:border-cyan-400/70'
                  } disabled:opacity-60`}
                  maxLength={100}
                  whileFocus={{ scale: 1.02 }}
                />
                {getErrorMessage('name') && (
                  <motion.p 
                    className="mt-1 text-xs text-red-400"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {getErrorMessage('name')}
                  </motion.p>
                )}
                <p className="mt-1 text-xs text-slate-400">{formData.name.length}/100</p>
              </motion.label>

              {/* Email Field */}
              <motion.label 
                className="block"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm text-slate-300 font-medium">
                  Email Address <span className="text-red-400">*</span>
                </span>
                <motion.input
                  required
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={status === 'sending'}
                  className={`mt-2 w-full rounded-xl border px-4 py-3 text-white outline-none transition backdrop-blur-sm ${
                    getErrorMessage('email')
                      ? 'border-red-500/70 bg-red-500/10 focus:border-red-400/70'
                      : 'border-white/10 bg-slate-900/70 focus:border-cyan-400/70'
                  } disabled:opacity-60`}
                  whileFocus={{ scale: 1.02 }}
                />
                {getErrorMessage('email') && (
                  <motion.p 
                    className="mt-1 text-xs text-red-400"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {getErrorMessage('email')}
                  </motion.p>
                )}
              </motion.label>
            </div>

            {/* Phone Field */}
            <motion.label 
              className="block"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm text-slate-300 font-medium">Phone Number (Optional)</span>
              <motion.input
                name="phone"
                type="tel"
                placeholder="+91 746402xxxx"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={status === 'sending'}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-white outline-none transition backdrop-blur-sm ${
                  getErrorMessage('phone')
                    ? 'border-red-500/70 bg-red-500/10 focus:border-red-400/70'
                    : 'border-white/10 bg-slate-900/70 focus:border-cyan-400/70'
                } disabled:opacity-60`}
                whileFocus={{ scale: 1.02 }}
              />
              {getErrorMessage('phone') && (
                <motion.p 
                  className="mt-1 text-xs text-red-400"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getErrorMessage('phone')}
                </motion.p>
              )}
            </motion.label>

            {/* Subject Field */}
            <motion.label 
              className="block"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm text-slate-300 font-medium">
                Subject <span className="text-red-400">*</span>
              </span>
              <motion.input
                required
                name="subject"
                type="text"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={status === 'sending'}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-white outline-none transition backdrop-blur-sm ${
                  getErrorMessage('subject')
                    ? 'border-red-500/70 bg-red-500/10 focus:border-red-400/70'
                    : 'border-white/10 bg-slate-900/70 focus:border-cyan-400/70'
                } disabled:opacity-60`}
                maxLength={200}
                whileFocus={{ scale: 1.02 }}
              />
              {getErrorMessage('subject') && (
                <motion.p 
                  className="mt-1 text-xs text-red-400"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getErrorMessage('subject')}
                </motion.p>
              )}
              <p className="mt-1 text-xs text-slate-400">{formData.subject.length}/200</p>
            </motion.label>

            {/* Message Field */}
            <motion.label 
              className="block"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm text-slate-300 font-medium">
                Message <span className="text-red-400">*</span>
              </span>
              <motion.textarea
                required
                name="message"
                placeholder="Tell me about your project or inquiry..."
                value={formData.message}
                onChange={handleInputChange}
                disabled={status === 'sending'}
                rows={5}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-white outline-none transition backdrop-blur-sm resize-none ${
                  getErrorMessage('message')
                    ? 'border-red-500/70 bg-red-500/10 focus:border-red-400/70'
                    : 'border-white/10 bg-slate-900/70 focus:border-cyan-400/70'
                } disabled:opacity-60`}
                maxLength={5000}
                whileFocus={{ scale: 1.02 }}
              />
              {getErrorMessage('message') && (
                <motion.p 
                  className="mt-1 text-xs text-red-400"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getErrorMessage('message')}
                </motion.p>
              )}
              <p className="mt-1 text-xs text-slate-400">{formData.message.length}/5000</p>
            </motion.label>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-teal-400 px-8 py-3 text-sm font-semibold text-slate-950 transition disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'sending' ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <FaCheck className="mr-2" />
                  Sent!
                </>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </form>

          {/* Info text */}
          <motion.p 
            className="mt-4 text-xs text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We respect your privacy. Your information will only be used to respond to your inquiry.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
