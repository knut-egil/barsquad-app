import { createContext } from "react";
import { BarSquad } from "../controller/squad-session";

const squadContext = createContext<BarSquad.SquadContext>({
  squad: undefined,
  setSquad: (squad?: BarSquad.SquadSession) => {
    throw new Error("Not implemented");
  },
});

export default squadContext;
