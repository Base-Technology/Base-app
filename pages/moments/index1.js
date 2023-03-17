import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import Drawer from 'react-native-drawer'
import Nee from './index0';

import { DrawerMenu } from "../../components/BaseDrawer";

// Drawer组件
import ControlPanel from './ControlPanel';

class Moments1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
        };
    }

    closeDrawer = () => {
        this._drawer.close()
    };
    openDrawer = () => {
        this._drawer.open()
    };

    render() {
        return (
            <DrawerMenu
            visible={visible}
            hideModal={hideModal}
            menuPosition="left"
            Height={"70%"}
           >
           <View>
           //抽屉内容样式
           </View>
           </DrawerMenu>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        flex: 1,
    },
});

export default Moments1;