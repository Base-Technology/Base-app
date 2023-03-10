import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchIcon from "../../assets/icon_search.svg";

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
    name: 'Only',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/only.png'
  }
];
const Stack = createNativeStackNavigator();
const Item = ({ name, content, navigation, header }) => {
  return (
    <TouchableWithoutFeedback
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => navigation.navigate('Doctor', { name, header })}
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