import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

import { PROVIDER_GOOGLE } from "react-native-maps";
import squadController from "../controller/squad.controller";
import * as Location from "expo-location";
import config from "../Config";

const PinImageDataUri =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAEAhJREFUaEOtmQl4VFWWx8+9971XS6qSyh7WsIS4oHQjItLqNA09fK0YUNHBpXHsdhppgZbRsUfGacHtszthkSa0LXxf2+wgNjB2y9iKGyDQwAAKIqsEA0kqqYTKVql679175zv3VYqspBDqo6ik8pbzO+d/lnsfgct4NdfXzgVC5xFCezqrCgA+kQDHvL7UYkJItKcTvuvfSU8nhoPfDgain9R0nSjDKYEkALq8rAQ4CkJsJEC3etPS9vZ072T+3i3A+VNHT2iaPoTpOjDNAE3XgVCqjMfPK31JKcDrDxiEEOtKrtUlwNmvD37MmP4jNJppOiCEphlAGUtAAOkxeJe0CwFASJCSn7Fse2V6dq953wWkkxWnDu56lulGMRreCqAhhGYokEQUEOAKIKQQAFIAftq2Bdy2ILN3/mV7pd0JZ/Z+kmcxvbKt8SoCbWCYpjk5gFL6rhASPS9A4ifnyniEyOoz4MoAju7Z9hSl2uutslGGxwEcEE3BUKbFI4FRiIMkG39lvHS8LyVw21YA+CZEjMvqW/BxspfC49oRf7nj/Rmappe2NbY1Ao7xGlDmgNTVN8mcrEySiAKy4OW6kxUaDmi480bjRdz7nNsgbBt27tm7d8++A//r83g2v/Dyy18kA9IpZId3/l22elp9xg3mQIUtgJpcAsrX5XZBdkZAahpzyitB8xVFR78AKMPxX3vjBRrObeAIwm34bOduILobsrKy1HdVwSDU1NSMfuaZZ/Z0B9MJ4NCnf5OtEWhqMa1zlSEtu08/whiD9PR00DQNUlNT1fXQiy4qgVAGFEusKrNtL4k/S+ferV5H6XAOQghlvBCO8cLmsHPPPghk56n74D38qalgxmKwd9++lilTpni7gugEsGL5m/NaWqJz0SBNY5CVmQmjbr+j22hGo1Hw6sQpsfF8aJVVwvy48SppBWofjUcI7iSx4Apm194DkJHbRwGg8WlxCG5zePfdd2Hqo1M72dvpi+0ffPAYofBWW4sLh95wSTnGYjEIlp/l+fn9UE+OnNpGIq5/qeq+k7yO8UJ9tsLs3n9IZPfuTwOBQDsAl8sF586dg/Xr12+dM2fOhLbGdALYseNv6RAz6i4HAI898dURCIVCMPx7NwiXy1CtutXTquarFwFCnVuihFQ0EEDJicOytZtg7NixkJmZCX6/H1LT0pSUDN2AhsYG2LF9O9x7333tbO6y7k4bEpBDB/rg+oF+5a3rH30VZKJgEVVI4rJW3+Pvu15/BjiXYHKA8fM3xXVtgeS2MtKxn6oSfG7n/0D/MfcnIDAKp86clRvf2yYH5OfTESNGQEFBgQPg96uG2tTYBKdPn4ZRt45KDuDafB8MK3AArpnyG5DEqYCqzEiiUtMx3gHYvXQOcA7AbQmFk5+A7BtGgjBj8O7z00FaALf94leQObgQCNNh7/wZoDECNz7xmnRl5BL0/vW3jk0YNnv27LGTJ0/+aNCgQSoSGtOgOdIMFRUVsGrFqqfmL5z/+1aFdBuB7IABPxqRqQAK7ns27vF4+OPRQOORREiAfctfVhGwbQmB60aIIXc+RL/64K+yfOc24qYUeg+/RQ4eP5EQTZeH3nieaAygrtGG/DFF2weNKcq68Y6fDG0r27f+9JYcP/6fIcXnU5UvEolAVWUlrFq9+umSkpJFPQLgAf8yrpc6buDdMxNeB0KcQKiSjpFwInBwVTFB420bwLYFDH/iN3D8s22yZv9OohECfYbfIvuOuoOAbsjDK4oJYwTqm2wIhc0XV9a5f1tWVtZuzbBo0SJ5/+TJ4PP5gWkMWhAgGITVK1c/XbIgSYApP+6ljOs//t+wsEhVWJz/sKDESQjmIvnqL0ukAyAJtwCufWAmObV3p2z4+gAhkkDutTdCr2EjQGgGHNu8XEmortGCUNh67pWDVb/rWOaWLF6yrmhS0YN+nx8oo4DlOhgMwqpVq55esGBBchFAAHR4v7FTFQAuZjAHsKOSBAQBIQicfG8Z5ivYXBKMwoAxD9Mzh/9PRsuPEWFJyBpQIHMKriNC98DpT94BRgFOVUSgPmLOXnSkbnFHgIULFxbfM+meZ31+H2ATjUVjEKwOwurVq5MHeOTOPEGolH1un+KMCCp3nTxQSawSGAGAnP14JfYignlg2UDON1HSHOXQ30uIFZXEnZoB/YbeBOXlZWBXfwO4Jtp3MgyNUX7f8hPhzR0BFpSUzJt0z71z/X6f6vCmaUJ1dTWsWbMmeYBHJ+bajEnZ6wcPosNb7b5YQuOzmRASzu9ch/MYwUokbCA2B8JtSQQnpKVJUjx70MhxsHvXR9A3BUcOgM++rAVL2NctO9F4rCNACQJMmjTX7/OpMSVmmjgXwdq1a5MH+PnkHJNpUuaOepAS6rSCiyTYVZ15SAogVbvX2rYNlCvDCSAAguDvTWHJ0MCyRiC9/BRSdGfo++hACP5w7EKXlXB+cfFrRRMnPodVCAHMmKka5br165IHmPZgdhQBcm55mBI1tMU7ASaGlCqJ46M9qdm3xnIkRAh+YjTQ+wjVUAuacywBw61yRk0a7/+jBt443jXAggULlky4666ZXq9XSciyLAdg3bqnFy1alFwS//KnWS2aLkTWzY8wqklJKepIOgmtyqdUwpKcQN2BVZbyvgIgxLJw/iYqAnVBMNRxghC3h2JjJgjx111BePNEuMsIlBQXR+4uKvJ43B4lN8u2oTYUgvUbNiQPMOtnGc1MA5F58yMapSApw1KKkVAlVSUFJjBKqOHwyhgajt63bEKFhd4n1LYICVUSd2u0PF4quE0Ygm3Z3j1A6ZIlcuy4cYCDHOoXI1BbG4K3N25MHmD2LzIaNV2K9OEP65QRSamUhIGKRMeFV9PRP0dti1IlH0sZTrlFqGURWl1OEUBJzuWmApsJt4D+5ZNq0p2EVq5YIXEmMgxDSci2bAjVhmDDunVPLVm69NKjxJPXpGOjgn+fHqhHgMCwKTpljoRUFDACziIMBzTVFmKnVkZsLik3KbVtRmwTmGU6IJVlzIsAKBvdAIFdmJuUbNgWZG90k8SbN22SONAZhkvdBytEVVUVbN+xI33evHnhS44Ss4dmYZLCrOn+MAL4r7tXZxpIphGBkYhvSsRzgoCQkthlayOof8EJ5aaTvGaMMoxC+SndrwZAAQoAr4FgG/5eo5UereuUA/OmTfPe/sADzdnZOaAbulpb4OK/rKwM7i4q6nka/fWwHAXwy+neC7ohua+wSAGg9zEnKG4vMhTExR06fn5jBKsOSkYo7QO1MRomAhipmMB4hmGAwAji9x/uqtfn7gp2ApgzZ07JXXfe+R8+nw903IsiWJY5HP3qKDz08EM9A/z3TXkyJ4fYE+8xGnRD8JTBP9E1HT0nJdWoxITGTG7zIqJiSwR/xyggBHreNoFaMcbOnXSlOeUWJSQ5MJBWjLBjJ2Ps55vPqh7R9lVSXCJHj74VPB4P6LqRkNDnn38OM2fN6hnghRG95LDvsZZbRtMIAngHjFMATEEQZxRSSwNnvlDVqGprS6sRKA9H/5SaMcIqT7nTeLxaYQQJkwKjc+yEqT22qawdwKyZM9ePGTNmSk5ODrjdbhUBvI8ZjcJ7W7faL770kt7Ocx3p8XcEmPqvxgWPV3Ldxbmn/z9pmk6EptpR3AHtNngJiOoPE+MwFgAzShnKxDIJqzjtCcQlRLCZaRq3TJOwWAulP1x8PGHQjCdnVI4ceXNeXm4eeLweBYBrAZRQqLoa3nt/69zFi5e8lBTAzx436nSXFAYC9B2NW6OCsfgwpxjab5+I0Gex1gsjJnoYjTSjhAXLPAEcv4FjwhNCNW5ZMZQYZa8cGbAwMyv714MHDYJ+/fpBWiANUrwpCgB7gK4Z0BJphJMnT8Lj057oeVcCjVg6obc1YYLeoLsF1wwhPL1vZqhdqjlt2DFfbT8knCFqd18EAAQgqgrZMaDVZ1PSVcOLT65AuWXHMDqUvRkcqRUWXqMW75i0Kb4USElJAezAuHkWaWyAuro62L9//6H5ry8e3lExXbbxE4sGhHWX5IZLcM0lhCd3GGUGCE1v3aWKRyARCQLywn4zEYEOAMGzKelYQrsCWFY9SissHKJWXj5lvA+8KV7QGa7CmuFC+AJ8cejQ4d//4Y/DupJ71wALB4Yd7zsScmVfQ7F+awZx9kcSbbj1dAKy/svEgwqUUAx7gPIyYdXfegMIgI3MGQedHECZlZ77vjZ06FDAuR+N97hdIAXu2AkIhWrhyJEjX18oP/eDLZ9+mmhePebA8QUDw+h5wyW5bgjhyhxENBcIlNHFZWUiD5SUZOOxBACWUmVgDPsA0JryNgAC1cdN06QMS+nrZdfX3TT8+9kpXq8aG9TobJlQcb4Cyr8tn7bm7beXd+X51u86RQDLzPH5A8PofR0lZEjhyugLui4FViKmS3lx1y1+Om5ONH1j40VbE9iyCLNMp5mFznsCkjt9QK2lgVsqyWOEba/JbjHz7/Dh9gk2z4aGBqiorIr9acUK96UM7xbgi1cK/ks3xHM4RutuyXGUcKXlANOlQBlJzjVhcU1yEd99UwtNIq1mZzrFedXZ/gdnbAbRFCbMsiixongVhOA29gkrRlljlJ3bFL2pP657Ldta+udVa2YmY3i3APufHxIVgmiaRpjhwelRqjft1C8v5zbOsbjoj0WxKRGINIGMRghYJiHj3vi6y1xM5g6dTpz22E/l1Mz90u2WxOV2AAy3BN1QuSuZi0RwpDZSaITphKuElgR47ILEDFELGgsorg3USG2r6clNKdEEp8yMXoQINeryQ3kbWVj6x6sHsKT4VenxeqE6VAu5LXvNkamnbZAa9aRK0+uXFuYETqWoZOrsawEOddxsUhp3VmSUqoW9RdU4HY1Q3cLObFHGJRGH5DDK+o3WvB43mGYMHn9y9tUDKJ3/msSE0g1DzeK4scqFgJpQLdjhE3aGfYYPdH8by9BblIFORcXlpY1rXiKF2qkj6HcJAg6G++mQmk8igZF67155oKHWTRMsy1SfB/f9A35XuvzqAUz+8W3Sk+IHX1oAUgPpUFB4LeTk5amHDQjVFkw9M8MZG9M3DsLUqIrb5vgAz0oYi/s6aPCZb87A6RPH4UJtDTQ3hKGpoR7e+XDH1QXw+lIVgC81/k4LgMvt6Tan8ImKF9u/1wuR5mZoaKhX2+EdX7ZlQVNjGJrq428FEIZ3PriKAHjTR+8vmuT1eLcoCH+aAnGn+JQ9OGDl5GSrz6ysbEjPzACXyw2arqmHfOhp3D2oqQ6qn2tqQtDU5MBYsSg0NdY7AGh8c/N/rnh7S3Ey1aa7Y3oM3bNPzXqhd98+cwsLC2nH3MD8wHGXMXz8ShUAjgDqqSPKx7LBRq1bJkRbWqC8vBynymUvvvrb6Ref/l2J+R2eEydzqdm/mvH0gPyBt6ampj6Qm5cLuHuMoy82InzFYibEYlGoq7sAFRXnI/X19SWVwZoVpaWlZ5K5/uUe8/8pqJKpY31+/QAAAABJRU5ErkJggg==";
const mapCustomStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

