import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchIcon from "../../assets/icon_search.svg";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Fox',
    content: 'Ok!',
    header: require('../../assets/fox.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Ox',
    content: '....',
    header: require('../../assets/ox.png')

  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Send',
    content: 'no',
    header: require('../../assets/send.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Keep',
    content: 'TouchableWithoutFeedback',
    header: require('../../assets/keep.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Hayek',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: require('../../assets/hayek.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'KangShuiYue',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: require('../../assets/ks.jpg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Yk',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: require('../../assets/yk.jpg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Mark',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: require('../../assets/mark.jpg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Gary',
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: require('../../assets/gary.jpg')
  },
];
const Stack = createNativeStackNavigator();
const Item = ({ name, content, navigation, header }) => {
  return (
    <TouchableWithoutFeedback
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => navigation.navigate(name == 'Yk' && 'Yk' || 'Doctor')}
    >
      <View style={styles.item}>
        <View style={styles.itemc}>
          <View style={{ width: 50, height: 50, borderRadius: 40, backgroundColor: 'gray', marginRight: 10 }}>
            {name == "KangShuiYue" && <Image
              style={{ width: 50, height: 50, borderRadius: 100, }}
              source={require('../../assets/ks.jpg')}
            /> || <Image
                style={{ width: 50, height: 50, borderRadius: 100, }}
                source={header}
              />}
          </View>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.content}>{content}</Text>
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
    <Item navigation={navigation} {...item} />
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
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
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