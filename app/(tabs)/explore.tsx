import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <StatusBar style="dark" />
      <Text className="">Explore</Text>
    </SafeAreaView>
  );
}
