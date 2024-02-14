import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import config from "../Config";
import SquadContext from "../contexts/squad-context";
import { BarSquad } from "../controller/squad-session";

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

/**
 * Join squad payload
 */
type JoinPayload = {
  code: string;
};

/**
 * Join squad response
 *
 * name: Squad name
 */
type JoinResponse = BarSquad.SquadSession;

/**
 * Create squad payload
 *
 * name: Desired squad name
 */
type CreatePayload = {
  name: string;
};
/**
 * Create squad response
 *
 * name: Squad name
 * code: Squad join code
 */
type CreateResponse = BarSquad.SquadSession;
//#endregion

export default function SquadSetup() {
  const { squad, setSquad } = useContext<BarSquad.SquadContext>(SquadContext);

  //#region Create
  const [isCreating, setIsCreating] = useState(false);

  const [squadName, setSquadName] = useState("");
  const [isSquadNameValid, setIsSquadNameValid] = useState<
    boolean | undefined
  >();

  //#region Validate func
  function validateSquadName() {
    if (!squadName || squadName.length < 1) return false;

    return true;
  }
  useEffect(() => {
    if (squadName) setIsSquadNameValid(validateSquadName());
    else setIsSquadNameValid(false);
  }, [squadName]);
  //#endregion

  async function registerSquad(
    squadName: string
  ): Promise<BarSquad.SquadSession | undefined> {
    try {
      // Build payload
      const payload: CreatePayload = {
        name: squadName,
      };

      /**
       * Post request to "barsquad.knutegil.dev/api/squad/create"
       * Body:
       * { "name": squadName }
       */
      const res = await fetch(
        `https://${config.domain}${config.endpoints.api.squad.create}`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check status code?

      // Get response!
      const result: APIResponse<CreateResponse> =
        (await res.json()) as APIResponse<CreateResponse>;

      // Check response
      if (result.error) {
        // An error occured...
        console.warn(
          `Error while creating squad. Error code: "${result.error?.code}", message: ${result.error?.message}`
        );

        // Display error..?

        return;
      }

      // Success! :D
      console.info(
        `Successfully created squad with name "${squadName}"! Result: ${JSON.stringify(
          result,
          null,
          2
        )}`
      );

      // Update our SquadContext with the created squad session, switch to the main squad view!
      setSquad(result.data);

      // Switch view somehow I guess

      // Clear out input fields etc.
      setSquadName("");
    } catch (err) {
      const { stack, message } = err as Error;
      console.error(
        `An error occured while registering squad, error: ${
          stack ?? message ?? err
        }`
      );
    }
    return;
  }

  async function onCreateSquadPress() {
    // If isCreating == false, set to true
    if (!isCreating) {
      setIsCreating(true);
      return;
    }

    // We were already creating a squad, verify name etc.
    if (!isSquadNameValid) {
      console.warn(`Squad name "${squadName}" did not pass validation.`);
      return;
    }

    // Attempt to register squad to backend
    const registeredSquad = await registerSquad(squadName);
    if (!registeredSquad) {
      console.warn(`Failed registering squad with name "${squadName}".`);
      return;
    }

    // If success, join user to squad and display squad-code
    console.log(`Attempted to create squad with name: "${squadName}"!`);
  }

  //#endregion

  //#region Join
  const [squadCode, setSquadCode] = useState("");
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createContainer}>
        {isCreating ? (
          <>
            <View style={styles.squadDetailsContainer}>
              <View style={styles.squadDetailsInputContainer}>
                <Text style={styles.squadDetailsInputText}>Name</Text>
                <TextInput
                  style={{
                    ...styles.squadDetailsInput,
                    ...(isSquadNameValid
                      ? {
                          borderColor: "#00ff00",
                        }
                      : {
                          borderColor: "#ff0000",
                        }),
                  }}
                  onChangeText={setSquadName}
                  value={squadName}
                  placeholder={"Drunken Bastards"}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.joinContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setSquadCode}
                value={squadCode}
                placeholder={"DEADBEEF"}
              />
              <Button title={"Join Squad"} />
            </View>
          </>
        )}
        <Button title={"Create Squad"} onPress={onCreateSquadPress} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    width: "90%",
    textAlign: "center",

    backgroundColor: "#ffffff",
    borderRadius: 8,
  },

  squadDetailsContainer: {
    backgroundColor: "#202040",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 16,
    padding: 8,
    width: "100%",

    borderRadius: 8,
  },
  squadDetailsInputContainer: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
  },
  squadDetailsInputText: {
    marginLeft: 12,
    color: "#ffffff",
  },
  squadDetailsInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    width: "90%",

    backgroundColor: "#ffffff",
    borderRadius: 8,
  },

  joinContainer: {
    backgroundColor: "#202040",
    alignItems: "center",
    justifyContent: "center",

    padding: 8,
    width: "100%",

    borderRadius: 8,
  },
  createContainer: {
    backgroundColor: "#181830",
    alignItems: "center",
    justifyContent: "center",

    gap: 12,
    paddingBottom: 12,
    width: "80%",

    borderRadius: 16,
    overflow: "hidden",
  },

  container: {
    flex: 1,
    backgroundColor: "#101020",
    alignItems: "center",
    justifyContent: "center",
  },
});
