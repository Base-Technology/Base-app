import React, { useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  TextInput
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppBar } from '@react-native-material/core';
import { IconButton } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import Modal from 'react-native-modal';
import { TokenList } from '../../constants/token_list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SendIcon from '../../assets/icon_send.svg';
import ReceiveIcon from '../../assets/icon_receive.svg';
import SwapIcon from '../../assets/icon_swap.svg';
import MoreIcon from '../../assets/icon_more.svg';
import MoreVertIcon from '../../assets/icon_more_vert.svg';

const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [isShow, setisShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 20
    }
  });

  // Card for assets list
  const AssetBox = ({ logoSrc, tokenName }) => {
    const styles = StyleSheet.create({
      assetContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 5,

      },
      leftLogoPart: {
        flex: 0.2,
        flexWrap: 'wrap',
      },
      leftNamePart: {
        flex: 0.8,
        justifyContent: 'flex-start',
        color: 'white'
      },
      rightAssetPart: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: 'white'
      },
    });
    return (
      <View style={styles.assetContainer}>
        <View style={styles.leftLogoPart}>
          <SvgUri width="26" height="26" uri={logoSrc} />
        </View>
        <View style={styles.leftNamePart}>
          <Text style={{ color: '#ffffff' }}>{tokenName}</Text>
        </View>
        <View style={{ ...styles.rightAssetPart, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ alignSelf: 'flex-end', color: '#ffffff' }}>0.25</Text>
          <Text style={{ color: '#ffffff' }}></Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <AppBar
        title="Wallet"
      /> */}
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: '#ffffff' }}

        defaultValue="Recipient's address"
      />
      <Text style={{ marginTop: 20, color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Recents</Text>
      <TouchableWithoutFeedback
        underlayColor="rgba(255, 255, 255, 0.08)"
        onPress={() => function () { }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ backgroundColor: 'gray', width: 50, height: 50, borderRadius: 100 }}></View>
          <Text style={{ color: '#fff', marginLeft: 30 }}>0x818D...18B7</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        underlayColor="rgba(255, 255, 255, 0.08)"
        onPress={() => function () { }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ backgroundColor: 'gray', width: 50, height: 50, borderRadius: 100 }}></View>
          <Text style={{ color: '#fff', marginLeft: 30 }}>0x818D...18B7</Text>
        </View>
      </TouchableWithoutFeedback>
      
    </View>
  );
};

export default WalletMain;
// import React, { useState, useCallback } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { ScrollTabView, ScrollView, FlatList } from 'react-native-scroll-head-tab-view';

// function TabView1(props) {
//     const data = new Array(200).fill({});
//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
//                 <Text>{'tab1 => ' + index}</Text>
//             </View>
//         );
//     };
//     return <FlatList {...props} data={data} renderItem={renderItem} {...props} />;
// }

// function TabView2(props) {
//     const data = new Array(100).fill({});
//     const renderItem = ({ item, index }) => {
//         return (
//             <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
//                 <Text>{'tab2 => ' + index}</Text>
//             </View>
//         );
//     };
//     return <FlatList data={data} renderItem={renderItem} {...props} />;
// }

// function TabView3(props) {
//     const data = new Array(20).fill({});
//     return (
//         <ScrollView {...props}>
//             {data.map((o, i) => (
//                 <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
//                     <Text>{'tab3 => ' + i}</Text>
//                 </View>
//             ))}
//         </ScrollView>
//     );
// }

// export default function Example() {
//     const [headerHeight, setHeaderHeight] = useState(200);
//     const headerOnLayout = useCallback((event: any) => {
//         const { height } = event.nativeEvent.layout;
//         setHeaderHeight(height);
//     }, []);

//     const _renderScrollHeader = useCallback(() => {
//         const data = new Array(10).fill({});
//         return (
//             <View onLayout={headerOnLayout}>
//                 <View style={{ backgroundColor: 'pink' }}>
//                     {data.map((o, i) => (
//                         <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
//                             <Text>{'header => ' + i}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </View>
//         );
//     }, []);

//     return (
//         <View style={styles.container}>
//             <ScrollTabView headerHeight={headerHeight} renderScrollHeader={_renderScrollHeader}>
//                 <TabView1 tabLabel="tab1" />
//                 <TabView2 tabLabel="tab2" />
//                 <TabView3 tabLabel="tab3" />
//             </ScrollTabView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// /* eslint-disable react-native/no-color-literals */
// import React, { Component } from 'react';
// import {
//     View, Text, StyleSheet, Animated, PixelRatio, Dimensions,
// } from 'react-native';

// function getUIPt(px) {
//     const { width } = Dimensions.get('window');
//     return PixelRatio.roundToNearestPixel((px * width) / 750);
// }

// export default class TestPage9 extends Component {
//     scrollY = new Animated.Value(0)

//     constructor(props) {
//         super(props);
//         this.state = {
//             list: null,
//             topIndexList: [], // 被指定的index
//             pageNum: 0,
//             isLoading: false,
//         };
//     }

//     timer1=null

