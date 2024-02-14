import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

export default function CreateSquadView() {
  const { squad, joinSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  const [squadName, setSquadName] = useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setSquadName}
        value={squadName}
        placeholder={"Drunken Bastards"}
      />
      <Button title={"Create"}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#101020",
    alignItems: "center",
    justifyContent: "center",
  },
});
