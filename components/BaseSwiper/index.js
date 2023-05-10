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
// const renderPagination = (index, total, context) => {
//     return (
//         <View style={styles.paginationStyle}>
//             <Text style={{ color: 'grey' }}>
//                 <Text style={styles.paginationText}>{index + 1}</Text>/{total}
//             </Text>
//         </View>
//     )
// }
const Picture = (props) => {
    views = []
    // if(props.imgs.length==1)
    // return(
    //     <View>
    //         <View
    //             style={styles.slide}
    //         >
    //         <Image
    //             resizeMode="stretch"
    //             style={styles.image}
    //             source={props.imgs[0]}
    //         />
    //         </View>
    //     </View>
    // )
    for(i = 0; i<props.imgs.length;i++)
        views.push(
            <View
                style={styles.slide}
            >
            <Image
                resizeMode="stretch"
                style={styles.image}
                source={props.imgs[i]}
            />
            </View>
        )
    return(
        <Swiper
            style={styles.wrapper}
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
            loop
        >
            {views.map((view, index) => {
                return view;
            })}
            <View style={{ height: 100 }}></View>
        </Swiper>
    )
}
export default function BaseSwiper(props){
    const [current,setCurrent] = useState(0)
    if(!props.imgs.length) 
        return(<></>)
    onIndexChanged = (index) => {
        setCurrent({ current: index })
    }
    return (
        <View style={styles.container}>
            <Picture imgs={props.imgs}></Picture>
            <View style={{ position: 'absolute', top: 10, right: 5 }}>
                <BaseText style={{ borderRadius: 100, backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, paddingLeft: 10, paddingRight: 10 }}>{current + 1}/{props.imgs.length}</BaseText>
            </View>
            {/* <View style={{height:30}}></View> */}
        </View>
    )
}
// export default class extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             current: 0
//         }
//         this.props=props
//     }
//     onIndexChanged = (index) => {
//         this.setState({ current: index })

//     }
//     render() {
//         return (
//             <View style={styles.container}>

//                 <Swiper
//                     style={styles.wrapper}
//                     // onMomentumScrollEnd={(e, state, context) =>
//                     //   this.setState({ current: 1 })
//                     // }
//                     // autoplay
//                     // onIndexChanged={this.onIndexChanged}
//                     paginationStyle={{
//                         bottom: 10
//                     }}
//                     dot={
//                         <View
//                             style={{
//                                 backgroundColor: '#fff',
//                                 width: 5,
//                                 height: 5,
//                                 borderRadius: 10,
//                                 marginLeft: 3,
//                                 marginRight: 3,
//                                 marginTop: 3,
//                                 marginBottom: 3
//                             }}
//                         ></View>
//                     }
//                     activeDot={
//                         <View
//                             style={{
//                                 backgroundColor: '#422DDD',
//                                 width: 8,
//                                 height: 8,
//                                 borderRadius: 10,
//                                 marginLeft: 3,
//                                 marginRight: 3,
//                                 marginTop: 3,
//                                 marginBottom: 3
//                             }}
//                         />
//                     }
//                     // showsPagination={false}
//                     loop
//                 >
//                     <Picture image={this.props.imgs}></Picture>
//                     {/* <View
//                         style={styles.slide}
//                     >
//                         <Image
//                             resizeMode="stretch"
//                             style={styles.image}
//                             source={require('../../assets/1.jpg')}
//                         />
//                     </View> */}
//                     {/* <View
//                         style={styles.slide}
//                     >
//                         <Image
//                             resizeMode="stretch"
//                             style={styles.image}
//                             source={require('../../assets/1.jpg')}
//                         />
//                     </View>
//                     <View
//                         style={styles.slide}
//                     >
//                         <Image
//                             resizeMode="stretch"
//                             style={styles.image}
//                             source={require('../../assets/1.jpg')}
//                         />
//                     </View>
//                     <View
//                         style={styles.slide}
//                     >
//                         <Image
//                             resizeMode="stretch"
//                             style={styles.image}
//                             source={require('../../assets/1.jpg')}
//                         />
//                     </View> */}
//                 </Swiper>
//                 <View style={{ position: 'absolute', top: 10, right: 5 }}>
//                     <BaseText style={{ borderRadius: 100, backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, paddingLeft: 10, paddingRight: 10 }}>{this.state.current + 1}/{this.props.imgs.length}</BaseText>
//                 </View>
//                 {/* <View style={{height:30}}></View> */}
//             </View>
//         )
//     }
// }