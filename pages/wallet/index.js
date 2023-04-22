import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_close.svg";
import ArrowRightIcon from "../../assets/icon_arrow_right.svg";
import CheckIcon from "../../assets/icon_check.svg";
import { createWallet } from "../../connectFunctions/BaseWallet/createWallet";
import { addProfile } from "../../database/profile";

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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [privateKey, onChangPrivateKey] = React.useState('');
  const [profileId, onChangProfileId] = React.useState('');
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
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }} >
        {/* TODO: upload image to create profile and get the profile id */}
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Profile image" value={profileId} onChangeText={profileId => onChangProfileId(profileId)} />
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Username" />
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Private key" value={privateKey} onChangeText={privateKey => onChangPrivateKey(privateKey)} />
      </View>
      <View style={{ marginTop: 50, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row', alignItems: 'center' }}>
        <Text>We will create an exclusive Profile NFT for you, please makesure you have some balance in BNB in your account
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={async () => {
          const wallet = await createWallet(privateKey);
          await addProfile(profileId, privateKey, wallet.address);
          navigation.navigate('Chat');
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

