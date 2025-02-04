'use client';
import Head from "next/head";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Privacy from "./Components/Privacy";
import "./globals.css"; // Ensure correct path
import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }) {
  const [isPrivacyDisplayed, setPrivacyDisplayed] = useState(false);

  const showPrivacy = () => setPrivacyDisplayed(true);
  const hidePrivacy = () => setPrivacyDisplayed(false);

  return (
    <html lang="en">
      <Head>
        <title>Your Page Title</title>
      </Head>
      <body>
        <GoogleOAuthProvider clientId="409170391772-c2ui76gggqi8vcom73u5gt4ac9naiqa6.apps.googleusercontent.com">
          <Navbar />
          {children}
          {isPrivacyDisplayed && <Privacy hidePrivacy={hidePrivacy} />}
          <Footer showPrivacy={showPrivacy} />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
