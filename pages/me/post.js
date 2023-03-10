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
} from 'react-native';
import ShareIcon from "../../assets/icon_share.svg";

import Text from "../../components/BaseText";
const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);


  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    list: {
      display: "flex",

      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginVertical: 3,
      marginHorizontal: 3

    },
    item: {
      flex: 1,
      overflow: 'hidden',
      marginHorizontal: 3,
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
              <Text style={{ fontSize: 14 }}>Base Wallet Base Wallet</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  resizeMode="cover"
                  style={{ borderRadius: 20, width: 20, height: 20, marginRight: 10 }}
                  source={{uri:'https://bf.jdd001.top/s1.png'}}
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
    <View style={styles.mainContainer}>
      <View style={styles.list}>
        <Item header={{uri:'https://bf.jdd001.top/s3.png'}} />
        <Item header={{uri:'https://bf.jdd001.top/s4.png'}} />
      </View>
      <View style={styles.list}>
        <Item header={{uri:'https://bf.jdd001.top/s5.png'}} />
        <Item header={{uri:'https://bf.jdd001.top/s1.png'}} />
      </View>
      <View style={styles.list}>
        <Item header={{uri:'https://bf.jdd001.top/s3.png'}} />
        <Item header={{uri:'https://bf.jdd001.top/s4.png'}} />
      </View>
      <View style={styles.list}>
        <Item header={{uri:'https://bf.jdd001.top/s5.png'}} />
        <Item header={{uri:'https://bf.jdd001.top/s1.png'}} />
      </View>

    </View>
  );
};

export default WalletMain;
