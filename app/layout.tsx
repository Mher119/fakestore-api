import type { Metadata } from "next";
import "./globals.css";

import { ReduxProvider } from '@/providers/ReduxProvider';

export const metadata: Metadata = {
  title: "My Shop Application",
  description: "Fake API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ ReduxProvider>
      </body>
    </html>
  );
}
