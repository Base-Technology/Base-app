import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_close.svg";
import ArrowRightIcon from "../../assets/icon_arrow_right.svg";
import CheckIcon from "../../assets/icon_check.svg";
import { createWallet, createEOA } from "../../connectFunctions/BaseWallet/createWallet";
import { addProfile } from "../../database/profile";
import { provider } from "../../constants/test-provider";
import { walletContractAddress, baseHubContractAddress } from "../../constants/contract_address";
import { createProfile, getProfileIdByHandle } from "../../connectFunctions/BaseLen/Profile";
import { uploadFile } from "../../ipfs/service";
import * as ImagePicker from 'react-native-image-picker';
import { ethers } from "ethers";
const WalletABI = require('../../abis/BaseWallet.json');
const BaseHubABI = require('../../abis/BaseHub.json');
const WalletCreate = ({ navigation }) => {
  const [tabsData, setTabsData] = useState([
    {
      active: false,
      name: 'Posts'
    },
    {
      active: false,
      name: 'Users'
    }
  ]);
  const [profileImg, setProfileImg] = useState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [privateKey, onChangPrivateKey] = React.useState('');
  const [username, onChangUsername] = React.useState('');
  const onButtonPress = React.useCallback((type, options) => {
    options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      setProfileImg(img => response?.assets[0]?.uri)
    });

  }, []);
  const onGenerate = async () => {
    const gennrate = await createEOA();
    onChangPrivateKey(gennrate);
  }
  return (
    <View style={{ height: 760 }}>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
            <BackIcon width={20} height={20} fill={"#fff"} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={{ color: '#8c8c8c' }}>Help</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', lineHeight: 30 }}>Create Wallet</Text>

      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }} >
        {/* TODO: upload image to create profile and get the profile id */}

        {profileImg && <Image style={{ width: 100, height: 100 }} resizeMode="cover" source={{ uri: profileImg }} /> || <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Profile image" />}



        <TouchableWithoutFeedback onPress={() => onButtonPress()}>

          <Text>Upload</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Username" value={username} onChangeText={username => onChangUsername(username)} />

      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={{ flex: 1 }} placeholderTextColor="#8c8c8c" color="#fff" placeholder="Private key" value={privateKey} onChangeText={privateKey => onChangPrivateKey(privateKey)} />
        <View >
          <TouchableWithoutFeedback onPress={() => onGenerate()}>
            <Text style={{}}>
              Generate
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{ marginTop: 50, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row', alignItems: 'center' }}>
        <Text>We will create an exclusive Profile NFT for you, please makesure you have some balance in BNB in your account
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={async () => {
          try {
            const user = new ethers.Wallet(privateKey, provider);
            const cid = await uploadFile(profileImg, "image/png", user);
            const walletAddress = await createWallet(privateKey);
            const baseWallet = new ethers.Contract(walletContractAddress, WalletABI, provider);
            const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, provider);
            const wallet = baseWallet.attach(walletAddress);
            await createProfile(user, wallet, baseHub, username, cid, ethers.constants.AddressZero, "0x", "");
            const profileId = await getProfileIdByHandle(baseHub, username);
            await addProfile(profileId.toHexString(), privateKey, wallet.address);
            navigation.navigate('Chat');
          } catch (e) {
            throw e;
          }
        }}>
          <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', right: 20, left: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
          <Text>Skip</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}
export default WalletCreate;

