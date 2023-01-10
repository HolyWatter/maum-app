import React from 'react';
import type { AppProps } from 'next/app';
import firebase from './api/firebase/firebase';
import '../styles/globals.css';

console.log(firebase)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp
