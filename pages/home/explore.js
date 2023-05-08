import React, { useState, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  TextInput,
  Image,
  View,
  RefreshControl
} from 'react-native';
import ShareIcon from "../../assets/icon_share.svg";

import Text from "../../components/BaseText";
import { useQuery, gql } from '@apollo/client';
import { string } from 'prop-types';
import { ethers } from "ethers";

import { queryProfile } from "../../database/profile";
import { Buffer } from 'buffer';
import { downloadFile, downloadObject } from "../../ipfs/service";
import { Testbaobab } from "../../constants/test-provider";

import { baseHubContractAddress, walletContractAddress } from "../../constants/contract_address";
import { getProfileById } from '../../connectFunctions/BaseLen/Profile';
const BaseHubABI = require('../../abis/BaseHub.json');
const WalletABI = require('../../abis/BaseWallet.json');

const GET_DATA = gql`{
    publications{
      id,
      profileId,
      pubId,
      contentURI,
      collectModule,
      collectModuleReturnData,
      referenceModule,
      referenceModuleReturnData
    }
}`
const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  list: {
    display: "flex",
    margin:3,
    flexDirection: 'row',
  },
  left: { flex: 1 },
  right: { flex: 1 },
  item: {
    overflow: 'hidden',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.03)',
  }
});
const Publication = ({privateKey})=>{
  if(!privateKey) return
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error :</Text>;
  const views = [];
  
  if(data){
    if(data['publications']){
      const publications = data['publications']
      for(i = 0; i < publications.length; i=i+2){
        if (i + 1 < publications.length) {
          views.push(<View style={styles.list}>
            <View style={styles.left}>
              <Item key={i} profileId={publications[i]['profileId']} privateKey={privateKey} contentURI={publications[i]['contentURI']}/>
            </View>
            <View style={styles.right}>
              <Item key={i+1} profileId={publications[i+1]['profileId']} privateKey={privateKey} contentURI={publications[i+1]['contentURI']}/>
            </View>
          </View>);
        }
        else{
          views.push(<View style={styles.list}>
            <View style={styles.left}>
              <Item key={i} profileId={publications[i]['profileId']} privateKey={privateKey} contentURI={publications[i]['contentURI']}/>
            </View>
          </View>);
        }
      }
    }
  }
  return(
  <View style={styles.mainContainer}>
    {views.map((view, index) => {
      return view;
    })}
    <View style={{ height: 100 }}></View>
  </View>
  );
}
const Item = (props) => {
  if(props.profileId <= 22)
    return
  const [icon, setIcon] = useState(undefined)
  const [username,setUsername] = useState(undefined)  
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState('');
  const getdata = async(profileID,privateKey,contentURI)=>{
    user = new ethers.Wallet(privateKey,Testbaobab)
    const baseHub = new ethers.Contract(baseHubContractAddress, BaseHubABI, Testbaobab);
    const baseWallet = new ethers.Contract(walletContractAddress, WalletABI, Testbaobab)
    const profileOwner = await baseHub.callStatic.ownerOf(profileID)
    const wallet = await baseWallet.attach(profileOwner)
    const owner = await wallet.getOwners()
    const res = await getProfileById(baseHub, profileID);
    setUsername(res[3])
    const data = await downloadFile(res[4], owner[0], user)
    setIcon({ uri: `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}`})
    
    const object = await downloadObject(contentURI, owner[0], user);
    setTitle(object.title);
    const imgdata = await downloadFile(object.image[0], owner[0], user);
    setImage({ uri: `data:image/jpeg;base64,${Buffer.from(imgdata).toString('base64')}` });
  }
  getdata(props.profileId, props.privateKey, props.contentURI)
  return (
    <View style={styles.item}>
      <View>
        <Image
          resizeMode="cover"
          style={{ borderRadius: 5, width: '100%', height: 230 }}
          source={image}
        />
        <View style={{ padding: 5 }}>
          <View>
            <Text style={{ fontSize: 14 }}>{title}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                resizeMode="cover"
                style={{ borderRadius: 20, width: 20, height: 20, marginRight: 10 }}
                source={icon}
              />
              <Text>{username}</Text>
            </View>
            <View>
              <ShareIcon width={23} height={23} fill="gray" />
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

const WalletMain = ({ navigation }) => {
  const isDarkMode = 'dark';
  const [datas, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState();

  // const user = new ethers.Wallet(pri,Testbaobab)

  const profile =  async() =>{
    const profile = await queryProfile()
    let privateKey = profile['private_key']
    setPrivateKey(privateKey)
  }
  profile()
  

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    wait(2000).then(() => {
      setRefreshing(false);
      setData(datas => {
        let newData = [{
          header: 'https://bf.jdd001.top/s5.png',
          image: 'https://bf.jdd001.top/s1.png',
          title:"Base Wallet Base Wallet"
        },...datas];
        return newData;
      })
    });

  }, []);
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#422ddd"]} />
      }
    >
      {/* <View style={styles.mainContainer}> */}
        {/* <View style={styles.list}> */}
          {/* <View style={styles.left}>
            {
              datas.map((item,index)=>{
                return index%2==0&& <Item key={1+index} header={{uri:item.header}} image={{uri:item.image}} username={item.username}/>
              })
            }
          </View>
          <View style={styles.right}>
          {
              datas.map((item,index)=>{
                return index%2!=0&& <Item key={2+index} header={{uri:item.header}} image={{uri:item.image}} username={item.username}/>||<></>
              })
            }
          </View> */}
          {/* <View style={styles.left}>
            {
              datas.map((item,index)=>{
                return index%2==0&& <Publication key={1+index} profileid={item['profileId']} contentURI={item['contentURI']} privateKey={privateKey}/>
              })
            }
          </View>
          <View style={styles.right}>
          {
              datas.map((item,index)=>{
                return index%2!=0&& <Publication key={2+index} profileid={item['profileId']} contentURI={item['contentURI']} privateKey={privateKey}/>||<></>
              })
            }
          </View> */}
          <Publication privateKey={privateKey}></Publication>
        {/* </View> */}
      {/* </View> */}
    </ScrollView>
  );
};

export default React.memo(WalletMain);
