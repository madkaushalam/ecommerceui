import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProviders, SessionProviders } from "./providers";
import Navbar from '@/components/navigation';
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>MadMart</title>
      </head>
      <body
      >

        <SessionProviders>
          <ReduxProviders>
            <Navbar />
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={700}
              hideProgressBar={false}
              theme="light" />
          </ReduxProviders>
        </SessionProviders>
      </body>
    </html>
  );
}
