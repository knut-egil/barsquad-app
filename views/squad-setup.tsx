import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

export default function SquadSetup() {
  const { squad, joinSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  const [squadName, setSquadName] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createContainer}>
        <View style={styles.joinContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setSquadName}
            value={squadName}
            placeholder={"DEADBEEF"}
          />
          <Button title={"Join Squad"}></Button>
        </View>
        <Button title={"Create Squad"}></Button>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    width: "90%",
    textAlign: "center",

    backgroundColor: "#ffffff",
    borderRadius: 8,
  },

  joinContainer: {
    backgroundColor: "#202040",
    alignItems: "center",
    justifyContent: "center",

    padding: 8,
    width: "100%",

    borderRadius: 8,
  },
  createContainer: {
    backgroundColor: "#181830",
    alignItems: "center",
    justifyContent: "center",

    gap: 12,
    paddingBottom: 12,
    width: "70%",

    borderRadius: 16,
    overflow: "hidden",
  },

  container: {
    flex: 1,
    backgroundColor: "#101020",
    alignItems: "center",
    justifyContent: "center",
  },
});
