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

  //#region Create
  const [isCreating, setIsCreating] = useState(false);
  function onCreateSquadPress() {
    // If isCreating == false, set to true
    if (!isCreating) {
      setIsCreating(true);
      return;
    }

    // We were already creating a squad, verify name etc.

    // Attempt to register squad to backend

    // If success, join user to squad and display squad-code
    console.log(`Attempted to create squad with name: "${squadName}"!`);
  }

  const [squadName, setSquadName] = useState("");
  //#endregion

  //#region Join
  const [squadCode, setSquadCode] = useState("");
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createContainer}>
        {isCreating ? (
          <>
            <View style={styles.squadDetailsContainer}>
              <View style={styles.squadDetailsInputContainer}>
                <Text style={styles.squadDetailsInputText}>Name</Text>
                <TextInput
                  style={styles.squadDetailsInput}
                  onChangeText={setSquadName}
                  value={squadName}
                  placeholder={"Drunken Bastards"}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.joinContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setSquadCode}
                value={squadCode}
                placeholder={"DEADBEEF"}
              />
              <Button title={"Join Squad"}></Button>
            </View>
          </>
        )}
        <Button title={"Create Squad"} onPress={onCreateSquadPress}></Button>
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

  squadDetailsContainer: {
    backgroundColor: "#202040",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 16,
    padding: 8,
    width: "100%",

    borderRadius: 8,
  },
  squadDetailsInputContainer: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
  },
  squadDetailsInputText: {
    marginLeft: 12,
    color: "#ffffff",
  },
  squadDetailsInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    width: "90%",

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
    width: "80%",

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
