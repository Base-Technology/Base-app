import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableHighlight, Button,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'KangShuiYue',
    content: 'Ok!',
    header:'ks.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Doctor',
    content: '....',
    header:'https://cdn.cdnjson.com/wx1.sinaimg.cn/large/87c01ec7gy1fsnqqz23ikj21kw0w0dxd.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'John',
    content: 'no',
    header:'https://cdn.cdnjson.com/wx1.sinaimg.cn/large/87c01ec7gy1fsnqr1d4ezj21kw0w0wwx.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'HeeJu',
    content: 'TouchableHighlight',
    header:'https://cdn.cdnjson.com/wx3.sinaimg.cn/large/87c01ec7gy1fsnqqtg5n9j21kw0w04et.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Mark',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header:'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/0072Vf1pgy1fodqnpms36j31hc0u0b2a.jpg'
  },
];
const Stack = createNativeStackNavigator();
const Item = ({ name, content, navigation,header }) => {
  return (
    <TouchableHighlight
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => navigation.navigate('Doctor')}
    >
      <View style={styles.item}>
        <View style={styles.itemc}>
          <View style={{ width: 50, height: 50, borderRadius: 40, backgroundColor: 'gray', marginRight: 10 }}>
          {name=="KangShuiYue"&&<Image
                style={{ width: 50, height: 50, borderRadius: 100, }}
                source={require('../../assets/ks.jpg')}
              />||<Image
              style={{ width: 50, height: 50, borderRadius: 100, }}
              source={{uri:header}}
            />}
          </View>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
          {/* <View style={{backgroundColor:'#fff',height:20,minWidth:20,borderRadius:100,marginRight:10}}>
            <Text style={{textAlign:'center'}}>3</Text>
          </View> */}
          <Text style={styles.time}>9:08</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const Chat = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item navigation={navigation} {...item} />
  );

  return (
    <SafeAreaView style={styles.container}>
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
    flexDirection: 'row'
  },
  title: {
    // fontSize: 32,
    color: '#fff'
  },
  content: {
    color: 'rgba(255,255,255,0.6)'
  },
  time: {
    color: '#fff',
    fontSize: 12
  }
});

export default Chat;