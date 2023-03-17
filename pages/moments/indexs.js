import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Text
} from 'react-native';
import Drawer from 'react-native-drawer'
// Drawer组件
import ControlPanel from './ControlPanel';

class Moments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDisabled: false,
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
                // open={true}
                side="bottom"
                // type: 一共是3种（displace,overlay,static）, 用static就好啦，static让人感觉更舒适一些
                type="static"
                // Drawer 展开区域组件
                content={
                    <ControlPanel closeDrawer={this.closeDrawer} />
                }
                // 响应区域双击可以打开抽屉
                acceptDoubleTap
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
                openDrawerOffset={(viewport) => {
                    return 100;
                }}
                // 拉开抽屉的响应区域
                panOpenMask={0.2}
                // 如果为true, 则尝试仅处理水平滑动
                negotiatePan
            >
                {/*主内容区*/}
                <ScrollView style={styles.container}>
                    <TouchableWithoutFeedback style={styles.button} onPress={this.openDrawer}>
                        <Text>Open Drawer</Text>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Drawer>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,1)',
        padding: 20,
        flex: 1,
    },
});

export default Moments;