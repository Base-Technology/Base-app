const ethers = require('ethers')
const Provider = require('@ethersproject/providers')
const getRevertReason = require('eth-revert-reason')

const BaseHubABI = require('../../abis/BaseHub.json')

const provider = new Provider.JsonRpcProvider("https://bsc-testnet.public.blastapi.io")

const baseHubContractAddress = '0x5DB56cF6a8c8B3Fe1e54322486D51eb7e5172547'
const baseHub = new ethers.Contract(baseHubContractAddress,BaseHubABI,provider)

const deployerPrivateKey = '352d015325df5f9dd435db2571e1d9d4fc502655c17625832ea1deb59dd7149b'
const deployer = new ethers.Wallet(deployerPrivateKey,provider)
const governancePrivateKey = '79120ab1ab7b17265e3b842df127420d6068bc532d9b47eeb383b87f95a2e578'
const governance = new ethers.Wallet(governancePrivateKey,provider)
const userPrivateKey = '5259cd35a7e523e6aa29cab7dcbb73ce331bdc0676b76f95883543c703938cca'
const user = new ethers.Wallet(userPrivateKey,provider)
const user2PrivateKey = '7d734643e5f3b678011f6b89f8640c6e35d7bbb50d017722ed9ced64b8ca3ec9'
const user2 = new ethers.Wallet(user2PrivateKey,provider)

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
