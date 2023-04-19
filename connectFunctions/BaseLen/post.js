const ethers = require('ethers');

const abiCoder = ethers.utils.defaultAbiCoder;

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

async function post(
  sender,
  wallet,
  profileId,
  contentURI,
  collectModule,
  collectModuleData,
  referenceModule,
  referenceModuleData,
) {
  const owner = await baseHub.callStatic.ownerOf(profileId);
  const isOwner = wallet.isOwner(sender.address);

  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  if (owner != wallet.address) {
    console.log('is not owner');
    return false;
  }
  const methodData = baseHub.interface.encodeFunctionData('post', [
    {
      profileId: profileId,
      contentURI: contentURI,
      collectModule: collectModule,
      collectModuleInitData: collectModuleData,
      referenceModule: referenceModule,
      referenceModuleInitData: referenceModuleData,
    },
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHubContractAddress, methodData, {
      gasLimit: 1000000,
    });
}

