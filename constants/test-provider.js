import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";

export const testBSCprovider = new JsonRpcProvider(
    "https://bsc-testnet.public.blastapi.io",
    97
);