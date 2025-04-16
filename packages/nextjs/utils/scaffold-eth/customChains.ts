import { defineChain, Hex } from "viem";

export const custom_chains = defineChain({
  id: 12232,
  name: 'Mainnet_Testnet',
  nativeCurrency: { name: 'VETH', symbol: 'vETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://virtual.mainnet.rpc.tenderly.co/32761de4-da0a-455a-8a72-1b42b510e5e9'] }
  },
  blockExplorers: {
    default: {
      name: 'Sepolia_Testnet',
      url: 'https://virtual.mainnet.rpc.tenderly.co/32761de4-da0a-455a-8a72-1b42b510e5e9'
    }
  },
});

export type TSetBalanceRpc = {
  method: "tenderly_setBalance",
  Parameters: [addresses: Hex[], value: Hex],
  ReturnType: Hex
}

export type TSetErc20BalanceRpc = {
  method: "tenderly_setErc20Balance",
  Parameters: [erc20: Hex, to: Hex, value: Hex],
  ReturnType: Hex
}