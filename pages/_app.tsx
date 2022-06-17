import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/Theme.module.css";

// This is the chainId your dApp will work on.

const activeChainId = ChainId.Mainnet;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>Goblins On LSD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="AAAAAAAUUUUUGGGHHHHH gobblins r on zoM gUd LsD KuM jOIn us N lETs tRIPpPpp dA FoK AuT"
        />
        <meta
          name="keywords"
          content="Goblins On LSD AAAAAAAUUUUUGGGHHHHH gobblins r on zoM gUd LsD KuM jOIn us N lETs tRIPpPpp dA FoK AuT"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;