// 创建钱包
// 设置modules
// 生成私钥
// 可以和login合并
// contract address
import "react-native-get-random-values";
import "@ethersproject/shims";
import "@sotatek-anhdao/react-native-secure-random";

import { FactoryAddress } from "../../constants/contract_address";
// test import
import { testBSCprovider } from "../../constants/test-provider";
import { ownerAddress, ownerPrivateKey, accPrivateKey, accountAddress, testModules } from "../../constants/test_account";



export const FactoryABI = require('../../abis/Factory.json');
const ethers = require("ethers");
const ETH_TOKEN = ethers.constants.AddressZero;
const ZERO_BYTES = "0x";

let FactoryContract;
let FactoryContractWithSigner;

async function getSignerContract(_provider, _privateKey, _contractAddress, _contractABI) {
    console.log("WHY 0 ??????????????????")
    let Contract = new ethers.Contract(
        _contractAddress,
        _contractABI,
        _provider
    );
    console.log("WHY 1 ??????????????????")
    const signer = new ethers.Wallet(_privateKey, _provider);
    // let signer = provider.getSigner()
    console.log(_privateKey.length);
    console.log(signer);
    ContractWithSigner = Contract.connect(signer);
    return ContractWithSigner, Contract;
};

async function signRefund(_wallet, _amount, _token, _signer) {
    const message = `0x${[
        _wallet,
        ethers.utils.hexZeroPad(ethers.utils.hexlify(_amount), 32),
        _token,
    ]
        .map((hex) => hex.slice(2))
        .join("")}`;
    const sig = await signMessage(ethers.utils.keccak256(message), _signer);
    return sig;
}

// async function signMessage(_message, _signer) {
//     console.log(`Message: ${_message} annnnd signer: ${_signer}`);
//     const sig = await web3.eth.sign(_message, _signer);
//     let v = parseInt(sig.substring(130, 132), 16);
//     if (v < 27) v += 27;
//     const normalizedSig = `${sig.substring(0, 130)}${v.toString(16)}`;
//     console.log("normalizedSig: " + normalizedSig);
//     return normalizedSig;
// }


export async function createWallet_test() {
    let newUserAddress;
    const salt = ethers.utils.hexZeroPad(
        ethers.BigNumber.from(ethers.utils.randomBytes(20)).toHexString(),
        20
    );
    console.log("WHY -1 ??????????????????")
    FactoryContractWithSigner, FactoryContract = await getSignerContract(testBSCprovider, ownerPrivateKey, FactoryAddress, FactoryABI);
    console.log("WHY??????????????????")

    // new ethers.Wallet(ownerPrivateKey, testBSCprovider);
    // new ethers.Wallet(accPrivateKey, testBSCprovider);

    // await web3.eth.accounts.wallet.add(ownerPrivateKey);
    // await web3.eth.accounts.wallet.add(accPrivateKey);
    await FactoryContractWithSigner.addManager(accountAddress);

    try {
        newUserAddress = await FactoryContract.getAddressForCounterfactualWallet(
            ownerAddress,
            testModules,
            salt,
            { from: ownerAddress, gasLimit: 8000000, gasPrice: 1000000000 }
        );
        console.log("newUserAddress address: " + newUserAddress);
    } catch (e) {
        console.log("WHY error ??????????????????");
        console.log(e);
    }
    // const refundAmount =1000000000000000;
    const refundAmount = 0;

    const ownerSig = await signRefund(
        newUserAddress,
        refundAmount,
        ETH_TOKEN,
        ownerAddress
    );

    const msg = ethers.utils.hexZeroPad(newUserAddress, 32);
    const managerSig = await signMessage(msg, accountAddress);

    // const receipts = await web3.eth.sendTransaction({
    //     from: ownerAddress,
    //     to: newUserAddress,
    //     value: refundAmount,
    //     gasLimit: 8000000,
    //     gasPrice: 1000000000,
    // });
    // console.log("Send Transaction receipt: " + receipts);
    // try {
    //     // const tx = await FactoryContract.createCounterfactualWallet(owner, modules, salt,  refundAmount, ETH_TOKEN, ownerSig, "0x")
    //     const tx = await FactoryContractWithSigner.createCounterfactualWallet(
    //         ownerAddress,
    //         testModules,
    //         salt,
    //         refundAmount,
    //         ETH_TOKEN,
    //         ownerSig,
    //         managerSig,
    //         { gasLimit: 8000000, gasPrice: 10000000000 }
    //     );
    //     console.log(`Success: ${tx} `);
    // } catch (e) {
    //     console.log(e);
    // }
}

export async function createEOA_test() {
    var privateKey = ethers.utils.randomBytes(32);
    var wallet = new ethers.Wallet(privateKey);
    console.log("addr: " + wallet.address);
    let keyNumber = BigNumber.from(privateKey);
    console.log("pk:", keyNumber._hex);
    return keyNumber._hex;
}


