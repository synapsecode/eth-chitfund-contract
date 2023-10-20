"use client"

import { ConnectKitButton } from "connectkit"
import { useWalletClient } from 'wagmi';
import { loadContract } from '../blockchain/loadContract'

const test = async () => {
  let operator = await loadContract('0xDB86c56d71f53B1126c59ea7a515Ea98F5D790Af');
  // console.log(operator);
  const bal = await operator.getBalance();
  console.log(bal);
  // console.log(await operator.write.getBalance());
  // console.log(x);
}

export default function Home() {
  return (
    <main>
      <div>Connect Wallet</div>
      <ConnectKitButton />
      <br /><br /><br />
      <button onClick={test}>
        Try Interaction
      </button>
    </main>
  )
}
