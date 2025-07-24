// pages/_document.tsx – HTML šablona s fontem Satoshi
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
