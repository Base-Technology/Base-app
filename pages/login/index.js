import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_close.svg";
import ArrowRightIcon from "../../assets/icon_arrow_right.svg";
import CheckIcon from "../../assets/icon_check.svg";
import VideoScreen from "../../components/BaseVideo";
import MembersScreen from "../me/members";
import { Radio } from '@ui-kitten/components';
import { login } from "../../mail/service";
import { addIdentity } from "../../database/identity";

const Login = ({ navigation }) => {
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
  const [mail, onChangeMail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
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
        <Text style={{ fontSize: 24, textAlign: 'center', lineHeight: 30 }}>Login with Email</Text>

      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Enter email" value={mail} onChangeText={mail => onChangeMail(mail)} />
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Enter password" secureTextEntry={true} value={password} onChangeText={password => onChangePassword(password)} />
      </View>
      <View style={{ paddingHorizontal: 20, justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
        <TouchableWithoutFeedback onPress={async () => {
          await login(mail, password);
          addIdentity(mail, password);
          navigation.navigate('WalletCreate');
        }}>

          <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('LoginOther')}>
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ textAlign: 'center', lineHeight: 20, color: '#fff' }}>Recister</Text>
          </View>
          <View style={{ paddingTop: 2 }}>
            <ArrowRightIcon width={15} height={15} fill="#fff" />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => setChecked(data => !data)}>
          <View style={{ width: 14, height: 14, borderColor: '#8c8c8c', borderWidth: 1, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: checked && '#422ddd' || 'rgba(0,0,0,0)', marginRight: 5 }}>
            {checked && <CheckIcon width={10} height={10} fill="#fff" />}
          </View>
        </TouchableWithoutFeedback>
        <Text>I have read and agreed to the following policies
        </Text>
      </View>
    </View>
  )
}
export default Login;

