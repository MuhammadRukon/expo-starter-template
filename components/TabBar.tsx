import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { StyleSheet } from "nativewind";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const activeColor = "#BF40BF";
  const grayColor = "#D3D3D3";

  const icons = {
    index: (props) => (
      <AntDesign
        className="text-center"
        name="home"
        size={24}
        color={grayColor}
        {...props}
      />
    ),
    explore: (props) => (
      <Feather
        className="text-center"
        name="compass"
        size={24}
        color={grayColor}
        {...props}
      />
    ),
    profile: (props) => (
      <AntDesign
        className="text-center"
        name="user"
        size={24}
        color={grayColor}
        {...props}
      />
    ),
  };
  return (
    <View className="absolute w-[90%] left-[5%] rounded-full bottom-10 flex-row justify-center gap-6 items-center py-2 bg-primary shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            style={styles.tabItems}
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({ color: isFocused ? activeColor : grayColor })}
            <Text
              className="text-center font-semibold"
              style={{ color: isFocused ? activeColor : grayColor }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabItems: {
    width: 100,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 16,
  },
});
export default TabBar;
