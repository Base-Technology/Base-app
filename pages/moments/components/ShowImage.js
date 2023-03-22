import React, { useEffect, useRef } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import {saveImageToPhoto} from '../common/downloadSave'
import ImageCommon from '../assets/images/common/ImageCommon'
import DownButton from '../components/DownButton'
export default ShowImage = (props) => {
  const currentIndex = useRef(props.index)
  useEffect(()=>{
    currentIndex.current = props.index
  },[props.index])
  return <Modal visible={props.visible} transparent={true} onDismiss={()=>{}}>
    <ImageViewer index={props.index} onClick={props.onClick} imageUrls={props.images}
    renderFooter={(currentIndex)=>{
      return <View style={styles.contentView}>
        <Text style={styles.content}>{props.images[currentIndex].content}</Text>
      </View>
    }}
    onChange={(index)=>{
      currentIndex.current = index
    }}
    />
    <DownButton type={'image'} url={()=>props.images[currentIndex.current].url}/>
  </Modal>
}
const styles = StyleSheet.create({
  contentView:{
    paddingBottom:30,
    paddingHorizontal:10,
    paddingTop:10,
  },
  content:{
    color:'white',
    fontSize:14,
  },
  downImage:{
    width:20,
    height:20,
    position:'absolute',
    right:10,
    bottom:80,
    zIndex:1
  }
})