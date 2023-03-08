import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function Bg(props) {
  return (
    <View style={styles.container}>
      <Image
        key={'blurryImage'}
        source={props.img}
        // source={{uri:'https://cdn.cdnjson.com/wx2.sinaimg.cn/large/87c01ec7gy1frmrr7y6u3j21hc0u0k0c.jpg'}}
        style={styles.absolute}
        
      />
      {/* <Text style={styles.absolute}>Hi, I am some blurred text</Text> */}
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: 'transparent',
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});