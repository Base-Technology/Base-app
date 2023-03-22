import * as React from 'react';
import { View, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";
import { Popover, Button, MenuItem, Tooltip } from '@ui-kitten/components';

import { BaseText as Text } from "../../components/Base";
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


import { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import Drawer from '../../components/BaseDrawer';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';

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
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          <View style={{marginLeft:10, width: 0, height: 0, borderColor: 'rgba(0,0,0,0)', borderWidth: 10, borderLeftColor: 'rgba(0,0,0,0)', borderRightColor: 'rgba(0,0,0,0)', borderBottomColor: 'rgba(0,0,0,0)', borderTopColor: 'rgba(255,255,255,0.1)' }}></View>
        </View>
      </View>


    </Popover>

  </View>
}
const ItemMessage = React.memo(MessageItem);
function MessageList(props) {
  const [value, onChangeText] = React.useState('');

  const [messages, changeMessages] = React.useState(undefined);

  if (!messages) {
    queryMessage((msgs) => {
      changeMessages(msgs);
    });
  }
  const renderPlacementItem = (title) => (
    <Text>ddd</Text>
  );


  return <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ padding: 10 }}
      >
        {messages && messages.map((msg, index) => {
          return (<ItemMessage msg={msg} index={index} key={index} {...props} />)
        }
        )}
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </View>

    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', padding: 10 }}>
      <VoiceIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <SmileIcon style={{}} width={30} height={30} fill="rgba(255,255,255,0.7)" />

      </View>
      {
        value != "" && <Button
          title="Send"
          color="#422DDD"
          onPress={() => {
            addMessage({ content: value }, (msg) => {
              messages.push(msg);
              changeMessages(messages);
              onChangeText('');
            });
          }}
        /> ||
        <MoreIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />

      }

      {/*  */}

    </View>
  </View>
    ;
}


// Drawer组件

const ChatDetail = (props) => {

  const [state, setState] = React.useState({
    drawerOpen: false,
    drawerDisabled: false,
    active: false,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  // const renderToggleButton = () => (
  //   

  // );
  const renderToggleButton = () => <TouchableWithoutFeedback
    onPress={() => setVisible(true)}>
    <View><MoreVerIcon width={25} height={25} fill='#fff' /></View>
  </TouchableWithoutFeedback>;
  const MenuItemCustom = ({ title, children }) => <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
    {children}
    <Text>{title}</Text>
  </View>
  return (
    <View style={{ ...styles.container, backgroundColor: '#1e1e1e' }}>
      <View style={{ position: 'relative' }}>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate(props.route.params.type != 2 && 'DetailGroup' || 'Personal', props.route.params)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <View>
                <TouchableWithoutFeedback
                  onPress={() => props.navigation.goBack()}
                >
                  <BackIcon width={25} height={25} fill="#fff" />
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 100, }}
                  source={{ uri: props.route.params.header }}
                />
                <View style={{ marginLeft: 5 }}>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{props.route.params.name} {props.route.params.type != 2 && 'Official Group'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontSize: 8, }}>$999 <Text style={{ fontSize: 8, }}>Treasury</Text></Text>
                    <Text style={{ marginLeft: 5, color: '#fff', fontSize: 8, }}>34 <Text style={{ fontSize: 8, }}>Members</Text></Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingRight: 10 }}>
              <TouchableWithoutFeedback onPress={() => function () { }}>
                <SearchIcon width={25} height={25} fill='#fff' style={{ marginRight: 10 }} />
              </TouchableWithoutFeedback>
              <Popover
                anchor={renderToggleButton}
                visible={visible}
                selectedIndex={selectedIndex}
                onSelect={onItemSelect}
                onBackdropPress={() => setVisible(false)}
                style={{ backgroundColor: '#1e1e1e', width: 150 }}
              >
                {/* Manage Group (群主/管理员可见)
                  Create Token  (群主/管理员可见)
                  Create Airdrop  (群主/管理员)
                  Mute Notification/ Unmute (普通用户可见)
                  Leave Group (普通用户可见) */}
                <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 5 }}>
                  <MenuItemCustom title="Invite">
                    <InviteIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                  <MenuItemCustom title="Manage Group">
                    <ManageIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                  <MenuItemCustom title="Create Token">
                    <TokenIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                  <MenuItemCustom title="Create Airdrop">
                    <AirdropIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                  <MenuItemCustom title="Mute Notification">
                    <NotificationsIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                  <MenuItemCustom title="Leave Group">
                    <LeaveIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
                  </MenuItemCustom>
                </View>
                {/* <MenuItem style={{backgroundColor:'rgba(255,255,255,0.1)'}} title='Manage Group' />
                <MenuItem title='Create Token' />
                <MenuItem title='Create Airdrop' />
                <MenuItem title='Mute Notification/ Unmute' />
                <MenuItem title='Leave Group' /> */}
              </Popover>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: -2.5, right: 0, left: 0 }}>
                            <View style={{ height: 5, width: 100, borderRadius: 100, marginTop: 5, backgroundColor: state.active && '#422ddd' || '#2D2D34' }}>

                            </View>
                        </View> */}
      </View>
      <View style={{ flex: 1 }}>
        <MessageList {...props} key="s1" />
      </View>


    </View>

  );

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