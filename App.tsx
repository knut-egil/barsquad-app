import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquadContext from "./contexts/squad-context";
import { BarSquad } from "./controller/squad-session";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./views/home-screen";
import SquadSetup from "./views/squad-setup";

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

  return (
    <SquadContext.Provider value={{ squad, joinSquad }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Home"}
            component={HomeScreen}
            options={{ title: "Bar Squad" }}
          />
          <Stack.Screen
            name={"Join Squad"}
            component={SquadSetup}
            options={{ title: "Bar Squad" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SquadContext.Provider>
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
