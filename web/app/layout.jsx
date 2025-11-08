import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NyayaSetu – Legal-AI Research Assistant",
  description:
    "NyayaSetu reduces research burden for Indian legal teams: extract key facts, find similar precedents, align language and legal meaning, and draft bilingual arguments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
