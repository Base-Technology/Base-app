import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Button, Keyboard, ScrollView } from 'react-native';
import { Icon, Layout, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BaseVideo,BaseSwiper } from '../../components/Base'

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

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

export const DetailsScreen = () => {

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

    <Layout style={styles.container} level='1'>
      <TopNavigation
        alignment='center'
        title='Our song'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ minHeight: '85%' }}>
          <View style={{height:200}}>
            <BaseVideo />
          </View>
          <View style={{ padding: 10 }}>
            <Text>感谢大神色终于搞懂了985，211和双一流少4985高校共39所，211高校共116所，双流高校共147所。军校
              。6作者已用不同颜色标注出来，红色为 985蓝色为 211，黑色为双一流，所有的985都是211和双一流，所有的211都是双一流。
              0其中双一流:北京34所
              上海15所
              广东7所</Text>
          </View>
          <BaseSwiper />
        </ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', paddingLeft: 10, paddingRight: 10 }}>
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
      </KeyboardAvoidingView>

    </Layout>
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