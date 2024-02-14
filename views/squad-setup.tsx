import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

export default function SquadSetup() {
  const { squad, joinSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  return (
    <View  style={styles.container}>
      <>
        <TextInput id="squad-code-input"></TextInput>
        <Button title={"Join Squad"}></Button>
      </>
      <Button title={"Create Squad"}></Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
