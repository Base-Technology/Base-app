import React, { Component, useRef, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    View,
    TextInput,
    Image,
    Dimensions,
    Button,
} from 'react-native';
import { BaseText as Text } from "../../components/Base";

import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";
import { Popover, MenuItem, Tooltip } from '@ui-kitten/components';

import BasePopup from "../../components/BasePopup";

import MoreIcon from '../../assets/icon_more.svg';
import SmileIcon from '../../assets/icon_smile.svg';
import VoiceIcon from '../../assets/icon_voice.svg';
import DoneIcon from '../../assets/icon_doneall.svg';
import MoreVerIcon from '../../assets/icon_more_ver.svg';
import SearchIcon from '../../assets/icon_search.svg';
import InviteIcon from '../../assets/icon_person_add.svg';
import ManageIcon from '../../assets/icon_manage_accounts.svg';
import TokenIcon from '../../assets/icon_currency_bitcoin.svg';
import AirdropIcon from '../../assets/icon_airdrop.svg';
import NotificationsIcon from '../../assets/icon_notifications.svg';
import LeaveIcon from '../../assets/icon_logout.svg';
import ReplyIcon from '../../assets/icon_reply.svg';
import EditIcon from '../../assets/icon_edit.svg';
import CopyIcon from '../../assets/icon_copy.svg';
import ForwardIcon from '../../assets/icon_forward.svg';
import DeleteIcon from '../../assets/icon_delete.svg';
import SelectIcon from '../../assets/icon_select.svg';
import GroupIcon from '../../assets/icon_group.svg';
import ArrowRightIcon from '../../assets/icon_arrow_right.svg';
import GroupTypeIcon from '../../assets/icon_group_type.svg';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';
import IMTP from '../../imtp/service';
import Member from "../me/members";
import Drawer from './Drawer'

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
// Drawer组件
function MessageItem(props) {
    const { msg, index } = props;
    const [visible, setVisible] = React.useState(false);
    const RenderToggleButton = () => (
        <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: msg.is_send == 0 ? 'flex-start' : 'flex-end', marginBottom: 10 }}>
            {props.route.params.type != 2 && msg.is_send == 0 && (
                <View>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100, }}
                        source={Math.random() > 0.5 && require('../../assets/yk.jpg') || require('../../assets/mark.jpg')}
                    />
                </View>) ||
                (props.route.params.type != 2 && <View style={{ width: 40, height: 40 }}>
                </View>)
            }
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: msg.is_send == 0 && 'flex-start' || 'flex-end' }}>
                <View>
                    <View style={{
                        padding: 10,
                        backgroundColor: msg.is_send == 0 ? 'rgba(255,255,255,0.1)' : '#422DDD',
                        marginLeft: props.route.params.type != 2 ? 20 : 0,
                        borderRadius: msg.content.length > 70 ? 10 : 100,
                        borderBottomLeftRadius: msg.is_send == 0 ? 0 : undefined,
                        borderBottomRightRadius: msg.is_send == 0 ? undefined : 0,
                    }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>{msg.content}</Text>
                    </View>
                    {msg.is_send == 0 && (<Text style={{ paddingHorizontal: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>{moment.unix(msg.timestamp / 1000).format('HH:mm')}</Text>)}
                    {msg.is_send == 1 && (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{moment.unix(msg.timestamp / 1000).format('HH:mm')}</Text>
                                <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
                            </View>
                        </View>)}
                </View>

            </View>
        </View>
    );
    const rtb = () => (
        <TouchableWithoutFeedback
            onPress={() => setVisible(true)}>
            <View>
                <RenderToggleButton />

            </View>
        </TouchableWithoutFeedback>
    )
    return <View>
        <Popover
            anchor={rtb}
            visible={visible}
            placement="top"
            onBackdropPress={() => setVisible(false)}
            style={{ backgroundColor: '#1e1e1e', width: 250, borderWidth: 0 }}
        >
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 5, padding: 5 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <ReplyIcon width={25} height={25} fill="#fff" />
                        <Text>Reply</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <EditIcon width={25} height={25} fill="#fff" />
                        <Text>Edit</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <CopyIcon width={25} height={25} fill="#fff" />
                        <Text>Copy</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <ForwardIcon width={25} height={25} fill="#fff" />
                        <Text>Forward</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <DeleteIcon width={25} height={25} fill="#fff" />
                        <Text>Delete</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <SelectIcon width={25} height={25} fill="#fff" />
                        <Text>Select</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <View style={{ marginLeft: 10, width: 0, height: 0, borderColor: 'rgba(0,0,0,0)', borderWidth: 10, borderLeftColor: 'rgba(0,0,0,0)', borderRightColor: 'rgba(0,0,0,0)', borderBottomColor: 'rgba(0,0,0,0)', borderTopColor: 'rgba(255,255,255,0.1)' }}></View>
                </View>
            </View>


        </Popover>

    </View>
}
const ItemMessage = React.memo(MessageItem);

const ContactSearch = (props) => {

    const _drawer = useRef(null);
    const [visible, setVisible] = React.useState(false);
    const [state, setState] = useState({
        drawerOpen: false,
        drawerDisabled: false,
    })
    closeDrawer = () => {
        _drawer.current && _drawer.current.close()
    };
    openDrawer = () => {
        _drawer.current && _drawer.current.open()
    };

    return (
        <View>
            <View style={{ position: 'relative', backgroundColor: '#1e1e1e' }}>
                {/* <TouchableWithoutFeedback onPress={() => props.navigation.navigate(props.route.params.type != 2 && 'DetailGroup' || 'Personal', props.route.params)}> */}
                <View
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}

                >
                    <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <View>
                            <TouchableWithoutFeedback
                                onPress={() => props.navigation.goBack()}
                            >
                                <BackIcon width={25} height={25} fill="#fff" />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ padding: 5, borderRadius: 3, flex: 1 }}>
                            <TextInput style={{ padding: 0, color: '#fff' }} placeholderTextColor="#8c8c8c" placeholder={'Search'} />
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <Member />
                </ScrollView>
                {/* </TouchableWithoutFeedback> */}
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 20,
        flex: 1,
    },
});

export default ContactSearch;