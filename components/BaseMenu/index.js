import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HomeIcon from '../../assets/icon_home';
import HomeFullIcon from '../../assets/icon_homefull';
import ChatIcon from '../../assets/icon_chat.svg';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MeFullIcon from '../../assets/icon_mefull.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import MomentFullIcon from '../../assets/icon_momentfull.svg';
import CreateIcon from '../../assets/icon_add_photo.svg';
const BaseMenu = ({ navigation }) => {
  return (<View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
      <HomeFullIcon width={30} height={30} fill={"#fff"} />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>

        <ChatIcon width={30} height={30} fill={"#fff"} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
        <CreateIcon width={30} height={30} fill={"#fff"} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Moment')}>
        <MomentIcon width={30} height={30} fill={"#fff"} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
        <MeIcon width={30} height={30} fill={"#fff"} />
      </TouchableWithoutFeedback>
    </View>
    </View>
  );
}
export default BaseMenu;