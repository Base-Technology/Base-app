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
import { downloadFile, downloadObject } from "../../ipfs/service";
import { provider } from "../../constants/test-provider";



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
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState('');
  const getDetail = async (contentURI, privateKey) => {
    if (image) {
      return;
    }
    const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, provider);
    const user = new ethers.Wallet(privateKey, provider);

    const object = await downloadObject(contentURI, user.address, user);
    setTitle(object.title);
    const data = await downloadFile(object.image[0], user.address, user);
    setImage({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` });
  }
  getDetail(props.contentURI, props.privateKey);
  return (
    <View style={styles.item} >
      <View>
        <Image
          resizeMode="cover"
          style={{ borderRadius: 5, width: '100%', height: 230 }}
          source={image}
        />
        <View style={{ padding: 5 }}>
          <View>
            <Text style={{ fontSize: 14 }}>{title}</Text>
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

const Post = ({ profileId, privateKey, icon, username }) => {
  if (!profileId || !privateKey || !icon || !username) {
    return
  }
  const { loading, error, data } = useQuery(gql`{
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
  }`);

  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error :</Text>;

  const publications = data.profile.publications;
  const views = [];
  for (let i = 0; i < publications.length; i += 2) {
    if (i + 1 < publications.length) {
      views.push(<View style={styles.list}>
        <Item key={publications[i].id} username={username} img={icon} contentURI={publications[i].contentURI} privateKey={privateKey} />
        <Item key={publications[i + 1].id} username={username} img={icon} contentURI={publications[i + 1].contentURI} privateKey={privateKey} />
      </View>);
    } else {
      views.push(<View style={styles.list}>
        <Item key={publications[i].id} username={username} img={icon} contentURI={publications[i].contentURI} privateKey={privateKey} />
      </View>);
    }
  }

  return (
    <View style={styles.mainContainer}>
      {views.map((view, index) => {
        return view;
      })}
    </View>
  );
}

const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileId, setProfileId] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const [username, setUsername] = useState('');
  const [icon, setIcon] = useState(undefined);
  const getProfile = async () => {
    if (profileId) {
      return;
    }
    const profile = await queryProfile();
    if (profile) {
      setProfileId(parseInt(profile.id, 16));
      setPrivateKey(profile.private_key);
      const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, provider);
      const res = await getProfileById(baseHub, profile.id);
      setUsername(res[3]);
      setProfileId(parseInt(profile.id, 16));
      const user = new ethers.Wallet(profile.private_key, provider);
      const data = await downloadFile(res[4], user.address, user);
      setIcon({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` });
    }
  }
  getProfile();

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
  return (
    <Post profileId={profileId} privateKey={privateKey} icon={icon} username={username} />
  );
};

export default WalletMain;
