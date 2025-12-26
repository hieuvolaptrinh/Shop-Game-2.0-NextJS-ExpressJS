import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { AuthProvider } from '@/contexts/auth-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Game Account Shop',
    template: '%s | Game Account Shop',
  },
  description: 'Mua bán tài khoản game uy tín, giá rẻ',
  keywords: ['game', 'account', 'shop', 'tài khoản game', 'mua bán'],
  authors: [{ name: 'Game Account Shop' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://gameaccountshop.com',
    siteName: 'Game Account Shop',
    title: 'Game Account Shop',
    description: 'Mua bán tài khoản game uy tín, giá rẻ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
