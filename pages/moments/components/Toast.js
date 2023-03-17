import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
export default Toast = (props)=>{
  const timerout = useRef()
  useEffect(()=>{
    clearTimeout(timerout.current)
    timerout.current = setTimeout(() => {
      props.onDismiss && props.onDismiss()
      clearTimeout(timerout.current)
    }, 3000);
  },[props.text])
  return <View style={[styles.mainView,{
    bottom:'10%'
  }]}>
    <View style={styles.toastView}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  </View>
}
const styles = StyleSheet.create({
  mainView:{
    position:'absolute',
    left:15,
    right:15,
    alignItems:'center',
    justifyContent:'center'
  },
  toastView:{
    borderRadius:5,
    backgroundColor:'rgba(0,0,0,0.6)',
    padding:10,
  },
  title:{
    color:'white',
    fontSize:17
  }
})