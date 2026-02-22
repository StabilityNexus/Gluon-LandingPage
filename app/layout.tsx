import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gluon Protocol",
  description:
    "Gluon W is a dual-token stabilization protocol. Split base tokens into neutrons (stable) and protons (volatile), or merge them back. DeFi-native mechanics with dynamic fees.",
  keywords: ["Gluon", "DeFi", "stablecoin", "dual token", "crypto", "EVM", "Ergo", "Solana"],
  authors: [{ name: "Gluon Protocol" }],
  openGraph: {
    title: "Gluon Protocol",
    description:
      "Gluon W is a dual-token stabilization protocol. Split base tokens into neutrons and protons. Available on EVM, Ergo, and Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gluon Protocol",
    description: "DeFi-native dual-token mechanics. Fission, fusion, and beta decay reactions.",
  },
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/image.png`,
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
