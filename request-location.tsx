import React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { LocationCallback } from "expo-location";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

const PermissionsButton = () => (
  <View style={styles.container}>
    <Button onPress={requestPermissions} title="Enable background location" />
  </View>
);

TaskManager.defineTask<{ locations: [Location.LocationObject] }>(
  LOCATION_TASK_NAME,
  ({ data, error }) => {
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
