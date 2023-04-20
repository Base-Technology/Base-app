import React, { useState, useCallback, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    useColorScheme,
    ScrollView,
    View,
    Image
} from 'react-native';
import Text from "../../components/BaseText";
import EditIcon from "../../assets/icon_edit.svg";
import CloseIcon from "../../assets/icon_close.svg";
import FavoriteIcon from "../../assets/icon_favorite.svg";
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
import { ScrollTabView, FlatList } from '../../components/BaseHead';

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
        },
        balanceShow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 15,
            paddingBottom: 5,
        },
        balanceSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
        },
        balanceText: {
            lineHeight: 35,
            alignSelf: 'center',
            fontSize: 28.8,
            color: 'white',
        },
        boxSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 35,
        },
        box: {
            // paddingHorizontal: 5.5,
            // paddingVertical: 5.5,
            backgroundColor: '#422DDD',
            height: 35,
            width: 100,
            margin: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 100,
        },
        boxText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 5
        },
        boxHorizontal: {
            height: 35,
            margin: 10,
            paddingHorizontal: 10,
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        boxHorizontalText: {
            color: '#ffffff',
            fontSize: 16,
        },
        view: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        content: {
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        contentTitle: {
            fontSize: 20,
            marginBottom: 12,
        },
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
                flex: 1,
                flexWrap: 'wrap',
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'center',
                color: 'white'
            },
            rightAssetPart: {
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: 'white'
            },
        });
        return (
            <TouchableWithoutFeedback
                underlayColor="rgba(255, 255, 255, 0.08)"
                style={{ borderRadius: 5, padding: 5 }}
                onPress={() => function () { }}>
                <View style={styles.assetContainer}>
                    <View style={styles.leftLogoPart}>
                        <SvgUri width="26" height="26" uri={logoSrc} />

                        <Text style={{ color: '#ffffff',marginLeft:10 }}>{tokenName}</Text>
                    </View>
                    <View style={{ ...styles.rightAssetPart, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'flex-end', color: '#ffffff' }}>0.25</Text>
                        <Text style={{ color: '#ffffff' }}></Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    const [headerHeight, setHeaderHeight] = useState(200);
    const headerOnLayout = useCallback((event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    }, []);
    function TabView1(props) {
        const data = new Array(200).fill({});
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
                    <Text>{'tab1 => ' + index}</Text>
                </View>
            );
        };
        return <FlatList {...props} data={data} renderItem={renderItem} {...props} />;
    }
    const _renderScrollHeader = useCallback(() => {
        const data = new Array(10).fill({});
        return (
            <View onLayout={headerOnLayout}>
                <View style={{ backgroundColor: 'pink' }}>
                    {data.map((o, i) => (
                        <View style={{ marginVertical: 2, padding: 10, borderWidth: 1 }}>
                            <Text>{'header => ' + i}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }, []);
    return (
        <View style={styles.mainContainer}>
            {/* <ScrollTabView headerHeight={headerHeight} renderScrollHeader={_renderScrollHeader}>
                <TabView1 tabLabel="tab1" />
                <TabView1 tabLabel="tab2" />
                <TabView1 tabLabel="tab3" />
            </ScrollTabView> */}
            {/* <AppBar
        title="Wallet"
      /> */}

            <View style={styles.balanceShow}>
                {!isShow ? (
                    <View style={styles.balanceSection}>
                        <Ionicon name="ellipsis-horizontal" size={36} color="#ffffff" />
                        <Ionicon name="ellipsis-horizontal" size={36} color="#ffffff" />
                    </View>
                ) : (
                    <Text style={styles.balanceText}>$ 0.00</Text>
                )}


                <View style={styles.balanceSection}>
                    <IconButton
                        icon={props => (
                            <Ionicon
                                name={isShow ? 'eye' : 'eye-off'}
                                color="#ffffff"
                                {...props}
                            />
                        )}
                        iconColor="#ffffff"
                        size={16}
                        onPress={() => setisShow(!isShow)}
                    />
                </View>
            </View>

            <View style={styles.boxSection}>
                <TouchableWithoutFeedback onPress={() => {navigation.navigate('Send')}}>
                    <View style={styles.box}  >
                        {/* <SendIcon width="15" height="15" fill="#fff" /> */}
                        <Text style={styles.boxText}>Send</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Trade')}>
                    <View style={styles.box}>
                        {/* <SwapIcon width="15" height="15" fill="#fff" /> */}
                        <Text style={styles.boxText}>Swap</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
            <ScrollView
                contentContainerStyle={{ minHeight: '85%' }}
                style={backgroundStyle}>
                {TokenList ? (
                    TokenList.map((tokens,index) => {
                        return (
                            <AssetBox key={index} logoSrc={tokens.logoURI} tokenName={tokens.symbol} />
                        );
                    })
                ) : (
                    <Text>Loading</Text>
                )}
            </ScrollView>

        </View>
    );
};

export default WalletMain;
