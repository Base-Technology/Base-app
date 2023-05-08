
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView, FlatList } from '../../components/BaseHead';
import EditIcon from "../../assets/icon_edit.svg";
import Text from "../../components/BaseText";
import Bg from "../home/Bg";
import TabView1 from "./wallet";
import PostView from "./post";
import HomeIcon from '../../assets/icon_home';
import HomeFullIcon from '../../assets/icon_homefull';
import ChatIcon from '../../assets/icon_chat.svg';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MeFullIcon from '../../assets/icon_mefull.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import MomentFullIcon from '../../assets/icon_momentfull.svg';
import CreateIcon from '../../assets/icon_add_photo.svg';
import { queryProfile } from '../../database/profile';
import { getProfileById } from '../../connectFunctions/BaseLen/Profile';
import { ethers } from "ethers";
import { baseHubContractAddress } from "../../constants/contract_address";
import { provider } from "../../constants/test-provider";
import { useQuery, gql } from '@apollo/client';
import { downloadFile } from '../../ipfs/service';
import { Buffer } from 'buffer';
const BaseHubABI = require('../../abis/BaseHub.json');
function TabView2(props) {
    return (
        <ScrollView {...props}>
            <TabView1 {...props} />
        </ScrollView>
    );
}
function FollowerCount({ profileId }) {
    console.log("follwerCount profile",profileId)
    const { loading, error, data } = useQuery(gql`{
        profile(id: "${profileId}") {
          followerCount
        }
      }`);
      console.log("data",data)
    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>Error :</Text>;
    if(data['profile']) return (
        <Text>
            {JSON.stringify(data['profile']['followerCount'])}
        </Text>
    );
}
function FollowingCount( {profileId }){
    const GET_DATA = gql`{
        profile(id: "${profileId}") {
          followingCount
        }
      }`
    const { loading, error, data } = useQuery(GET_DATA);
    if (loading) return <Text>Loading ...</Text>;
    if (error) return <Text>Error :</Text>;

    if(data['profile']) return (
        <Text>
            {JSON.stringify(data['profile']['followingCount'])}
        </Text>
    );
}
export default function Example({ navigation }) {
    const [headerHeight, setHeaderHeight] = useState(200);
    const [icon, setIcon] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [profileId, setProfileId] = useState(0)
    const [userAddr, setUserAddr] = useState()
    const loadIcon = async () => {
        if (icon) {
            return;
        }
        const profile = await queryProfile();
        if (profile) {
            const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, provider);
            const res = await getProfileById(baseHub, profile.id);
            setUsername(res[3]);
            setProfileId(parseInt(profile.id, 16));
            const user = new ethers.Wallet(profile.private_key, provider);
            console.log(user.address)
            const address = user.address.substring(0,6)+'...'+user.address.substring(user.address.length-5,user.address-1)
            setUserAddr(address)
            const data = await downloadFile(res[4], user.address, user);
            setIcon({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` });
        } else {
            setIcon(require('../../assets/ks.jpg'));
        }
    }
    
    loadIcon();
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
                                // source={require('../../assets/ks.jpg')}
                                source={icon}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 18 }}>{username}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {username}
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
                                    <Text style={{ textAlign: 'center', padding: 0 }}>
                                        {userAddr}
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
                        Elon Musk is an Ethereum zkRollup using zkEVM (zero-knowledge Ethereum Virtual Machine) and zk-FOAKs (zero-knowledge Fast Objective Argument of Knowledge).
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 20, marginTop: 0 }}>
                    <Text style={{ marginLeft: 5, marginRight: 15, fontSize: 16, color: '#fff' }}>

                        <FollowingCount profileId={profileId}/>

                        <Text>Following</Text></Text>
                    <Text style={{ marginLeft: 5, fontSize: 16, color: '#fff' }}>
                        <FollowerCount profileId={profileId}/>
                        <Text>Followers</Text>
                    </Text>
                </View>
                {/* </ImageBackground> */}

            </View>
        );
    }, [icon, profileId]);

    return (
        <View style={styles.container}>
            <ScrollTabView headerHeight={headerHeight} renderScrollHeader={_renderScrollHeader}>
                {/* <TabView1 tabLabel="Wallet" /> */}
                <TabView2 navigation={navigation} tabLabel="Wallet" />
                <ScrollView tabLabel="Posts" >
                    <PostView key="p1" />
                </ScrollView>
                <ScrollView tabLabel="Likes" >
                    <PostView key="p3" />
                </ScrollView>
                <ScrollView tabLabel="Collects" >
                    <PostView key="p2" />
                </ScrollView>


                {/* <TabView1 tabLabel="Posts" />
                <TabView1 tabLabel="Collects" />
                <TabView1 tabLabel="Likes" /> */}
            </ScrollTabView>
            <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                    <HomeIcon width={30} height={30} fill={"#fff"} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
                    <ChatIcon width={30} height={30} fill={"#fff"} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
                    <CreateIcon width={30} height={30} fill={"#fff"} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Moment')}>
                    <MomentIcon width={30} height={30} fill={"#fff"} />

                </TouchableWithoutFeedback>
                <MeFullIcon width={30} height={30} fill={"#fff"} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}); 30