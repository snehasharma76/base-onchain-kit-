'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
import { 
  ConnectWallet, 
  ConnectWalletText, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect, 
} from '@coinbase/onchainkit/wallet'; 
import { color } from '@coinbase/onchainkit/theme';

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Wallet Connection</h1>

      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Account Info</h2>
        <div className="mb-4">
          <p>Status: {account.status}</p>
          <p>Addresses: {JSON.stringify(account.addresses)}</p>
          <p>Chain ID: {account.chainId}</p>
        </div>

        {account.status === 'connected' && (
          <button
            type="button"
            onClick={() => disconnect()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>
      <div className="mb-8">
        <Wallet>
          <ConnectWallet>
            <ConnectWalletText>Connect Wallet</ConnectWalletText>
            <Avatar className="h-6 w-6 ml-2" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>

      {(status === 'pending' || error) && (
        <div className="text-center">
          <p>{status}</p>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      )}
    </div>
  )
}

export default App
