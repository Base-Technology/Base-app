import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView, Image } from 'react-native';
import { Icon, Layout, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BaseVideoFull, BaseSwiper,BaseText } from '../../components/Base'
import BackIcon from "../../assets/icon_arrow_back.svg";
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
        <MenuItem accessoryLeft={InfoIcon} title='Follw' />
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
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, padding: 10, zIndex: 1 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <BackIcon width={30} height={30} fill="#fff" />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 100, }}
                source={require('../../assets/img/s5.png')}
              />
            </View>
            <Text style={{ marginLeft: 10, marginRight: 20 }}>KangShuiYue</Text>
            <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
              <Text> Join</Text>
            </View>
          </View>
          <View>
            <BaseText style={{fontSize:16,marginTop:20}}>A linear error-correcting code with message length  and codeword length  is a linear subspace , such that there exists an injective mapping from message to codeword , which is called the encoder of the code.</BaseText>
          </View>
        </View>

      </View>

      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}

          />

        </View>

        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='message-square-outline'
        />
        <Text>11k</Text>
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='heart-outline'
        />
        <Text>11k</Text>
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='share-outline'
        />
        <Text>11k</Text>
        {/*  */}

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