import "../styles/globals.css";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import { RpcProvider } from "../context/RpcProvider";
import { SwrProvider } from "../context/SwrProvider";
import theme from "../styles/theme";
import { ContractsProvider } from "../context/ContractsProvider";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SwrProvider>
        <RpcProvider>
          <AccountProvider>
            <ContractsProvider>
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
                margin="auto"
                maxWidth="1024px"
                minHeight="100vh"
                direction="column"
              >
                <Header />
                <main style={{ flex: 1, display: "flex" }}>
                  <Component {...pageProps} />
                </main>
                <Footer />
              </Flex>
            </ContractsProvider>
          </AccountProvider>
        </RpcProvider>
      </SwrProvider>
    </ChakraProvider>
  );
}

export default MyApp;
