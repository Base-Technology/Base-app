import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from './assets/icon_home';
import HomeFullIcon from './assets/icon_homefull';
import ChatIcon from './assets/icon_chat.svg';
import ChatFullIcon from './assets/icon_chatfull.svg';
import MeIcon from './assets/icon_me.svg';
import MeFullIcon from './assets/icon_mefull.svg';
import MomentIcon from './assets/icon_moment.svg';
import MomentFullIcon from './assets/icon_momentfull.svg';
import CreateIcon from './assets/icon_create.svg';
import WalletMain from './pages/me/index';
// import HomeScreen from './pages/home';
import PublishScreen from "./pages/publish";
import Chat from './pages/chat/list';
import Moment from './pages/moments';
import HomeScreen from './pages/home';

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
          color = '#E0E0E0'
          // You can return any component that you like here!
          switch (route.name) {
            case 'Home':
              if (focused) {
                return <HomeFullIcon width="24" height="24" fill={color} />;

              } else
                return <HomeIcon width="24" height="24" fill={color} />;
            case 'Chats':
              if (focused) {
                return <ChatFullIcon width="24" height="24" fill={color} />;
              } else
                return <ChatIcon width="24" height="24" fill={color} />;
            case 'Create':
              return <CreateIcon width="30" height="30" fill={color} />;
            case 'Moments':
              if (focused) {
                return <MomentFullIcon width="24" height="24" fill={color} />;
              }
              else
                return <MomentIcon width="24" height="24" fill={color} />;
            default:
              if (focused)
                return <MeFullIcon width="24" height="24" fill={color} />;
              else
                return <MeIcon width="24" height="24" fill={color} />;

          }
        },
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          // borderTopColor: '#E0E0E0',
        },
      })}
    >
      <Tab.Screen options={{ headerShown: false, tabBarShowLabel: false }} name="Home" component={HomeScreen} />

      <Tab.Screen options={{ headerShown: false, tabBarShowLabel: false }} name="Chats" component={Chat} />



      <Tab.Screen options={{ headerShown: false, tabBarShowLabel: false, tabBarVisible: true }} name="Create" component={PublishScreen} />
      <Tab.Screen options={{ headerShown: false, tabBarShowLabel: false }} name="Moments" component={Moment} />
      <Tab.Screen options={{ headerShown: false, tabBarShowLabel: false }} name="Wallet" component={WalletMain} />

    </Tab.Navigator>
  );
}

export default function Frist() {
  return (

    <MyTabs />
  );
}
