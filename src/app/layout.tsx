import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import Hero from "@/components/Hero";
import ReactQueryProvider from "@/lib/Providers/QueryClientProvider";
import {Toaster} from "@/components/ui/sonner";
import {QueryClient} from "react-query";
import {getTestReqInfo} from "next/dist/experimental/testmode/context";
import {AppProvider} from "@/lib/Context/SideNavContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Notes",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
                <UserProvider>
                    <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                        <ReactQueryProvider>
                            <AppProvider>
                                <main>
                                    {children}
                                </main>
                                <Toaster/>
                            </AppProvider>
                        </ReactQueryProvider>
                    </body>
                </UserProvider>
        </html>
    );
}
