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
              <Text style={{ fontSize: 18 }}>Invite a friend</Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <View style={{ borderRadius: 100, width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' }}>
              <ShareIcon width={30} height={30} fill="#fff" />
            </View>
            <Text style={{ textAlign: 'center' }}>Share</Text>
          </View>
          <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <View style={{ borderRadius: 100, width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' }}>
              <CopyIcon width={30} height={30} fill="#fff" />
            </View>
            <Text style={{ textAlign: 'center' }}>Copy Link</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'rgba(0,0,0,1)',alignItems:'center',paddingHorizontal:10,paddingVertical:5,marginVertical:10,marginBottom:20,borderRadius:5}}>
          <TextInput style={{flex:1,padding:0,color:'#fff'}} placeholderTextColor="#8c8c8c" placeholder={'Invite friends to '+props.route?.params?.name||'group'}/>
          <SearchIcon width={20} height={20} fill="#fff"/>
        </View>
        <ScrollView>
          <Member headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/7a64f78816510860e1462b508c1891fc.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/2883b71aef9b35cd9e4748ded58be03e.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
          <Member headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
        </ScrollView>
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