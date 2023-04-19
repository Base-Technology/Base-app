import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";

export const testBSCprovider = new JsonRpcProvider(
    "https://bsc-testnet.public.blastapi.io",
    97
);
export const Testbaobab = new JsonRpcProvider(
    "https://api.baobab.klaytn.net:8651",
    1001
)