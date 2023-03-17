import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {BottomSafeArea} from '../common/constValue'
export const ListFooterComponent = ()=>{
  return <View style={styles.listFooterComponent}/>
}
const styles = StyleSheet.create({
  listFooterComponent:{
    height:BottomSafeArea
  }
})