//     // 模拟请求接口的
//     getTempList= (from) => {
//         const { list, topIndexList, pageNum } = this.state;
//         console.log("getTempList", from, list, topIndexList, pageNum);
//         if (this.timer1) {
//             clearTimeout(this.timer1);
//         }
//         this.setState({ isLoading: true });
//         this.timer1 = setTimeout(() => {
//             if (!list) {
//                 topIndexList.push(0);
//                 this.setState({
//                     list: [{ title: `0我是一个准备置顶的`, stickable: true }, ...this.randomDate()],
//                     topIndexList,
//                     pageNum: pageNum + 1,
//                     isLoading: false,
//                 });
//             } else if (list && pageNum < 5) {
//                 topIndexList.push(list.length);
//                 list.push({ title: `${list.length}我是一个准备置顶的`, stickable: true });
//                 list.push(...this.randomDate());
//                 this.setState({
//                     list, topIndexList, pageNum: pageNum + 1, isLoading: false,
//                 });
//             } else {
//                 this.setState({ isLoading: false });
//             }
//         }, 300);
//     }

//     // 瞎几把随机数据的
//     randomDate() {
//         const tempDate = parseInt(Math.random() * 80, 10) + 1;
//         const arr = [];
//         for (let index = 0; index < tempDate; index++) {
//             arr.push({ title: `我是一个普通的列表数据¥${index}`, stickable: false });
//         }
//         return arr;
//     }

//     renderItem = ({ item, index }) => {
//         const { stickable, title } = item;
//         if (stickable) {
//             return (
//                 <View>
//                     <Text style={styles.stickableTitle}>{title}</Text>
//                 </View>
//             );
//         }
//         return (
//             <View>
//                 <Text style={styles.originTitle}>{title}</Text>
//             </View>
//         );
//     }

//     componentDidMount() {
//         this.getTempList(0);
//     }

//     componentWillUnmount() {
//         if (this.timer1) {
//             clearTimeout(this.timer1);
//         }
//     }

//     renderFooter = (isLoading, pageNum, dataList) => {
//         const listLength = dataList.length;
//         if (listLength <= 3) {
//             return (

//                 <View style={{ height: (5 - listLength) * getUIPt(100) }} />
//             );
//         }
//         if (isLoading && pageNum > 1) {
//             return (<Text>加载中…</Text>);
//         }
//         return null;
//     };

//     render() {
//         const {
//             list, topIndexList, pageNum, isLoading,
//         } = this.state;
//         return (
//             <View style={styles.Container}>
//                 <HeaderLayout />
//                 {/* <MyFilter scrollY={this.scrollY} /> */}
//                 { (!!list && list.length > 0&& (
//                     <Animated.FlatList
//                         contentContainerStyle={styles.FlatListContainer}
//                         data={list}
//                         ListFooterComponent={() => this.renderFooter(isLoading, pageNum, list)}
//                         renderItem={this.renderItem}
//                         keyExtractor={(item, index) => `${index}`}
//                         showsVerticalScrollIndicator={false}
//                         stickyHeaderIndices={topIndexList}
//                         scrollEventThrottle={1}
//                         onEndReached={() => { this.getTempList(1); }}
//                         onEndReachedThreshold={0.3}
//                         onScroll={
//                             Animated.event(
//                                 [
//                                     {
//                                         nativeEvent: {
//                                             contentOffset: { y: this.scrollY },
//                                         },
//                                     },
//                                 ],
//                                 {
//                                     useNativeDriver: true,


//                                 }
//                             )
//                         }
//                     />
//                 ))}
//             </View>
//         );
//     }
// }
// class MyFilter extends Component {
//     render() {
//         const { scrollY } = this.props;
//         const translateY = scrollY.interpolate({
//             inputRange: [0, getUIPt(230), getUIPt(230) + 1],
//             outputRange: [getUIPt(230), 0, 0],
//         });
//         return (
//             <Animated.View style={[styles.MyFilterContaioner, { transform: [{ translateY }] }]}>
//                 <Text style={styles.MyFilterContaionerLabel}>我是赛选条件，我需要固定</Text>
//             </Animated.View>
//         );
//     }
// }
// class HeaderLayout extends Component {
//     render() { return (<Text style={styles.headerLayout}>我是一个很高的头部固定的</Text>); }
// }
// const styles = StyleSheet.create({
//     headerLayout: {
//         position: 'absolute',
//         backgroundColor: '#FEEBC9',
//         width: getUIPt(750),
//         height: getUIPt(230),
//         lineHeight: getUIPt(230),
//         textAlign: 'center',

//     },
//     FlatListContainer: {
//         paddingTop: getUIPt(230),
//         // marginTop: getUIPt(80),
//         paddingBottom: getUIPt(80),
//     },
//     Container: {

//     },
//     MyFilterContaioner: {

//         position: 'absolute',
//         zIndex: 3,
//         top: 0,
//     },
//     MyFilterContaionerLabel: {
//         lineHeight: getUIPt(80),
//         height: getUIPt(80),
//         textAlign: 'center',
//         backgroundColor: '#70BB66',
//         color: '#000',
//         width: getUIPt(750),
//     },
//     stickableTitle: {
//         color: '#fff',
//         backgroundColor: '#A0BB66',
//         lineHeight: getUIPt(80),
//     },
//     originTitle: {
//         height: getUIPt(84),
//         backgroundColor: '#A0BBE7',
//         color: '#999',
//     },
// });