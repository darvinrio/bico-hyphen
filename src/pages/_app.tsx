import type { AppProps } from "next/app";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { Navbar } from "../layouts/Navbar";
import { GlobalStyles } from "../styles/Global";

let theme = require("../json/theme.json");

function MyApp({ Component, pageProps }: AppProps) {
  const myTheme: DefaultTheme = theme;
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <GlobalStyles />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
