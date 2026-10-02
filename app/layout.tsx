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
  metadataBase: new URL("https://gluon.stability.nexus"),
  alternates: {
    canonical: "/",
  },
  title: "Gluon Stablecoin Protocol",
  description:
    "Gluon is a dual-token stabilization protocol. Split base tokens into neutrons and protons. Available on EVM and Ergo.",
  keywords: ["Gluon", "DeFi", "stablecoin", "dual token", "crypto", "EVM", "Ergo"],
  authors: [{ name: "Gluon Stablecoin Protocol" }],
  openGraph: {
    title: "Gluon Stablecoin Protocol",
    description:
      "Gluon is a dual-token stabilization protocol. Split base tokens into neutrons and protons. Available on EVM and Ergo.",
    url: "https://gluon.stability.nexus",
    siteName: "Gluon Protocol",
    images: [
      {
        url: "/image.png",
        width: 512,
        height: 512,
        alt: "Gluon Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gluon Stablecoin Protocol",
    description:
      "Gluon is a dual-token stabilization protocol. Split base tokens into neutrons and protons. Available on EVM and Ergo.",
    site: "@StabilityNexus",
    creator: "@StabilityNexus",
    images: ["/image.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://gluon.stability.nexus/#website",
        "url": "https://gluon.stability.nexus/",
        "name": "Gluon Protocol",
        "description": "Physics-inspired dual-token stablecoin protocol with zero governance and no rent-seeking fees."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://gluon.stability.nexus/#application",
        "name": "Gluon Protocol",
        "applicationCategory": "DeFiApplication",
        "operatingSystem": "Web",
        "url": "https://gluon.stability.nexus/",
        "author": {
          "@type": "Organization",
          "name": "Stability Nexus",
          "url": "https://stability.nexus"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
