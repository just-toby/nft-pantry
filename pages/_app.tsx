import { RainbowKitWrapper } from '@/components/wallet/RainbowKitWrapper'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
