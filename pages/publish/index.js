import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_arrow_back.svg";
import AddIcon from "../../assets/icon_add_big.svg";
import InfoIcon from "../../assets/icon_info.svg";
import VideoScreen from "../../components/BaseVideo";
import MembersScreen from "../me/members";
import { useWindowDimensions } from 'react-native';
const TempScreen = () => {
	const richText = React.useRef();
	return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <RichEditor
                        ref={richText}
                        onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
                        editorStyle={{backgroundColor:'rgba(0,0,0,0)',color:'#fff'}}
                    />
                </KeyboardAvoidingView>
            </ScrollView>

            <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,actions.insertImage ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            />
        </SafeAreaView>
    );
};
const Search = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [tabsData, setTabsData] = useState([
    {
      active: false,
      name: 'Posts'
    },
    {
      active: false,
      name: 'Users'
    }
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View style={{ height: 760 }}>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <BackIcon width={20} height={20} fill={"#fff"} />
        </View>
        <View>
          <InfoIcon width={20} height={20} fill={"#8c8c8c"} />

        </View>
      </View>
      <View style={{ padding: 20, flexDirection: 'row' }}>
        <ScrollView horizontal={true}>
          {/* <View style={{ width: 150, height: 150, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginRight: 10 }}>
            <Image width={150} height={150} resizeMode="cover" source={require('../../assets/img/s1.png')} />
          </View>
          <View style={{ width: 150, height: 150, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginRight: 10 }}>
            <Image width={150} height={150} resizeMode="cover" source={require('../../assets/img/s1.png')} />
          </View> */}
          <View style={{ width: 150, height: 150, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' }}>
            <AddIcon width={40} height={40} fill="#8c8c8c" />
          </View>
        </ScrollView>

      </View>
      <View style={{ paddingHorizontal: 20, borderBottomColor: '#707070', borderBottomWidth: 0.5 }}>
        <TextInput style={{ fontSize: 16, color: '#8c8c8c' }} value="Add a title" />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {/* <TextInput style={{ color: '#8c8c8c' }} value="Add text" /> */}
        {/* <RenderHtml
          contentWidth={width}
          source={source}
        /> */}
        <TempScreen />
      </View>
      <View style={{ position: 'absolute', bottom: 20, justifyContent: 'center', right: 0, left: 0, flexDirection: 'row' }}>
        <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Post</Text>
        </View>
      </View>
    </View>
  )
}
export default Search;






