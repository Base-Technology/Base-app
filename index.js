/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { queryIdentity } from "./database/identity";
import { login } from "./mail/service";
import { queryProfile } from './database/profile';

// AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerRunnable(appName, async initialProps => {
    try {
        let logined = false;
        const identity = await queryIdentity();
        if (identity) {
            try {
                await login(identity.mail, identity.password);
                logined = true;
            } catch (err) { }
        }

        let hasWallet = false;
        try {
            const profile = await queryProfile();
            console.log(99999999999,profile)
            if (profile) {
                hasWallet = true;
            }
        } catch (err) { }

        AppRegistry.registerComponent(appName, () => App(logined, hasWallet));
        AppRegistry.runApplication(appName, initialProps);
    } catch (err) {
        console.log(err);
    }
});