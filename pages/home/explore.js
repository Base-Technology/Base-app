import React, { useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  TextInput,
  Image,
  View,
  RefreshControl
} from 'react-native';
import ShareIcon from "../../assets/icon_share.svg";

import Text from "../../components/BaseText";
import { useQuery, gql } from '@apollo/client';
import { string } from 'prop-types';
const GET_DATA = gql`{profile(id: "1") {
  imageURI,
}
}`
const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [data, setData] = useState([{
    header: 'https://bf.jdd001.top/s5.png',
    image: 'https://bf.jdd001.top/s1.png',
    title:"Base Wallet Base Wallet"
  },
  {
    header: 'https://bf.jdd001.top/s4.png',
    image: 'https://bf.jdd001.top/s1.png',
    title:"Base Wallet Base Wallet"
  },
  {
    header: 'https://bf.jdd001.top/s3.png',
    image: 'https://bf.jdd001.top/s1.png',
    title:"Base Wallet Base Wallet"
  }]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { loading, error, qdata } = useQuery(GET_DATA);
    console.log(loading, error, qdata)
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    wait(2000).then(() => {
      setRefreshing(false);
      setData(data => {
        let newData = [{
          header: 'https://bf.jdd001.top/s5.png',
          image: 'https://bf.jdd001.top/s1.png',
          title:"Base Wallet Base Wallet"
        },...data];
        return newData;
      })
    });

  }, []);
  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    list: {
      display: "flex",
      margin:3,
      flexDirection: 'row',
    },
    left: { flex: 1 },
    right: { flex: 1 },
    item: {
      overflow: 'hidden',
      marginHorizontal: 3,
      marginVertical: 3,
      borderRadius: 5,
      backgroundColor: 'rgba(255,255,255,0.03)',
    }
  });
  const Item = (props) => {
    return (
      <View style={styles.item}>
        <View>
          <Image
            resizeMode="cover"
            style={{ borderRadius: 5, width: '100%', height: 230 }}
            source={props.header}
          />
          <View style={{ padding: 5 }}>
            <View>
              <Text style={{ fontSize: 14 }}>"Base Wallet Base Wallet"</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  style={{ borderRadius: 20, width: 20, height: 20, marginRight: 10 }}
                  source={props.image}
                />
                <Text>Dodo</Text>
              </View>
              <View>
                <ShareIcon width={23} height={23} fill="gray" />
              </View>
            </View>

          </View>
        </View>
      </View>
    )
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#422ddd"]} />
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.list}>
          <View style={styles.left}>
            {
              data.map((item,index)=>{
                return index%2==0&& <Item key={1+index} header={{uri:item.header}} image={{uri:item.image}}/>
              })
            }
          </View>
          <View style={styles.right}>
          {
              data.map((item,index)=>{
                return index%2!=0&& <Item key={2+index} header={{uri:item.header}} image={{uri:item.image}}/>||<></>
              })
            }
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
};

export default React.memo(WalletMain);
