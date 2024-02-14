import { StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import SquadSetup from "./squad-setup";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      <SquadSetup></SquadSetup>
    </>
  );
}
