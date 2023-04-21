
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { ScrollTabView, ScrollView, FlatList } from '../../components/BaseHead';
import EditIcon from "../../assets/icon_edit.svg";
import Text from "../../components/BaseText";
import Bg from "../home/Bg";
import TabView1 from "./walletGroup";
import PostView from "./post";
import MembersView from "./members";
// function TabView2(props) {
//     return (
//         <ScrollView {...props}>
//             <TabView1 />
//         </ScrollView>
//     );
// }

export default function Example(props) {
    const {name,header}=props;
    const [headerHeight, setHeaderHeight] = useState(200);
    const headerOnLayout = useCallback((event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    }, []);

    const _renderScrollHeader = useCallback(() => {
        const data = new Array(10).fill({});
        return (
            <View style={{ position: 'relative', overflow: 'hidden' }} onLayout={headerOnLayout}>
                <Bg img={{ uri: 'https://bf.jdd001.top/s1.png' }} />

                {/* <ImageBackground source={{uri:'https://bf.jdd001.top/s1.png'}} blurRadius={10} style={styles.image}> */}
                <View style={{ margin: 20, marginTop: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 50, height: 50, borderRadius: 40, marginRight: 10 }}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 100, }}
                                source={{ uri: header }}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>{name}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        @dodo.base
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
                                    <Text style={{ textAlign: 'center', padding: 0 }}>
                                        0xebaD...89e1
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <EditIcon width={25} height={25} fill="gray" />

                    </View>
                </View>
                <View style={{ margin: 20, marginTop: 0 }}>
                    <Text style={{ fontSize: 14 }}>
                        {name} is an Ethereum zkRollup using zkEVM (zero-knowledge Ethereum Virtual Machine) and zk-FOAKs (zero-knowledge Fast Objective Argument of Knowledge).
                    </Text>
                </View>
                <View style={{ flexDirection: 'row',alignItems:'center', margin: 20, marginTop: 0 }}>
                    <Text style={{ marginLeft: 5, marginRight: 15, fontSize: 16, color: '#fff' }}>$999 <Text>Treasury</Text></Text>
                    <Text style={{ marginLeft: 5, fontSize: 16, color: '#fff' }}>34 <Text>Members</Text></Text>
                    <View style={styles.box}  >
                        <Text style={styles.boxText}>Claim Airdrop</Text>
                    </View>
                </View>
                {/* </ImageBackground> */}

            </View>
        );
    }, []);

    return (
        <View style={styles.container}>
            <ScrollTabView headerHeight={headerHeight} renderScrollHeader={_renderScrollHeader}>
                <ScrollView tabLabel="Treasury" >
                    <TabView1 />
                </ScrollView>
                <ScrollView tabLabel="Posts" >
                    <PostView />
                </ScrollView>
                <ScrollView tabLabel="Members" >
                    <MembersView />
                </ScrollView>
            </ScrollTabView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        marginLeft:20,
        backgroundColor: '#422DDD',
        height: 25,
        paddingHorizontal:10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 100,
    },
    boxText: {
        color: 'white',
        fontSize: 14,
    },
});