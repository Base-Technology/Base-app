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
// import {userPrivateKsy} from "../../constants/test_account";



export const FactoryABI = require('../../abis/Factory.json');
const ethers = require("ethers");
const ETH_TOKEN = ethers.constants.AddressZero;
const ZERO_BYTES = "0x";


async function getContract(_provider, _contractAddress, _contractABI) {
    let Contract = new ethers.Contract(
        _contractAddress,
        _contractABI,
        _provider
    );
    return Contract;
}

async function getSignerContract(_Contract, _privateKey, _provider) {
    const signer = new ethers.Wallet(_privateKey, _provider);
    ContractWithSigner = _Contract.connect(signer);
    return ContractWithSigner;
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

async function signMessage(_message, _signer) {

    console.log(`Message: ${_message} annnnd signer: ${_signer}`);
    // const sig = await web3.eth.sign(_message, _signer);
    const sig = await _signer.signMessage(_message);
    let v = parseInt(sig.substring(130, 132), 16);
    if (v < 27) v += 27;
    const normalizedSig = `${sig.substring(0, 130)}${v.toString(16)}`;
    console.log("normalizedSig: " + normalizedSig);
    return normalizedSig;
}

export async function addManager_Factory() {
    const FactoryContract = await getContract(testBSCprovider, FactoryAddress, FactoryABI);
    const FactoryContractWithSigner = await getSignerContract(FactoryContract, ownerPrivateKey, testBSCprovider);
    const e = await FactoryContractWithSigner.addManager(accountAddress);
    console.log("e", e);
}


export async function createWallet_ver2(_userWallet, _provider, _FactoryContract, _Modules) {
    let newUserAddress;
    const userAddr = _userWallet.address;
    const salt = ethers.utils.hexZeroPad(
        ethers.BigNumber.from(ethers.utils.randomBytes(20)).toHexString(),
        20
    );
    try {
        newUserAddress = await _FactoryContract.getAddressForCounterfactualWallet(
            accountAddress,
            testModules,
            salt,
            { gasLimit: 8000000, gasPrice: 1000000000 }
        );
        console.log("newUserAddress address: " + newUserAddress);
    } catch (e) {
        console.log("WHY error ??????????????????");
        console.log(e);
    }
    const refundAmount = 1000000000000000;
    // const refundAmount = 0;

    const ownerSig = await signRefund(
        newUserAddress,
        refundAmount,
        ETH_TOKEN,
        _userWallet
    );

    const msg = ethers.utils.hexZeroPad(newUserAddress, 32);
    const managerSig = await signMessage(msg, _userWallet);

    const receipts = await _userWallet.sendTransaction({
        to: newUserAddress,
        value: refundAmount,
        gasLimit: 8000000,
        gasPrice: 1000000000,
    });
    console.log("Send Transaction receipt: " + receipts);
    try {
        // const tx = await FactoryContract.createCounterfactualWallet(owner, modules, salt,  refundAmount, ETH_TOKEN, ownerSig, "0x")
        const tx = await _FactoryContract.createCounterfactualWallet(
            userAddr,
            _Modules,
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

}
export async function createWallet_test_ver2() {
    const FactoryContract = await getContract(testBSCprovider, FactoryAddress, FactoryABI);
    const FactoryContractWithSigner = await getSignerContract(FactoryContract, accPrivateKey, testBSCprovider);
    const SignerWallet = new ethers.Wallet(accPrivateKey, testBSCprovider);
    createWallet_ver2(SignerWallet, testBSCprovider, FactoryContractWithSigner, testModules);
}
export async function createEOA_test() {
    var privateKey = ethers.utils.randomBytes(32);
    var wallet = new ethers.Wallet(privateKey);
    // console.log("addr: " + wallet.address);
    let keyNumber = BigNumber.from(privateKey);
    // console.log("pk:", keyNumber._hex);
    return keyNumber._hex;
}
