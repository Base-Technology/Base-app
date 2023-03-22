import * as React from 'react';
import { View, Button, ScrollView, Image, TextInput } from 'react-native';
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
import Drawer from 'react-native-drawer'
function SettingsScreen() {
    const [value, onChangeText] = React.useState('33');

    return <View>

        <ScrollView
            contentContainerStyle={{ minHeight: '85%' }}
            style={{ padding: 20 }}
        >

            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                <View>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100, }}
                        source={require('../../assets/yk.jpg')}
                    />
                </View>
                <View>
                    <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
                        <Text style={{ color: '#fff' }}>A string representing the </Text>

                    </View>
                    <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
                </View>


                {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View>
              <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>
  
            </View>
          </View> */}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                <View>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100, }}
                        source={require('../../assets/yk.jpg')}
                    />
                </View>
                <View style={{ marginLeft: 20, }}>
                    <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 100, borderBottomLeftRadius: 0, width: 40 }}>
                        <Text style={{ color: '#fff', flex: 1 }}>ok</Text>

                    </View>
                    <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
                </View>


                {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View>
              <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>
  
            </View>
          </View> */}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <View>
                    <View style={{ padding: 10, backgroundColor: '#422DDD', marginLeft: 5, borderRadius: 100, borderBottomRightRadius: 0 }}>
                        <Text style={{ color: '#fff' }}>A stringdd representing the </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>18:22</Text>
                            <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: 130, padding: 5, borderRadius: 20 }}>
                    <Text style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>Thu, May 26, 2022</Text>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                <View>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100, }}
                        source={require('../../assets/yk.jpg')}
                    />
                </View>
                <View>
                    <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
                        <Text style={{ color: '#fff' }}>A B string representing the </Text>

                    </View>
                    <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
                </View>


                {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View>
              <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>
  
            </View>
          </View> */}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                <View>
                    <View style={{ padding: 10, backgroundColor: '#422DDD', marginLeft: 5, borderRadius: 10, borderBottomRightRadius: 0 }}>
                        <Text style={{ color: '#fff' }}>An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label.</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>18:22</Text>
                            <DoneIcon width={20} height={20} fill="rgba(255,255,255,0.3)" />
                        </View>
                    </View>
                </View>

            </View>


            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                <View>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100, }}
                        source={require('../../assets/yk.jpg')}
                    />
                </View>
                <View>
                    <View style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 20, borderRadius: 100, borderBottomLeftRadius: 0 }}>
                        <Text style={{ color: '#fff' }}>Meeting?</Text>

                    </View>
                    <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginLeft: 20, }}>17:01</Text>
                </View>


                {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View>
              <Text style={{ padding: 10, color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>17:01</Text>
  
            </View>
          </View> */}
            </View>
            {/* <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100, }}
              source={require('./assets/ks.jpg')}
            />
          </View>
          <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 100 }}>
            <Text style={{ padding: 5 }}>Hello</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100, }}
              source={require('./assets/ks.jpg')}
            />
          </View>
          <View style={{ backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 100 }}>
            <Text style={{ padding: 5 }}>Hello</Text>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
  
          <View style={{ backgroundColor: '#fff', flex: 1, marginRight: 10, borderRadius: 100 }}>
            <Text style={{ padding: 5 }}>Hello</Text>
          </View>
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 100, }}
              source={require('./assets/ks.jpg')}
            />
          </View>
        </View> */}
        </ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgba(255,255,255,0.1)', paddingLeft: 10, paddingRight: 10 }}>
            <VoiceIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, padding: 10, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', height: 40, marginLeft: 10, marginRight: 10 }}>
                {/* <TextInput style={{ color: 'red',flex:1 }}  
        defaultValue="123" /> */}
                {/* <UselessTextInput /> */}
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
                /> ||
                <MoreIcon width={30} height={30} fill="rgba(255,255,255,0.7)" />

            }

            {/*  */}

        </View>
    </View>
        ;
}


// Drawer组件

class ChatDetailP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
            active:false,
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
                        {/* <Me /> */}
                        <Text>22</Text>
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
                onOpenStart={()=>{
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
                <ScrollView style={{ ...styles.container, backgroundColor: '#1e1e1e' }}>
                    <View style={{ position: 'relative' }}>
                        <View style={{ height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View>
                                <BackIcon width={25} height={25} fill="#fff" />

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 40, height: 40, borderRadius: 100, }}
                                    source={require('../../assets/yk.jpg')}
                                />
                                <View style={{ marginLeft: 5 }}>
                                    <View>
                                        <Text style={{ color: '#fff',fontSize:16 }}>Yk</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={{ color: '#fff',fontSize:8, }}>$999 <Text style={{fontSize:8,}}>Treasury</Text></Text>
                                        <Text style={{ marginLeft: 5, color: '#fff',fontSize:8, }}>34 <Text style={{fontSize:8,}}>Members</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: -2.5, right: 0, left: 0 }}>
                            <View style={{ height: 5, width: 100, borderRadius: 100, marginTop: 5, backgroundColor:this.state.active&&'#422ddd'||'#2D2D34' }}>

                            </View>
                        </View>
                    </View>



                    <SettingsScreen key="s2" />
                </ScrollView>
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

export default ChatDetailP;