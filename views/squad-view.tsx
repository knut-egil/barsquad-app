import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

export default function SquadView() {
  const { squad, joinSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{squad?.name ?? "No squad"}</Text>
      <Text>
        {squad?.members?.map((member) => member.name).join(", ") ??
          "No members"}
      </Text>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101020",
    alignItems: "center",
    justifyContent: "center",
  },
});
