let squadCode: string;
function setSquadCode(code: string) {
  squadCode = code;
  console.info(`Set squad code to: ${squadCode}`);
}
function getSquadCode() {
  return squadCode;
}

let username: string;
function setUsername(value: string) {
  username = value;
  console.info(`Set username to: ${username}`);
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
