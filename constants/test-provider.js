import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";

export const testBSCprovider = new JsonRpcProvider(
    "https://bsc-testnet.public.blastapi.io",
    97
);
export const Testbaobab = new JsonRpcProvider(
    "https://public-node-api.klaytnapi.com/v1/baobab",
    1001
);
export const provider = Testbaobab;