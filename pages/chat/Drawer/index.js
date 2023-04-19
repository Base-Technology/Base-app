import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { PanResponder, View, StyleSheet, Dimensions, InteractionManager, I18nManager } from 'react-native'

import tween from './tweener'
// 设备尺寸
let deviceScreen = Dimensions.get('window')
// 抽屉的间隔或者层与层之间的间隔？
const DOUBLE_TAP_INTERVAL = 500
// 动画持续的时间
const TAP_DURATION = 250
// 监听props变化，含以下属性的变化是，触发重新渲染
const propsWhomRequireUpdate = ['closedDrawerOffset', 'openDrawerOffset', 'type', 'styles']

export default class Drawer extends Component {

  // property属性，目前不确定为什么写在这里，是否还有其它的方式，结合之前的代码，难道是给child准备，或者方便
  // child的使用
  _length = 0;
  _prevLength = 0;
  _offsetOpen = 0;
  _offsetClosed = 0;
  _open = false;
  _panning = false;
  _tweenPending = false;
  _activeTween = null;
  _lastPress = 0;
  _panStartTime = 0;
  _syncAfterUpdate = false;
  _interactionHandle = null;

  // 预设，不知道哪里会用
  static tweenPresets = {
    // 视差
    parallax: (ratio, side = 'left') => {
      // 计算比例，为什么是150暂时不清楚
      let drawer = { [side]: -150 * (1 - ratio) }
      return { drawer }
    }
  };

  state = {
    // 设备尺寸
    viewport: deviceScreen
  };
  // 参数类型，也可以不要
  static propTypes = {
    acceptDoubleTap: PropTypes.bool,
    acceptPan: PropTypes.bool,
    acceptTap: PropTypes.bool,
    acceptPanOnDrawer: PropTypes.bool,
    captureGestures: PropTypes.oneOf([true, false, 'open', 'closed']),
    children: PropTypes.node,
    closedDrawerOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    content: PropTypes.node,
    disabled: PropTypes.bool,
    elevation: PropTypes.number,
    initializeOpen: PropTypes.bool,
    open: PropTypes.bool,
    negotiatePan: PropTypes.bool,
    onClose: PropTypes.func,
    onCloseStart: PropTypes.func,
    onOpen: PropTypes.func,
    onOpenStart: PropTypes.func,
    onDragStart: PropTypes.func,
    openDrawerOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    panThreshold: PropTypes.number,
    panCloseMask: PropTypes.number,
    panOpenMask: PropTypes.number,
    side: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    styles: PropTypes.object,
    tapToClose: PropTypes.bool,
    tweenDuration: PropTypes.number,
    tweenEasing: PropTypes.string,
    tweenHandler: PropTypes.func,
    type: PropTypes.oneOf(['overlay', 'static', 'displace']),
    useInteractionManager: PropTypes.bool,

    // deprecated
    panStartCompensation: PropTypes.bool,
    openDrawerThreshold: PropTypes.any,
  };

  // 默认值
  static defaultProps = {
    open: null,
    initializeOpen: false,

    type: 'displace',
    closedDrawerOffset: 0,
    openDrawerOffset: 0,
    panThreshold: 0.25, // @TODO consider rename to panThreshold
    panOpenMask: null, // defaults to closedDrawerOffset
    panCloseMask: null, // defaults to openDrawerOffset

    tweenHandler: null,
    tweenDuration: 250,
    tweenEasing: 'linear',

    disabled: false,
    negotiatePan: false,
    captureGestures: 'open',
    acceptDoubleTap: false,
    acceptTap: false,
    acceptPan: true,
    acceptPanOnDrawer: true,
    tapToClose: false,

    styles: {},
    elevation: 0,
    onOpen: () => { },
    onClose: () => { },
    side: 'left',

    useInteractionManager: false,
  };

  /*** 上下文，context,子组件获取顶层组件的值，不过感觉这里一个抽屉能用的到吗？目前还没有破解，接着往下看 ***/
  static contextTypes = { drawer: PropTypes.object };
  static childContextTypes = { drawer: PropTypes.object };
  // 改变指向，如果是函数组件，不确定这里需不需要，首先得确定drawer在哪定义
  getChildContext = () => ({ drawer: this });
  /*** END CONTEXT ***/

