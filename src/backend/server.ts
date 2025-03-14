
export const IPAddress = 'aristos.server-on.net';
const TOPURL = `https://${IPAddress}:8000`


export const registerUser = async (username: string, password: string, displayname: string) => {
  const response = await fetch(`${TOPURL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      displayName: displayname
    })
  });
  const data = await response.json();
};

export const messagePOST = (data) => {
  const socket = new WebSocket('ws://localhost:8080');
  socket.send(data);
}

export const Login = async (username: string, password: string) => {
  const response = await fetch(`${TOPURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  sessionStorage.setItem('acountID', data.id)
  return data.success
};

export const groupsGet = async (userId: Number) => {
  const response = await fetch(`${TOPURL}/groupsGet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userid: userId
    })
  });
  const data = await response.json();
  //console.log(data)

  return data
};

export const newgroupBuild = async (groupname) => {
  const response = await fetch(`${TOPURL}/newgroupBuild`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      groupName: groupname
    })
  });
  const data = await response.json();
}