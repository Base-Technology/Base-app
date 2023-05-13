import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar, IndexPath, Layout, Popover, Select, SelectItem } from '@ui-kitten/components';
import Explore from "../home/explore";

import { Tooltip, Button } from '@ui-kitten/components';
import AddIcon from "../../assets/icon_create.svg";
import AddGroupIcon from "../../assets/icon_group_add.svg";
import HomeIcon from '../../assets/icon_home';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import CreateIcon from '../../assets/icon_add_photo.svg';


import SearchIcon from '../../assets/icon_search.svg';
import InviteIcon from '../../assets/icon_person_add.svg';

import Text from "../../components/BaseText";
import BasePopup from "../../components/BasePopup";
import { useQuery, gql } from '@apollo/client';
import { string } from 'prop-types';

const GET_DATA = gql`
{
  profile(id: "1") {
    followingCount
  }
}
`;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
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
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba611',
    name: 'Tom',
    type: 2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/only.png'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6111',
    name: 'Austin',
    type: 2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/Austin.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba611133',
    name: 'HeeJu',
    type: 2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/HeeJu.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6222',
    name: 'JoyJY',
    type: 2,
    content: 'https://akveo.github.io/react-native-ui-kitten',
    header: 'https://bf.jdd001.top/cryptologos/JoyJY.jpg'
  }
];
const Stack = createNativeStackNavigator();
const Item = ({ name, content, navigation, header, type, onShowInfo }) => {

  return (
    <TouchableWithoutFeedback
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => navigation.navigate('Doctor', { name, header, type })}
    >
      <View style={styles.item}>


        <View style={styles.itemc}>
          <TouchableWithoutFeedback
            underlayColor="rgba(255, 255, 255, 0.08)"
            onPress={() => onShowInfo && onShowInfo({ name, header })}
          >
            <View style={{ width: 50, height: 50, borderRadius: 40, backgroundColor: 'gray', marginRight: 10 }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 100, }}
                source={{ uri: header }}
              />

            </View>
          </TouchableWithoutFeedback>
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
const placements = [
  'top',
  'top start',
  'top end',
  'bottom',
  'bottom start',
  'bottom end',
  'left',
  'left start',
  'left end',
  'right',
  'right start',
  'right end',
];
const Chat = ({ navigation }) => {
  // const get = () => {
  console.log(1111111111111111111)
  const { loading, error, data } = useQuery(GET_DATA);
  console.log(loading, error, data)
  // }
  // React.useEffect(() => {
  //   get();
  // }, []);
  const renderItem = ({ item }) => (
    <Item onShowInfo={(head) => { setVisibleInfo(true); setCurrentInfo(head) }} key={item.id + 1} navigation={navigation} {...item} />
  );
  const [visible, setVisible] = React.useState(false);
  const [visibleInfo, setVisibleInfo] = React.useState(false);
  const [currentInfo, setCurrentInfo] = React.useState()
  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(4));
  const placement = placements[placementIndex.row];

  const MenuItemCustomFrist = ({ title, children }) => <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 3, paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', }}>
      <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
        {children}
      </View>
      <Text style={{ fontSize: 14 }}>{title}</Text>
    </View>

  </View>
  const renderToggleButton = () => (
    <TouchableWithoutFeedback
      onPress={() => setVisible(true)}>
      <View>
        <AddIcon width={25} height={25} fill="#fff" />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, }}>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <View style={{ position: 'relative' }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Base</Text>
          <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ContactSearch')}>
              <SearchIcon style={{ marginRight: 10 }} width={30} height={30} fill="#fff" />
            </TouchableWithoutFeedback>
            <Popover
              anchor={renderToggleButton}
              visible={visible}
              placement={placement}
              onBackdropPress={() => setVisible(false)}
              style={{ backgroundColor: '#1e1e1e', borderWidth: 0 }}

            >
              <View>


                <View>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('CreateGroup')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
                        <AddGroupIcon width={25} height={25} fill="#fff" />

                      </View>
                      <Text>Create Group</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('CreateChat')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 5 }}>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
                        <AddGroupIcon width={25} height={25} fill="#fff" />

                      </View>
                      <Text>New Chat</Text>
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </Popover>
          </View>

        </View>
        {/* <View style={{ backgroundColor: 'black', marginTop: 10, padding: 5, borderRadius: 3 }}>
          <TextInput style={{ padding: 0, color: '#fff' }} placeholderTextColor="#8c8c8c" placeholder={'Search'} />
        </View> */}

      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <HomeIcon width={30} height={30} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <ChatFullIcon width={30} height={30} fill={"#fff"} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
          <CreateIcon width={30} height={30} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Moment')}>
          <MomentIcon width={30} height={30} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
          <MeIcon width={30} height={30} fill={"#fff"} />
        </TouchableWithoutFeedback>
      </View>
      <BasePopup
        visible={visibleInfo}
        onCancel={() => setVisibleInfo(false)}
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
                  source={{ uri: currentInfo?.header }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>{currentInfo?.name}</Text>

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
        <Explore />
      </BasePopup>
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