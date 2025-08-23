import type { Metadata } from "next";
import { El_Messiri } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";



const elMessiri = El_Messiri({
  variable: "--font-el-messiri", // ตั้งชื่อ CSS variable
  subsets: ["latin"],           // ต้องใส่อย่างน้อย "latin"
  weight: ["400", "500", "600", "700"], // ใส่น้ำหนักฟอนต์ที่ต้องใช้
  style: ["normal"],            // ปกติไม่มี italic ก็ใส่แค่นี้
});

export const metadata: Metadata = {
  title: "Web Soul Link AI",
  description: "A web application that connects souls through AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${elMessiri.variable} antialiased`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
