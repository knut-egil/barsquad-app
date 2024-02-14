import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquadContext from "./contexts/squad-context";
import { BarSquad } from "./controller/squad-session";

import SquadSetup from "./views/squad-setup";
import SquadView from "./views/squad-view";

export default function App() {
  //#region Squad context
  const [squad, setSquad] = useState<BarSquad.SquadSession>();

  // We want to listen for changes to our "squad"/"setSquad"
  // if it is set, then we assume we were able to join via a squad code.
  // We should now attempt to connect to the websocket server for live stuff!
  useEffect(() => {
    if (!squad) {
      // Check if squad is null, then make sure no websocket connection is open
      // Disconnect...
      console.info(
        "No squad active! Close any existing websocket connections..."
      );
    } else {
      // if squad is NOT null, make sure to establish websocket connection to respective squad room!
      // Connect...
      console.info("Active squad! Create websocket connection...");
    }
  }, [squad]);
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