//#region API Typing
type APIError = {
  message?: string;
  code?: string;
};
type APIResponse<T> = {
  success: boolean;
  error?: APIError;
  data?: T;
};

type SquadUpdateResponse = BarSquad.SquadSession;
//#endregion

export default function SquadView() {
  const { squad, setSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  // Interval to get location updates!
  const fetchLocationInterval = setInterval(fetchLocation, 1000 * 15);
  async function fetchLocation() {
    try {
      // Fetch!
      const res = await fetch(
        `https://${config.domain}${config.endpoints.api.squad.code.location(
          squadController.getSquadCode()
        )}`
      );
      // Check status code?

      // Get response!
      const result: APIResponse<SquadUpdateResponse> =
        (await res.json()) as APIResponse<SquadUpdateResponse>;

      // Check response
      if (result.error) {
        // An error occured...
        console.warn(
          `Error while fetching squad update. Error code: "${result.error?.code}", message: ${result.error?.message}`
        );

        // Display error..?

        return;
      }
      // Ensure data
      if (!result.data) {
        console.warn(
          `No data found in squad update result, result: ${JSON.stringify(
            result,
            null,
            2
          )}`
        );
        return;
      }

      // Success! :D
      console.info(
        `Successfully fetched squad update data! Result: ${JSON.stringify(
          result,
          null,
          2
        )}`
      );

      // Update our SquadContext with the created squad session, switch to the main squad view!
      setSquad(result.data);
    } catch (err) {
      const { stack, message } = err as Error;
      // failed!
      console.error(
        `An error occured while fetching locations! Error:${stack ?? message}`
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.squadInfo}>
        <Text
          style={{
            ...styles.text,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {squad?.name ?? "The Squad"} #{squad?.code}
        </Text>
        <View style={styles.members}>
          {squad?.members?.map((member, idx) => (
            <Text style={styles.text} key={member.name}>
              {member.name}
              {idx + 1 < squad.members.length ? "," : ""}
            </Text>
          )) || <Text style={styles.text}>"No members"</Text>}
        </View>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapCustomStyle}
      >
        {squad?.members
          .filter((member) => {
            return member.name !== squadController.getUsername();
          })
          .map((member, idx) => {
            if (!member.location) return;
            return (
              <Marker
                key={member.name}
                coordinate={{
                  latitude: member.location.lat,
                  longitude: member.location.lng,
                }}
                title={member.name}
                description={`Last seen: ${(
                  ((member.last_seen ?? 0) - Date.now()) /
                  1000
                ).toFixed(0)} seconds ago`}
                image={{ uri: PinImageDataUri }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    marginLeft: 20,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    fontSize: 14,
                    textShadowColor: "#20202080",
                    textShadowRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  {member.name}
                </Text>
              </Marker>
            );
          })}
      </MapView>

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
