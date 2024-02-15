import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { io, Socket } from "socket.io-client";
import config from "./Config";
import SquadContext from "./contexts/squad-context";
import WebsocketContext from "./contexts/websocket-context";
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

      // If socket client...
      if (client) {
        // Disconnect!
        client.disconnect();
      }
    } else {
      // if squad is NOT null, make sure to establish websocket connection to respective squad room!
      // Connect...
      console.info("Active squad! Create websocket connection...");

      // Create new client & connect!
      const _client = io(
        `wss://${config.domain}${config.endpoints.websocket.squad.code(
          squad.code
        )}`,
        {
          reconnection: true,
          reconnectionDelayMax: 10_000, // Max 10s retry
        }
      );

      // Set client
      setClient(_client);
    }
  }, [squad]);
  //#endregion

  //#region Websocket context
  const [client, setClient] = useState<Socket>();

  useEffect(() => {
    if (!client) {
      // No websocket clients
      console.info("Websocket client disconnected!");
    } else {
      // Websocket client socket created!
      // Ensure squad!
      if (!squad) {
        // Clear client & return
        setClient(undefined);

        // Log
        console.info("Unset websocket client, squad not found.");

        // Return
        return;
      }

      // Wait for connection
      client.once("connect", () => {
        // Log
        console.info("Websocket client connected! Start syncing data...");
      });

      // Log waiting for connection
      console.info(
        `Waiting for websocket client to establish connection to squad room with code "${squad?.code}".`
      );
    }
  }, [client, squad]);
  //#endregion

  return (
    <>
      <SquadContext.Provider value={{ squad: squad, setSquad: setSquad }}>
        <WebsocketContext.Provider
          value={{ client: client, setClient: setClient }}
        >
          {squad ? <SquadView /> : <SquadSetup />}
          <StatusBar style={"auto"} />
        </WebsocketContext.Provider>
      </SquadContext.Provider>
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
