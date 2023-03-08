import React, { Component, useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import Text from "../../components/BaseText";
import TextInput from "../../components/BaseTextInput";

import BackIcon from "../../assets/icon_close.svg";
import CheckIcon from "../../assets/icon_check.svg";
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
  const [showCode, setShowCode] = React.useState(false);
  const [time, setTime] = React.useState(60);
  return (
    <View style={{ height: 760 }}>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <BackIcon width={20} height={20} fill={"#fff"} />
        </View>
        <View>
          <Text style={{ color: '#8c8c8c' }}>Help</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', lineHeight: 30, color: '#fff' }}>Login with Email or other Phone Number</Text>
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Enter email or phone number" />
      </View>
      {showCode && <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5,flexDirection:'row',alignItems:'center' }}>
        <TextInput style={{ flex: 1 }} placeholderTextColor="#8c8c8c" color="#fff" placeholder="Enter verification code" />
        <Text>Resend({time}s) </Text>
      </View>}
      <View style={{ padding: 20, justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableWithoutFeedback onPress={() => {
          setShowCode(true);
          setInterval(() => {
            setTime(data=>{
              if(data>0) return data-1;
            });
          }, 1000); 
          }}>
          <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ marginTop: 10, }}>The unregistered email or phone number will be antomatically registered if login successfuly</Text>

      </View>
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

