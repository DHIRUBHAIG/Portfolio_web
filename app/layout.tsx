import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Dhiraj Kumar Gupta | AI & ML Portfolio',
  description:
    'Dhiraj Kumar Gupta portfolio - CSE AIML student, AI/ML developer, software engineer, and problem solver from LNCT Bhopal.',

  verification: {
    google: 'VIycmZ8ci7hSri3NWdMzsl4cGRftNsxEA9MJRzimDQE',
  },

  metadataBase: new URL('https://portfolio-web-zeta-lac.vercel.app/'),

  openGraph: {
    title: 'Dhiraj Kumar Gupta | AI & ML Portfolio',
    description:
      'Portfolio website of Dhiraj Kumar Gupta, CSE AIML student at LNCT Bhopal.',
    type: 'website',
    url: 'https://portfolio-web-zeta-lac.vercel.app/',
  },

  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZP500LSNG3"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZP500LSNG3');
          `}
        </Script>
      </body>
    </html>
  );
}