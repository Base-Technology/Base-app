import * as React from 'react';
import { View, Button, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";

import { BaseText as Text } from "../../components/Base";
import MoreIcon from '../../assets/icon_more.svg';
import SmileIcon from '../../assets/icon_smile.svg';
import VoiceIcon from '../../assets/icon_voice.svg';
import DoneIcon from '../../assets/icon_doneall.svg';
import { Component } from 'react';
import Me from '../me/group';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
// import Drawer from '../../components/BaseDrawer';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';
// Drawer组件

class ChatDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            active: false,
        };
    }

    render() {
        return (
            <View style={{ ...styles.container, backgroundColor: '#1e1e1e' }}>
                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.goBack()}
                >
                    <BackIcon style={{position:'absolute',zIndex:1,margin:10}} width={25} height={25} fill="#fff" />
                </TouchableWithoutFeedback>
                <Me key="s2" {...this.props} />
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e1e1e',
        flex: 1,
    },
});

export default ChatDetail;


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import PagerView from 'react-native-pager-view';

// const MyPager = () => {
//   return (
//     <PagerView style={styles.pagerView} initialPage={0}>
//       <View key="1">
//         <Text>First page</Text>
//       </View>
//       <View key="2">
//         <Text>Second page</Text>
//       </View>
//     </PagerView>
//   );
// };

// const styles = StyleSheet.create({
//   pagerView: {
//     flex: 1,
//   },
// });