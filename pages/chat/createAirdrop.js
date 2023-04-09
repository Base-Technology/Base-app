import * as React from 'react';
import { View, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";
import { CheckBox } from '@ui-kitten/components';
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
const CreateAirdrop = (props) => {

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
  const Member = ({ headuri }) => {
    const [checked, setChecked] = React.useState(false);
    return <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BaseHeadInfo headuri={headuri} name="Enjin" />
      </View>
      <CheckBox
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}>
      </CheckBox>

    </View>
  }
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
            <Text style={{ fontSize: 18 }}>Create Airdrop</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,1)', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, marginBottom: 20, borderRadius: 5 }}>
            <Text>Average Tokens</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, overflow: 'hidden' }}>
              <TextInput style={{ flex: 1, padding: 0, color: '#fff', marginRight: 5, paddingHorizontal: 10, textAlign: 'right' }} placeholderTextColor="#8c8c8c" placeholder={'0.00'} />
              <Text>Base</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('ImportOfAirdrop')}
            >
              <View style={{ backgroundColor: '#422DDD', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50, marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>Import</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>
        <View style={{ flex: 1 }}>
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

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,1)', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, overflow: 'hidden' }}>
              <Text>Total</Text>
              <TextInput style={{ flex: 1, padding: 0, color: '#fff', marginRight: 5, paddingHorizontal: 10, textAlign: 'right' }} placeholderTextColor="#8c8c8c" placeholder={'0.00'} />

            </View>
          </View>
          <View style={{ backgroundColor: '#422DDD', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50, marginLeft: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Create</Text>
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

export default CreateAirdrop;