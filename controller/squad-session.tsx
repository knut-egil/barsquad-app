/**
 * Squad Session:
 * - Create a new session
 *  - Assigns a squad code
 *
 * - Join a session by squad code
 *
 * In active squad session:
 * - Show squad members
 * - Map with squad memebr locations plotted out
 *  - A "safe-zone" circle is placed inbetween all members, the radius dependent on the avg. distance between members. Caps at ~15-20m
 *    - If a singular member exceeds this safe-zone, alert the squad if member does not return within 30 sec.? Query location updates at a faster interval when outside.
 *    - Some members might have bad GPS accuracy (Anders), try to use some BLE pings between phones to detect nearby presence?
 */

/**
 * The presence/safety status of a member
 *
 * present: Is within the safe-zone
 * absent: Has left the safe-zone, needs to be found!
 * adventuring: Has asked permission to leave for solo adventures.
 */
type SquadMemberStatus = "present" | "absent" | "adventuring";

/**
 * Squad member
 */
type SquadMember = {
  /**
   * Name
   */
  name: string;
  /**
   * Status
   */
  status: SquadMemberStatus;
  /**
   * Last seen (last location update timestamp)
   */
  last_seen: number;
};

/**
 * Squad session
 */
type SquadSession = {
  /**
   * Squad name
   */
  name: string;

  /**
   * Members
   */
  members: SquadMember[];

  /**
   * Squad code
   */
  code: string;
};
