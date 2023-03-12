import { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PlayIcon from '../../assets/icon_play.svg';
import { BaseText } from "../Base";

import Video from 'react-native-video';
const BaseVideo = (props) => {
    const video = useRef();
    const [paused, setPaused] = useState(false);
    const onPress = () => setPaused(!paused);

    return <View>
        <TouchableOpacity style={{ position: 'absolute', zIndex: 1, opacity: paused && 1 || 0, left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
            <PlayIcon width={40} height={40} fill="#fff" />
        </TouchableOpacity>
        <Video
            ref={video}
            source={require('../../assets/fullmp4.mp4')}
            style={{ width: '100%', height: '100%' }}
            rete={1}
            volume={1}
            resizeMode="cover"
            paused={paused} // 暂停变量
        // onEnd={() => {
        //     this.onEnd(); // 播放结束时执行
        // }}
        // onBuffer={data => this.onBuffer(data)} // 缓冲时执行,用于显示缓冲圈
        // onProgress={data => this.setTime(data)} // 播放时执行函数,用于同步步进器进度
        // onLoad={data => setCurrent(data)} // 播放前得到总时长,用于步进器设置总长
        // muted={muted} // 静音
        />

    </View>
}
export default BaseVideo;