'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import Footer from "@/components/layout/footer";
import { FacebookProvider } from "react-facebook";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
        <body className={inter.className}>
          <Suspense fallback={<p>Loading feed...</p>}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <>
                  
                    <Header />
                      <div className="w-full min-h-svh">
                        {children}
                      </div>
                      <ToastContainer />
                    <Footer />                    
                </>
              </PersistGate>
            </Provider>  
          </Suspense>  
        </body>
    </html>
  );
}
