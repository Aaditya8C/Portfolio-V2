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
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var activeTheme = theme || systemTheme;
                  document.documentElement.setAttribute('data-theme', activeTheme);
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="bg-void text-primary font-body min-h-full flex flex-col selection:bg-red-raw selection:text-white overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

