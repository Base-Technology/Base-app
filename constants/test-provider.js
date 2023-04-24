import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";

export const testBSCprovider = new JsonRpcProvider(
    "https://public-node-api.klaytnapi.com/v1/baobab",
    1001
);