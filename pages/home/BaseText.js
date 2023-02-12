import React, { Component } from "react";
import { Text } from "react-native";

export default function BaseText(props) {
    return (
        <Text {...props} style={{ fontFamily: 'Karla-Light',color:'#fff',...props.style }}>
            {props.children}
        </Text>
    )
}