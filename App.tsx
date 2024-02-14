import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquadContext from "./contexts/squad-context";
import { BarSquad } from "./controller/squad-session";

import SquadSetup from "./views/squad-setup";
import SquadView from "./views/squad-view";

export default function App() {
  //#region Squad context
  const [squad, setSquad] = useState<BarSquad.SquadSession>();
  //#endregion

  return (
    <>
      <SquadContext.Provider value={{ squad: squad, setSquad: setSquad }}>
        {squad ? <SquadView /> : <SquadSetup />}
      </SquadContext.Provider>
      <StatusBar style={"auto"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
