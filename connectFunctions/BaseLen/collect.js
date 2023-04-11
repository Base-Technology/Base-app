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

// const baseHub = baseHubContract.connent(signer)

async function collect(sender, profileId,pubId, data){
    const name = await baseHub.callStatic.getHandle(profileId)
    if(name == ''){
        console.log('targer is not profile')
        return false
    }
    const owner = await baseHub.callStatic.ownerOf(profileId)
    if(owner != sender.address){
        console.log("is not owner")
        return false
     }
    const pubCount = await baseHub.callStatic.getPubCount(profileId)
    if(pubCount < pubId){
        console.log("is not publication of profile")
        return false
    }
console.log(111)
    await baseHub.connect(sender).collect(profileId,pubId, data)
}
console.log(BaseHubABI)
// collect(user2,1,1,[])
