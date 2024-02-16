import React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import SquadController from "./controller/squad.controller";
import config from "./Config";

const LOCATION_TASK_NAME = "background-location-task";

export const hasBackgroundLocationPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();

    if (backgroundStatus === "granted") {
      // Start task!!
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000 * 15, // Update every 15s
        distanceInterval: 0,
      });

      return true;
    }
  }

  return false;
};

const requestPermissions = async (cb: (result: boolean) => void) => {
  const result = await hasBackgroundLocationPermissions();
  if (result) {
    // Do not oduble register
    /*await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 1000 * 15, // Update every 15s
      distanceInterval: 0,
    });*/
  }
  cb(result);
};

const PermissionsButton = ({
  onPressed,
}: {
  onPressed(result: boolean): void;
}) => (
  <View style={styles.container}>
    <Button
      onPress={() => {
        requestPermissions(onPressed);
      }}
      title="Enable background location"
    />
  </View>
);

TaskManager.defineTask<{ locations: [Location.LocationObject] }>(
  LOCATION_TASK_NAME,
  async ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.error(
        `An error occured in our background location task, error:${error?.message}`
      );
      return;
    }
    if (data) {
      const { locations } = data;
      // do something with the locations captured in the background
      console.info(
        `Retreived ${
          locations.length
        } locations from background location task! Locations: ${JSON.stringify(
          data,
          null,
          2
        )}`
      );

      // Send to our websocket/update via fetch request!
      try {
        const squadCode = SquadController.getSquadCode();
        const username = SquadController.getUsername();

        if (!squadCode) return;
        if (!username) return;

        const payload = {
          username: username,
          locations: locations,
        };

        // Make request
        const res = await fetch(
          `https://${config.domain}${config.endpoints.api.squad.code.location(
            squadCode
          )}`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // If 500 status, no squad exist! stop task.
        /*if (res.status === 500) {
          await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
          console.info(
            "Unregistered location update task for no valid squad id!!!"
          );
          throw new Error("Squad not found with that id.");
        }*/

        // Get result
        const result = await res.json();

        // Do something with result?
        console.info(
          `Location update to API result: ${JSON.stringify(result, null, 2)}`
        );
      } catch (_err) {
        const err = _err as Error;
        console.error(
          `Failed sending request! Error: ${err?.stack ?? err?.message}`
        );
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    color: "#ffffff",
  },
});

export default PermissionsButton;
