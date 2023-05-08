import React, { Component, useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Image, Modal } from "react-native";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { actions, RichEditor, RichToolbar } from "../../components/BaseRich";
import Text from "../../components/BaseText";
import BackIcon from "../../assets/icon_arrow_back.svg";
import CloseIcon from "../../assets/icon_close.svg";

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
import * as ImagePicker from 'react-native-image-picker';

import { uploadObject,uploadFile } from "../../ipfs/service";

import { post } from "../../connectFunctions/BaseLen/post";
import { queryProfile } from "../../database/profile";
import { ethers } from "ethers";
import { Testbaobab } from "../../constants/test-provider";
import { baseHubContractAddress, walletContractAddress } from "../../constants/contract_address";
const BaseHubABI = require('../../abis/BaseHub.json');
const WalletABI = require('../../abis/BaseWallet.json');

const InfoF = ({ headuri, name }) => (
  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <BaseHeadInfo headuri={headuri} name={name} />
    </View>
  </View>
)
const TempScreen = (props) => {
  const richText = React.useRef();
  const [ind, setInd] = useState(-1);
  const { onChangeRichEditor } = props;
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
    <View style={{ flex: 1 }}>
      <View style={{ height: 180, paddingVertical: 10 }}>
        <ScrollView>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <RichEditor
              ref={richText}
              onChange={descriptionText => {
                onChangeRichEditor(descriptionText);
              }}
              placeholder={'Add content'}
              editorStyle={{ backgroundColor: 'rgba(0,0,0,0)', color: '#fff' }}
              initialHeight={150}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>

      <View style={{ flexDirection: 'row', }}>
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
      <ScrollView style={{ flex: 1 }}>
        {ind == 0 && <RichToolbar
          style={{ backgroundColor: 'rgba(255,255,255,0)' }}
          editor={richText}
          actions={[actions.insertImage, actions.insertLink, actions.setBold, actions.insertBulletsList, actions.insertOrderedList, actions.setTextColor, actions.heading2, actions.heading3,]}
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
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>#Base</a>")}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>#Base</Text>
              <Text style={{ fontSize: 10 }}>29.1 views</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>#Acy</a>")}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>#Acy</Text>
              <Text style={{ fontSize: 10 }}>29.1 views</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>#Keep</a>")}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>#Keep</Text>
              <Text style={{ fontSize: 10 }}>29.1 views</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>}
        {ind == 2 && <View style={{ marginTop: 10 }}>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>@Eson</a>")}>
            <View>
              <InfoF name="Eson" headuri="https://i.seadn.io/gcs/files/801294076e0c9ed08eb2aafd911869d1.png?auto=format&w=384" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>@Ali</a>")}>
            <View>
              <InfoF name="Ali" headuri="https://i.seadn.io/gcs/files/c5ecd0af8815131eafbb6c07224e04b2.png?auto=format&w=384" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>@Will</a>")}>
            <View>
              <InfoF name="Will" headuri="https://i.seadn.io/gcs/files/8ba131731c9ce532329d824e3183b9fd.png?auto=format&w=384" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>@Jack</a>")}>
            <View>
              <InfoF name="Jack" headuri="https://i.seadn.io/gcs/files/505425aaa4475f8d3cc6ef9ac121357e.png?auto=format&w=384" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => richText.current.insertHTML("<a href='' style='color:#422ddd'>@Rose</a>")}>
            <View>
              <InfoF name="Rose" headuri="https://i.seadn.io/gcs/files/0a9959a54470aa801d961eee52f53cb4.png?auto=format&w=384" />
            </View>
          </TouchableWithoutFeedback>

        </View>}
      </ScrollView>
    </View>
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
  const [response, setResponse] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [publicationTitle, onChangePublicationTitle] = useState("");
  const [publicationContent, onChangePublicationContent] = useState("")
  const onButtonPress = React.useCallback((type, options) => {
    // setModalVisible(true);
    // return;
    type = 'capture2';
    options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    console.log(options)
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        setImgList(img => [...img, response?.assets[0]?.uri])
      });
    }
    console.log("12345asdfqwerzxcv",imgList)
  }, []);

  const [imgList, setImgList] = useState([]);

  handlerRichEditor = (value) => {
    onChangePublicationContent(value)
  }
  return (
    <View style={{ flex: 1 }}>
      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
        <View>
          <TouchableWithoutFeedback onPress={() => {
            navigation.goBack()
          }}>
            <BackIcon width={20} height={20} fill={"#fff"} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{ padding: 20, flexDirection: 'row' }}>
        <ScrollView horizontal={true}>
          <TouchableWithoutFeedback onPress={onButtonPress}>
            <View style={{ width: 100, height: 100, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' }}>
              <AddIcon width={40} height={40} fill="#8c8c8c" />
            </View>
          </TouchableWithoutFeedback>
          {
            imgList.map(item => <View style={{ width: 100, height: 100, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginLeft: 10 }}>

              <Image style={{ width: 100, height: 100 }} resizeMode="cover" source={{ uri: item }} />
            </View>)

          }

        </ScrollView>

      </View>

      <View style={{ paddingHorizontal: 20, borderBottomColor: '#707070', borderBottomWidth: 0.5 }}>
        <TextInput placeholderTextColor="#8c8c8c" style={{ fontSize: 16, color: '#ffffff' }} placeholder="Add a title" value={publicationTitle} onChangeText={publicationTitle => onChangePublicationTitle(publicationTitle)}/>
      </View>
      <View style={{ paddingHorizontal: 25, flex: 1, overflow: 'hidden' }}>
        <TempScreen onChangeRichEditor={handlerRichEditor} />
        {/* <TextInput style={{ color: '#8c8c8c' }} value="Add text" /> */}
        {/* <RenderHtml
          contentWidth={width}
          source={source}
        /> */}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0)' }}>
        <View style={{ backgroundColor: '#422ddd', padding: 15, borderRadius: 100, width: 300 }}>
          <TouchableWithoutFeedback onPress={async () => {
            const res = await queryProfile()
            const pri = res['private_key']
            const profileId = res['id']
            const walletAddr = res['address']
            const user = new ethers.Wallet(pri,Testbaobab)

            let imgcidList = []
            for(i = 0; i < imgList.length; i++){
              imgcid = await uploadFile(imgList[i], "image/png", user);
              imgcidList.push(imgcid)
            }
            const data = {
              "image":imgcidList,
              "title":publicationTitle,
              "content":publicationContent,
            }
            console.log(data)
            const cid = await uploadObject(data,user);
            console.log(cid)
            const baseWallet = new ethers.Contract(walletContractAddress,WalletABI,Testbaobab)
            const wallet = baseWallet.attach(walletAddr)
            const baseHub = new ethers.Contract(baseHubContractAddress,BaseHubABI,Testbaobab)
            await post(user,wallet,baseHub,profileId,cid)
          }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>Post</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        presentationStyle="fullScreen"
      >
        <View style={styles.centeredView}>
          <View style={{ padding: 10 }}>
            <TouchableWithoutFeedback onPress={() => {
              setModalVisible(false);
            }}>
              <CloseIcon width={25} height={25} fill={'#fff'} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <View><Text>All</Text></View>
            <View style={{ marginHorizontal: 20 }}><Text>Video</Text></View>
            <View><Text>Photo</Text></View>
          </View>

          <ScrollView>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ width: width / 3, height: width / 3 }}>
                <View style={{ margin: 2, flex: 1, backgroundColor: 'yellow', overflow: 'hidden' }}>
                  <Image style={{ width: width / 3, height: width / 3 }} resizeMode="cover" source={{ uri: 'https://bf.jdd001.top/s5.png' }} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
            <View><Text>Shoot</Text></View>
            <View style={{ marginHorizontal: 20 }}><Text>Video</Text></View>
            <View><Text>Album</Text></View>
          </View>
        </View>
      </Modal>
    </View >
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
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#1e1e1e'
  },
}
export default Search;







