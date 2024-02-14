import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquadContext from "./contexts/squad-context";
import { BarSquad } from "./controller/squad-session";

export default function App() {
  //#region Squad context
  const [squad, setSquad] = useState<BarSquad.SquadSession>();

  /**
   * Attempt to join a squad by code
   * @param code
   */
  async function joinSquad(code: string): Promise<boolean> {
    return false;
  }
  //#endregion

  return (
    <SquadContext.Provider value={{ squad, joinSquad }}>
      <View style={styles.container}>
        <Text>Bar Squad</Text>
        <Text>Current squad: {squad?.name ?? "None"}</Text>

        {/* If no active squad, show join/create squad view */}
        {squad ? (
          <>
            <Text>LEAVE SQUAD</Text>
          </>
        ) : (
          <>
            <Text>JOIN/CREATE SQUAD</Text>
          </>
        )}

        <StatusBar style="auto" />
      </View>
    </SquadContext.Provider>
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
