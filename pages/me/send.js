import React, { useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  TextInput,
  Image
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppBar } from '@react-native-material/core';
import { IconButton } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal';
import { TokenList } from '../../constants/token_list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SendIcon from '../../assets/icon_send.svg';
import ReceiveIcon from '../../assets/icon_receive.svg';
import SwapIcon from '../../assets/icon_swap.svg';
import MoreIcon from '../../assets/icon_more.svg';
import MoreVertIcon from '../../assets/icon_more_vert.svg';

const Send = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 20
    }
  });

  // Card for assets list
  const AssetBox = ({ logoSrc, tokenName }) => {
    const styles = StyleSheet.create({
      assetContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 5,

      },
      leftLogoPart: {
        flex: 0.2,
        flexWrap: 'wrap',
      },
      leftNamePart: {
        flex: 0.8,
        justifyContent: 'flex-start',
        color: 'white'
      },
      rightAssetPart: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: 'white'
      },
    });
    return (
      <View style={styles.assetContainer}>
        <View style={styles.leftLogoPart}>
          <SvgUri width="26" height="26" uri={logoSrc} />
        </View>
        <View style={styles.leftNamePart}>
          <Text style={{ color: '#ffffff' }}>{tokenName}</Text>
        </View>
        <View style={{ ...styles.rightAssetPart, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ alignSelf: 'flex-end', color: '#ffffff' }}>0.25</Text>
          <Text style={{ color: '#ffffff' }}></Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <AppBar
        title="Wallet"
      /> */}
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: '#ffffff' }}

        defaultValue="Recipient's address"
      />
      <Text style={{ marginTop: 20, color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Recents</Text>
      <TouchableWithoutFeedback
        underlayColor="rgba(255, 255, 255, 0.08)"
        onPress={() => function () { }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ backgroundColor: 'gray', width: 50, height: 50, borderRadius: 100 }}></View>
          <Text style={{ color: '#fff', marginLeft: 30 }}>0x818D...18B7</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        underlayColor="rgba(255, 255, 255, 0.08)"
            onPress={() => function () { }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ backgroundColor: 'gray', width: 50, height: 50, borderRadius: 100 }}></View>
          <Text style={{ color: '#fff', marginLeft: 30 }}>0x818D...18B7</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
};

export default Send;


