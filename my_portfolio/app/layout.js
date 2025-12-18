import { Outfit, Ovo } from "next/font/google";
import './globals.css'

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const ovo = Ovo ({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata = {
  title: "My_Portfolio - Sajin Reji",
  description: "A personal portfolio website showcasing my projects, skills, and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden bg-white text-black dark:bg-gray-950 dark:text-white `}
      >
        {children}
      </body>
    </html>
  );
}
