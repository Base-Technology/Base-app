import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TouchableHighlight,
  View,
  TextInput,
  Image,
  ImageBackground,
  Button,
  Dimensions
} from 'react-native';
import Bg from './Bg';
import MoreIcon from '../../assets/icon_moredown.svg';
import RefreshIcon from '../../assets/icon_refresh.svg';
import AddIcon from '../../assets/icon_plus.svg';
import { Layout, ViewPager, Icon } from '@ui-kitten/components';
import Text from "./BaseText";
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar' />
);

const InfoF = () => (
  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View>
        <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{  }}>Our song</Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)',fontSize:8 }}>20w member</Text>
      </View>
    </View>
    <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
      <Text> Join</Text>
    </View>

  </View>
)
const ViewPagerSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Layout
        level='1'
        style={{ backgroundColor: '#rgba(0,0,0,0)', overflow: 'hidden' }}
      >
        <Bg  img={require('../../assets/img/s1.png')}/>

        <View style={styles.container}>
          <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
            <Image resizeMode="contain" width={100} height={100}
              // source={require('../../assets/img/s1.png')}
              source={require('../../assets/img/s1.png')}

            />
          </View>
          <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
          </View>
          <View style={{ margin: 15, marginTop: -5,marginBottom:5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{  fontSize: 18}}>Base Group</Text>

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
        <Bg  img={require('../../assets/img/s3.png')}/>

        <View style={styles.container}>
          <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
            <Image resizeMode="contain" width={100} height={100}
              // source={require('../../assets/img/s1.png')}
              source={require('../../assets/img/s3.png')}

            />
          </View>
          <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
          </View>
          <View style={{ margin: 15, marginTop: -5,marginBottom:5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{  fontSize: 18}}>Base Group</Text>

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
        <Bg img={require('../../assets/img/s4.png')}/>

        <View style={styles.container}>
          <View style={{ height: 110, position: 'relative', overflow: 'hidden' }}>
            <Image resizeMode="contain" width={100} height={100}
              // source={require('../../assets/img/s1.png')}
              source={require('../../assets/img/s4.png')}

            />
          </View>
          <View style={{ marginTop: -30, marginLeft: 15, backgroundColor: '#1e1e1e', width: 60, borderRadius: 100, padding: 5 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
          </View>
          <View style={{ margin: 15, marginTop: -5,marginBottom:5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{  fontSize: 18}}>Base Group</Text>

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
    </ViewPager>
  );
};
const HomeScreen = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [value, onChangeText] = React.useState('Details');
  const Info = () => (

    <View style={{ marginTop: 10 }}>
      <TouchableHighlight onPress={() => navigation.navigate('Details')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image style={{ width: 50, height: 50, borderRadius: 500 }} source={{ uri: 'https://cdn.cdnjson.com/wx4.sinaimg.cn/large/87c01ec7gy1fsnqquzufwj21kw0w0aqq.jpg' }} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{  }}>Our song</Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8 }}>20w members</Text>
          </View>

        </View>
      </TouchableHighlight>

    </View >
  )
  return (<View>
    <View style={{ margin: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: '#ffffff', borderRadius: 50 }}
          onChangeText={text => onChangeText(text)}
          defaultValue=""
        /> */}
      <View style={{ width: 20 }}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', marginRight: 10  }}>Follw</Text>
        <Text style={{ borderBottomWidth: 2, borderBottomColor: '#422DDD' }}>Group</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 10 }}>People</Text>
      </View>
      <Icon
        style={styles.icon}
        fill='#8F9BB3'
        name='search-outline'
      />
    </View>

    <ScrollView
      contentContainerStyle={{ minHeight: '85%' }}
    >
      <View style={{ margin: 20, overflow: 'hidden', borderRadius: 5, marginTop: 10 }}>
        <ViewPagerSimpleUsageShowcase />
      </View>
      <View style={{ margin: 20, marginTop: 0,marginBottom:0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingLeft:10,paddingRight:10  }}>
          <Text style={{ color: '#ffffff', fontSize: 16 }}>Active</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RefreshIcon width={20} height={20} fill="#fff" />

          </View>

        </View>
        <View style={{ flexDirection: 'row',padding:10 }}>
          <View style={{ flex: 1 }}>
            <Info />
            <Info />
            <Info />
          </View>
          <View style={{ flex: 1 }}>
            <Info />
            <Info />
            <Info />
          </View>
        </View>

      </View>
      <View style={{ margin: 20 }}>
        <View style={{ padding: 10, borderRadius: 50 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ color: '#ffffff', fontSize: 14,  backgroundColor: 'gray', borderRadius: 50, padding: 2, paddingLeft: 10, paddingRight: 10 }}>DeFi</Text>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MoreIcon width={20} height={20} fill="#fff" />

            </View>

          </View>

          <InfoF />
          <InfoF />
          <InfoF />
          <InfoF />
          <InfoF />
        </View>
      </View>
      <View style={{ margin: 20, padding: 10, marginTop: 10 }}>
        <View>
          <Text style={{ color: '#ffffff', fontSize: 16,  marginBottom: 10 }}>Guessg You Like</Text>
        </View>
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
        <InfoF />
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
});
export default HomeScreen;