  // //存储儿童抽屉，使用多抽屉消除手势歧义
  //@TODO使其更干净，泛化为使用3+个抽屉，prop用于禁用/配置
  _registerChildDrawer(drawer) {
    // Store child drawer for gesture disambiguation with multi drawer
    // @TODO make cleaner, generalize to work with 3+ drawers, prop to disable/configure
    this._childDrawer = drawer
  }

  UNSAFE_componentWillMount() {
    // 这里用于嵌套多层抽屉，还是说多方向的抽屉，不得而知，
    if (this.context.drawer) this.context.drawer._registerChildDrawer(this)
    // 打开抽屉阈值 以下是一些过时的api，这个可以移除
    if (this.props.openDrawerThreshold && process.env.NODE_ENV !== 'production') console.error('react-native-drawer: openDrawerThreshold is obsolete. Use panThreshold instead.')
    if (this.props.panStartCompensation && process.env.NODE_ENV !== 'production') console.error('react-native-drawer: panStartCompensation is deprecated.')
    if (this.props.relativeDrag && process.env.NODE_ENV !== 'production') console.error('react-native-drawer: relativeDrag is deprecated.')
    // 这里是入口，比较核心的地方
    this.initialize(this.props)
  }

  // 当props发生变化时执行componentWillReceiveProps；
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 是否需要重新同步
    if (this.requiresResync(nextProps)) this.resync(null, nextProps)
    // 是否打开抽屉
    if (nextProps.open !== null && this._open !== nextProps.open) {
      this._syncAfterUpdate = true
      this._open = nextProps.open
    }
  }

  componentDidUpdate() {
    if (this._syncAfterUpdate) {
      this._syncAfterUpdate = false
      this._open ? this.open('force') : this.close('force')
    }
  }

  initialize = (props) => {
    // 屏幕总长度
    let fullLength = this.getDeviceLength();
    // 获取关闭和打开的偏移量
    this._offsetClosed = this.getClosedOffset(props, this.state.viewport)
    this._offsetOpen = this.getOpenOffset(props, this.state.viewport)
    // add function options
    // 前置长度=长度，也不知道这样是干什么
    this._prevLength = this._length
    //  设置样式
    let styles = {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }
    // 主页面样式
    styles.main = Object.assign({
      position: 'absolute',
      borderWidth: 0,
    }, this.isLeftOrRightSide() ? { top: 0 } : { left: 0 }, this.props.styles.main)
    // 抽屉样式
    styles.drawer = Object.assign({
      position: 'absolute',
      borderWidth: 0,
    }, this.isLeftOrRightSide() ? { top: 0 } : { left: 0 }, this.props.styles.drawer)
    // 初始化或者是打开的状态
    if (props.initializeOpen || props.open) { // open
      this._open = true
      //当前长度= 总长度-偏移量
      this._length = fullLength - this._offsetOpen
      // 根据字段也就是props的,但是这里为什么是0呢
      // side (String left|right|top|bottom)
      styles.main[this.props.side] = 0
      styles.drawer[this.props.side] = 0
      // 不同的抽屉形式,目前不知道区别是什么
      if (props.type === 'static') styles.main[this.props.side] = fullLength - this._offsetOpen
      if (props.type === 'displace') styles.main[this.props.side] = fullLength - this._offsetOpen
    } else { // closed
      this._open = false
      // 这个长度没知道他具体在哪里用
      this._length = this._offsetClosed
      // 这里也不了解为何是这样:_offsetClosed,按道理关闭和不关闭无非就是位置的变化
      styles.main[this.props.side] = this._offsetClosed
      // 这里应该是对,但是不知道他的这个计算方式
      if (props.type === 'static') styles.drawer[this.props.side] = 0
      if (props.type === 'overlay') styles.drawer[this.props.side] = this._offsetClosed + this._offsetOpen - fullLength
      if (props.type === 'displace') styles.drawer[this.props.side] = - fullLength + this._offsetClosed + this._offsetOpen
    }
    // 这个main,就是ref指向,不知为何是有这个判断,难道还有一种没有main的情况
    // 设置props的一种方式
    if (this.main) {
      this.drawer.setNativeProps({ style: { left: styles.drawer.left } })
      this.main.setNativeProps({ style: { left: styles.main.left } })
    } else {
      // 这个拿到应该是初始化的样式
      this.stylesheet = StyleSheet.create(styles)
      // 这里是重点,能不能移动就看这里了

      this.responder = PanResponder.create({
        // 要求成为响应者,也就是能拖动的条件
        onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
        // 要求成为响应者,也就是能拖动的条件,包含子组件的情况
        onStartShouldSetPanResponderCapture: this.onStartShouldSetPanResponderCapture,
        // 要求成为响应者,也就是能拖动的条件,按照名字应该是说移动,这个知识点,以后再去找找哪里有介绍  
        onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
        // 要求成为响应者,也就是能拖动的条件,包含子组件的情况
        onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
        // 这里真正的开始移动
        onPanResponderMove: this.onPanResponderMove,
        // 手势松开时触发该事件
        onPanResponderRelease: this.onPanResponderRelease,
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        onPanResponderTerminate: this.onPanResponderTerminate
      })
    }

    this.resync(null, props)
  };

  updatePosition = () => {
    let mainProps = {}
    let drawerProps = {}
    let ratio = (this._length - this._offsetClosed) / (this.getOpenLength() - this._offsetClosed)

    switch (this.props.type) {
      case 'overlay':
        drawerProps[this.props.side] = -this.getDeviceLength() + this._offsetOpen + this._length
        mainProps[this.props.side] = this._offsetClosed
        break
      case 'static':
        mainProps[this.props.side] = this._length
        drawerProps[this.props.side] = 0
        break
      case 'displace':
        mainProps[this.props.side] = this._length
        drawerProps[this.props.side] = -this.getDeviceLength() + this._length + this._offsetOpen
        break
    }

    let mainOverlayProps = null
    let drawerOverlayProps = null
    if (this.props.tweenHandler) {
      let propsFrag = this.props.tweenHandler(ratio, this.props.side)
      mainProps = Object.assign(mainProps, propsFrag.main)
      drawerProps = Object.assign(drawerProps, propsFrag.drawer)
      mainOverlayProps = propsFrag.mainOverlay
      drawerOverlayProps = propsFrag.drawerOverlay
    }
    if (this.main && this.drawer && this.mainOverlay && this.drawerOverlay) {
      this.drawer.setNativeProps({ style: drawerProps })
      this.main.setNativeProps({ style: mainProps })
      if (mainOverlayProps) this.mainOverlay.setNativeProps({ style: mainOverlayProps })
      if (drawerOverlayProps) this.drawerOverlay.setNativeProps({ style: drawerOverlayProps })
    }
  };

  shouldOpenDrawer(delta) {
    let hasActiveHeading = this._open ^ delta > 0 ^ this.isRightOrBottomSide()
    if (!hasActiveHeading) return this._open
    else return this._open ^ Math.abs(delta) > this.getDeviceLength() * this.props.panThreshold
  }

  onPanResponderTerminate = (e, gestureState) => {
    this._panning = false
    this.shouldOpenDrawer(this.getGestureDelta(gestureState)) ? this.open() : this.close()
  };

  // 这个和onStartShouldSetPanResponder,区别只有一点,好像是相反的
  onStartShouldSetPanResponderCapture = (e, gestureState) => {
    if (this.shouldCaptureGestures()) return this.processShouldSet(e, gestureState)
    return false
  };

  // 判断能否成为响应者
  onStartShouldSetPanResponder = (e, gestureState) => {
    if (!this.shouldCaptureGestures()) return this.processShouldSet(e, gestureState)
    return false
  };

  onMoveShouldSetPanResponderCapture = (e, gestureState) => {
    if (this.shouldCaptureGestures() && this.props.negotiatePan) return this.processMoveShouldSet(e, gestureState)
    return false
  };

  onMoveShouldSetPanResponder = (e, gestureState) => {
    if (!this.shouldCaptureGestures() && this.props.negotiatePan) return this.processMoveShouldSet(e, gestureState)
    return false
  };

  onPanResponderMove = (e, gestureState) => {
    // 获取手势累计行程
    let delta = this.getGestureDelta(gestureState);
    // 老套路,禁止手势的时候
    if (!this.props.acceptPan) return false

    //Do nothing if we are panning the wrong way
    if (this._open ^ delta < 0 ^ this.isRightOrBottomSide()) return false
    // 这里是改变方向
    delta = this.isRightOrBottomSide() ? delta * -1 : delta
    //  这个地方赋值3遍,有点扯淡了

    let length = this._prevLength + delta
    length = Math.min(length, this.getOpenLength())
    length = Math.max(length, this.getClosedLength())
    length = Math.round(length * 2) / 2
    this._length = length
    // 这里是真正的移动了,太好了
    this.updatePosition()
    if (!this._panning) {
      this.props.onDragStart && this.props.onDragStart();
    }
    this._panning = true
  };

  onPanResponderRelease = (e, gestureState) => {
    let delta = this.getGestureDelta(gestureState);
    this._panning = false
    if (Date.now() - this._panStartTime < TAP_DURATION) this.processTapGestures()
    if (Math.abs(delta) < 50 && this._activeTween) return

    this.shouldOpenDrawer(delta) ? this.open() : this.close()
    this.updatePosition()
    this._prevLength = this._length
  };

  // 这个的上一步是判断是否成为响应者,紧接着来个这个,有点疑惑
  processShouldSet = (e, gestureState) => {
    // 判断是否再蒙层上
    let inMask = this.testPanResponderMask(e, gestureState)
    if (!inMask) return false
    // 如果我们主要是垂直滑动，则跳过手势过程
    // skip gesture process if we have mostly vertical swipe
    if (!this._open && Math.abs(gestureState.dy) >= Math.abs(gestureState.dx)) return false
    // 关键节点,首次触摸的时间
    this._panStartTime = Date.now()
    // 如果不是在蒙层并且可以滑动
    if (inMask && this.shouldCaptureGestures()) return true
    // 如果为true，则尝试只处理水平滑动，使其与子ScrollView配合良好。
    if (this.props.negotiatePan) return false
    // 允许抽屉平移（在触摸拖动时）。设置为false可有效禁用抽屉，同时仍允许编程控制。
    // 也就是不通过拖动滑出抽屉,而是通过函数来打开和关闭
    if (!this.props.acceptPan) return false
    // 终止其他动画
    this.terminateActiveTween()
    return true
  };

  processMoveShouldSet = (e, gestureState) => {
    // 是否在蒙层上
    let inMask = this.testPanResponderMask(e, gestureState)
    // 不在蒙层,并且关闭状态
    if (!inMask && (!this.props.acceptPanOnDrawer || this._open === false)) return false
    // 禁止手势,而是通过代码来控制
    if (!this.props.acceptPan) return false
    // 这个禁用,移动中等等不允许滑动
    if (!this.props.negotiatePan || this.props.disabled || !this.props.acceptPan || this._panning) return false
    // 获取增量
    let delta = this.getGestureDelta(gestureState)
    // 增量的对立面
    let deltaOppositeAxis = this.getGestureDeltaOppositeAxis(gestureState)
    // 向左或者向上
    let swipeToLeftOrTop = (delta < 0) ? true : false
    // 向右或者向下
    let swipeToRightOrBottom = (delta > 0) ? true : false
    // 滑动对面轴,应该是要判断回弹,我猜测
    let swipeOppositeAxis = (Math.abs(deltaOppositeAxis) >= Math.abs(delta)) ? true : false
    // 滑动关闭的方向
    let swipeInCloseDirection = (this.isLeftOrTopSide()) ? swipeToLeftOrTop : swipeToRightOrBottom
    if (swipeOppositeAxis || (this._open && !swipeInCloseDirection) || (!this._open && swipeInCloseDirection)) {
      return false
    }
    // 终止其他滑动
    this.terminateActiveTween()
    return true
  };

  processTapGestures = () => {
    if (this._activeTween) return false // disable tap gestures during tween
    if (this.props.acceptTap || (this.props.tapToClose && this._open)) {
      this._open ? this.close() : this.open()
      return true
    }
    if (this.props.acceptDoubleTap) {
      let now = new Date().getTime()
      let timeDelta = now - this._lastPress
      this._lastPress = now
      if (timeDelta < DOUBLE_TAP_INTERVAL) {
        this._open ? this.close() : this.open()
        return true
      }
    }
    return false
  };

  // 是否应该捕捉手势
  shouldCaptureGestures() {
    // captureGestures的默认值是false,默认不识别所有的手势
    //  oneOf(true, false, 'open', 'closed') 这4个不知道为何是这样设计,还得往下看,直到走到最后一步
    if (this.props.captureGestures === true) return true
    if (this.props.captureGestures === 'closed' && this._open === false) return true
    if (this.props.captureGestures === 'open' && this._open === true) return true
    // 如果不是以上组合,就不捕捉
    return false
  }

  // 测试是否手势在蒙层上面
  testPanResponderMask = (e, gestureState) => {
    // 如果上层禁止滑动,直接就不触发成为响应者
    if (this.props.disabled) return false

    //如果父抽屉或子抽屉存在并且打开，则禁用
    //@TODO使其更干净，泛化为使用3+个抽屉，prop用于禁用/配置
    // Disable if parent or child drawer exist and are open
    // @TODO make cleaner, generalize to work with 3+ drawers, prop to disable/configure
    if (this.context.drawer && this.context.drawer._open) return false
    if (this._childDrawer && this._childDrawer._open) return false
    // pageX: - 触摸点相对于根元素的横坐标,应该是要捕获开始触摸是的坐标
    let pos0 = this.isLeftOrRightSide() ? e.nativeEvent.pageX : e.nativeEvent.pageY
    // 增量打开,应是判断是否
    let deltaOpen = this.isLeftOrTopSide() ? this.getDeviceLength() - pos0 : pos0
    // 增量关闭
    let deltaClose = this.isLeftOrTopSide() ? pos0 : this.getDeviceLength() - pos0
    //如果是打开状态 
    if (this._open && deltaOpen > this.getOpenMask()) return false
    // 如果是关闭状态
    if (!this._open && deltaClose > this.getClosedMask()) return false
    return true
  };

  // 终止活动状态的补间动画
  terminateActiveTween = () => {
    if (this._activeTween) {
      this._activeTween.terminate()
      this._activeTween = null
    }
  };

  open = (type, cb) => {
    let start = this._length
    let end = this.getOpenLength()

    if (this._activeTween) return
    if (type !== 'force' && start - end === 0 && this._open === true) return // do nothing if the delta is 0

    this.props.onOpenStart && this.props.onOpenStart()
    this.setInteractionHandle()
    this._activeTween = tween({
      start: this._length,
      end: this.getOpenLength(),
      duration: this.props.tweenDuration,
      easingType: this.props.tweenEasing,
      onFrame: (tweenValue) => {
        this._length = Math.round(tweenValue * 2) / 2;
        this.updatePosition()
      },
      onEnd: () => {
        this._activeTween = null
        this._open = true
        this._prevLength = this._length
        this.adjustForCaptureGestures()
        this.props.onOpen()
        this.clearInteractionHandle()

        if (typeof type === 'function') {
          type() // this is actually a callback
        } else cb && cb()

      }
    })
  };

  close = (type, cb) => {
    let start = this._length
    let end = this.getClosedLength()

    if (this._activeTween) return
    if (type !== 'force' && start - end === 0 && this._open === false) return // do nothing if the delta is 0

    this.props.onCloseStart && this.props.onCloseStart()
    this.setInteractionHandle()
    this._activeTween = tween({
      start,
      end,
      easingType: this.props.tweenEasing,
      duration: this.props.tweenDuration,
      onFrame: (tweenValue) => {
        this._length = Math.round(tweenValue * 2) / 2;
        this.updatePosition()
      },
      onEnd: () => {
        this._activeTween = null
        this._open = false
        this._prevLength = this._length
        this.adjustForCaptureGestures()
        this.props.onClose()
        this.clearInteractionHandle()

        if (typeof type === 'function') {
          type() // this is actually a callback
        } else cb && cb()

      }
    })
  };

  adjustForCaptureGestures() {
    if (!this.props.captureGestures) return
    let shouldCapture = this.shouldCaptureGestures()
    if (this.mainOverlay && this.drawerOverlay) {
      this.mainOverlay.setNativeProps({ pointerEvents: shouldCapture && this._open ? 'auto' : 'none' })
      this.drawerOverlay.setNativeProps({ pointerEvents: shouldCapture && !this._open ? 'auto' : 'none' })
    }
  }

  setInteractionHandle() {
    if (this._interactionHandle) InteractionManager.clearInteractionHandle(this._interactionHandle)
    if (this.props.useInteractionManager) this._interactionHandle = InteractionManager.createInteractionHandle()
  }

  clearInteractionHandle() {
    if (this._interactionHandle) InteractionManager.clearInteractionHandle(this._interactionHandle)
  }

  toggle = () => {
    this._open ? this.close() : this.open()
  };

  handleSetViewport = (e) => {
    let viewport = e.nativeEvent.layout
    let oldViewport = this.state.viewport
    if (viewport.width === oldViewport.width && viewport.height === oldViewport.height) return
    let didRotationChange = viewport.width !== oldViewport.width
    this.resync(viewport, null, didRotationChange)
  };

  // 这个模块是重新同步
  // didRotationChange:旋转是否发生变化
  // _syncAfterUpdate:同步后更新
  resync = (viewport, props, didRotationChange) => {
    if (didRotationChange) this._syncAfterUpdate = true
    // 设置最新的viewport和props
    viewport = viewport || this.state.viewport
    props = props || this.props
    // 获取关闭和打开的偏移量
    this._offsetClosed = this.getClosedOffset(props, viewport)
    this._offsetOpen = this.getOpenOffset(props, viewport)
    // 重新设置屏幕的尺寸
    this.setState({ viewport })
  };

  // 是否需要重新同步，验证propsWhomRequireUpdate中的props的值是否有变化
  requiresResync = (nextProps) => {
    for (let i = 0; i < propsWhomRequireUpdate.length; i++) {
      let key = propsWhomRequireUpdate[i]
      if (this.props[key] !== nextProps[key]) return true
    }
  };

  /*** DYNAMIC GETTERS ***/
  // 获取设备宽度，应该是计算滑动的距离使用
  getDeviceLength = (viewport = this.state.viewport) => this.isLeftOrRightSide() ? viewport.width : viewport.height;
  // 获取打开时的宽度：总长度-偏移量
  getOpenLength = () => this.getDeviceLength() - this._offsetOpen;
  // 获取关闭的长度，我猜测是边缘关闭那意思？
  getClosedLength = () => this._offsetClosed;
  // 获取内容区域宽度
  getMainWidth = (viewport = this.state.viewport) => {
    return this.isLeftOrRightSide() ? viewport.width - this._offsetClosed : viewport.width;
  };
  // 获取内容区域高度
  getMainHeight = (viewport = this.state.viewport) => {
    return this.isTopOrBottomSide() ? viewport.height - this._offsetClosed : viewport.height;
  };
  // 获取弹窗的宽度
  getDrawerWidth = (viewport = this.state.viewport) => {
    return this.isLeftOrRightSide() ? viewport.width - this._offsetOpen : viewport.width;
  };
  // 获取弹窗的高度
  getDrawerHeight = (viewport = this.state.viewport) => {
    return this.isTopOrBottomSide() ? viewport.height - this._offsetOpen : viewport.height;
  };
  // 获取打开的边缘
  getOpenMask = (viewport = this.state.viewport) => {
    // 对平移关闭操作开始有效的屏幕宽度比率，这里是具体的数值
    if (this.props.panCloseMask && this.props.panCloseMask % 1 === 0) return this.props.panCloseMask
    // 这里是百分比
    if (this.props.panCloseMask) return this.getDeviceLength(viewport) * this.props.panCloseMask
    return Math.max(0.05, this._offsetOpen)
  };
  // 获取关闭的边缘
  getClosedMask = () => {
    if (this.props.panOpenMask && this.props.panOpenMask % 1 === 0) return this.props.panOpenMask
    if (this.props.panOpenMask) return this.getDeviceLength() * this.props.panOpenMask
    return Math.max(0.05, this._offsetClosed)
  };
  // 获取打开偏移
  getOpenOffset = (props, viewport) => {
    // openDrawerOffset：Drawer打开后有边界距离屏幕右边界的距离，把当前的尺寸传递过去
    if (typeof props.openDrawerOffset === 'function') return props.openDrawerOffset(viewport)
    return props.openDrawerOffset > 1 || props.openDrawerOffset < 0 ? props.openDrawerOffset : props.openDrawerOffset * this.getDeviceLength(viewport)
  };
  // 获取闭合偏移
  getClosedOffset = (props, viewport) => {
    if (typeof props.closedDrawerOffset === 'function') return props.closedDrawerOffset(viewport)
    return props.closedDrawerOffset > 1 || props.closedDrawerOffset < 0 ? props.closedDrawerOffset : props.closedDrawerOffset * this.getDeviceLength(viewport)
  };
  // 获取手势累计滑动距离，估计是滑动的距离使用
  getGestureDelta = (gestureState) => this.isLeftOrRightSide() ? gestureState.dx : gestureState.dy;
  // 获取手势增量相对坐标轴
  getGestureDeltaOppositeAxis = (gestureState) => this.isLeftOrRightSide() ? gestureState.dy : gestureState.dx;
  /*** END DYNAMIC GETTERS ***/

  // I18nManager.isRTL：检查布局方式
  isLeftOrRightSide = () => {
    if (I18nManager.isRTL) {
      return ["right", "left"].includes(this.props.side)
    } else {
      return ["left", "right"].includes(this.props.side)
    }
  }
  isTopOrBottomSide = () => ["top", "bottom"].includes(this.props.side);
  isLeftOrTopSide = () => {
    let side = "left";
    if (I18nManager.isRTL) {
      side = "right";
    }
    return [side, "top"].includes(this.props.side);
  }
  isRightOrBottomSide = () => {
    let side = "right"
    if (I18nManager.isRTL) {
      side = "left"
    }
    return [side, "bottom"].includes(this.props.side);
  }
  // I18nManager.isRTL：检查布局方式 
  render() {
    let first = this.props.type === 'overlay' ? this.renderMain() : this.renderDrawer()
    let second = this.props.type === 'overlay' ? this.renderDrawer() : this.renderMain()

    return (
      <View
        key="drawerContainer"
        onLayout={this.handleSetViewport}
        style={this.stylesheet.container}
      >
        {first}
        {second}
      </View>
    )
  }

  renderMain() {
    return (
      <View
        {...this.responder.panHandlers}
        key="main"
        ref={c => this.main = c}
        style={[this.stylesheet.main, { height: this.getMainHeight(), width: this.getMainWidth() }]}
      >
        {this.props.children}
        <View
          pointerEvents={this._open && this.shouldCaptureGestures() ? 'auto' : 'none'}
          ref={c => this.mainOverlay = c}
          style={[styles.overlay, this.props.styles && this.props.styles.mainOverlay]}
        />
      </View>
    )
  }

  renderDrawer() {
    return (
      <View
        {...this.responder.panHandlers}
        key="drawer"
        ref={c => this.drawer = c}
        elevation={this.props.elevation}
        style={[this.stylesheet.drawer, { height: this.getDrawerHeight(), width: this.getDrawerWidth() }]}
      >
        {this.props.content}
        <View
          pointerEvents={!this._open && this.shouldCaptureGestures() ? 'auto' : 'none'}
          ref={c => this.drawerOverlay = c}
          style={[styles.overlay, this.props.styles && this.props.styles.drawerOverlay]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})
