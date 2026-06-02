import './globals.css';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'Dhiraj Kumar Gupta | AI & ML Portfolio',
  description: 'Dhiraj Kumar Gupta portfolio - CSE AIML student, AI/ML developer, software engineer, and problem solver from LNCT Bhopal.',

  verification: {
    google: 'VIycmZ8ci7hSri3NWdMzsl4cGRftNsxEA9MJRzimDQE',

  },


  metadataBase: new URL('https://portfolio-web-zeta-lac.vercel.app/'),
  openGraph: {
    title: 'Dhiraj Kumar Gupta | AI & ML Portfolio',
    description: 'Portfolio website of Dhiraj Kumar Gupta, CSE AIML student at LNCT Bhopal.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
