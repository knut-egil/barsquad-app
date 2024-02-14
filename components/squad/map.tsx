import { useContext } from "react";
import { BarSquad } from "../../controller/squad-session";
import SquadContext from "../../contexts/squad-context";
import MapView from "react-native-maps";

export default function SquadMap() {
  const { squad } = useContext<BarSquad.SquadContext>(SquadContext);

  return (
    <>
      <MapView></MapView>
    </>
  );
}
