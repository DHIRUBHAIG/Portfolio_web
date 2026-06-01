'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollAmount = window.scrollY;
      const fullHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(fullHeight > 0 ? Math.min(100, Math.round((scrollAmount / fullHeight) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
      <div className="h-full bg-gradient-to-r from-sky-300 via-teal-400 to-emerald-400 transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}
