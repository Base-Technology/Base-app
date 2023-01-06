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
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const WalletModal = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isModalVisible, setModalVisible] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    mainContainer: {
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Hi 👋!</Text>
      </View>
    </View>
  );
};

export default WalletModal;
