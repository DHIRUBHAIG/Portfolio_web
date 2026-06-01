'use client';

import { FormEvent, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-700/60 p-8 shadow-2xl shadow-slate-900/40">
      <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/90">Let's build something together</p>
      <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Send a message</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Name</span>
            <input required name="user_name" type="text" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70" />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input required name="user_email" type="email" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70" />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-300">Phone</span>
          <input name="user_phone" type="tel" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70" />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Subject</span>
          <input required name="subject" type="text" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70" />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Message</span>
          <textarea required name="message" rows={5} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70" />
        </label>
        <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-400">
        {status === 'success' && 'Message sent successfully. I will reply soon!'}
        {status === 'error' && 'Unable to send message right now. Please try again later.'}
      </p>
    </div>
  );
}
