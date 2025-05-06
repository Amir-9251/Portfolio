import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "M Amir | Frontend Developer",
  description: "Professional portfolio of M Amir, Frontend Developer specializing in React and Next.js",
  icons: {
    icon: '/code-solid.svg',
    shortcut: '/code-solid.svg',
    apple: '/code-solid.svg',
  },
  openGraph: {
    title: "M Amir | Frontend Developer",
    description: "Professional portfolio of M Amir, Frontend Developer specializing in React and Next.js",
    url: "https://johndoe.dev",
    siteName: "M Amir Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M Amir Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Portfolio() {
  return <ClientPage />
}
