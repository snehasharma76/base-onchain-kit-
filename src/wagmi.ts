import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { baseSepolia } from 'wagmi/chains'; 
import { coinbaseWallet, injected } from 'wagmi/connectors';
 
export function getConfig() {
  return createConfig({
    chains: [baseSepolia], 
    connectors: [
      // coinbaseWallet({
      //   appName: "OnchainKit",
      //   preference: 'smartWalletOnly',
      //   version: '4',
      // }),
      injected(), 
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(), 
    },
  });
}
 
declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}