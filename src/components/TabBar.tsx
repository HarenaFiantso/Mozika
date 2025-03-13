import { FC } from 'react';

import { StyleSheet, View } from 'react-native';

import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/src/types';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';

import { TabBarButton } from '@/components/TabBarButton';

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export const TabBar: FC<TabBarProps> = ({ state, navigation, descriptors }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#40C2D5' : '#b6b6b6'}
            label={label}
          />
        );
      })}
    </View>
  );
};

const COLORS = {
  background: '#000000',
  border: '#B6B6B6',
};

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 50,
    borderWidth: 1,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
  },
});
