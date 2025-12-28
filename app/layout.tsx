import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Github } from 'lucide-react'
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 Pockets",
  description: "Vide tes poches et montre ce qu'il y a dedans !",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <header className="flex items-center justify-between p-4 border-b">
            <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
              <h1 className="font-bold">404 Pockets</h1>
              <UserButton />
            </div>
          </header>
          <main className="p-4">
            <div className="max-w-5xl mx-auto mt-10">
              {children}
            </div>
          </main>
          <footer className="px-4 w-full mt-6 mb-10 text-right text-sm text-muted-foreground">
            <div className="max-w-5xl mx-auto">
              Made by <Link href={'https://arnaud.ninja'} target='_blank' className='underline'>Axiol</Link>, for the love of aUEC - <Link href={"https://github.com/Axiol/404-pockets"} target='_blank'><Github className="align-text-top h-4 w-4 inline-block" /></Link>
            </div>
          </footer>
          {modal}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
