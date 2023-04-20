const ethers = require('ethers');

const Provider = require('@ethersproject/providers');
const abiCoder = ethers.utils.defaultAbiCoder;
const testProvider = new Provider.JsonRpcProvider(
  'https://api.baobab.klaytn.net:8651',
);

async function testCreateProfile(){
  
  const MOCK_PROFILE_URI =
    'https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu';
  const MOCK_FOLLOW_NFT_URI =
    'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan';
  const MOCK_URI =
    'https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const BaseWalletABI = require('../../abis/BaseWallet.json');
  const BaseHubABI = require('../../abis/BaseHub.json');
  const baseHubContractAddress = '0x47D84939034538b3F455637757985Fb7Ea4dA47c';
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
  const userPrivateKey =
  '5259cd35a7e523e6aa29cab7dcbb73ce331bdc0676b76f95883543c703938cca';
  const user2PrivateKey = "7d734643e5f3b678011f6b89f8640c6e35d7bbb50d017722ed9ced64b8ca3ec9"
  const user = new ethers.Wallet(userPrivateKey, testProvider);
  const user2 = new ethers.Wallet(user2PrivateKey,testProvider)

  const wallet1 = Wallet.attach('0x8049cA1E0A4F9cb0f50afc9Ed83c24f0EFF0f8a8');
  const wallet2 = Wallet.attach("0xAf20F057816Bb64D88f826dc75E2362A347Dd2dC")
  collect(user2,wallet2,baseHub,2,1,1,[])
  }
  testCreateProfile()


async function collect(sender, wallet, baseHub,collectorProfile, profileId,pubId, data){
    const name = await baseHub.callStatic.getHandle(profileId)
    if(name == ''){
        console.log('targer is not profile')
        return false
    }
    const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
    const owner = await baseHub.callStatic.ownerOf(collectorProfile)
    if(owner != wallet.address){
        console.log("is not owner")
        return false
     }
    const pubCount = await baseHub.callStatic.getPubCount(profileId)
    if(pubCount < pubId){
        console.log("is not publication of profile")
        return false
    }

    const methodData = baseHub.interface.encodeFunctionData('collect', [
        profileId,pubId, data,collectorProfile
      ]);
      const tx = await wallet
        .connect(sender)
        .execute(baseHub.address, methodData, {
          gasLimit: 1000000,
        });
}
