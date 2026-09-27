import './globals.css';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const codeFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans-code',
  display: 'swap',
});

export const metadata = {
  title: 'Gakk Media — Digital Design & Development Agency',
  description: 'Gakk Media architects mission-critical digital products, high-throughput telecom VAS systems, and modern web applications with surgical engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sansFont.variable} ${codeFont.variable}`}>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" async><\/script>
      </head>
      <body className="bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}