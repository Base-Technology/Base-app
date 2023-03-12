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
import HomeIcon from '../../assets/icon_home';
import HomeFullIcon from '../../assets/icon_homefull';
import ChatIcon from '../../assets/icon_chat.svg';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MeFullIcon from '../../assets/icon_mefull.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import MomentFullIcon from '../../assets/icon_momentfull.svg';
import CreateIcon from '../../assets/icon_create.svg';
const { width, height } = Dimensions.get("window");
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba11',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/ks.jpg'),
    poster: { uri: 'https://bf.jdd001.top/s1.png' },
    video: true
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba12',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/img/s2.png'),
    video: true
    // poster: {uri:'https://bf.jdd001.top/s1.png'}
  }
];



const Momnet = ({navigation}) => {
  const renderItem = ({ item }) => (
    <Item {...item} />
  );
  const myScrollView = useRef();
  const Item = ({ title, content, header, poster, video }) => {

    return (
      <View style={styles.item}>
        <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
          <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100, }}
              source={header}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text >Elon Musk</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 8 }}>
                  @dodo.base
                </Text>
              </View>
              <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
                <Text style={{ textAlign: 'center', padding: 0, fontSize: 8 }}>
                  0xebaD...89e1
                </Text>
              </View>
              <Text style={{ marginLeft: 10, fontSize: 8 }}>1 days ago</Text>

            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, overflow: 'hidden' }}>
          {/* <Image source={poster} /> */}
          {
            !video && <BaseSwiper /> || <View style={{ width: width, height: 200 }}>
              <BaseVideo />
            </View>
          }

        </View>
        <View style={{ margin: 20, marginBottom: 0, marginTop: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}>
            <View>
              <BaseText style={{ fontSize: 14, marginBottom: 5 }}>What is Fox Tech?</BaseText>
              <BaseText style={{ lineHeight: 20 }}>Way Network is a universal solution to enable interchain transaction with trustless and valid delivery. It's the first chain-wide interoperability protocol that provides a powerful low-level...
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

            <Text style={{ marginLeft: 5, marginRight: 20 }}>134</Text>
            <FavoriteIcon width={23} height={23} fill="#fff" />
            <Text style={{ marginLeft: 5, marginRight: 20 }}>420</Text>
            <StarIcon width={23} height={23} fill="#fff" />
            <Text style={{ marginLeft: 5, }}>909</Text>
          </View>
          <View>
            <ShareIcon width={23} height={23} fill="#fff" />
          </View>

        </View>

      </View >
    );
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [longText, setLongText] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>

          <SearchIcon width={25} height={25} fill='#fff' />
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
          <HomeIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
          <ChatIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
          <CreateIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
        <MomentFullIcon width={25} height={25} fill={"#fff"} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
          <MeIcon width={25} height={25} fill={"#fff"} />
        </TouchableWithoutFeedback>
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
                <CloseIcon style={{ position: 'absolute', right: 0 }} width={20} height={20} fill="rgba(255,255,255,0.8)" />
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

export default Momnet;