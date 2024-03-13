import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metaData: Metadata = {
  title: 'LiteShare',
  description:
    'FileDrop: Swift P2P file sharing and real-time chat. Experience seamless, secure data exchange with our WebRTC-powered Next.js app. Join us for instant messaging and efficient file transfer in a modern, user-friendly environment',
  authors: [
    {
      name: 'Ankit Patnaik',
      url: 'https://github.com/patnaikankit',
    },
  ],
  // icons{
  //     icon: ""
  // }
};

interface RootLayoutProps {
  metaData: Metadata;
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, metaData }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;