import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Popover } from '@ui-kitten/components';
import MoreIcon from "../../assets/icon_more_horiz.svg";
import { BaseHeadInfo, BaseText as Text } from "../../components/Base";
const onPlacementSelect = (index) => {
  setPlacementIndex(index);
};



const renderPlacementItem = (title) => (
  <SelectItem title={title} />
);
const InfoF = ({ headuri }) => {
  const [visible, setVisible] = React.useState(false);
  const renderToggleButton = () => (
    <TouchableWithoutFeedback
      onPress={() => setVisible(true)}>
      <View>
        <MoreIcon width={20} height={20} fill="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );
  return <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <BaseHeadInfo headuri={headuri} name="Enjin" />
    </View>
    <Popover
      anchor={renderToggleButton}
      visible={visible}
      placement={"bottom"}
      onBackdropPress={() => setVisible(false)}
      style={{ backgroundColor: '#1e1e1e', borderWidth: 0 }}

    >
      <View>
        <TouchableWithoutFeedback
          onPress={() => { }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
            </View>
            <Text>Remove</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => { }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
            </View>
            <Text>Set admin</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => { }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
            </View>
            <Text>Chat</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => { }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
            </View>
            <Text>Follow</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Popover>

  </View>
}
const MeScreen = ({ navigation }) => {

  return (<View>
    <ScrollView
      contentContainerStyle={{ minHeight: '85%' }}
    >
      <View style={{ margin: 20 }}>
        <View style={{ padding: 10, borderRadius: 50 }}>
          <InfoF headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/7a64f78816510860e1462b508c1891fc.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/2883b71aef9b35cd9e4748ded58be03e.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/7a64f78816510860e1462b508c1891fc.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/2883b71aef9b35cd9e4748ded58be03e.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/7a64f78816510860e1462b508c1891fc.png?auto=format&w=384" />
          <InfoF headuri="https://i.seadn.io/gcs/files/2883b71aef9b35cd9e4748ded58be03e.png?auto=format&w=384" />
        </View>
      </View>

      <View style={{ height: 100 }}></View>

    </ScrollView>

  </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 2
  },
  containers: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  tab: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 0
  }
});
export default MeScreen;