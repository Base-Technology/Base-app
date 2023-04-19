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
import Group from "../me/group";
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
function MessageList(props) {
  const [value, onChangeText] = React.useState('');

  const [messages, changeMessages] = React.useState(undefined);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    // const scrollViewHeight = scrollViewRef.current?.layoutMeasurement.height;
    // if (scrollViewHeight && contentHeight > scrollViewHeight) {
      scrollToBottom();
    // }
  };
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
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleContentSizeChange}
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
            IMTP.getInstance().sendMessage({
              profile_id: '0x2',
              content: value,
            }, (msg) => {
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
const Moments = (props) => {

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
  const MenuItemCustom = ({ title, children }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
        {children}
      </View>
      <Text style={{ fontSize: 14 }}>{title}</Text>
    </View>
    <View>
      <ArrowRightIcon width={25} height={25} fill="#fff" />
    </View>
  </View>
  const MenuItemCustomFrist = ({ title, children }) => <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', }}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
        {children}
      </View>
      <Text style={{ fontSize: 14 }}>{title}</Text>
    </View>

  </View>
  return (
    <Drawer
      ref={_drawer}
      // open={true}
      side="top"
      // type: 一共是3种（displace,overlay,static）, 用static就好啦，static让人感觉更舒适一些
      type="static"
      // Drawer 展开区域组件
      content={<Group />}
      // 响应区域双击可以打开抽屉
      acceptDoubleTap
      // styles 和 tweenHandler是设置向左拉后主内容区的颜色，相当于给主内容区加了一个遮罩
      styles={{
        mainOverlay: {
          backgroundColor: 'black',
          opacity: 0,
        },
      }}
      tweenHandler={(ratio) => ({
        mainOverlay: {
          opacity: ratio / 2,
        }
      })}
      // drawer打开后调用的函数
      onOpen={() => {
        setState({ drawerOpen: true });
      }}
      // drawer关闭后调用的函数
      onClose={() => {
        setState({ drawerOpen: false });
      }}

      captureGestures={false}
      // 打开/关闭 Drawer所需要的时间
      tweenDuration={100}
      // 触发抽屉打开/关闭必须经过的屏幕宽度比例
      panThreshold={0.08}
      disabled={state.drawerDisabled}
      // Drawer打开后有边界距离屏幕右边界的距离
      openDrawerOffset={(viewport) => {
        return 0;
      }}
      // 拉开抽屉的响应区域
      panOpenMask={0.2}
      // 如果为true, 则尝试仅处理水平滑动
      negotiatePan
    >
      {/*主内容区*/}
      <View style={{ position: 'relative', backgroundColor: '#1e1e1e' }}>
        {/* <TouchableWithoutFeedback onPress={() => props.navigation.navigate(props.route.params.type != 2 && 'DetailGroup' || 'Personal', props.route.params)}> */}
        <View
          style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          }}

        >
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
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(true);
              }}>
              <View><MoreVerIcon width={25} height={25} fill='#fff' /></View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </View>
      <View style={{ flex: 1, backgroundColor: '#1e1e1e' }}>
        <MessageList {...props} key="s1" />
      </View>
      <BasePopup
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', width: dw, top: -10 }}>
          <View style={{ width: 70, height: 3, backgroundColor: '#fff', borderRadius: 10 }}>

          </View>
        </View>
        <View style={{ position: 'relative', overflow: 'hidden' }}>
          <View style={{ margin: 20, marginTop: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 50, height: 50, borderRadius: 40, marginRight: 10 }}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 100, }}
                  source={{ uri: props.route.params.header }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>{props.route.params.name}</Text>

                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
                    <Text style={{ textAlign: 'center' }}>
                      @dodo.base
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
                    <Text style={{ textAlign: 'center', padding: 0 }}>
                      0xebaD...89e1
                    </Text>
                  </View>
                </View>

              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 20, marginTop: 0 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 5, marginRight: 15, fontSize: 16, color: '#fff' }}>$999 <Text>Treasury</Text></Text>
              <Text style={{ marginLeft: 5, fontSize: 16, color: '#fff' }}>34 <Text>Members</Text></Text>
            </View>

            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Invite')}>
              <View>
                <MenuItemCustomFrist title="Invite">
                  <InviteIcon width={25} height={25} fill="#fff" style={{ marginRight: 5 }} />
                </MenuItemCustomFrist>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <MenuItemCustom title="Search">
          <SearchIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('CreateToken')}>
          <View>
            <MenuItemCustom title="Create Token">
              <TokenIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
            </MenuItemCustom>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('CreateAirdrop')}>
          <View>
            <MenuItemCustom title="Create Airdrop">
              <AirdropIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
            </MenuItemCustom>
          </View>
        </TouchableWithoutFeedback>
        <MenuItemCustom title="Administrators">
          <ManageIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
        <MenuItemCustom title="Members">
          <GroupIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
        <MenuItemCustom title="Mute Notification">
          <NotificationsIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
        <MenuItemCustom title="Group Type">
          <GroupTypeIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
        <MenuItemCustom title="Leave Group">
          <LeaveIcon width={25} height={25} fill="#fff" style={{ marginRight: 10 }} />
        </MenuItemCustom>
      </BasePopup>
    </Drawer>

  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 20,
    flex: 1,
  },
});

export default Moments;