import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchIcon from "../../assets/icon_search.svg";
import HomeIcon from '../../assets/icon_home';
import HomeFullIcon from '../../assets/icon_homefull';
import ChatIcon from '../../assets/icon_chat.svg';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MeFullIcon from '../../assets/icon_mefull.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import MomentFullIcon from '../../assets/icon_momentfull.svg';
import CreateIcon from '../../assets/icon_create.svg';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    name: '1ich',
    content: 'Ok!',
    header: 'https://bf.jdd001.top/cryptologos/1inch.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
    name: 'Pancakeswap',
    content: '....',
    header: 'https://bf.jdd001.top/cryptologos/pancakeswap.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
    name: 'Polkadot',
    content: 'no',
    header: 'https://bf.jdd001.top/cryptologos/polkadot.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
    name: 'Solana',
    content: 'TouchableWithoutFeedback',
    header: 'https://bf.jdd001.top/cryptologos/solana.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6',
    name: 'Tom',
    type:2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/only.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6',
    name: 'Austin',
    type:2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/Austin.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6',
    name: 'HeeJu',
    type:2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/HeeJu.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6',
    name: 'JoyJY',
    type:2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/JoyJY.jpg'
  }
];
const Stack = createNativeStackNavigator();
const Item = ({ name, content, navigation, header,type }) => {
  return (
    <TouchableWithoutFeedback
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => navigation.navigate('Elon Musk', { name, header,type })}
    >
      <View style={styles.item}>
        <View style={styles.itemc}>
          <View style={{ width: 50, height: 50, borderRadius: 40, backgroundColor: 'gray', marginRight: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100, }}
              source={{ uri: header }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.content}>{content}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          {/* <View style={{backgroundColor:'#fff',height:20,minWidth:20,borderRadius:100,marginRight:10}}>
            <Text style={{textAlign:'center'}}>3</Text>
          </View> */}
          <Text style={styles.time}>9:08</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const Chat = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item key={item.id + 1} navigation={navigation} {...item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>

          <SearchIcon width={25} height={25} fill='#fff' />
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <HomeIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <ChatFullIcon width={25} height={25} fill={"#fff"} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
          <CreateIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Moment')}>
          <MomentIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
          <MeIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemc: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  title: {
    fontSize: 16,
    color: '#fff'
  },
  content: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)'
  },
  time: {
    color: '#fff',
    fontSize: 12
  }
});

export default Chat;