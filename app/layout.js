import "./globals.css";
import { appleFontL } from "./components/fontZip";
import Wrap from "./components/wrap";
import CopyRightFooter from "./components/copyrightFooter";
export const metadata = {
  title: "zun2log",
  description: "Pak Jun Yi's blog",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
  base: {
    href: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={appleFontL.className}>
        <Wrap>{children}</Wrap>
        <CopyRightFooter />
      </body>
    </html>
  );
}
