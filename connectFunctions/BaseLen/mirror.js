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

async function mirror(
  sender,
  wallet,
  profileId,
  profileIdPointed,
  pubId,
  referenceModuleData,
  referenceModule,
  referenceModuleInitdata,
) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  console.log("-3")

  const name = await baseHub.callStatic.getHandle(profileId);
  if (name == '') {
    console.log('is not id of profile');
    return false;
  }
  console.log("-2")

  const owner = await baseHub.callStatic.ownerOf(profileId)
  if(owner != wallet.address){
      console.log("is not owner")
      return false
   }
  console.log("-1")

  const name2 = await baseHub.callStatic.getHandle(profileIdPointed);
  if (name2 == '') {
    console.log('targer is not profile');
    return false;
  }
  console.log("-")
  const pubCount = await baseHub.callStatic.getPubCount(profileIdPointed);
  if (pubCount < pubId) {
    console.log('is not publication of profile');
    return false;
  }
  console.log("1")
  const methodData = baseHub.interface.encodeFunctionData('mirror', [
    {
      profileId: profileId,
      profileIdPointed: profileIdPointed,
      pubIdPointed: pubId,
      referenceModuleData: referenceModuleData,
      referenceModule: referenceModule,
      referenceModuleInitData: referenceModuleInitdata,
    }
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHubContractAddress, methodData, {
      gasLimit: 1000000,
    });
}