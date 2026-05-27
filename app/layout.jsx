import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "David J. Hwang",
  description: "David J. Hwang's personal portfolio and project hub.",
  icons: {
    icon: "/light-bulb.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
