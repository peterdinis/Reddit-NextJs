import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/chakraTheme";
import Layout from "../components/shared/Layout";
import { RecoilRoot } from "recoil";

/* This snippet fix this bug: https://stackoverflow.com/questions/65506656/recoil-duplicate-atom-key-in-nextjss */

const memoize = (fn: { (console: any): void; (arg0: string): void; }) => {
  let cache = {} as any;
  return (...args: any[]) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args: (string | string[])[]) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))

global.console = mutedConsole(global.console);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
