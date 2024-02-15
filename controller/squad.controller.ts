let squadCode: string;
function setSquadCode(code: string) {
  squadCode = code;
}
function getSquadCode() {
  return squadCode;
}

let username: string;
function setUsername(value: string) {
  username = value;
}
function getUsername() {
  return username;
}

export default {
  setSquadCode,
  getSquadCode,

  setUsername,
  getUsername,
};
