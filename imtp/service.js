import { WaySDK } from "@way-network/way-im";
import { queryPrivateKeyByProfileID } from '../database/profile';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';

export default class IMTP {

    static im;

    static getInstance() {
        return new IMTP();
    }

    async connect() {
        if (!IMTP.im) {
            IMTP.im = new WaySDK();
        }

        const profile = await queryPrivateKeyByProfileID();
        // console.log(profile.private_key);
        const wallet = new ethers.Wallet(profile.private_key);
        const signature = await wallet.signMessage("hello");
        console.log(signature);
        const config = {
            msgServer: "ws://64.227.99.190:10003", //im-server url
            appServer: "http://64.227.99.190:8001", //way-im-server url
            loginParams: {
                signature: signature,
                senderAddress: wallet.address, //wallet address
                network: 1
            }
        }
        try {
            const resLog = await IMTP.im.loginWay(config);
            console.log(`resLog: ${resLog}`);
        } catch (err) {
            console.log(err);
        }
        // const conList = await IMTP.im.listAllConversation();
        // console.log(`conList: ${conList}`);
    }


}