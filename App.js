import * as React from 'react';
import { View, Button, ScrollView, Text, Image } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Frist from './frist';
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

function SettingsScreen() {
  return <View><ScrollView
    contentContainerStyle={{ minHeight: '85%' }}
    style={{ padding: 20 }}
  >
    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100, }}
          source={require('./assets/header.jpg')}
        />
      </View>
      <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 10 }}>
        <Text style={{padding:5}}>Hello</Text>
      </View>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100, }}
          source={require('./assets/header.jpg')}
        />
      </View>
      <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 10 }}>
        <Text style={{padding:5}}>Hello</Text>
      </View>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100, }}
          source={require('./assets/header.jpg')}
        />
      </View>
      <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 10 }}>
        <Text style={{padding:5}}>Hello</Text>
      </View>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
      
      <View style={{ backgroundColor: '#fff', flex: 1, marginRight: 10, borderRadius: 10 }}>
        <Text style={{padding:5}}>Hello</Text>
      </View>
      <View>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100, }}
          source={require('./assets/header.jpg')}
        />
      </View>
    </View>
  </ScrollView>

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
