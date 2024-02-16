import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

import { PROVIDER_GOOGLE } from "react-native-maps";

export default function SquadView() {
  const { squad, setSquad } = useContext<BarSquad.SquadContext>(SquadContext);
  if (squad)
    squad.members = [
      { name: "Anders" },
      { name: "Adrian" },
      { name: "Sauen" },
      { name: "Knut Egil" },
      { name: "Christoffer" },
      { name: "Martin" },
    ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.squadInfo}>
        <Text style={styles.text}>{squad?.name ?? "The Squad"}</Text>
        <View style={styles.members}>
          {squad?.members?.map((member, idx) => (
            <Text style={styles.text}>
              {member.name}
              {idx + 1 < squad.members.length ? "," : ""}
            </Text>
          )) || <Text style={styles.text}>"No members"</Text>}
        </View>
      </View>

      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,

    backgroundColor: "#101020",
  },

  squadInfo: {
    flex: 0,

    paddingVertical: 40,
    height: "auto",

    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#ffffff",
  },
  members: {
    flex: 0,
    flexDirection: "row",

    margin: 8,
    maxWidth: "80%",

    flexWrap: "wrap",
    justifyContent: "flex-start",

    gap: 4,
  },

  map: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0000ff",
    height: "auto",
  },
});
