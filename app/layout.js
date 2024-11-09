import "./globals.css";
import { appleFontL } from "./components/fontZip";
import Wrap from "./components/wrap";
import CopyRightFooter from "./components/copyrightFooter";
import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(() => import("./components/googleAnalytics"), {
  ssr: false,
});

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
  verification: { google: "zu1Uz4cuZpS_IKi_I0Dll6vc11SePw-F_XQZRMDsc-c" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={appleFontL.className}>
        {/* <GoogleAnalytics /> */}
        {/* <Wrap>{children}</Wrap> */}
        {children}
        {/* <CopyRightFooter /> */}
      </body>
    </html>
  );
}
