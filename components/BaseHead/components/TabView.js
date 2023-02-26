import React from 'react';
import ReactNative, { Animated } from 'react-native';
import memoize from 'memoize-one';


const compose = (WrappedComponent) => {
    const AnimateTabView = Animated.createAnimatedComponent(WrappedComponent);

    class TabView extends React.Component {
        constructor(props) {
            super(props);
            this.scrollOffsetY = 0;
            this.state = {
                bottomPadding: 0,
            };
            this.mounted = false;
        }

        componentDidMount() {
            this.mounted = true;
            this.addListener();
        }

        componentWillUnmount() {
            this.removeListener();
        }

        addListener() {
            const { containerOffsetY } = this.props;
            containerOffsetY?.addListener(this.tabViewScrollHandler);
        }

        removeListener() {
            const { containerOffsetY } = this.props;
            containerOffsetY?.removeListener(this.tabViewScrollHandler);
        }

        scrollTo(e) {
            if (this._scrollViewRef) {
                if (this._scrollViewRef?.scrollTo) {
                    this._scrollViewRef.scrollTo({ x: 0, y: e.y, animated: false });
                } else if (this._scrollViewRef?.scrollToOffset) {
                    this._scrollViewRef.scrollToOffset({ offset: e.y, animated: false });
                }
            }
        }

        // other TabView sync OffsetY
        tabViewScrollHandler = (e) => {
            const { headerHeight, isActive } = this.props;
            if (!isActive) {
                if (e.value > headerHeight && this.scrollOffsetY < headerHeight) {
                    this.scrollTo({ y: headerHeight });
                } else {
                    this.scrollTo({ y: e.value });
                }
            }
        };

        // contentHeight changed，adjust offset
        adjustScrollOffset = () => {
            if (this.mounted) {
                this.mounted = false;
                const { containerOffsetY, headerHeight } = this.props;
                const scrollValue = containerOffsetY._value > headerHeight ? headerHeight : containerOffsetY._value;
                this.scrollTo({ y: scrollValue });
            }
        };

        // calculate the bottom occupancy height
        onContentSizeChange = (contentWidth, contentHeight) => {
            const { bottomPadding } = this.state;
            const { headerHeight, sceneHeight } = this.props;
            const remainingHeight = contentHeight - sceneHeight;

            if (bottomPadding <= 0) {
                const makePaddingBottom = sceneHeight - contentHeight;
                this.setState({ bottomPadding: makePaddingBottom });
            } else if (remainingHeight > 1) {
                // The content height exceeds the container height，adjust Tab Offset，and reduce excess occupancy bottomPadding
                this.adjustScrollOffset();
                const newBottomPadding = remainingHeight > bottomPadding ? 0 : bottomPadding - remainingHeight;
                if (newBottomPadding != bottomPadding) {
                    this.setState({ bottomPadding: newBottomPadding });
                }
            }
        };

        getScrollListener = memoize((isActive) => {
            if (isActive) {
                return Animated.event([{ nativeEvent: { contentOffset: { y: this.props.containerOffsetY } } }], {
                    useNativeDriver: true,
                    listener: this.onScroll,
                });
            } else {
                return this.onScroll;
            }
        });

        onScroll = (e) => {
            this.scrollOffsetY = e.nativeEvent.contentOffset.y;
        };

        render() {
            const { isActive, children, headerHeight, forwardedRef, contentContainerStyle, ...restProps } = this.props;
            const { bottomPadding } = this.state;
            const scrollListener = this.getScrollListener(isActive);
            return (
                <AnimateTabView
                    ref={(ref) => {
                        this._scrollViewRef = ref;
                        if (forwardedRef) {
                            if (forwardedRef instanceof Function) {
                                forwardedRef(ref);
                            } else if (typeof forwardedRef === 'object' && forwardedRef.hasOwnProperty('current')) {
                                forwardedRef.current = ref;
                            }
                        }
                    }}
                    onScroll={scrollListener}
                    onContentSizeChange={this.onContentSizeChange}
                    contentContainerStyle={{
                        ...contentContainerStyle,
                        paddingTop: headerHeight,
                        paddingBottom: bottomPadding,
                    }}
                    overScrollMode="never"
                    scrollEventThrottle={16}
                    directionalLockEnabled={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    {...restProps}>
                    {children}
                </AnimateTabView>
            );
        }
    }

    return React.forwardRef((props, ref) => {
        return <TabView {...props} forwardedRef={ref} />;
    });
};

export const FlatList = compose(ReactNative.FlatList);
export const ScrollView = compose(ReactNative.ScrollView);
