import React, {useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppBar} from '@react-native-material/core';
import {IconButton} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import Modal from 'react-native-modal';
import {TokenList} from '../../constants/token_list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SendIcon from '../../assets/icon_send.svg';
import ReceiveIcon from '../../assets/icon_receive.svg';
import SwapIcon from '../../assets/icon_swap.svg';
import MoreIcon from '../../assets/icon_more.svg';
import MoreVertIcon from '../../assets/icon_more_vert.svg';

const WalletMain = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: backgroundStyle.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    balanceShow: {
      backgroundColor: backgroundStyle.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 15,
      paddingBottom: 5,
    },
    balanceSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    balanceText: {
      alignSelf: 'center',
      fontSize: 28.8,
      color: isDarkMode ? 'white' : 'black',
    },
    boxSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 35,
    },
    box: {
      paddingHorizontal: 5.5,
      paddingVertical: 5.5,
      backgroundColor: '#252928',
      height: 60,
      width: 60,
      margin: 8,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 10,
    },
    boxText: {
      color: 'white',
      fontSize: 12,
    },
    boxHorizontal: {
      height: 35,
      margin: 10,
      paddingHorizontal: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boxHorizontalText: {
      color: 'black',
      fontSize: 16,
    },
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  });

  // Card for assets list
  const AssetBox = ({logoSrc, tokenName}) => {
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
      },
      rightAssetPart: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
      },
    });
    return (
      <View style={styles.assetContainer}>
        <View style={styles.leftLogoPart}>
          <SvgUri width="26" height="26" uri={logoSrc} />
        </View>
        <View style={styles.leftNamePart}>
          <Text>{tokenName}</Text>
        </View>
        <View style={styles.rightAssetPart}>
          <Text style={{alignSelf: 'flex-end'}}>0.25</Text>
          <Text>$750.32</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <AppBar
        title="Wallet"
        leading={props => (
          <IconButton
            icon={props => <EntypoIcon name="menu" color="white" {...props} />}
            iconColor="white"
            onPress={() => {}}
          />
        )}
      /> */}
      <View style={styles.balanceShow}>
        {!isShow ? (
          <View style={styles.balanceSection}>
            <Ionicon name="ellipsis-horizontal" size={36} color="black" />
            <Ionicon name="ellipsis-horizontal" size={36} color="black" />
          </View>
        ) : (
          <Text style={styles.balanceText}>$ 0.00</Text>
        )}
        <View style={styles.balanceSection}>
          <IconButton
            icon={props => (
              <Ionicon
                name={isShow ? 'eye' : 'eye-off'}
                color="black"
                {...props}
              />
            )}
            iconColor="black"
            size={16}
            onPress={() => setisShow(!isShow)}
          />
          {isShow ? <Text>Hide Balance</Text> : <Text>Show Balance</Text>}
        </View>
      </View>
      <View style={styles.boxSection}>
        <View style={styles.box}>
          <SendIcon width="32" height="32" fill={'white'} />
          <Text style={styles.boxText}>Send</Text>
        </View>
        <View style={styles.box}>
          <ReceiveIcon width="32" height="32" fill={'white'} />
          <Text style={styles.boxText}>Receive</Text>
        </View>
        <View style={styles.box}>
          <SwapIcon width="32" height="32" fill={'white'} />
          <Text style={styles.boxText}>Swap</Text>
        </View>
        <View style={styles.box}>
          <MoreIcon width="32" height="32" fill={'white'} />
          <Text style={styles.boxText}>More</Text>
        </View>
      </View>
      <View style={styles.boxHorizontal}>
        <Text style={styles.boxHorizontalText}>Assets</Text>
        <TouchableOpacity onPress={toggleModal}>
          <MoreVertIcon width="24" height="24" fill={'black'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{minHeight: '85%'}}
        style={backgroundStyle}>
        {TokenList ? (
          TokenList.map(tokens => {
            return (
              <AssetBox logoSrc={tokens.logoURI} tokenName={tokens.symbol} />
            );
          })
        ) : (
          <Text>Loading</Text>
        )}
      </ScrollView>
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.view}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default WalletMain;
