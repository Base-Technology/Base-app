import React, { Component, useState } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { BaseText } from "../Base";

const { width } = Dimensions.get('window')

const styles = {
    container: {
        height: 300
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
}
const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}
export default class extends Component {
    constructor() {
        super();
        this.state = {
            current: 0
        }
    }
    onIndexChanged = (index) => {
        this.setState({ current: index })

    }
    render() {
        return (
            <View style={styles.container}>

                <Swiper
                    style={styles.wrapper}
                    // onMomentumScrollEnd={(e, state, context) =>
                    //   this.setState({ current: 1 })
                    // }
                    // autoplay
                    // onIndexChanged={this.onIndexChanged}
                    paginationStyle={{
                        bottom: 10
                    }}
                    dot={
                        <View
                            style={{
                                backgroundColor: '#fff',
                                width: 5,
                                height: 5,
                                borderRadius: 10,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        ></View>
                    }
                    activeDot={
                        <View
                            style={{
                                backgroundColor: '#422DDD',
                                width: 8,
                                height: 8,
                                borderRadius: 10,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    }
                    // showsPagination={false}
                    loop
                >
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../assets/1.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../assets/1.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../assets/1.jpg')}
                        />
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../assets/1.jpg')}
                        />
                    </View>
                </Swiper>
                <View style={{ position: 'absolute', top: 10, right: 5 }}>
                    <BaseText style={{ borderRadius: 100, backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, paddingLeft: 10, paddingRight: 10 }}>{this.state.current + 1}/4</BaseText>
                </View>
                {/* <View style={{height:30}}></View> */}
            </View>
        )
    }
}