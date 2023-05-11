import React, { useRef, useState } from 'react';
import ShareIcon from "../../assets/icon_share.svg";
import StarIcon from "../../assets/icon_star.svg";
import CloseIcon from "../../assets/icon_close.svg";
import SearchIcon from "../../assets/icon_search.svg";
import FavoriteIcon from "../../assets/icon_favorite.svg";
import CommentIcon from "../../assets/icon_comment.svg";
import { SafeAreaView, ScrollView, Alert, View, FlatList, StyleSheet, Image, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import Text from '../home/BaseText'
import { Tooltip, Button } from '@ui-kitten/components';
import { BaseSwiper, BaseVideo, BaseText } from '../../components/Base';
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

import { useQuery, gql } from '@apollo/client';
import { string } from 'prop-types';
import { ethers } from "ethers";

import { queryProfile } from "../../database/profile";
import { Buffer } from 'buffer';
import { downloadFile, downloadObject } from "../../ipfs/service";
import { Testbaobab } from "../../constants/test-provider";
import { collect } from "../../connectFunctions/BaseLen/collect";
import { mirror } from "../../connectFunctions/BaseLen/mirror";

import { baseHubContractAddress, walletContractAddress } from "../../constants/contract_address";
import { getProfileById } from '../../connectFunctions/BaseLen/Profile';
import { iterateObserversSafely } from '@apollo/client/utilities';
import RenderHtml from 'react-native-render-html'

const BaseHubABI = require('../../abis/BaseHub.json');
const WalletABI = require('../../abis/BaseWallet.json');
const { width, height } = Dimensions.get("window");
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba11',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/ks.jpg'),
    poster: { uri: 'https://bf.jdd001.top/s1.png' }
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba12',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/img/s2.png'),
    video: true
    // poster: {uri:'https://bf.jdd001.top/s1.png'}
  }
];


