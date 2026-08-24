import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.preciousadesoji.com.ng"),
  title: "Precious Adesoji | Social Media Manager & Virtual Assistant",
  description:
    "Precious Adesoji helps founders and remote teams manage social media, create polished video content, stay organised, and build a stronger digital presence.",
  keywords: [
    "Precious Adesoji",
    "virtual assistant",
    "digital marketing specialist",
    "remote assistant",
    "social media manager",
    "social media management",
    "video editing",
    "SEO",
  ],
  openGraph: {
    title: "Precious Adesoji | Social Media Manager & Virtual Assistant",
    description:
      "Social media management, polished video content, calm systems, and thoughtful digital support for busy founders and growing teams.",
    type: "website",
    images: [
      {
        url: "/precious-adesoji.jpg",
        width: 810,
        height: 1080,
        alt: "Precious Adesoji",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
