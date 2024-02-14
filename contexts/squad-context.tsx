import { createContext } from "react";
import { BarSquad } from "../controller/squad-session";

const squadContext = createContext<BarSquad.SquadContext>({
  squad: undefined,
  joinSquad: (code) => {
    throw new Error("Not implemented");
  },
});

export default squadContext;
