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

async function follow(sender, target, data){
    if (target.length != data.length){
        console.log('target.length != data.length')
        return false
    }
    let name
    for (i = 0; i < target.length; i++){
        name = await baseHub.callStatic.getHandle(target[i])
        if(name == ''){
            console.log('one of targer is not profile')
            return false
        }
    }
    await baseHub.connect(sender).follow(target, data)
}
follow(user2,[1], [[]])
