import type { Metadata } from "next";
import { Toaster } from "sonner";
// import NightSky from "./components/NightSky";
import "./globals.css";
import { fonts, colors } from "../theme";

export const metadata: Metadata = {
  title: "One Good Thing Journal",
  description: "A magical cosmic journaling app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: colors.background,
          color: colors.cream,
          fontFamily: fonts.body,
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <Toaster position="top-center" />
        <main style={{ position: "relative", zIndex: 10 }}>
          {children}
        </main>
        {/* Optional global background layer */}
        {/* <NightSky /> */}
      </body>
    </html>
  );
}
