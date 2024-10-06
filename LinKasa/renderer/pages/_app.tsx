import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../lib/theme";
import type { EmotionCache } from "@emotion/cache";
import createEmotionCache from "../lib/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import { UserProvider } from "../session/UserSession";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./css/scrollbar.css";

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === "s") {
        // Your logic for the shortcut action here
        console.log("Ctrl + S pressed. Shortcut triggered!");
        // Perform any action you want here when Ctrl + S is pressed
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <UserProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
}
