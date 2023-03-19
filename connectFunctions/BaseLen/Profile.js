const ethers = require('ethers')
const Provider = require('@ethersproject/providers')
const getRevertReason = require('eth-revert-reason')

const BaseHubABI = require('../../abis/BaseHub.json')
const ProxyABI = require('../../abis/proxy.json')

const MOCK_PROFILE_URI =
  'https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu'
const MOCK_FOLLOW_NFT_URI =
  'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const provider = new Provider.JsonRpcProvider("https://bsc-testnet.public.blastapi.io")

const baseHubContractAddress = '0x5DB56cF6a8c8B3Fe1e54322486D51eb7e5172547'
const baseHub = new ethers.Contract(baseHubContractAddress,BaseHubABI,provider)
const profileCreationProxyAddr = '0xc0DB0dF843f9A653055FBD38E883023174a2033e'
const profileCreationProxy = new ethers.Contract(profileCreationProxyAddr,ProxyABI,provider)


const deployerPrivateKey = '352d015325df5f9dd435db2571e1d9d4fc502655c17625832ea1deb59dd7149b'
const deployer = new ethers.Wallet(deployerPrivateKey,provider)
const governancePrivateKey = '79120ab1ab7b17265e3b842df127420d6068bc532d9b47eeb383b87f95a2e578'
const governance = new ethers.Wallet(governancePrivateKey,provider)
const userPrivateKey = '5259cd35a7e523e6aa29cab7dcbb73ce331bdc0676b76f95883543c703938cca'
const user = new ethers.Wallet(userPrivateKey,provider)
const user2PrivateKey = '7d734643e5f3b678011f6b89f8640c6e35d7bbb50d017722ed9ced64b8ca3ec9'
const user2 = new ethers.Wallet(user2PrivateKey,provider)

// const baseHub = baseHubContract.connent(signer)

async function createProfileByProxy(addrTo,handle,imageURI,followModuleAddr,followModuleData,followNFTURI){
    console.log("=============== create profile ==================")
    // await baseHub.connect(governance).setState(ProtocolState.Unpaused,{gasLimit: 2400000})
    const tx = await profileCreationProxy.connect(deployer).proxyCreateProfile({
        to: addrTo,
        handle: handle,
        imageURI: imageURI,
        followModule: followModuleAddr,
        followModuleInitData: followModuleData,
        followNFTURI: followNFTURI,
      },{gasLimit: 2400000})
      console.log(tx)
    console.log("finish create profile")
    return true
}
createProfileByProxy(governance.address,'governance',MOCK_PROFILE_URI,ZERO_ADDRESS,[],MOCK_FOLLOW_NFT_URI)
// async function setFollowModule(user, profileId,followModuleAddress,followModuleData){
//   const profileOwner = await baseHub.callStatic.ownerOf(profileId)
//   if( profileOwner != user.address){
//     console.log("!profile owner")
//     return false
// }
  // await baseHub.connect(user).callStatic.setFollowModule(profileId,followModuleAddress,followModuleData)
// }
// setFollowModule(user,1,"0xf627DfF7b57Eb2b5800B15c8F0c4E73229540D46",[])
