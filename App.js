import * as React from 'react';
import { View, Button, ScrollView, Text, Image, TextInput } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Frist from './frist';
import MoreIcon from './assets/icon_more.svg';
import SmileIcon from './assets/icon_smile.svg';
import VoiceIcon from './assets/icon_voice.svg';
import DoneIcon from './assets/icon_doneall.svg';
import SendScreen from './pages/wallet/send';
import TradeScreen from './pages/wallet/trade';

function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Doctor')}
      />
    </View>
  );
}
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(235, 92, 32)',
    background: 'rgb(18, 18, 18)'
  },
};
function ProfileScreen() {
  return <View />;
}

function AccountScreen() {
  return <View />;
}
const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}

function SettingsScreen() {
  const [value, onChangeText] = React.useState('33');

  return <View>
    <ScrollView
      contentContainerStyle={{ minHeight: '85%' }}
      style={{ padding: 20 }}
    >
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View>
          <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
            <Text style={{ color: '#fff' }}>A string representing the </Text>

          </View>
          <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
        </View>


        {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View>
            <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>

          </View>
        </View> */}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View style={{ marginLeft: 20, }}>
          <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 100, borderBottomLeftRadius: 0, width: 40 }}>
            <Text style={{ color: '#fff', flex: 1 }}>ok</Text>

          </View>
          <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
        </View>


        {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View>
            <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>

          </View>
        </View> */}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <View>
          <View style={{ padding: 10, backgroundColor: '#422DDD', marginLeft: 5, borderRadius: 100, borderBottomRightRadius: 0 }}>
            <Text style={{ color: '#fff' }}>A string representing the </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>18:22</Text>
              <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
            </View>
          </View>
        </View>

      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 130, padding: 5, borderRadius: 20 }}>
          <Text style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>Thu, May 26, 2022</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View>
          <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
            <Text style={{ color: '#fff' }}>A string representing the </Text>

          </View>
          <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
        </View>


        {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View>
            <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>

          </View>
        </View> */}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <View>
          <View style={{ padding: 10, backgroundColor: '#422DDD', marginLeft: 5, borderRadius: 10, borderBottomRightRadius: 0 }}>
            <Text style={{ color: '#fff' }}>An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label.</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>18:22</Text>
              <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
            </View>
          </View>
        </View>

      </View>


      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View>
          <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
            <Text style={{ color: '#fff' }}>Meeting?</Text>

          </View>
          <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
        </View>


        {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View>
            <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>

          </View>
        </View> */}
      </View>
      {/* <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 100 }}>
          <Text style={{ padding: 5 }}>Hello</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 100 }}>
          <Text style={{ padding: 5 }}>Hello</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>

        <View style={{ backgroundColor: '#fff', flex: 1, marginRight: 10, borderRadius: 100 }}>
          <Text style={{ padding: 5 }}>Hello</Text>
        </View>
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 100, }}
            source={require('./assets/ks.jpg')}
          />
        </View>
      </View> */}
    </ScrollView>
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', paddingLeft: 10, paddingRight: 10 }}>
      <VoiceIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
        {/* <TextInput style={{ color: 'red',flex:1 }}  
      defaultValue="123" /> */}
        {/* <UselessTextInput /> */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <SmileIcon style={{}} width={30} height={30} fill="rgba(255,255,255,0.7)" />

      </View>
      {
        value!=""&&<Button
        title="Send"
        color="#422DDD"
        style={{texttran}}
      />||
      <MoreIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />

      }

      {/*  */}

    </View>
  </View>
    ;
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={MyTheme}
    >
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Frist} />
        <Stack.Screen name="Doctor" component={SettingsScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        <Stack.Screen name="Trade" component={TradeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
