import React, { Component } from "react";
import { View,Image } from "react-native";
import { BaseText as Text } from "../Base";

export default function BaseHeadInfo(props) {
    const {name,address,headuri}=props;
    return (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 50, height: 50, borderRadius: 40, marginRight: 10 }}>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 100, }}
                    source={{uri:headuri}}
                />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>{name}</Text>

                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <Text style={{ textAlign: 'center' }}>
                            @dodo.base
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 5, marginLeft: 10, paddingLeft: 5, paddingRight: 5, padding: 0 }}>
                        <Text style={{ textAlign: 'center', padding: 0 }}>
                            0xebaD...89e1
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    </View>
    )
}