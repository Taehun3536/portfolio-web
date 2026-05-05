import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Engineer Portfolio",
  description: "품질과 성장을 지향하는 엔지니어 권태훈의 포트폴리오입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
