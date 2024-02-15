import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

export default function SquadView() {
  const { squad, setSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{squad?.name ?? "The Squad"}</Text>
      <Text style={styles.text}>
        {squad?.members?.map((member) => member.name).join(", ") ||
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

  text: {
    color: "#ffffff",
  },
});
