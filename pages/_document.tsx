import { MODAL_ROOT_DIV_ID } from '@/commons/constants';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id={MODAL_ROOT_DIV_ID}></div>
      </body>
    </Html>
  );
}
