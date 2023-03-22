// 创建钱包
// 设置modules
// 生成私钥
// 可以和login合并

const ethers = require('ethers')
const Provider = require('@ethersproject/providers')
const getRevertReason = require('eth-revert-reason')

const FactoryABI = require('../../abis/Factory.json')

const owner = "0x3a790b0D5F04B13970E1CA37F8da2249dd9f5974";
const account = "0x624b8A9dCFEbdC65DF072eD2d17db4b5dDCd0F7f";
const modules = ["0xb993087909e2Da66191c307b3A01B6889890CF00"];
const ownerPrivateKey =
    "377e9f7384cf3063b37ec202b5a367df811d01ca36bad75824e0d0bfcbc257df";
const accPrivateKey =
    "e7135257b1b0061097560b5770edfaa22fdf43e552027f875334dcf6a6807957";

const ownerAccount = await web3.eth.accounts.privateKeyToAccount(
    "0x" + ownerPrivateKey
);

let FactoryContract;
let FactoryContractWithSigner;

const providerBSC = new JsonRpcProvider(
    "https://bsc-testnet.public.blastapi.io",
    97
  );

async function signMessage(message, signer) {
    console.log(`Message: ${message} annnnd signer: ${signer}`);
    const sig = await web3.eth.sign(message, signer);
    let v = parseInt(sig.substring(130, 132), 16);
    if (v < 27) v += 27;
    const normalizedSig = `${sig.substring(0, 130)}${v.toString(16)}`;
    console.log("normalizedSig: " + normalizedSig);
    return normalizedSig;
}

const getSignerContract = () => { // useEffect
    FactoryContract = getContract(
      "0x3a9A86Ff94Cd9cDdE7268F3199938aDBA4990ab6",
      FactoryABI,
      providerBSC
    );
    const signer = new ethers.Wallet(ownerPrivateKey, providerBSC);
    // let signer = provider.getSigner()
    console.log(ownerPrivateKey.length);
    console.log(signer);
    FactoryContractWithSigner = FactoryContract.connect(signer);
  };

  async function createWallet(_ownerPrivateKey,_accPrivateKey, _FactoryContractWithSigner){
    console.log("testttttt");
    let futureAddr;
    const salt = ethers.utils.hexZeroPad(
      ethers.BigNumber.from(ethers.utils.randomBytes(20)).toHexString(),
      20
    );
    await web3.eth.accounts.wallet.add(_ownerPrivateKey);
    await web3.eth.accounts.wallet.add(_accPrivateKey);
    await _FactoryContractWithSigner.addManager(account);
    try {
      futureAddr = await FactoryContract.getAddressForCounterfactualWallet(
        owner,
        modules,
        salt,
        { from: owner, gasLimit: 8000000, gasPrice: 1000000000 }
      );
      setAddressStored(futureAddr);
      console.log("Future address: " + futureAddr);
    } catch (e) {
      console.log(e);
    }
    const ownerSig = await signRefund(
      futureAddr,
      refundAmount,
      ETH_TOKEN,
      owner
    );
    const msg = ethers.utils.hexZeroPad(futureAddr, 32);
    const managerSig = await signMessage(msg, account);

    const receipts = await web3.eth.sendTransaction({
      from: owner,
      to: futureAddr,
      value: refundAmount,
      gasLimit: 8000000,
      gasPrice: 1000000000,
    });
    console.log("Send Transaction receipt: " + receipts);
    try {
      // const tx = await FactoryContract.createCounterfactualWallet(owner, modules, salt,  refundAmount, ETH_TOKEN, ownerSig, "0x")
      const tx = await FactoryContractWithSigner.createCounterfactualWallet(
        owner,
        modules,
        salt,
        refundAmount,
        ETH_TOKEN,
        ownerSig,
        managerSig,
        { gasLimit: 8000000, gasPrice: 10000000000 }
      );
      console.log(`Success: ${tx} `);
    } catch (e) {
      console.log(e);
    }
  };
