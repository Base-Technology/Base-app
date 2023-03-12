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
import Chat from './pages/chat/list';
import Moment from './pages/moments';
import HomeScreen from './pages/home';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
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

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark }}>
        <NavigationContainer
          theme={MyTheme}
        >
          <Stack.Navigator >
            {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="LoginOther" component={LoginOtherScreen} /> */}
            <Stack.Screen options={{ headerShown: false,animation:'none' }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false,animation:'none' }} name="Chat" component={Chat} />
            <Stack.Screen options={{ headerShown: false }} name="Doctor" component={SettingsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="DetailGroup" component={DetailGroupScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Yk" component={SettingsScreen2} />
            <Stack.Screen name="Trade" component={TradeScreen} />
            <Stack.Screen name="Send" component={SendScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Search" component={SearchScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SearchDetail" component={SearchDetailScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Details" component={DetailsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Details2" component={DetailsScreen2} />
            <Stack.Screen options={{ headerShown: false }} name="Publish" component={PublishScreen} />
            <Stack.Screen options={{ headerShown: false,animation:'none' }} name="Me" component={WalletMain} />
            <Stack.Screen options={{ headerShown: false,animation:'none' }} name="Moment" component={Moment} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
