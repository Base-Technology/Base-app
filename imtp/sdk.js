import axios from 'axios';
import OpenIMSDKRN, { OpenIMEmitter } from 'open-im-sdk-rn';
import RNFS from 'react-native-fs';

export default class SDK {
    constructor() {
        this.appServer = "";
        this.token = "";
        this.uid = "";
        this.wayId = {
            type: -1,
            network: "",
            address: ""
        };
    }

    uuid() {
        return (Math.random() * 36).toString(36).slice(2) + new Date().getTime().toString();
    }

    async login(config) {
        this.appServer = config.appServer;
        try {
            const resLog = await axios.post(this.appServer + "/api/v1/login", config.loginParams);

            const token = resLog.data.token;
            const userID = resLog.data.userID;
            this.uid = userID;
            this.token = token;
            await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/tmp');
            const options = {
                platform: 5,
                api_addr: config.apiServer,
                ws_addr: config.wsServer,
                data_dir: RNFS.DocumentDirectoryPath + '/tmp',
                log_level: 6,
                object_storage: 'cos',
            };
            const data = await OpenIMSDKRN.initSDK(options, this.uuid());
            console.log(data);
            const loginData = await OpenIMSDKRN.login(userID, token, this.uuid());
            console.log(loginData);
            const getLoginStatus = await OpenIMSDKRN.getLoginStatus();
            console.log(getLoginStatus);
        } catch (e) {
            throw e;
        }
    }

    async getLoginStatus() {
        const getLoginStatus = await OpenIMSDKRN.getLoginStatus();
        console.log(getLoginStatus);
    }
}
