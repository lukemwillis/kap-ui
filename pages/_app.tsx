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
import { UsdOracleProvider } from "../context/UsdOracleProvider";
import { ProfileProvider } from "../context/ProfileProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AccountProvider>
        <UsdOracleProvider>
          <CartProvider>
            <NameServiceProvider>
              <ProfileProvider>
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
                  minHeight={{ base: "calc(100% + 3em)", md: "calc(100% + 4em)" }}
                  direction="column"
                >
                  <Header />
                  <main style={{ flex: 1, display: "flex" }}>
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </Flex>
              </ProfileProvider>
            </NameServiceProvider>
          </CartProvider>
        </UsdOracleProvider>
      </AccountProvider>
    </ChakraProvider>
  );
}

export default MyApp;
