const ethers = require('ethers')
import { testBSCprovider } from "../../constants/test-provider";
import { baseHubContractAddress } from "../../constants/contract_address";
import { deployerPrivateKey,governancePrivateKey,userPrivateKey,user2PrivateKey } from "../../constants/test_account";

const BaseHubABI = require('../../abis/BaseHub.json')

const baseHub = new ethers.Contract(baseHubContractAddress,BaseHubABI,testBSCprovider)

const deployer = new ethers.Wallet(deployerPrivateKey,testBSCprovider)
const governance = new ethers.Wallet(governancePrivateKey,testBSCprovider)
const user = new ethers.Wallet(userPrivateKey,testBSCprovider)
const user2 = new ethers.Wallet(user2PrivateKey,testBSCprovider)
const MOCK_URI =
  'https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
const abiCoder = ethers.utils.defaultAbiCoder;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

async function mirror(
  sender,
  profileId,
  profileIdPointed,
  pubId,
  referenceModuleData,
  referenceModule,
  referenceModuleInitdata,
) {
  const name = await baseHub.callStatic.getHandle(profileId);
  if (name == '') {
    console.log('is not id of profile');
    return false;
  }
  const owner = await baseHub.callStatic.ownerOf(profileId)
  if(owner != sender.address){
      console.log("is not owner")
      return false
   }
  const name2 = await baseHub.callStatic.getHandle(profileIdPointed);
  if (name2 == '') {
    console.log('targer is not profile');
    return false;
  }
  const pubCount = await baseHub.callStatic.getPubCount(profileIdPointed);
  console.log(pubCount.toNumber())
  if (pubCount < pubId) {
    console.log('is not publication of profile');
    return false;
  }
  const pubCount2 = await baseHub.callStatic.getPubCount(profileId);
  console.log(pubCount2.toNumber())
  await baseHub.connect(sender).mirror({
    profileId: profileId,
    profileIdPointed: profileIdPointed,
    pubIdPointed: pubId,
    referenceModuleData: referenceModuleData,
    referenceModule: referenceModule,
    referenceModuleInitData: referenceModuleInitdata,
  },{gasLimit: 2400000});
  const pubCount2Last = await baseHub.callStatic.getPubCount(profileId)
  console.log(pubCount2Last.toNumber())
}
mirror(user2, 2, 1, 1, [], ZERO_ADDRESS, []);
