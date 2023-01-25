import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { tw } from '@/util/tailwind'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RainbowKitWrapper } from '@/components/wallet/RainbowKitWrapper'
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <RainbowKitWrapper>
      <Head>
        <title>NFT Pantry: Social Feed</title>
        <meta name="description" content="View recent NFT trades" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={tw(styles.main, 'text-white')}>
        {/* header */}
        <div className="fixed top-0 w-full px-12 py-4 justify-between flex items-center">
          <div className='text-2xl'>
            NFT Social Feed
          </div>
          <ConnectButton label="connect" accountStatus="address" showBalance={false} />
        </div>
        {/* feed */}
        {/* todo */}
      </main>
    </RainbowKitWrapper>
  )
}
