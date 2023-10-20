'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import { WagmiConfig, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'ETH-ChitFund',
  description: 'A Blockchain based ChitFund',
}

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    InfuraId: '780328900b614f06a7c9a42fd61d87bc', // or infuraId
    walletConnectProjectId: 'd7204e6abb43486016391132496ff4f2',
    appName: "ETH-ChitFund",
    chains: [sepolia]
  }),
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <body className={inter.className}>{children}</body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  )
}
