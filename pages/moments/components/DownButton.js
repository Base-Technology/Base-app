import React,{useRef} from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'
import { BottomSafeArea } from '../common/constValue'
import {saveImageToPhoto,saveVideoToPhoto} from '../common/downloadSave'


// props.type image video
// props.url return url
export default DownButton = (props) => {

  const animated = useRef(new Animated.Value(0));
  const isEnd = useRef(false);

  function beginAnimated(){
    animated.current.setValue(0);
    Animated.timing(
      animated.current,
        {
            toValue: 1,
            friction: 1,
            useNativeDriver:true
        }
    ).start(()=>{
      if (isEnd.current){
        // end
        animated.current.setValue(0);
      }else {
        beginAnimated()
      }
    })
  }
  function downLoad(){
    if (!props.url()){
      return
    }
    console.log('url====',props.url());
    beginAnimated()
    if (props.type == 'image'){
      saveImageToPhoto(props.url(),()=>{
        isEnd.current = true
      })
    }
    if (props.type == 'video'){
      saveVideoToPhoto(props.url(),()=>{
        isEnd.current = true
      })
    }
  }

  return <TouchableOpacity style={[styles.downBtn,{
    transform: [{
      translateY: animated.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0,20]
      })
    }] ,
  }]} onPress={()=>{
    downLoad()
  }}>
    {/* <Image style={styles.downImage} source={ImageCommon.download_icon}/> */}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  downImage:{
    width:20,
    height:20,
  },
  downBtn:{
    width:40,
    height:40,
    position:'absolute',
    right:20,
    bottom:BottomSafeArea + 30,
    alignItems:'flex-end',
    justifyContent:'center',
    zIndex:1
  },
})