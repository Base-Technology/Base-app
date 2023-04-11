const ethers = require('ethers')
import {testBSCprovider} from "../../constants/test-provider";
import  { baseHubContractAddress,profileCreationProxyAddr,walletContractAddress } from "../../constants/contract_address"
import { deployerPrivateKey,governancePrivateKey,userPrivateKey,user2PrivateKey } from "../../constants/test_account"
const BaseWalletABI = require('../../abis/BaseWallet.json')
const ProxyABI = require('../../abis/proxy.json')

const Wallet = new ethers.Contract(walletContractAddress,BaseWalletABI,testBSCprovider)

const MOCK_PROFILE_URI =
  'https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu'
const MOCK_FOLLOW_NFT_URI =
  'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const profileCreationProxy = new ethers.Contract(profileCreationProxyAddr,ProxyABI,testBSCprovider)
const user = new ethers.Wallet(userPrivateKey,testBSCprovider)
// async function createProfileByProxy(sender,handle,imageURI,followModuleAddr,followModuleData,followNFTURI){
export async function createProfileByProxy(){
  const sender = user
  const handle = 'test1profile'
  const imageURI = MOCK_PROFILE_URI
  const followModuleAddr = ZERO_ADDRESS
  const followModuleData = []
  const followNFTURI = MOCK_FOLLOW_NFT_URI  
  console.log("=============== create profile ==================")
    // await baseHub.connect(governance).setState(ProtocolState.Unpaused,{gasLimit: 2400000})
    const wallet = Wallet.attach("0x51ff771bD01838A38785dA21028Af562ecE48741")

    const methodData = profileCreationProxy.interface.encodeFunctionData("proxyCreateProfile",[{
      to: sender.address,
      handle: handle,
      imageURI: imageURI,
      followModule: followModuleAddr,
      followModuleInitData: followModuleData,
      followNFTURI: followNFTURI,
}])
    // console.log(methodData)
    // const tx = await profileCreationProxy.connect(deployer).proxyCreateProfile({
    //     to: addrTo,
    //     handle: handle,
    //     imageURI: imageURI,
    //     followModule: followModuleAddr,
    //     followModuleInitData: followModuleData,
    //     followNFTURI: followNFTURI,
    //   },{gasLimit: 2400000})
    const singWallet = await wallet.connect(sender)

    const tx = await singWallet.addOwner(user.address)
    // const tx = await singWallet.execute(profileCreationProxyAddr,methodData)
    // console.log(tx)
    console.log("finish create profile")
    return true
}
// createProfileByProxy()
createProfileByProxy(user,'governance',MOCK_PROFILE_URI,ZERO_ADDRESS,[],MOCK_FOLLOW_NFT_URI)
