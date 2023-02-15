import "../styles/globals.css";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import theme from "../styles/theme";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartProvider";
import { NameServiceProvider } from "../context/NameServiceProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AccountProvider>
        <CartProvider>
          <NameServiceProvider>
            <Head>
              <title>KAP</title>
              <meta
                name="viewport"
                content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
              />
              <link
                href="favicon.ico"
                rel="icon"
                media="(prefers-color-scheme: light)"
              />
              <link
                href="favicon-inverse.ico"
                rel="icon"
                media="(prefers-color-scheme: dark)"
              />
            </Head>
            <Flex
              padding={{ base: 4, md: 8 }}
              gap={{ base: 4, md: 8 }}
              margin="auto"
              maxWidth="1024px"
              minHeight="100%"
              direction="column"
            >
              <Header />
              <main style={{ flex: 1, display: "flex" }}>
                <Component {...pageProps} />
              </main>
              <Footer />
            </Flex>
          </NameServiceProvider>
        </CartProvider>
      </AccountProvider>
    </ChakraProvider>
  );
}

export default MyApp;
