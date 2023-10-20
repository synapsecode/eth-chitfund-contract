"use client"

import { ConnectKitButton } from "connectkit"
import { useWalletClient } from 'wagmi';

export default function Home() {
  return (
    <main>
      <div>Connect Wallet</div>
      <ConnectKitButton />
    </main>
  )
}
