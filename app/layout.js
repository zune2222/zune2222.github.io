import "./globals.css";
import { appleFontL } from "./components/fontZip";
import Wrap from "./components/wrap";
import CopyRightFooter from "./components/copyrightFooter";
import GoogleAnalytics from "./components/googleAnalytics";
export const metadata = {
  title: "zun2log",
  description: "Pak Jun Yi's blog",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/legacy/favicon.ico",
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
        <a href="/" style={{position:"fixed",top:12,right:16,zIndex:10000,padding:"8px 12px",border:"1px solid #ddd",borderRadius:4,background:"#fff",color:"#222",fontSize:12}}>← 새 포트폴리오</a>
        <GoogleAnalytics />
        <Wrap>{children}</Wrap>
        <CopyRightFooter />
      </body>
    </html>
  );
}
