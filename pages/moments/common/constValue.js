import {
  Dimensions,
  StatusBar
} from 'react-native'
const {width,height} = Dimensions.get('window')

export const screenWidth = width
export const screenHeight = height

// 是否为iphone
export const isIPhone = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isIphoneX = isIPhone && Number((height / width + "").substr(0, 4)) * 100 === 216;
/**
 * ios标题栏高度
 */
export const IOS_BarHeight = isIphoneX ? 88 : 64;
/**
 * android标题栏高度
 */
export const Android_BarHeight = StatusBar.currentHeight + 44;
/**
 * ios状态栏高度
 */
export const IOS_StatusBarHeight = isIphoneX ? 44 : 20;
/**
 * android状态栏高度
 */
export const Android_StatusBarHeight = StatusBar.currentHeight;
/**
 * 状态栏高度
 */
export const StatusBarHeight = isIPhone ? IOS_StatusBarHeight : Android_StatusBarHeight;
/**
 * 标题栏高度
 */
export const BarHeight = isIPhone ? IOS_BarHeight : Android_BarHeight;
/**
 * 底部安全区高度
 */
export const BottomSafeArea = isIphoneX ? 34 : 0;

export const mainColor = 'red' // 主色调
export const color_cdcdcd = '#cdcdcd'

export const swipeWidth = 150 // 向右滑动的的有效距离
export const drawWidth = '70%' // 侧边栏的宽度
export const pagePaddingHorizontal = 15 // 页面的左右间距
export const photoSwipeMinHeight = height * 1 / 6 // 图片滑动切换页面的最小距离
export const newTopItemWidth = width / 7 // 新闻分类宽度
export const newTopItemHeight = 44 // 新闻分类高度
export const newTopLineHeight = 2 // 新闻分类下划线高度
export const newItemHeight = 100 // 新闻item的高度
export const textTopItemWidth = width / 3 // 文本分类宽度

export const weatherIcon = (name,type)=>{
  return 'http://www.weather.com.cn/m2/i/icon_weather/29x20/' + type + name + '.gif'
}
