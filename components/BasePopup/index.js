import * as React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  PanResponder
} from 'react-native';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
let offSetY = 0, offSetDy = 0;
const BasePopup = (props) => {
  const { visible, onCancel } = props;
  const [visibleSelf, setSelfVisible] = React.useState(false);
  React.useEffect(() => {
    setSelfVisible(visible);
    if (visible) {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 100 } } // Back to zero
      ).start();
    }
  }, [visible]);
  const finishHand = () => {
    if (offSetY > (dh / 2) || offSetDy > 200) {
      Animated.spring(
        pan,
        { toValue: { x: 0, y: dh + 20 } } // Back to zero
      ).start();
      setSelfVisible(false);
      onCancel && onCancel();
    }
  }

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: dh })).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        //return true if user is swiping, return false if it's a single click
        return !(gestureState.dx === 0 && gestureState.dy === 0)
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y },
        ],
        {
          listener: (event, gestureState) => {
            offSetY = gestureState.moveY;
            offSetDy = gestureState.dy;
          }
        }, // 可选的异步监听函数
      ),
      onPanResponderRelease: () => {
        finishHand();
        pan.flattenOffset();
      },

    })
  ).current;
  return (
    <View style={{
      ...styles.popupContainer,
      visible
    }}>
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }],
          ...styles.fadingContainer
        }}
        {...panResponder.panHandlers}
      >
        {props.children}
      </Animated.View>
      {
        visibleSelf &&
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.spring(
              pan, // Auto-multiplexed
              { toValue: { x: 0, y: dh } } // Back to zero
            ).start();
            setSelfVisible(false);
            onCancel && onCancel();
          }}>
          <View style={{ width: dw, height: dh, opacity: 0.8, backgroundColor: '#000', zIndex: 2, position: 'absolute' }}>

          </View>
        </TouchableWithoutFeedback>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    width: dw,
    height: dh,
    visible: false
  },
  fadingContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    backgroundColor: '#1e1e1e',
    width: dw,
    height: dh
  }
});
export default BasePopup;