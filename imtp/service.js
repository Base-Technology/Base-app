import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
import axios from 'axios';
import OpenIMSDKRN, { OpenIMEmitter } from 'open-im-sdk-rn';
import RNFS, { stat } from 'react-native-fs';
import { addMessage, queryLastMessage } from '../database/message';
import { queryProfileByID } from '../database/profile';

export default class IMTP {

    static instance;

    static getInstance() {
        if (!IMTP.instance) {
            IMTP.instance = new IMTP();
        }
        return IMTP.instance;
    }

    async init() {
        if (!this.initCompleted) {
            this.initCompleted = true;
            this.profile = await queryProfileByID();
            const wallet = new ethers.Wallet(this.profile.private_key);
            const signature = await wallet.signMessage("hello");
            this.config = {
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
                await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/tmp');
                const options = {
                    platform: 5,
                    api_addr: this.config.apiServer,
                    ws_addr: this.config.wsServer,
                    data_dir: RNFS.DocumentDirectoryPath + '/tmp',
                    log_level: 6,
                    object_storage: 'cos',
                };
                const data = await OpenIMSDKRN.initSDK(options, this.uuid());
                console.log(data);
                OpenIMEmitter.addListener('onRecvNewMessage', (v) => {
                    this.onRecvNewMessage(v);
                });
                await this.loadHistoryMessage();
            } catch (e) {
                this.initCompleted = false;
                console.log(e);
            }
        }
    }

    async login() {
        if (!this.initCompleted) {
            await this.init();
        }

        try {
            let status = await OpenIMSDKRN.getLoginStatus();
            console.log(`login status: ${status}`);
            if (status != 101) {
                const resLog = await axios.post(this.config.appServer + "/api/v1/login", this.config.loginParams);
                const token = resLog.data.token;
                const userID = resLog.data.userID;
                this.userID = userID;
                this.token = token;
                console.log(userID);
                await OpenIMSDKRN.login(userID, token, this.uuid());
                status = await OpenIMSDKRN.getLoginStatus();
                console.log(`login status: ${status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getProfile() {
        try {
            await this.login();
            return this.profile;
        } catch (e) {
            console.log(e);
        }
    }

    async sendMessage(message, callback) {
        try {
            await this.login();
            const recvProfile = await queryProfileByID(message.profile_id);
            const textMessage = await OpenIMSDKRN.createTextMessage(message.content, this.uuid());
            const offlinePushInfo = {
                title: 'you have a new message',
                desc: '',
                ex: '',
                iOSPushSound: '',
                iOSBadgeCount: true
            }
            const sendMessage = await OpenIMSDKRN.sendMessage(
                textMessage,
                `01_1_${recvProfile.address.toLowerCase()}`,
                '',
                offlinePushInfo,
                this.uuid(),
            );
            const msg = JSON.parse(sendMessage);
            const dbMessage = {
                id: msg.clientMsgID,
                state: 0,
                timestamp: msg.createTime,
                profile_id: '0x123',
                is_send: 1,
                content: msg.content,
            };
            await addMessage(dbMessage, callback);
        } catch (e) {
            console.log(e);
        }
    }

    async loadHistoryMessage() {
        try {
            await this.login();
            const lastMessage = await queryLastMessage();
            const options = {
                groupID: '',
                startClientMsgID: lastMessage.id,
                count: 10,
                userID: `01_1_${this.profile.address.toLowerCase()}`,
                conversationID: "",
            }
            const data = await OpenIMSDKRN.getHistoryMessageListReverse(options, this.uuid());
            const msgs = JSON.parse(data);
            for (let i = 0; i < msgs.length; i++) {
                const msg = msgs[i];
                await this.handleMessage(msg);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async handleMessage(msg) {
        try {
            const message = {
                id: msg.clientMsgID,
                state: 0,
                timestamp: msg.createTime,
                profile_id: '0x123',
                is_send: 0,
                content: msg.content,
            };
            await addMessage(message);
        } catch (e) {
            console.log(e);
        }
    }

    async onRecvNewMessage(v) {
        console.log('rec new msg:::');
        try {
            const msg = JSON.parse(v.data);
            await this.handleMessage(msg);
        } catch (e) {
            console.log(e);
        }
    }

    uuid() {
        return (Math.random() * 36).toString(36).slice(2) + new Date().getTime().toString();
    }

}