const GET_DATA = gql`{
  publications{
    id,
    profileId,
    pubId,
    contentURI,
    timestamp,
    collectModule,
    collectModuleReturnData,
    referenceModule,
    referenceModuleReturnData,
    commentCount
  }
}`
const Publication = ({ privateKey }) => {
  if (!privateKey) return
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error :</Text>;
  const views = [];

  if (data) {
    if (data['publications']) {
      const publications = data['publications']
      for (i = 0; i < publications.length; i = i + 1) {
        views.push(
          <Item key={i} profileId={publications[i]['profileId']} privateKey={privateKey} contentURI={publications[i]['contentURI']} timestamp={publications[i]['timestamp']} commentCount={publications[i]['commentCount']} pubId={publications[i]['pubId']} />
        );
      }
    }
  }
  return (
    <View>
      {views.map((view, index) => {
        return view;
      })}
      <View style={{ height: 100 }}></View>
    </View>
  );
}
const Item = (props) => {
  if (props.profileId <= 22)
    return
  const { width } = useWindowDimensions()
  const [modalVisible, setModalVisible] = useState(false);
  const [icon, setIcon] = useState(undefined)
  const [username, setUsername] = useState(undefined)
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const [userAddr, setUserAddr] = useState('')
  const [time, setTime] = useState("")
  const [longText, setLongText] = useState(false);
  const myScrollView = useRef();

  const getdata = async (profileID, privateKey, contentURI, timestamp) => {
    user = new ethers.Wallet(privateKey, Testbaobab)
    const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, Testbaobab);
    const baseWallet = new ethers.Contract(walletContractAddress, WalletABI, Testbaobab)
    const profileOwner = await baseHub.callStatic.ownerOf(profileID)
    const wallet = await baseWallet.attach(profileOwner)
    const owner = await wallet.getOwners()

    const address = owner[0].substring(0, 6) + '...' + owner[0].substring(user.address.length - 5, user.address - 1)
    setUserAddr(address)
    const res = await getProfileById(baseHub, profileID);
    setUsername(res[3])
    const data = await downloadFile(res[4], owner[0], user)
    setIcon({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` })

    const object = await downloadObject(contentURI, owner[0], user);

    setTitle(object.title);
    const content = {
      html: `
  ${object.content}`
    }
    setContent(content)
    let imgs = []
    for (i = 0; i < object.image.length; i++) {
      const imgdata = await downloadFile(object.image[i], owner[0], user);
      imgs = [...imgs, { uri: `data:image/jpeg;base64,${Buffer.from(imgdata).toString('base64')}` }]
    }
    setImage(imgs);
    const t = new Date(parseInt(timestamp) * 1000).toLocaleString()
    setTime(t)
  }
  getdata(props.profileId, props.privateKey, props.contentURI, props.timestamp)
  return (
    <View style={styles.item}>
      <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
        <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100, }}
            source={icon}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text >{username}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 8 }}>
                @dodo.base
              </Text>
            </View>
            <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
              <Text style={{ textAlign: 'center', padding: 0, fontSize: 8 }}>
                {userAddr}
              </Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 8 }}>{time}</Text>

          </View>
        </View>
      </View>
      <View style={{ marginTop: 10, overflow: 'hidden' }}>
        {/* <Image source={poster} /> */}
        {
          <BaseSwiper imgs={image} />
        }

      </View>
      <View style={{ margin: 20, marginBottom: 0, marginTop: 10 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(true);
          }}>
          <View>
            <BaseText style={{ fontSize: 14, marginBottom: 5 }}>{title}</BaseText>
            <BaseText style={{ lineHeight: 20 }}>
              <RenderHtml
                baseStyle={{ color: "white" }}
                contentWidth={width}
                source={content}
              />
            </BaseText>
          </View>

        </TouchableWithoutFeedback>

        <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <BaseText>
            More
          </BaseText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);

              setTimeout(() => {
                setLongText(!longText);

                if (!longText) {
                  myScrollView.current.scrollTo({ x: 0, y: 300, animated: true });

                }

              }, 100);
              // myScrollView.scrollTo({ x: 0, y: 100, animated: true })
            }}
          >
            <CommentIcon width={23} height={23} fill="#fff" />
          </TouchableWithoutFeedback>

          <Text style={{ marginLeft: 5, marginRight: 20 }}>{props.commentCount}</Text>
          <FavoriteIcon width={23} height={23} fill="#fff" />
          <Text style={{ marginLeft: 5, marginRight: 20 }}>420</Text>
          <TouchableWithoutFeedback
            onPress={async () => {
              console.log("start ")
              const res = await queryProfile()
              const pri = res['private_key']
              const profileId = res['id']
              const walletAddr = res['address']
              const user = new ethers.Wallet(pri, Testbaobab)

              const baseWallet = new ethers.Contract(walletContractAddress, WalletABI, Testbaobab)
              const wallet = baseWallet.attach(walletAddr)
              const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, Testbaobab)

              await collect(user, wallet, baseHub, profileId, props.profileId, props.pubId,)
              console.log("collected...")
            }}
          >
            <StarIcon width={23} height={23} fill="#fff" />
          </TouchableWithoutFeedback>
          <Text style={{ marginLeft: 5, }}>909</Text>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={async () => {
              console.log("start ")
              const res = await queryProfile()
              const pri = res['private_key']
              const profileId = res['id']
              const walletAddr = res['address']
              const user = new ethers.Wallet(pri, Testbaobab)

              const baseWallet = new ethers.Contract(walletContractAddress, WalletABI, Testbaobab)
              const wallet = baseWallet.attach(walletAddr)
              const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, Testbaobab)

              await mirror(user, wallet, baseHub, profileId, props.profileId, props.pubId)
              console.log("mirror...")
            }}
          >
            <ShareIcon width={23} height={23} fill="#fff" />
          </TouchableWithoutFeedback>
        </View>

      </View>

    </View >
  );
}
const Momnet = ({ navigation }) => {
  const [privateKey, setPrivateKey] = useState();

  const profile = async () => {
    const profile = await queryProfile()
    let privateKey = profile['private_key']
    setPrivateKey(privateKey)
  }
  profile()
  const renderItem = () => (
    <Publication privateKey={privateKey} />
  );
  const myScrollView = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [longText, setLongText] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
          <View style={{ ...styles.modalView, height: longText && 600 || 500 }}>
            {/* <Text style={styles.modalText}>Hello World!</Text>

            <TouchableWithoutFeedback
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableWithoutFeedback> */}
            <View style={{ flex: 1, flexDirection: 'column', borderTopColor: 'rgba(255,255,255,0.1)', paddingLeft: 10, paddingRight: 10 }}>
              <View style={{ position: 'relative', minHeight: 40 }}>
                <BaseText style={{ textAlign: 'left', fontSize: 14 }}>{longText && 'zkEVM Overview' || "What is Fox Tech?"}</BaseText>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <CloseIcon style={{ position: 'absolute', right: 0 }} width={20} height={20} fill="rgba(255,255,255,0.8)" />
                </TouchableWithoutFeedback>
              </View>
              <ScrollView
                style={{ flex: 1 }}
                ref={myScrollView}
              >
                <BaseText>Fox is an Ethereum zkRollup using zkEVM (zero-knowledge Ethereum Virtual Machine) and zk-FOAKs (zero-knowledge Fast Objective Argument of Knowledge). Fox redesigns the zkEVM which is more efficient than all the existing zkEVMs by optimizing the structure of the zkEVM. In addition, given the EVM opcode compatibility, zk-FOAKs is designed to verify state changes efficiently. It promises not only to be secure and efficient but also to accomplish competitive decentralization. </BaseText>
                {
                  longText && <BaseText style={{ marginTop: 10 }}>Fox Sequencer runs an Ethereum node, receives transactions from the users, generates new states and a special zkEVM-friendly execution trace. Fox Folder is the proof generator, taking the trace from the sequencer, and processing it inside the zkEVM using a large number of small tables, rather than a surprisingly large table, which will significantly reduce the redundancy and increase the speed of generating proofs.
                    Fox Tech aims to improve scalability and performance in blockchains by providing cryptographic proofs that are zero-knowledge with a quantum secure, fully EVM-compatible, and non-trusted setup. It initiates a strong proof network, combining software and hardware to support fast, reliable generation and verification of computational integrity proofs for general computations, on which the universal dApps can easily be deployed and get their compatibility. These includes:
                    100% EVM compatible
                    20,000+ TPS targeted
                    $0.01 Gas level targeted
                    Special Layer 3 Design, Open to C++/Rust/Move dAppChain </BaseText>
                }

                <BaseText style={{ color: 'gray', fontSize: 12, marginTop: 10 }}>Today 11:09</BaseText>
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', marginTop: 10, marginBottom: 10 }}>

                </View>
                <BaseText style={{ fontSize: 12, marginBottom: 10 }}>9837 comments</BaseText>
                <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 100, }}
                      source={require('../../assets/ks.jpg')}
                    />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <View style={{ flex: 1 }}>
                        <BaseText>Ali</BaseText>
                        <BaseText>Special Layer 3 Design, </BaseText>
                        <BaseText style={{ color: 'gray', fontSize: 10 }}>Yesterday 00:01 </BaseText>

                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <FavoriteIcon width={23} height={23} fill="#fff" />
                        <Text style={{ marginLeft: 5, }}>909</Text>
                      </View>

                    </View>
                    <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'flex-start' }}>
                      <View style={{ width: 30, height: 30, borderRadius: 40, marginRight: 5 }}>
                        <Image
                          style={{ width: 30, height: 30, borderRadius: 100, }}
                          source={{ uri: 'https://bf.jdd001.top/s1.png' }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <BaseText>Dodo</BaseText>
                        <BaseText>Special Layer 3 Design, </BaseText>
                        <BaseText style={{ color: 'gray', fontSize: 10 }}>Yesterday 00:01 </BaseText>
                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <FavoriteIcon width={23} height={23} fill="#fff" />
                        <Text style={{ marginLeft: 5, }}>909</Text>
                      </View>
                    </View>

                  </View>

                </View>
                <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 100, }}
                      source={{ uri: 'https://bf.jdd001.top/s1.png' }}
                    />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      <View style={{ flex: 1 }}>
                        <BaseText>Ali</BaseText>
                        <BaseText>Special Layer 3 Design, </BaseText>
                        <BaseText style={{ color: 'gray', fontSize: 10 }}>Yesterday 00:01 </BaseText>

                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <FavoriteIcon width={23} height={23} fill="#fff" />
                        <Text style={{ marginLeft: 5, }}>909</Text>
                      </View>

                    </View>
                    <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'flex-start' }}>
                      <View style={{ width: 30, height: 30, borderRadius: 40, marginRight: 5 }}>
                        <Image
                          style={{ width: 30, height: 30, borderRadius: 100, }}
                          source={require('../../assets/img/s2.png')}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <BaseText>Dodo</BaseText>
                        <BaseText>Special Layer 3 Design, </BaseText>
                        <BaseText style={{ color: 'gray', fontSize: 10 }}>Yesterday 00:01 </BaseText>
                      </View>
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                        <FavoriteIcon width={23} height={23} fill="#fff" />
                        <Text style={{ marginLeft: 5, }}>909</Text>
                      </View>
                    </View>

                  </View>

                </View>
              </ScrollView>

              <View style={{ borderRadius: 100, backgroundColor: 'rgba(0,0,0,0.3)', paddingLeft: 10, paddingRight: 10 }}>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', color: 'gray', }}
                  defaultValue="Write a comment"
                />
              </View>

            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  itemc: {
    display: 'flex',
    flexDirection: 'row',

  },
  title: {
    marginTop: 5,
    color: '#fff'
  },
  content: {
    color: 'rgba(255,255,255,0.9)'
  },
  time: {
    color: '#fff'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    height: 600,
    backgroundColor: "#1e1e1e",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default React.memo(Momnet);