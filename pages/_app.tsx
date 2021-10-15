import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApplicationProvider } from '../src/contexts/ApplicationContext';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
const clientSideEmotionCache = createEmotionCache();
import { useRouter } from 'next/dist/client/router';
import { getCartItems } from '../lib/queries/cartService';
import { LOCAL_STORAGE_CART_KEY, NEW_CART_VALUE } from '../src/constants';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
      })
  );
  const { locale } = useRouter();
  //🌎 Initialize google maps script loader.
  // const { isLoaded } = useLoadScript({
  //   id: 'script-loader',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  //   libraries: ['places'],
  // });
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    const initialLocalCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
    if (!initialLocalCart) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(NEW_CART_VALUE)
      );
      queryClient.prefetchQuery('/validate-cart-items', getCartItems);
    } else {
      queryClient.prefetchQuery('/validate-cart-items', getCartItems);
    }

    // }
  }, [queryClient]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg&language=${locale}&libraries=places&v=weekly`}
          async
        ></script>
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ApplicationProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ApplicationProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
export default appWithTranslation(MyApp);
