import React, { useRef,useState } from 'react';
import ShareIcon from "../../assets/icon_share.svg";
import StarIcon from "../../assets/icon_star.svg";
import FavoriteIcon from "../../assets/icon_favorite.svg";
import CommentIcon from "../../assets/icon_comment.svg";
import { SafeAreaView, View, FlatList, StyleSheet, Image } from 'react-native';
import Text from '../home/BaseText'
import { Tooltip, Button } from '@ui-kitten/components';
import Drawer from 'react-native-drawer';
import Video from 'react-native-video';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/ks.jpg'),
    poster: require('../../assets/img/s1.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/img/s2.png'),
    poster: require('../../assets/img/s3.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/ks.jpg'),
    poster: require('../../assets/img/s1.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/img/s2.png'),
    poster: require('../../assets/img/s3.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/ks.jpg'),
    poster: require('../../assets/img/s1.png')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '154 Bored Ape Yacht Club NFTs Were Deposited ToThe BendDAO Collateral',
    header: require('../../assets/img/s2.png'),
    poster: require('../../assets/img/s3.png')
  }
];

const Item = ({ title, content, header, poster }) => {

  return (
    <View style={styles.item}>
      <View style={{ ...styles.itemc, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
        <View style={{ width: 40, height: 40, borderRadius: 40, marginRight: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 100, }}
            source={header}
          />

        </View>
        <Text style={{ marginLeft: 10 }}>KangShuiYue</Text>
        <Text style={{ marginLeft: 20, fontSize: 8 }}>1 days ago</Text>
      </View>
      <View style={{ marginTop: 10, overflow: 'hidden', height: 200 }}>
        <Image source={poster} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CommentIcon width={23} height={23} fill="#fff" />
          <Text style={{ marginLeft: 5, marginRight: 15 }}>134</Text>
          <FavoriteIcon width={23} height={23} fill="#fff" />
          <Text style={{ marginLeft: 5, marginRight: 15 }}>420</Text>
          <StarIcon width={23} height={23} fill="#fff" />
          <Text style={{ marginLeft: 5, }}>909</Text>
        </View>
        <View>
          <ShareIcon width={23} height={23} fill="#fff" />
        </View>

      </View>
      <View style={{ margin: 20, marginTop: 0 }}>
        <Text style={{ lineHeight: 20 }}>Way Network is a universal solution to enable interchain transaction with trustless and valid delivery. It's the first chain-wide interoperability protocol that provides a powerful low-level communication...
        </Text>
        <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <Text>
            More
          </Text>
        </View>

      </View>
    </View >
  );
}

const Momnet = () => {
  const renderItem = ({ item }) => (
    <Item {...item} />
  );
  const video = useRef();
  const [current,setCurrent]=useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Drawer
        type="overlay"
        content={<Text>sdd</Text>}
        openDrawerOffset={100}
        open={true}
      >
        <Text>margin</Text>
      </Drawer>
      {/* <Video source={{uri: "https://bf.jdd001.top/xiaf/v1.mp4"}} />   // Can be a URL or a local file. */}
      {/* <View style={{width:400,height:200}}>
        <Text>{current}</Text>
        <Video
          ref={video}
          source={{
            uri: 'https://bf.jdd001.top/xiaf/v1.mp4', //播放路径
          }}
          style={{ width: '100%', height: '100%' }}
          rete={1}
          volume={1}
        // paused={paused} // 暂停变量
        // onEnd={() => {
        //     this.onEnd(); // 播放结束时执行
        // }}
        // onBuffer={data => this.onBuffer(data)} // 缓冲时执行,用于显示缓冲圈
        // onProgress={data => this.setTime(data)} // 播放时执行函数,用于同步步进器进度
        // onLoad={data => setCurrent(data)} // 播放前得到总时长,用于步进器设置总长
        // muted={muted} // 静音
        />
      </View> */}

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
});

export default Momnet;