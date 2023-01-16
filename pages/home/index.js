import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
} from 'react-native';
import { Button,Datepicker,Icon } from '@ui-kitten/components';
const CalendarIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const HomeScreen = () => {
const [date, setDate] = React.useState(new Date());

  return (
    <View style={{ margin: 30, }} >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ marginRight: 20 }}>
          <Image
            style={{
              width: 66,
              height: 66,
              borderRadius: 100,

            }}
            source={{
              uri: 'https://bf.jdd001.top/headerimg/fangq.png',
            }}
          />
        </View>
        <View>
          <Text style={{ color: '#ffffff' }}>Doctor</Text>
          <Text style={{ color: '#ffffff' }}>Now</Text>
        </View>

      </View>
      {/* Setting */}
      <View style={{marginTop:50}}>
        <Text style={{color:'#ffffff',fontSize:20}}>Setting</Text>
        <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
          <View>
            <View style={{width:30,height:30,borderRadius:30,backgroundColor:'gray'}}>

            </View>
            <Text style={{color:'#ffffff'}}>Open</Text>
          </View>
        </View>
        <Button>Button</Button>
        <Datepicker
        label='Label'
        caption='Caption'
        placeholder='Pick Date'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />
      </View>
    </View>
  );
}
export default HomeScreen;