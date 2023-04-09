import { queryPrivateKeyByProfileID } from '../database/profile';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import SDK from './sdk';

export default class IMTP {

    static sdk;

    static getInstance() {
        return new IMTP();
    }

    async connect() {
        if (!IMTP.sdk) {
            IMTP.sdk = new SDK();

            const profile = await queryPrivateKeyByProfileID();
            // console.log(profile.private_key);
            const wallet = new ethers.Wallet(profile.private_key);
            const signature = await wallet.signMessage("hello");
            console.log(signature);
            const config = {
                apiServer: "http://64.227.99.190:10002",
                wsServer: "ws://64.227.99.190:10001",
                appServer: "http://64.227.99.190:8001",
                loginParams: {
                    signature: signature,
                    senderAddress: wallet.address,
                    network: 1
                }
            }
            try {
                const resLog = await IMTP.sdk.login(config);
                console.log(`resLog: ${resLog}`);
            } catch (err) {
                console.log(err);
            }
            // const conList = await IMTP.im.listAllConversation();
            // console.log(`conList: ${conList}`);
        }
    }

    async test() {
        if (!IMTP.sdk) {
            return;
        }
        try {
            await IMTP.sdk.getLoginStatus();
        } catch (err) {
            console.log(err);
        }
    }


}