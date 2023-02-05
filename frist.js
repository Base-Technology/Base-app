import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from './assets/icon_home';
import ChatIcon from './assets/icon_chat.svg';
import WalletIcon from './assets/icon_wallet.svg';
import MomentIcon from './assets/icon_moment.svg';
import WalletMain from './pages/wallet';
import HomeScreen from './pages/home';
import Chat from './pages/chat/list';
import Moment from './pages/moments';

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#422DDD',
    background: 'rgb(18, 18, 18)'
  },
};
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          switch (route.name) {
            case 'Home':
              return <HomeIcon width="24" height="24" fill={color} />;
            case 'Chats':
              return <ChatIcon width="24" height="24" fill={color} />;
            case 'Moments':
              return <MomentIcon width="24" height="24" fill={color} />;
            default:
              return <WalletIcon width="24" height="24" fill={color} />;
          }

        }
      })}
    >
      <Tab.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={Chat} />
      <Tab.Screen name="Moments" component={Moment} />
      <Tab.Screen name="Wallet" component={WalletMain} />
    </Tab.Navigator>
  );
}

export default function Frist() {
  return (

      <MyTabs />
  );
}
