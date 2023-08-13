import "./globals.css";
import localFont from "next/font/local";
const appleFont = localFont({ src: "./fonts/AppleSDGothicNeoH.ttf" });

export const metadata = {
  title: "zun2log",
  description: "Pak Jun Yi's blog",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={appleFont.className}>{children}</body>
    </html>
  );
}
