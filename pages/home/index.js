import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
  Image,
  Button
} from 'react-native';
import SettingsIcon from '../../assets/icon_settings.svg';
import AddIcon from '../../assets/icon_add.svg';
import BaseIcon from '../../assets/logo.svg';
import { Datepicker, Icon } from '@ui-kitten/components';
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar' />
);

const HomeScreen = () => {
  const [date, setDate] = React.useState(new Date());
  const [value, onChangeText] = React.useState('Search');
  return (
    <View>
      <View>
        <View style={{ margin: 20, marginBottom: 10 }}>
          {/* <AddIcon style={{ marginRight: 8 }} width="24" height="24" fill='#fff' /> */}
          {/* <SettingsIcon width="24" height="24" fill='#fff' /> */}
          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 2, color: '#ffffff', borderRadius: 5 }}
          onChangeText={text => onChangeText(text)}
          defaultValue=""
        />
        </View>

      </View>
      {/* <View style={{ margin: 20, marginTop: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 2, color: '#ffffff', borderRadius: 5 }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View> */}
      <ScrollView
        contentContainerStyle={{ minHeight: '85%' }}
      >
        {/* <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
          <View style={{ width: 66, height: 66, borderRadius: 100, marginRight: 20, backgroundColor: 'gray' }}>
            <Image
              style={{ width: 66, height: 66, borderRadius: 100, }}
              source={require('../../assets/header.jpg')}
            />
          </View>
          <View>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Doctor</Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Now or Never</Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)' }}>Keep</Text>
          </View>
        </View> */}
        {/* Setting */}
        <View style={{ margin: 20 }}>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>Setting</Text>
          <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View >
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray', marginRight: 0 }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Chat</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Sticker</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Theme</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Games</Text>
            </View>
          </View>
          <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View >
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray', marginRight: 0 }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Web</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Base</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>B612</Text>
            </View>
            <View>
              <View style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: 'gray' }}>

              </View>
              <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 5 }}>Add</Text>
            </View>
          </View>
        </View>
        {/* <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}
        {/* <View style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: 200, margin: 20, borderRadius: 5 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, }}>
              <BaseIcon width={30} height={30} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Base</Text>
            </View>
            <View>

              <Text>3 minutes ago</Text>
            </View>
          </View>
          <View style={{ minHeight: 150 }}>
            <Image
              style={{ width: 375, height: 200 }}
              source={{ uri: 'https://base.tech/static/dis.466c25c7.jpg' }}
            />

          </View>
          <View style={{ padding: 5 }}>
            <Text>Most people get their crypto news on social media which is mostly biased. #Catcoin aims to create an avenue for you to read unbiased news and earn even as you share.
              Are you ready to join the revolution?</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: 200, margin: 20, borderRadius: 5 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, }}>
              <BaseIcon width={30} height={30} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Base</Text>
            </View>
            <View>

              <Text>3 minutes ago</Text>
            </View>
          </View>
          <View style={{ minHeight: 150 }}>
            <Image
              style={{ width: 375, height: 200 }}
              source={{ uri: 'https://base.tech/static/dis.466c25c7.jpg' }}
            />

          </View>
          <View style={{ padding: 5 }}>
            <Text>Most people get their crypto news on social media which is mostly biased. #Catcoin aims to create an avenue for you to read unbiased news and earn even as you share.
              Are you ready to join the revolution?</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: 200, margin: 20, borderRadius: 5 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, }}>
              <BaseIcon width={30} height={30} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Base</Text>
            </View>
            <View>

              <Text>3 minutes ago</Text>
            </View>
          </View>
          <View style={{ minHeight: 150 }}>
            <Image
              style={{ width: 375, height: 200 }}
              source={{ uri: 'https://base.tech/static/dis.466c25c7.jpg' }}
            />

          </View>
          <View style={{ padding: 5 }}>
            <Text>Most people get their crypto news on social media which is mostly biased. #Catcoin aims to create an avenue for you to read unbiased news and earn even as you share.
              Are you ready to join the revolution?</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: 200, margin: 20, borderRadius: 5 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, }}>
              <BaseIcon width={30} height={30} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Base</Text>
            </View>
            <View>

              <Text>3 minutes ago</Text>
            </View>
          </View>
          <View style={{ minHeight: 150 }}>
            <Image
              style={{ width: 375, height: 200 }}
              source={{ uri: 'https://base.tech/static/dis.466c25c7.jpg' }}
            />

          </View>
          <View style={{ padding: 5 }}>
            <Text>Most people get their crypto news on social media which is mostly biased. #Catcoin aims to create an avenue for you to read unbiased news and earn even as you share.
              Are you ready to join the revolution?</Text>
          </View>
        </View> */}
      </ScrollView>

    </View>
  );
}
export default HomeScreen;