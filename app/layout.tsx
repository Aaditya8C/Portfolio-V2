import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Mono, Oswald } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-tactical",
  weight: ["400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-stamp",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DOSSIER // AADITYA PADTE // ACTIVE OPERATIVE",
  description: "Classified intelligence record on Aaditya Padte: Full-Stack Engineer. Deployed at JPMorgan Chase. Tech stack clearance levels, project cases, and strategic field operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="bg-[#080808] text-[#D4D4D4] font-body min-h-full flex flex-col selection:bg-[#8B0000] selection:text-white overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

