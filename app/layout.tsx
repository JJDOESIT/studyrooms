import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import HomeBg from "@/components/HomeBg";
import "animate.css/animate.min.css";
import Snow from "@/components/snow";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} "overflow-hidden min-h-screen"`}>
        <HomeBg>
          <Snow></Snow>
          <Navbar />
          <div className="w-full h-[90vh] z-50">{children}</div>
        </HomeBg>
      </body>
    </html>
  );
}
