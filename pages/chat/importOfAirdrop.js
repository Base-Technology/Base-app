import * as React from 'react';
import { View, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";
import { Popover, Button, MenuItem, Tooltip } from '@ui-kitten/components';
import ShareIcon from '../../assets/icon_share.svg';
import CopyIcon from '../../assets/icon_copy.svg';
import SearchIcon from '../../assets/icon_search.svg';

import { BaseHeadInfo, BaseText as Text } from "../../components/Base";

import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import Drawer from '../../components/BaseDrawer';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';



const Member = ({ headuri }) => (
  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <BaseHeadInfo headuri={headuri} name="Enjin" />
    </View>
    <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
      <Text>Invite</Text>
    </View>

  </View>
)
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
  return (
    <View style={{ ...styles.container, backgroundColor: '#1e1e1e' }}>
      <View style={{ position: 'relative' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <View>
              <TouchableWithoutFeedback
                onPress={() => props.navigation.goBack()}
              >
                <BackIcon width={25} height={25} fill="#fff" />
              </TouchableWithoutFeedback>
            </View>
            <Text style={{ fontSize: 18 }}>Import</Text>
          </View>

        </View>
      </View>
      <View style={{ justifyContent: 'space-between', flex: 1, padding: 10 }}>
        <View style={{  backgroundColor: 'rgba(0,0,0,1)', paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, marginBottom: 20, borderRadius: 5,flex:1 }}>
          <TextInput multiline   numberOfLines={4} style={{ padding: 0, color: '#fff' }} placeholderTextColor="#8c8c8c" placeholder={'Token Name'} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{ backgroundColor: '#422DDD', padding: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Upload</Text>
          </View>
          <View style={{ backgroundColor: '#422DDD', padding: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Save</Text>
          </View>
        </View>

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