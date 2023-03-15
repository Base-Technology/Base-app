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
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import Drawer from '../../components/BaseDrawer';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';
import IMTP from '../../imtp/service';

function MessageList(props) {
  const [value, onChangeText] = React.useState('');

  const [messages, changeMessages] = React.useState(undefined);

  if (!messages) {
    queryMessage((msgs) => {
      changeMessages(msgs);
    });
  }
  IMTP.getInstance().connect();

  return <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ padding: 10 }}
      >
        {messages && messages.map((msg, index) => {
          return (
            <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: msg.is_send == 0 ? 'flex-start' : 'flex-end', marginBottom: 10 }}>
              {props.route.params.type!=2&&msg.is_send == 0 && (
                <View>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 100, }}
                    source={Math.random()>0.5&&require('../../assets/yk.jpg')||require('../../assets/mark.jpg')}
                  />
                </View>) ||
                (props.route.params.type!=2&&<View style={{ width: 40, height: 40 }}>
                </View>)
              }
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: msg.is_send == 0 && 'flex-start' || 'flex-end' }}>
                <View>
                  <View style={{
                    padding: 10,
                    backgroundColor: msg.is_send == 0 ? 'rgba(255,255,255,0.1)' : '#422DDD',
                    marginLeft: props.route.params.type!=2 ? 20 : 0,
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
          )
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
        <View style={{ position: 'relative' }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate(this.props.route.params.type!=2&&'DetailGroup'||'Personal', this.props.route.params)}>

            <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <View>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.goBack()}
                >
                  <BackIcon width={25} height={25} fill="#fff" />
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 100, }}
                  source={{ uri: this.props.route.params.header }}
                />
                <View style={{ marginLeft: 5 }}>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 16 }}>{this.props.route.params.name} {this.props.route.params.type!=2&&'Official Group'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontSize: 8, }}>$999 <Text style={{ fontSize: 8, }}>Treasury</Text></Text>
                    <Text style={{ marginLeft: 5, color: '#fff', fontSize: 8, }}>34 <Text style={{ fontSize: 8, }}>Members</Text></Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: -2.5, right: 0, left: 0 }}>
                            <View style={{ height: 5, width: 100, borderRadius: 100, marginTop: 5, backgroundColor: this.state.active && '#422ddd' || '#2D2D34' }}>

                            </View>
                        </View> */}
        </View>
        <View style={{ flex: 1 }}>
          <MessageList {...this.props} key="s1" />
        </View>


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