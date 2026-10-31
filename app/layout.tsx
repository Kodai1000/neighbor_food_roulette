import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "近くの外食ルーレット",
  description: "現在地付近の飲食店から、あなたの今日のご飯を決めます。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased `}
    >
      <body className="min-h-full flex flex-col bg-[#C2FFD4]">
        <header>
          <Header />
        </header>
        <div>
          {children}
        </div>
        <footer>
          <Footer/>
        </footer>
        <Analytics/>
      </body>
    </html>
  );
}
