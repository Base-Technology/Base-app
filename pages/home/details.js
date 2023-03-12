import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView, Image } from 'react-native';
import { Icon, Layout, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BaseVideoFull, BaseSwiper, BaseText } from '../../components/Base'
import BackIcon from "../../assets/icon_arrow_back.svg";
import ShareIcon from "../../assets/icon_share.svg";
import StarIcon from "../../assets/icon_star.svg";
import CommentIcon from "../../assets/icon_comment.svg";
import FavoriteIcon from "../../assets/icon_favorite.svg";
// const BackIcon = (props) => (
//   <Icon {...props} name='arrow-back' />
// );

const EditIcon = (props) => (
  <Icon {...props} name='edit' />
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const InfoIcon = (props) => (
  <Icon {...props} name='info' />
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out' />
);

export const DetailsScreen = ({ navigation }) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='follow' />
        <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
      </OverflowMenu>

    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <BaseVideoFull />
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, padding: 10, zIndex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <BackIcon width={30} height={30} fill="#fff" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 100, }}
                source={{uri:'https://bf.jdd001.top/s1.png'}}
              />
            </View>
            <Text style={{ marginRight: 20 }}>Elon Musk</Text>
            <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
              <Text>Follow</Text>
            </View>
          </View>
          <View>
            <BaseText style={{ fontSize: 16, marginTop: 20,color:'#fff' }}>A linear error-correcting code with messa ... More </BaseText>
          </View>
        </View>

      </View>

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', borderTopColor: '#1e1e1e', padding: 10,paddingLeft:20,paddingRight:20 }}>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}

          />

        </View> */}
        <View style={{flexDirection:'row'}}>
          <CommentIcon width={23} height={23} fill="#fff" />
          <BaseText style={{ marginLeft: 5, marginRight: 20 }}>134</BaseText>
          <FavoriteIcon width={23} height={23} fill="#fff" />
          <BaseText style={{ marginLeft: 5, marginRight: 20 }}>420</BaseText>
          <StarIcon width={23} height={23} fill="#fff" />
          <BaseText style={{ marginLeft: 5, }}>909</BaseText>
        </View>
        <ShareIcon width={23} height={23} fill="#fff" />



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    marginLeft: 10
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
});
export default DetailsScreen;