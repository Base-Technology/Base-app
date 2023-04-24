import React, { Component, useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Image, TextInput } from "react-native";
import Text from "../../components/BaseText";
import ArrowRightIcon from "../../assets/icon_arrow_right.svg";

import BackIcon from "../../assets/icon_close.svg";
import CheckIcon from "../../assets/icon_check.svg";

import { register, verificationCode as sendVerificationCode } from "../../mail/service";

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
  const [checked, setChecked] = React.useState(true);
  const [countdown, setCountdown] = React.useState(0);
  const [mail, onChangeMail] = React.useState('');
  const [verificationCode, onChangeverificationCode] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeconfirmPassword] = React.useState('');

  useEffect(() => {
    let intervalId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countdown]);
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
        <Text style={{ fontSize: 18, textAlign: 'center', lineHeight: 30, color: '#fff' }}>Register with Email</Text>
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Enter email" value={mail} onChangeText={mail => onChangeMail(mail)} />
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={{ flex: 1 }} placeholderTextColor="#8c8c8c" color="#fff" placeholder="Enter verification code" value={verificationCode} onChangeText={verificationCode => onChangeverificationCode(verificationCode)} />
        <TouchableWithoutFeedback onPress={() => {
          countdown == 0 && setCountdown(60);
          sendVerificationCode(mail);
        }}>
          <Text>{countdown == 0 && 'Send' || `Resend${countdown}s`} </Text>
        </TouchableWithoutFeedback>

      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Enter password" secureTextEntry={true} value={password} onChangeText={password => onChangePassword(password)} />
      </View>
      <View style={{ marginHorizontal: 20, borderBottomColor: 'rgba(255,255,255,0.5)', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" color="#fff" style={{}} placeholder="Confirm password" secureTextEntry={true} value={confirmPassword} onChangeText={confirmPassword => onChangeconfirmPassword(confirmPassword)} />
      </View>
      <View style={{ padding: 20, justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableWithoutFeedback onPress={async () => {
          if (password != confirmPassword) {
            throw new Error("password and confirm password not match");
          }
          await register(mail, password, verificationCode);
          navigation.navigate('Login');
        }}>
          <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Register</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ textAlign: 'center', lineHeight: 20, color: '#fff' }}>Login</Text>
          </View>
          <View style={{ paddingTop: 2 }}>
            <ArrowRightIcon width={15} height={15} fill="#fff" />
          </View>
        </View>
      </TouchableWithoutFeedback>
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

