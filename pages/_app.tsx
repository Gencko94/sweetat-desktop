import { AppProps } from "next/app";
import Head from "next/head";
import ApplicationProvider from "../src/contexts/ApplicationContext";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import { appWithTranslation } from "next-i18next";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Layout from "../src/components/Layout";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ApplicationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApplicationProvider>
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}
export default appWithTranslation(MyApp);
