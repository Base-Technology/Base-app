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

const MOCK_URI = 'https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const abiCoder = ethers.utils.defaultAbiCoder;
console.log(abiCoder.encode(['bool'], [true]))

async function post(sender,profileId, contentURI,collectModule,collectModuleData,referenceModule,referenceModuleData){
     const owner = await baseHub.callStatic.ownerOf(profileId)
     if(owner != sender.address){
        console.log("is not owner")
        return false
     }
     await baseHub.connect(sender).post({profileId:profileId,contentURI:contentURI,collectModule:collectModule,collectModuleInitData:collectModuleData,referenceModule:referenceModule,referenceModuleInitData:referenceModuleData})
}
