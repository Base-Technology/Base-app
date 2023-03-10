import * as React from 'react';
import { View, Button, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ScrollTabView, ScrollView as NewScrollView, FlatList } from '../../components/BaseHead';
import BackIcon from "../../assets/icon_arrow_back.svg";

import { BaseText as Text } from "../../components/Base";
import MoreIcon from '../../assets/icon_more.svg';
import SmileIcon from '../../assets/icon_smile.svg';
import VoiceIcon from '../../assets/icon_voice.svg';
import DoneIcon from '../../assets/icon_doneall.svg';
import { Component } from 'react';
import Me from '../me/group';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Drawer from 'react-native-drawer';
import { queryMessage, addMessage } from '../../database/message';
import moment from 'moment';

function MessageList() {
    const [value, onChangeText] = React.useState('');

    const [messages, changeMessages] = React.useState(undefined);

    if (!messages) {
        queryMessage((msgs) => {
            changeMessages(msgs);
        });
    }

    return <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ padding: 20 }}
            >
                {messages && messages.map((msg, index) => {
                    return (
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: msg.is_send == 0 ? 'flex-start' : 'flex-end', marginBottom: 10 }}>
                            {msg.is_send == 0 && (
                                <View>
                                    <Image
                                        style={{ width: 40, height: 40, borderRadius: 100, }}
                                        source={require('../../assets/yk.jpg')}
                                    />
                                </View>) ||
                                <View style={{ width: 40, height: 40 }}>
                                </View>
                            }
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: msg.is_send == 0 && 'flex-start' || 'flex-end' }}>
                                <View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: msg.is_send == 0 ? 'rgba(255,255,255,0.1)' : '#422DDD',
                                        marginLeft: msg.is_send == 0 ? 20 : 20,
                                        borderRadius: msg.content.length > 70 ? 10 : 100,
                                        borderBottomLeftRadius: msg.is_send == 0 ? 0 : undefined,
                                        borderBottomRightRadius: msg.is_send == 0 ? undefined : 0,
                                    }}>
                                        <Text style={{ color: '#fff', fontSize: 14 }}>{msg.content}</Text>
                                    </View>
                                    {msg.is_send == 0 && (<Text style={{ paddingHorizontal: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>{moment.unix(msg.timestamp / 1000).format('HH:mm')}</Text>)}
                                    {msg.is_send == 1 && (
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{moment.unix(msg.timestamp / 1000).format('HH:mm')}</Text>
                                                <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
                                            </View>
                                        </View>)}
                                </View>

                            </View>
                        </View>
                    )
                }
                )}
                <View style={{ height: 20 }}></View>
            </ScrollView>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', padding: 10 }}>
            <VoiceIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', color: '#fff', flex: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                <SmileIcon style={{}} width={30} height={30} fill="rgba(255,255,255,0.7)" />

            </View>
            {
                value != "" && <Button
                    title="Send"
                    color="#422DDD"
                    onPress={() => {
                        addMessage({ content: value }, (msg) => {
                            messages.push(msg);
                            changeMessages(messages);
                            onChangeText('');
                        });
                    }}
                /> ||
                <MoreIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />

            }

            {/*  */}

        </View>
    </View>
        ;
}


// Drawer组件

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            active: false,
        };
    }

    closeDrawer = () => {
        this._drawer.close()
    };
    openDrawer = () => {
        this._drawer.open()
    };

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                // type: 一共是3种（displace,overlay,static）, 用static就好啦，static让人感觉更舒适一些
                type="static"
                // Drawer 展开区域组件
                content={
                    <ScrollView style={{ ...styles.container }}>
                        <Me />
                        <Text>me</Text>
                    </ScrollView>
                }
                // 响应区域双击可以打开抽屉
                acceptDoubleTap={true}
                closedDrawerOffset={0}
                // styles 和 tweenHandler是设置向左拉后主内容区的颜色，相当于给主内容区加了一个遮罩
                styles={{
                    mainOverlay: {
                        backgroundColor: 'black',
                        opacity: 0,
                    },
                }}
                tweenHandler={(ratio) => ({
                    mainOverlay: {
                        opacity: ratio / 2,
                    }
                })}
                onOpenStart={() => {
                    this.setState({ active: true });

                }}
                // drawer打开后调用的函数
                onOpen={() => {
                    this.setState({ drawerOpen: true });
                }}
                // drawer关闭后调用的函数
                onClose={() => {
                    this.setState({ drawerOpen: false });
                }}

                captureGestures={false}
                // 打开/关闭 Drawer所需要的时间
                tweenDuration={100}
                // 触发抽屉打开/关闭必须经过的屏幕宽度比例
                panThreshold={0.08}
                disabled={this.state.drawerDisabled}
                // Drawer打开后有边界距离屏幕右边界的距离

                // 拉开抽屉的响应区域
                panOpenMask={0.2}
                // 如果为true, 则尝试仅处理水平滑动
                negotiatePan
                side="top"
            >
                {/*主内容区*/}
                <View style={{ ...styles.container, backgroundColor: '#1e1e1e' }}>
                    <View style={{ position: 'relative' }}>
                        <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.goBack()}
                                >
                                    <BackIcon width={25} height={25} fill="#fff" />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 40, height: 40, borderRadius: 100, }}
                                    source={{ uri: this.props.route.params.header }}
                                />
                                <View style={{ marginLeft: 5 }}>
                                    <View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{this.props.route.params.name} Official Group</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#fff', fontSize: 8, }}>$999 <Text style={{ fontSize: 8, }}>Treasury</Text></Text>
                                        <Text style={{ marginLeft: 5, color: '#fff', fontSize: 8, }}>34 <Text style={{ fontSize: 8, }}>Members</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: -2.5, right: 0, left: 0 }}>
                            <View style={{ height: 5, width: 100, borderRadius: 100, marginTop: 5, backgroundColor: this.state.active && '#422ddd' || '#2D2D34' }}>

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <MessageList key="s1" />
                    </View>


                </View>
            </Drawer>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e1e1e',
        flex: 1,
    },
});

export default Home;