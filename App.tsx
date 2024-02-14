import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquadContext from "./contexts/squad-context";
import { BarSquad } from "./controller/squad-session";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SquadSetup from "./views/squad-setup";
import SquadView from "./views/squad-view";

const Stack = createNativeStackNavigator();

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

  return <>{squad ? <SquadView></SquadView> : <SquadSetup></SquadSetup>}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
