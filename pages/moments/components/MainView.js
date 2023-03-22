import React from 'react'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import {
  pagePaddingHorizontal
} from '../common/constValue'
import {Row,Column} from '../common/commonStyle'
export default MainView = (props) => {
  return <View style={[styles.mainView,props.style]}>
    <SafeAreaView>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
    </SafeAreaView>
  </View>
}
export const MainFullView = (props) => {
  return <View style={[styles.mainFullView,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
const styles = StyleSheet.create({
  mainView:{
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: pagePaddingHorizontal
  },
  mainFullView:{
    flex: 1,
    backgroundColor: 'white',
  }
})

export const RowView = (props)=>{
  return <View style={[Row.self,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const RowFixedView = (props)=>{
  return <View style={[Row.flex,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const RowBetweenView = (props)=>{
  return <View style={[Row.between,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const RowCenterView = (props)=>{
  return <View style={[Row.center,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const RowEndView = (props)=>{
  return <View style={[Row.end,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const ColumnView = (props)=>{
  return <View style={[Column.self,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}
export const ColumnCenterView = (props)=>{
  return <View style={[Column.center,props.style]}>
    {
      React.Children.map(props.children,(child,index)=>{
        return child
      })
    }
  </View>
}