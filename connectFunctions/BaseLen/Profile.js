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

async function createProfile(
  sender,
  wallet,
  handle,
  imageURI,
  followModuleAddr,
  followModuleData,
  followNFTURI,
) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  const profileIdbyhandle = await baseHub.callStatic.getProfileIdByHandle(
    handle,
  );
  if (profileIdbyhandle != 0) {
    console.log('handle repeated!');
    return 0;
  }
  const state = await baseHub.callStatic.getState();
  if (state != 0) {
    await baseHub.connect(governance).setState(0, {gasLimit: 2400000});
  }
  const isinCreatorWL = await baseHub.callStatic.isProfileCreatorWhitelisted(
    wallet.address,
  );
  if (!isinCreatorWL) {
    await baseHub
      .connect(governance)
      .whitelistProfileCreator(wallet.address, true);
  }
  console.log('=============== create profile ==================');

  const methodData = baseHub.interface.encodeFunctionData('createProfile', [
    {
      to: wallet.address,
      handle: handle,
      imageURI: imageURI,
      followModule: followModuleAddr,
      followModuleInitData: followModuleData,
      followNFTURI: followNFTURI,
    },
  ]);

  const tx = await wallet
    .connect(sender)
    .execute(baseHubContractAddress, methodData, {
      gasLimit: 1000000,
    });
  console.log('finish create profile');
}
