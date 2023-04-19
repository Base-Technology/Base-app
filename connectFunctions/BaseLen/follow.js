const ethers = require('ethers');

const Provider = require('@ethersproject/providers');
const testProvider = new Provider.JsonRpcProvider(
  'https://api.baobab.klaytn.net:8651',
);

// import {testBSCprovider} from "../../constants/test-provider";
// import  { baseHubContractAddress,profileCreationProxyAddr,walletContractAddress } from "../../constants/contract_address"
// import { deployerPrivateKey,governancePrivateKey,userPrivateKey,user2PrivateKey } from "../../constants/test_account"
const BaseWalletABI = require('../../abis/BaseWallet.json');
const BaseHubABI = require('../../abis/BaseHub.json');
const baseHubContractAddress = '0xbA1059757397D35917604eA55d6Cb82C185C4f02';
const walletContractAddress = '0xb3B821B321710DCf62efe4D028636d58f2995Ae2';

const Wallet = new ethers.Contract(
  walletContractAddress,
  BaseWalletABI,
  testProvider,
);
const baseHub = new ethers.Contract(
  baseHubContractAddress,
  BaseHubABI,
  testProvider,
);

async function follow(sender, wallet, target, data) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  if (target.length != data.length) {
    console.log('target.length != data.length');
    return false;
  }
  let name;
  for (i = 0; i < target.length; i++) {
    name = await baseHub.callStatic.getHandle(target[i]);
    if (name == '') {
      console.log('one of targer is not profile');
      return false;
    }
  }

  const methodData = baseHub.interface.encodeFunctionData('follow', [
    target,
    data,
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHubContractAddress, methodData, {
      gasLimit: 1000000,
    });
}
