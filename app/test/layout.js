import "../globals.css";
import { appleFontL } from "../components/fontZip";

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
      <body className={appleFontL.className}>{children}</body>
    </html>
  );
}
