import * as React from 'react';
import { View, Button, ScrollView, Text, Image, TextInput } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoreIcon from './assets/icon_more.svg';
import SmileIcon from './assets/icon_smile.svg';
import VoiceIcon from './assets/icon_voice.svg';
import DoneIcon from './assets/icon_doneall.svg';
import SendScreen from './pages/me/send';
import TradeScreen from './pages/me/trade';
import DetailsScreen from './pages/home/details';
import DetailsScreen2 from './pages/home/details2';
import SettingsScreen from './pages/chat/detail';
import DetailGroupScreen from './pages/chat/detailGroup';
import LoginScreen from './pages/login';
import LoginOtherScreen from './pages/login/other';
import SettingsScreen2 from './pages/chat/detailp';
import SearchScreen from './pages/home/search';
import SearchDetailScreen from './pages/home/searchDetail';
import PublishScreen from './pages/publish';
import WalletMain from './pages/me/index';
import Personal from './pages/me/personal';
import Invite from './pages/chat/invite';
import CreateToken from './pages/chat/createToken';
import CreateAirdrop from './pages/chat/createAirdrop';
import ImportOfAirdrop from './pages/chat/importOfAirdrop';
import CreateGroup from './pages/chat/createGroup';
import CreateChat from './pages/chat/createChat';
import Contact from './pages/chat/contact';
import ContactSearch from './pages/chat/contactsearch';

import WalletCreate from './pages/wallet/index';

import Chat from './pages/chat/list';
import Moment from './pages/moments/index';
import HomeScreen from './pages/home';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import SplashScreen from "react-native-splash-screen";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://147.182.251.92:10000/subgraphs/name/base/base-graph',
  cache: new InMemoryCache(),
});
function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Elon Musk')}
      />
    </View>
  );
}
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#E0E0E0',
    background: '#1e1e1e'
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

export default function App(logined, hasWallet) {
  return () => {
    React.useEffect(() => {
      SplashScreen.hide();
    }, []);
    return (
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
          <NavigationContainer
            theme={MyTheme}
          >
            <Stack.Navigator >
              {!logined && (<Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Login" component={LoginScreen} />)}
              {!logined && (<Stack.Screen options={{ headerShown: false, animation: 'none' }} name="LoginOther" component={LoginOtherScreen} />)}
              {!hasWallet && (<Stack.Screen options={{ headerShown: false, animation: 'none' }} name="WalletCreate" component={WalletCreate} />)}
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Home" component={HomeScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Chat" component={Chat} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Doctor" component={SettingsScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Personal" component={Personal} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Invite" component={Invite} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="CreateGroup" component={CreateGroup} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="CreateChat" component={CreateChat} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="CreateToken" component={CreateToken} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="CreateAirdrop" component={CreateAirdrop} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ImportOfAirdrop" component={ImportOfAirdrop} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Contact" component={Contact} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ContactSearch" component={ContactSearch} />

              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DetailGroup" component={DetailGroupScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Yk" component={SettingsScreen2} />
              <Stack.Screen name="Trade" component={TradeScreen} />
              <Stack.Screen name="Send" component={SendScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Search" component={SearchScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="SearchDetail" component={SearchDetailScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Details" component={DetailsScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Details2" component={DetailsScreen2} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Publish" component={PublishScreen} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Me" component={WalletMain} />
              <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Moment" component={Moment} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </ApolloProvider>
    );
  }

}
