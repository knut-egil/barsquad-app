import { StyleSheet, Text, View, Button } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigation = NativeStackNavigationProp<any, "Home">;
export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigation;
}) {
  return (
    <View>
      <Text>Home!</Text>
      <Button
        title={"Join Squad"}
        onPress={() => {
          navigation.navigate("Join Squad");
        }}
      ></Button>
    </View>
  );
}
