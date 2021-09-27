import { AppProps } from "next/app";
import Head from "next/head";
import ApplicationProvider from "../src/contexts/ApplicationContext";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { appWithTranslation } from "next-i18next";
import { QueryClient, QueryClientProvider } from "react-query";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ApplicationProvider>
          <Component {...pageProps} />
        </ApplicationProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
export default appWithTranslation(MyApp);
