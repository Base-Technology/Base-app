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

async function comment(
  sender,
  profileId,
  contentURI,
  profileIdPointed,
  pubId,
  referenceModuleData,
  collectModule,
  collectModuleData,
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
  if (name == '') {
    console.log('targer is not profile');
    return false;
  }
  const pubCount = await baseHub.callStatic.getPubCount(profileIdPointed);
  console.log(pubCount.toNumber())
  if (pubCount < pubId) {
    console.log('is not publication of profile');
    return false;
  }
  await baseHub.connect(sender).comment({
    profileId: profileId,
    contentURI: contentURI,
    profileIdPointed: profileIdPointed,
    pubIdPointed: pubId,
    referenceModuleData: referenceModuleData,
    collectModule: collectModule,
    collectModuleInitData: collectModuleData,
    referenceModule: referenceModule,
    referenceModuleInitData: referenceModuleInitdata,
  },{gasLimit: 2400000});
}
comment(user2, 2, MOCK_URI, 1, 1, [], '0xfD36b22d723440b8101eec58Dfdbae57FCe3891B', abiCoder.encode(['bool'], [true]), ZERO_ADDRESS, []);
