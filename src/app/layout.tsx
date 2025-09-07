import type { Metadata } from "next";
import { El_Messiri, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const elMessiri = El_Messiri({
  variable: "--font-el-messiri", // ตั้งชื่อ CSS variable
  subsets: ["latin"], // ต้องใส่อย่างน้อย "latin"
  weight: ["400", "500", "600", "700"], // ใส่น้ำหนักฟอนต์ที่ต้องใช้
  style: ["normal"], // ปกติไม่มี italic ก็ใส่แค่นี้
});

const noto_Sans_Thai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Ever Link AI",
  description: "A web application that connects souls through AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${elMessiri.variable} ${noto_Sans_Thai.variable} antialiased`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
