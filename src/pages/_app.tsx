import type { AppProps } from "next/app";

import { Navbar } from "../components/Layouts/Navbar";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
  );
}

export default MyApp;
