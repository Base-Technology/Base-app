import React, { useEffect, useRef, forwardRef, useMemo, useState, useImperativeHandle } from 'react'
import {
  View,
  StyleSheet,
  Image
} from 'react-native'
import Video from 'react-native-video';
import ShareIcon from "../../../assets/icon_share.svg";
import StarIcon from "../../../assets/icon_star.svg";
import CloseIcon from "../../../assets/icon_close.svg";
import SearchIcon from "../../../assets/icon_search.svg";
import FavoriteIcon from "../../../assets/icon_favorite.svg";
import CommentIcon from "../../../assets/icon_comment.svg";
import Text from "../../../components/BaseText";
import {
  screenWidth,
  screenHeight,
  BottomSafeArea,
  mainColor,
  color_cdcdcd
} from '../common/constValue'
import { ColumnView, RowBetweenView, RowView } from './MainView'

export default VideoPlay = ({ item, onBackRef, onSetPlayStatus }) => {
  const [follow, setFollow] = useState(false);

  const [currentTime, setCurrentTime] = useState(0)
  const totalTime = useRef(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef()

  useImperativeHandle(videoRef, () => ({
    onChangeVideoStatus: () => {
      setIsPaused(!isPaused)
    },
    onChangeVideoStatusPlay: () => {
      setIsPaused(false)
    },
    onChangeVideoStatusPause: () => {
      setIsPaused(true)
    }
  }))

  useEffect(() => {
    onBackRef(videoRef)
  }, [])
  useEffect(() => {

    let time = setTimeout(() => {
      setFollow(true);
    }, 3000);
  })
  return useMemo(() => {
    return <View style={styles.mainView}>
      <Video
        source={{ uri: item.url }}   // 可以是一个 URL 或者 本地文件
        ref={videoRef}
        onLoad={(e) => {
          totalTime.current = parseInt(e.duration)
        }}
        onBuffer={() => {
          console.log('远程视频缓冲时的回调');
        }}
        onEnd={() => {
          console.log('播放完成后的回调');
        }}
        onError={() => {
          console.log('播放失败后的回调');
        }}
        style={styles.video}
        poster={item.img}
        posterResizeMode={'cover'}
        repeat={true}
        resizeMode={'cover'}
        onProgress={(progress) => {
          setCurrentTime(parseInt(progress.currentTime))
        }}
        paused={isPaused}
      />
      <View style={styles.playButton}>
        {/* <TouchableOpacity style={{width:'100%',height:'100%'}} onPress={()=>{
          onSetPlayStatus()
        }}>
        </TouchableOpacity> */}
      </View>
      <View style={styles.controlView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10,}}>
          <View>
            <Text
              numberOfLines={1} ellipsizeMode="tail"
            >
              #base  @YK  @Hayek
            </Text>
          </View>
          <Text>More</Text>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100, marginRight: 10 }}
              source={require('../../../assets/ks.jpg')}
            />
            <Text>Elon Musk</Text>
            {
              follow && <View style={{ backgroundColor: '#422DDD', padding: 2, paddingLeft: 10, paddingRight: 10, borderRadius: 50, marginLeft: 10 }}>
                <Text>Follow</Text>
              </View>
            }

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ marginRight: 20 }}>
              <CommentIcon width={23} height={23} fill="#fff" />
              <Text style={{ marginLeft: 5, lineHeight: 12 }}>134</Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <FavoriteIcon width={23} height={23} fill="#fff" />
              <Text style={{ marginLeft: 5, lineHeight: 12 }}>420</Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <StarIcon width={23} height={23} fill="#fff" />
              <Text style={{ marginLeft: 5, lineHeight: 12 }}>909</Text>
            </View>
            <View>
              <ShareIcon width={23} height={23} fill="#fff" />
              <Text style={{ marginLeft: 5, lineHeight: 12 }}>99</Text>
            </View>
          </View>
        </View>
        <View style={styles.proView}>
          <View style={[styles.pro, {
            width: parseInt(currentTime / totalTime.current * 100) + '%'
          }]} />
        </View>
      </View>
    </View>
  }, [item.url, currentTime, isPaused])
}
const styles = StyleSheet.create({
  mainView: {
    width: screenWidth,
    height: screenHeight - 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
  },
  video: {
    width: screenWidth,
    height: screenHeight - 40,
    position: 'absolute',
  },
  controlView: {
    paddingBottom: BottomSafeArea + 10,
  },
  timer: {
    color: '#fff',
    fontSize: 12
  },
  proView: {
    height: 1,
    backgroundColor: '#fff',
    flex: 1,
  },
  pro: {
    backgroundColor: '#422ddd',
    height: 1,
  },
  playButton: {
    width: screenWidth,
    flex: 1
  }
})