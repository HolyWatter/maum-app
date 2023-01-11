import React from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Nav />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
