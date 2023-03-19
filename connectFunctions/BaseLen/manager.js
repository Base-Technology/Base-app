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

async function setState(sender, state){
    const governance = await baseHub.callstatic.getGovernance()
    if(governance != sender.addess)
    await baseHub.connect(sender).setState(state,{gasLimit: 2400000})
    return true
}
