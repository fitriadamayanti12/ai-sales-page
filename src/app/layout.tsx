import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SalesAI — AI Sales Page Generator",
  description:
    "Build high-converting sales pages with AI. Choose from 3 premium templates — Modern Glass, Dark Luxury, and Minimalist. Powered by Llama 3.3 70B.",
  keywords: [
    "AI sales page",
    "sales page generator",
    "AI copywriting",
    "landing page builder",
    "conversion optimization",
    "AI marketing",
    "SaaS",
  ],
  authors: [{ name: "SalesAI" }],
  creator: "SalesAI",
  publisher: "SalesAI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "SalesAI",
    title: "SalesAI — AI Sales Page Generator",
    description:
      "Build high-converting sales pages with AI. 3 premium templates. No coding required.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SalesAI — AI Sales Page Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SalesAI — AI Sales Page Generator",
    description:
      "Build high-converting sales pages with AI. 3 premium templates.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased text-slate-900 dark:text-slate-100`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="bg-premium-light bg-grid-light min-h-screen relative">
            <div
              style={{
                position: "fixed",
                top: "30%",
                left: "60%",
                width: "300px",
                height: "300px",
                background:
                  "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(60px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              {children}
            </div>
          </div>
          <Toaster position="top-center" theme="light" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}