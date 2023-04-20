import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Modal,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import styles from './styles'
import { photoSwipeMinHeight } from './common/constValue'
// import DownButton from './components/DownButton'
import VideoPlay from './components/VideoPlay'
import HomeIcon from '../../assets/icon_home';
import HomeFullIcon from '../../assets/icon_homefull';
import ChatIcon from '../../assets/icon_chat.svg';
import ChatFullIcon from '../../assets/icon_chatfull.svg';
import MeIcon from '../../assets/icon_me.svg';
import MeFullIcon from '../../assets/icon_mefull.svg';
import MomentIcon from '../../assets/icon_moment.svg';
import MomentFullIcon from '../../assets/icon_momentfull.svg';
import CreateIcon from '../../assets/icon_add_photo.svg';
const { height } = Dimensions.get('window')

let ind=1;
export default VideoPage = ({ navigation, route }) => {
  let panResponder = PanResponder.create({
    // 用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递
    onStartShouldSetPanResponder: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
        return true
      }
      return false
    },
    // 确定是否在view组件被按下的时候响应touch事件后，是否阻止事件冒泡（它的子组件的事件将不被响应）
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
        return true
      }
      return false
    },
    // 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
        return true
      }
      return false
    },
    // 确定是否在view组件手指移动的时候响应touch事件后，是否阻止事件冒泡（它的子组件的事件将不被响应）
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
        return true
      }
      return false
    },
    // 开始手势操作
    onPanResponderGrant: (evt, gestureState) => {
      // 滑动开始时间
      // this.startTime = evt.nativeEvent.timestamp
    },
    // 手指移动
    onPanResponderMove: (evt, gestureState) => {
      let y = gestureState.dy
      if (pageRef.current == 0) {
        if (y > 0) {
          // 第一页，向下滑动
          return
        }
      }
      if (pageRef.current == videoList.length - 1) {
        if (y < 0) {
          // 最后一页，向上滑动
          return
        }
      }
      flatListRef.current.scrollToOffset({ animated: false, offset: pageRef.current * height - y })
    },
    // 手指松开
    onPanResponderRelease: (evt, gestureState) => {
      // this.endTime = evt.nativeEvent.timestamp
      let y = gestureState.dy

      if (Math.abs(y) > photoSwipeMinHeight) {
        // 暂停上一个
        if (videoRef.current[pageRef.current] && videoRef.current[pageRef.current].current) {
          videoRef.current[pageRef.current].current.onChangeVideoStatusPause()
        }
        if (y < 0) {
          if (pageRef.current == videoList.length - 1) {
            // 滑动到底部，触发加载更多
            // showToast('正在加载...')
            loadVodeoData(true)
            return
          }
          pageRef.current += 1

          // 当前的播放
          if (videoRef.current[pageRef.current] && videoRef.current[pageRef.current].current) {
            videoRef.current[pageRef.current].current.onChangeVideoStatusPlay()
          }

        } else {
          if (pageRef.current == 0) {
            // 第0页，向下滑动，触发刷新操作
            pageRef.current = 0
            // showToast('正在刷新...')
            loadVodeoData()
            return
          }
          pageRef.current -= 1
          // 当前的播放
          if (videoRef.current[pageRef.current] && videoRef.current[pageRef.current].current) {
            videoRef.current[pageRef.current].current.onChangeVideoStatusPlay()
          }
        }
      }
      flatListRef.current.scrollToOffset({ animated: true, offset: pageRef.current * height })
    },
    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    onPanResponderTerminate: (evt, gestureState) => {
    },
    // 是否可以阻塞其他(父)控件获取焦点，返回false则有其他焦点触发时该焦点失效。
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return false;
    },
  });

  const [videoList, setVideoList] = useState([])
  const [isHas, setIsHas] = useState(true)
  const videoRef = useRef([])
  const flatListRef = useRef()
  const pageRef = useRef(0)

  useEffect(() => {
    loadVodeoData()

    navigation.addListener('blur', () => {
      if (videoRef.current[pageRef.current] && videoRef.current[pageRef.current].current) {
        videoRef.current[pageRef.current].current.onChangeVideoStatusPause()
      }
    });

    navigation.addListener('focus', () => {
      if (videoRef.current[pageRef.current] && videoRef.current[pageRef.current].current) {
        videoRef.current[pageRef.current].current.onChangeVideoStatusPlay()
      }
    });

  }, [])



  async function loadVodeoData(add) {
    const result = {
      // img: 'https://bf.jdd001.top/poster.png',
      url: 'https://bf.jdd001.top/m'+(Math.random()>0.5&&1||2)+'.mp4'
    }
    // if (result.img) {
      if (add) {
        pageRef.current += 1
        setVideoList(videoList.concat([result]))
        setTimeout(() => {
          flatListRef.current.scrollToOffset({ animated: true, offset: pageRef.current * height })
        }, 200);
      } else {
        setVideoList([result])
      }
      setIsHas(true)
    // } else {
    //   setIsHas(false)
    // }

  }

  return <View style={{ flex: 1, backgroundColor: 'black' }} {...panResponder.panHandlers} >
    <FlatList ref={flatListRef}
      data={videoList}
      renderItem={({ item, index }) => {
        return <VideoPlay item={item} onBackRef={(ref) => {
          videoRef.current.splice(index, 0, ref)
        }} onSetPlayStatus={() => {
          console.log('=================', videoRef.current);
          if (videoRef.current[index] && videoRef[index].current) {
            videoRef.current[index].current.onChangeVideoStatus()
          }
        }} />
      }}
      getItemLayout={(data, index) => (
        { length: height, offset: height * index, index }
      )}
      scrollEnabled={false}
      keyExtractor={(item, index) => item.img + index}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      ListFooterComponent={<></>}
      style={{flex:1,position:'relative'}}
    />
    <View style={{ flexDirection: 'row', height: 20, alignItems: 'center', justifyContent: 'space-around', paddingVertical: 20 }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
        <HomeIcon width={30} height={30} fill={"#8c8c8c"} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
        <ChatIcon width={30} height={30} fill={"#8c8c8c"} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Publish')}>
        <CreateIcon width={30} height={30} fill={"#8c8c8c"} />
      </TouchableWithoutFeedback>
      <MomentFullIcon width={30} height={30} fill={"#8c8c8c"} />
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Me')}>
        <MeIcon width={30} height={30} fill={"#8c8c8c"} />
      </TouchableWithoutFeedback>
    </View>
    {/* {
      !isHas && pageRef.current == 0 && <TouchableOpacity style={styles.reButton} onPress={loadVodeoData}>
        <Text style={{ color: '#8c8c8c' }}>点击刷新</Text>
      </TouchableOpacity>
    } */}
    {/* <DownButton type={'video'} url={()=>videoList[pageRef.current]?.url}/> */}
  </View>
}
