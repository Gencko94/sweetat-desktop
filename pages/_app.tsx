import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApplicationProvider } from '../src/contexts/ApplicationContext';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import Layout from '../src/components/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/dist/client/router';
import { getCartItems } from '../lib/queries/cartService';
import { LOCAL_STORAGE_CART_KEY, NEW_CART_VALUE } from '../src/constants';
import { getLocalCart } from '../utils/getLocalCart';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const { locale } = useRouter();
  // ⭐ --- App initializor --- ⭐
  useEffect(() => {
    // 🛒 Local Cart Initialization
    const initialLocalCart = getLocalCart();
    if (!initialLocalCart) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify(NEW_CART_VALUE)
      );
      queryClient.prefetchQuery('/validate-cart-items', getCartItems);
    } else {
      queryClient.prefetchQuery('/validate-cart-items', getCartItems);
    }
  }, []);
  // ⭐ ---  End of App initializor --- ⭐
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg&language=${locale}&libraries=places&v=weekly`}
          async
        ></script>
      </Head>

      <ApplicationProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ApplicationProvider>
    </CacheProvider>
  );
}
export default appWithTranslation(MyApp);
