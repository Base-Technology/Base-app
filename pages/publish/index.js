import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { actions, RichEditor, RichToolbar } from "../../components/BaseRich";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_arrow_back.svg";
import AddIcon from "../../assets/icon_add_big.svg";
import InfoIcon from "../../assets/icon_info.svg";
import FormatIcon from "../../assets/icon_format_list.svg";
import BoldIcon from "../../assets/icon_bold.svg";
import ImageIcon from "../../assets/icon_image.svg";
import ListIcon from "../../assets/icon_list.svg";
import ListOrderIcon from "../../assets/icon_list_order.svg";
import ColorIcon from "../../assets/icon_color.svg";
import VideoScreen from "../../components/BaseVideo";
import MembersScreen from "../me/members";
import { useWindowDimensions } from 'react-native';
import { BaseHeadInfo } from "../../components/Base";

const InfoF = ({ headuri }) => (
  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <BaseHeadInfo headuri={headuri} name="Enjin" />
    </View>
  </View>
)
const TempScreen = () => {
  const richText = React.useRef();
  const [ind, setInd] = useState(-1);
  const ToolIcon = ({ icon, title, desc }) => {
    return (<View style={{ flexDirection: 'row', marginTop: 10 }}>
      <View style={{ borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
        {icon}
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 3 }}>
        <Text style={{ lineHeight: 16, color: '#fff', fontSize: 14 }}>{title}</Text>
        <Text style={{ lineHeight: 12, fontSize: 8 }}>{desc}</Text>
      </View>

    </View>);
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log("descriptionText:", descriptionText);
            }}
            placeholder={'Add content'}
            editorStyle={{ backgroundColor: 'rgba(0,0,0,0)', color: '#fff' }}
            initialHeight={150}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback onPress={() => {
          setInd(1);
        }}>
          <View style={styles.block}>
            <Text>
              # Topic
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setInd(2)}>

          <View style={styles.block}>
            <Text>
              @ User
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setInd(0)}>

          <View style={styles.block}>
            <FormatIcon width={10} height={10} fill="#fff" style={{ marginRight: 5 }} />
            <Text>
              Format
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {ind == 0 && <RichToolbar
        style={{ backgroundColor: 'rgba(255,255,255,0)' }}
        editor={richText}
        actions={[actions.insertLink, actions.setBold, actions.insertBulletsList, actions.insertOrderedList, actions.setTextColor, actions.heading2, actions.heading3, actions.insertImage,]}
        iconMap={{
          [actions.setBold]: () => (<ToolIcon icon={<BoldIcon width={20} height={20} fill="#fff" />} title='Bold' desc='Make text bold' />),
          [actions.insertBulletsList]: () => (<ToolIcon icon={<ListIcon width={20} height={20} fill="#fff" />} title='Bulleted List' desc='Create a simple list' />),
          [actions.insertOrderedList]: () => (<ToolIcon icon={<ListOrderIcon width={20} height={20} fill="#fff" />} title='Ordered List' desc='Create a number list' />),
          [actions.setTextColor]: () => (<ToolIcon icon={<ColorIcon width={20} height={20} fill="#fff" />} title='Color' desc='Choose a text color' />),
          [actions.heading2]: () => (<ToolIcon icon={<Text>H2</Text>} title='Heading 2' desc='Large section heading' />),
          [actions.heading3]: () => (<ToolIcon icon={<Text>H3</Text>} title='Heading 3' desc='Medium section heading' />),
          [actions.insertImage]: () => (<ToolIcon icon={<ImageIcon width={20} height={20} fill="#fff" />} title='Image' desc='Embed an image' />),
        }}
      />}
      {ind == 1 && <View style={{ marginTop: 10 }}>
        <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href=''>#Base</a>")}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
            <Text>#Base</Text>
            <Text style={{ fontSize: 10 }}>29.1 views</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
          <Text>#Acy</Text>
          <Text style={{ fontSize: 10 }}>2 views</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
          <Text>#Keep</Text>
          <Text style={{ fontSize: 10 }}>1 views</Text>
        </View>
      </View>}
      {ind == 2 && <View style={{ marginTop: 10 }}>
        <InfoF headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
        <InfoF headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
        <InfoF headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
        <InfoF headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
        <InfoF headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />

      </View>}
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
            <Image width={150} height={150} resizeMode="cover" source={{uri:'https://bf.jdd001.top/s1.png'}} />
          </View>
          <View style={{ width: 150, height: 150, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginRight: 10 }}>
            <Image width={150} height={150} resizeMode="cover" source={{uri:'https://bf.jdd001.top/s1.png'}} />
          </View> */}
          <View style={{ width: 150, height: 150, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' }}>
            <AddIcon width={40} height={40} fill="#8c8c8c" />
          </View>
        </ScrollView>

      </View>
      <View style={{ paddingHorizontal: 20, borderBottomColor: '#707070', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" style={{ fontSize: 16, color: '#ffffff' }} placeholder="Add a title" />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
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
const styles = {
  block: {
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
export default Search;







