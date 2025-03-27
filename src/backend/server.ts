



export const Domain = 'aristos.server-on.net';
export const IPAddresssub = '192.168.3.18';
// https://192.168.3.18:8000/test


const TOPURL = async () => {
  const IP = await fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      return data.ip
    })
    .catch(error => console.error(error));
  const DomainIP = await getGlobalIPFromDomain(Domain);
  let setIP = '';
  if(IP === DomainIP) {
    setIP = '192.168.3.18'
  }else {
    setIP = Domain
  }
  return `https://${setIP}:8000`
}

const URL = await TOPURL()




export const testConnect = async (
  acountName: string
) => {
  return
  //sendMail('storm1legendaryhero@gmail.com')
  const response = await fetch(`${URL}/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  const result = await response.text();
  console.log(result)
} 

export const registerUser = async (username: string, password: string, displayname: string) => {
  const response = await fetch(`${URL}/register`, {
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
  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  console.log(data.id)
  if(!data.id){
    throw new Error('エラーメッセージ');
  }
  sessionStorage.setItem('acountID', data.id)
  return data.success
};

export const groupsGet = async (userId: Number) => {
  const response = await fetch(`${URL}/groupsGet`, {
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
  const response = await fetch(`${URL}/newgroupBuild`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      groupName: groupname
    })
  });
  const data = await response.json();
}




async function getGlobalIPFromDomain(domain: string): Promise<void> {
  // Google の DNS over HTTPS API を使用（例：A レコードを取得）
  const url = `https://dns.google/resolve?name=${domain}&type=A`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // ステータスが 0 なら成功（DNS のレスポンスコード 0 は成功）
    if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
      // A レコードのみフィルタリング（type が 1 が A レコード）
      const answers = data.Answer.filter((ans: any) => ans.type === 1);
      
      if (answers.length > 0) {
        //console.log(`${domain} のグローバルIP: ${answers[0].data}`);
        return answers[0].data
      } else {
        //console.error("Aレコードが見つかりませんでした。");
      }
    } else {
      //console.error("DNS クエリでエラーが発生しました:", data);
    }
  } catch (err) {
    //console.error("エラー:", err);
  }
}

