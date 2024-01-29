import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '../services/msal';
import "../styles/globals.css";
import Head from "next/head"
import Layout from "../components/layout/Layout";

import PathCheck from "../components/features/PathCheck"

if (typeof window !== "undefined") {
  const isDark = localStorage.getItem("darkmode");
  if (isDark == "true") {
    document.body.classList.toggle("dark-mode");
    if (document.getElementsByTagName("header")[0] != null) {
      document.getElementsByTagName("header")[0].style.background = "#121212";
      document.getElementsByClassName("bm-menu")[0].style.background = "rgb(30,30,30)";
      document.getElementsByClassName("bm-item-list")[0].style.color = "white";
    }
  }
}

function MyApp({ Component, pageProps }) {

  return (
      <>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Layout>
        <MsalProvider instance={msalInstance}>
          <PathCheck>
            <Component {...pageProps} />
          </PathCheck>
        </MsalProvider>
      </Layout>
    </>
  );

}

export default MyApp;
