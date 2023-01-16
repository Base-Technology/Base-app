import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import HomeIcon from './assets/icon_home';
import ChatIcon from './assets/icon_chat.svg';
import WalletIcon from './assets/icon_wallet.svg';
import MomentIcon from './assets/icon_moment.svg';
import WalletMain from './pages/wallet';
import HomeScreen from './pages/home';
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(235, 92, 32)',
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
            case 'Moment':
              return <MomentIcon width="24" height="24" fill={color} />;
            default:
              return <WalletIcon width="24" height="24" fill={color} />;
          }

        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={HomeScreen} />
      <Tab.Screen name="Moment" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletMain} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer
      theme={MyTheme}

    >
      <MyTabs />
    </ NavigationContainer>
    </ApplicationProvider>
  );
}
