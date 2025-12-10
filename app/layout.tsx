import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata: Metadata = {
  title: "Tatabahasa",
  description: "Large Language Model Text Normalization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
