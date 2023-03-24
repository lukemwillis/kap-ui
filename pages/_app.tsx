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
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ChakraProvider theme={theme}>
        <AccountProvider>
          <UsdOracleProvider>
            <CartProvider>
              <NameServiceProvider>
                <ProfileProvider>
                  <Head>
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
                    minHeight={{
                      base: "calc(100% + 3em)",
                      md: "calc(100% + 4em)",
                    }}
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}

export default MyApp;
