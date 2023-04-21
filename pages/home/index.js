import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  TextInput,
  Image,
  ImageBackground,
  Button,
  Dimensions,
  RefreshControl
} from 'react-native';
import Bg from './Bg';
import MoreIcon from '../../assets/icon_moredown.svg';
import RefreshIcon from '../../assets/icon_refresh.svg';
import AddIcon from '../../assets/icon_plus.svg';
import { Layout, ViewPager, Icon } from '@ui-kitten/components';
import Swiper from 'react-native-swiper'
import Text from "./BaseText";
import Explore from "./explore";
import Follow from "../moments/members";
import BaseMenu from '../../components/BaseMenu';
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar' />
);

const InfoF = ({ headuri, name }) => (
  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View>
        <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: headuri }} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{}}>{name}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8 }}>20w member</Text>
      </View>
    </View>
    <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
      <Text> Join</Text>
    </View>

  </View>
)

const HomeScreen = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [value, onChangeText] = React.useState('Details');
  const [followData, setFollowData] = useState([0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabsData, setTabsData] = useState([
    {
      active: false,
      name: 'Follow'
    },
    {
      active: false,
      name: 'Explore'
    },
    {
      active: true,
      name: 'Member'
    },
    {
      active: true,
      name: 'Group'
    }
  ]);
  const ViewPagerSimpleUsageShowcase = ({ navigation }) => {


    return (
      <Swiper
        // autoplay
        showsPagination={false}
        loop
      >
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Details2')}>

          <Layout
            level='1'
            style={{ backgroundColor: '#rgba(0,0,0,0)', overflow: 'hidden' }}
          >

            <Bg img={{ uri: 'https://cdn.cdnjson.com/wx3.sinaimg.cn/large/0060lm7Tly1ftg6omusg9j31hc0u010h.jpg' }} />

            <View style={styles.container}>
              <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
                <Image resizeMode="stretch"
                  source={{ uri: 'https://bf.jdd001.top/s1.png' }}
                // source={{uri:'https://bf.jdd001.top/s5.png'}}

                />
              </View>
              <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
                <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
              </View>
              <View style={{ margin: 15, marginTop: -5, marginBottom: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18 }}>Base Group</Text>

                  <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
                    <Text style={{ fontSize: 14 }}>Join</Text>
                  </View>
                </View>
                <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: '#422DDD' }}>

                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: 8 }}>100234  Online </Text>
                  </View>
                  <View style={{ marginLeft: 10, width: 5, height: 5, borderRadius: 50, backgroundColor: 'gray' }}>

                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: 8 }}>
                      98234 Members
                    </Text>
                  </View>

                </View>

              </View>
            </View>
          </Layout>
        </TouchableWithoutFeedback>
        <Layout
          level='1'
          style={{ backgroundColor: '#rgba(0,0,0,0)', overflow: 'hidden' }}
        >
          <Bg img={{ uri: 'https://cdn.cdnjson.com/wx3.sinaimg.cn/large/0060lm7Tly1ftg6omusg9j31hc0u010h.jpg' }} />

          <View style={styles.container}>
            <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
              <Image resizeMode="contain" width={100} height={100}
                // source={{uri:'https://bf.jdd001.top/s1.png'}}
                source={{ uri: 'https://bf.jdd001.top/s1.png' }}

              />
            </View>
            <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
            </View>
            <View style={{ margin: 15, marginTop: -5, marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Base Group</Text>

                <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
                  <Text style={{ fontSize: 14 }}>Join</Text>
                </View>
              </View>
              <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: '#422DDD' }}>

                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 8 }}>100234  Online </Text>
                </View>
                <View style={{ marginLeft: 10, width: 5, height: 5, borderRadius: 50, backgroundColor: 'gray' }}>

                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 8 }}>
                    98234 Members
                  </Text>
                </View>

              </View>

            </View>
          </View>
        </Layout>
        <Layout
          level='1'
          style={{ backgroundColor: '#rgba(0,0,0,0)', overflow: 'hidden' }}
        >
          <Bg img={{ uri: 'https://cdn.cdnjson.com/wx3.sinaimg.cn/large/0060lm7Tly1ftg6omusg9j31hc0u010h.jpg' }} />

          <View style={styles.container}>
            <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
              <Image resizeMode="contain" width={100} height={100}
                // source={{uri:'https://bf.jdd001.top/s1.png'}}
                source={{ uri: 'https://bf.jdd001.top/s1.png' }}

              />
            </View>
            <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
            </View>
            <View style={{ margin: 15, marginTop: -5, marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Base Group</Text>

                <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
                  <Text style={{ fontSize: 14 }}>Join</Text>
                </View>
              </View>
              <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: '#422DDD' }}>

                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 8 }}>100234  Online </Text>
                </View>
                <View style={{ marginLeft: 10, width: 5, height: 5, borderRadius: 50, backgroundColor: 'gray' }}>

                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 8 }}>
                    98234 Members
                  </Text>
                </View>

              </View>

            </View>
          </View>
        </Layout>
      </Swiper>
    );
  };
  const Info = ({ headuri, name }) => (

    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: headuri }} resizeMode="cover" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{}}>{name}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8 }}>20w members</Text>
        </View>

      </View>

    </View >
  )

  return (<View style={{ flex: 1 }}>
    <View style={{ margin: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: '#ffffff', borderRadius: 50 }}
          onChangeText={text => onChangeText(text)}
          defaultValue=""
        /> */}
      <View style={{ width: 20 }}></View>
      <View style={{ flexDirection: 'row' }}>
        {
          tabsData.map((item, index) =>
            <TouchableWithoutFeedback onPress={() => setSelectedIndex(index)}>

              <Text style={{ color: 'rgba(255,255,255,0.6)', marginRight: 10, borderBottomWidth: 2, borderBottomColor: index == selectedIndex && '#422DDD' || 'rgba(0,0,0,0)' }}>{item.name}</Text>
            </TouchableWithoutFeedback>
          )
        }

      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>

        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='search-outline'
        />
      </TouchableWithoutFeedback>
    </View>
    <View style={{ flex: 1 }}>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => {

          setSelectedIndex(index);

        }}
      >

        <Layout
          style={styles.tab}
          level='2'>
          <ScrollView>
            <Follow key='tab1' />
          </ScrollView>

        </Layout>
        <Layout
          style={styles.tab}
          level='2'>
          <Explore key='tab1' />
        </Layout>
        <Layout
          style={styles.tab}
          level='2'>
          <ScrollView>
            <Follow key='tab2' />
          </ScrollView>
        </Layout>
        <Layout
          style={styles.tab}
          level='2'>
          <ScrollView
            contentContainerStyle={{ minHeight: '85%' }}
          >
            <View style={{ marginVertical: 20, overflow: 'hidden', borderRadius: 5, marginTop: 10, height: 180 }}>
              <ViewPagerSimpleUsageShowcase navigation={navigation} />
            </View>
            <View style={{ marginTop: 0, marginBottom: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: '#ffffff', fontSize: 16 }}>Active</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RefreshIcon width={20} height={20} fill="#fff" />

                </View>

              </View>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 1 }}>
                  <Info headuri="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024" name="Bitcoin" />
                  <Info headuri="https://cryptologos.cc/logos/thumbs/binance-usd.png?v=023" name="Busd" />
                  <Info headuri="https://cryptologos.cc/logos/thumbs/tether.png?v=023" name="Usdt" />
                </View>
                <View style={{ flex: 1 }}>
                  <Info headuri="https://cryptologos.cc/logos/thumbs/usd-coin.png?v=023" name="Usdc" />
                  <Info headuri="https://cryptologos.cc/logos/thumbs/bnb.png?v=023" name="Bnb" />
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Doctor', { header: 'https://bf.jdd001.top/cryptologos/pancakeswap.png', name: 'Pancakeswap' })}>
                    <View>
                      <Info headuri="https://bf.jdd001.top/cryptologos/pancakeswap.png" name="Pancakeswap" />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

            </View>
            <View style={{}}>
              <View style={{ padding: 10, borderRadius: 50 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>New</Text>

                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <MoreIcon width={20} height={20} fill="#fff" /> */}

                  </View>

                </View>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
                  <InfoF headuri="https://cryptologos.cc/logos/thumbs/xrp.png?v=023" name="Xrp" />
                </TouchableWithoutFeedback>

                <InfoF headuri="https://cryptologos.cc/logos/thumbs/cardano.png?v=023" name="Cardano" />
                <InfoF headuri="https://cryptologos.cc/logos/thumbs/solana.png?v=023" name="Solana" />
                <InfoF headuri="https://cryptologos.cc/logos/thumbs/dogecoin.png?v=023" name="Doge" />
              </View>
            </View>
            <View style={{ padding: 10, marginTop: 10 }}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16, marginBottom: 10 }}>Guess You Like</Text>
              </View>
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/polkadot-new.png?v=023" name="Polkadot" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/polygon.png?v=023" name="Polygon" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/avalanche.png?v=023" name="Avalanche" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/tron.png?v=023" name="Tron" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/wrapped-bitcoin.png?v=023" name="Wrapped" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/uniswap.png?v=023" name="Uniswap" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/unus-sed-leo.png?v=023" name="Unus" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/litecoin.png?v=023" name="Lite" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/ftx-token.png?v=023" name="Ftx" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/cronos.png?v=023" name="Cronos" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/chainlink.png?v=023" name="Chainlink" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/near-protocol.png?v=023" name="Near" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/stellar.png?v=023" name="Stellar" />
              <InfoF headuri="https://cryptologos.cc/logos/thumbs/monero.png?v=023" name="Monero" />
            </View>
          </ScrollView>
        </Layout>

      </ViewPager>
    </View>

    <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
      <BaseMenu navigation={navigation} />
    </View>
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
export default HomeScreen;