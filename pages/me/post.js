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
import { Buffer } from 'buffer';

import Text from "../../components/BaseText";

const BaseHubABI = require('../../abis/BaseHub.json');
import { getProfileById } from '../../connectFunctions/BaseLen/Profile';
import { baseHubContractAddress } from "../../constants/contract_address";

import { useQuery, gql } from '@apollo/client';
import { ethers } from "ethers";

import { queryProfile } from "../../database/profile";
import { downloadFile } from "../../ipfs/service";
import { Testbaobab } from "../../constants/test-provider";

const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileId, setProfileId] = useState(0);
  const [privateKey, setPrivateKey] = useState('');
  const [username, setUsername] = useState('');
  const [img, setimg] = useState(undefined)
  // const user = new ethers.Wallet(pri,Testbaobab)
  const profile = async () => {
    const profile = await queryProfile()
    let profileId = profile['id']
    profileId = parseInt(profileId, 16)
    let privateKey = profile['private_key']
    setProfileId(profileId)
    setPrivateKey(privateKey)

    const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, Testbaobab);
    const user = new ethers.Wallet(privateKey, Testbaobab);
    const res = await getProfileById(baseHub, profileId);
    setUsername(res[3]);
    const data = await downloadFile(res[4], user.address, user)
    setimg({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` })
  }
  profile()

  const GET_DATA = gql`{
    profile(id: "${profileId}") {
      publications{
        id,
        profileId,
        pubId,
        contentURI,
        collectModule,
        collectModuleReturnData,
        referenceModule,
        referenceModuleReturnData
      }
    }
  }`
  let { loading, error, data } = useQuery(GET_DATA);
  // const publications = data['profile']['publications']
  // for (i = 0; i< publications.length;i++){
  //   contentURI = publications[i]['contentURI']
  //   // const img = downloadFile(imgCid,user.address,user)
  //   // console.log("@@@@@@@@@@@",imgCid)
  //   let publicationDATA = {
  //     image:[],
  //     title:[],
  //     contentURI:contentURI
  //   }
  //   // setData(datas => {
  // //   //   let newData = [publicationDATA,...datas];
  // //   //   return newData;
  // //   // })
  // }

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
                  source={props.img}
                />
                <Text>{props.username}</Text>
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
        <Item key="aa1" header={{ uri: 'https://bf.jdd001.top/s3.png' }} username={username} img={img} />
        <Item key="aa2" header={{ uri: 'https://bf.jdd001.top/s4.png' }} />
      </View>
      <View style={styles.list}>
        <Item key="aa3" header={{ uri: 'https://bf.jdd001.top/s5.png' }} />
        <Item key="aa4" header={{ uri: 'https://bf.jdd001.top/s1.png' }} />
      </View>
      <View style={styles.list}>
        <Item key="aa5" header={{ uri: 'https://bf.jdd001.top/s3.png' }} />
        <Item key="aa6" header={{ uri: 'https://bf.jdd001.top/s4.png' }} />
      </View>
      <View style={styles.list}>
        <Item key="aa7" header={{ uri: 'https://bf.jdd001.top/s5.png' }} />
        <Item key="aa8" header={{ uri: 'https://bf.jdd001.top/s1.png' }} />
      </View>

    </View>
  );
};

export default WalletMain;
