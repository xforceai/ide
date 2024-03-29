import type { AppProps } from 'next/app';
import { Manrope } from 'next/font/google';

import '@/styles/globals.css';
import 'reactflow/dist/style.css';
import '@/styles/reactflow.css';

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={manrope.className}>
      <Component {...pageProps} />
    </main>
  );
}
