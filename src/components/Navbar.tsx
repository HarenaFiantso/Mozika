import { FC, ReactNode, useCallback, useRef } from 'react';

import {
  Animated,
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type NavbarProps = {
  tabs: {
    name: string;
    component: ReactNode;
  }[];

  indicatorColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Navbar: FC<NavbarProps> = ({ tabs, indicatorColor = '#efefef' }) => {
  const indicatorX = new Animated.Value(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const screenWidth = Dimensions.get('screen').width;

  const moveIndicator = (to: number) => {
    Animated.timing(indicatorX, {
      toValue: to,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const handleMenuPress = useCallback(
    (menuIndex: number) => {
      scrollRef.current?.scrollTo({ x: screenWidth * menuIndex });
    },
    [screenWidth],
  );

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} style={styles.menuButton} onPress={() => handleMenuPress(index)}>
            <Animated.Text
              style={{
                color: indicatorX.interpolate({
                  inputRange: [
                    ((index - 1) * screenWidth) / tabs.length,
                    (index * screenWidth) / tabs.length,
                    ((index + 1) * screenWidth) / tabs.length,
                  ],
                  outputRange: ['#555757', '#fff', '#555757'],
                  extrapolate: 'clamp',
                }),
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              {tab.name}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={{
          width: screenWidth / tabs.length,
          backgroundColor: indicatorColor,
          transform: [
            {
              translateX: indicatorX,
            },
            {
              scaleX: 0.7,
            },
          ],
          height: 3,
        }}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        decelerationRate={0.5}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const { contentOffset } = e.nativeEvent;
          moveIndicator(contentOffset.x / tabs.length);
        }}
      >
        {tabs.map((tab, index) => (
          <ScrollView key={index}>
            <View style={styles.content}>{tab.component}</View>
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: 3,
    marginBottom: -3,
  },
  content: {
    width: Dimensions.get('screen').width,
  },
});
