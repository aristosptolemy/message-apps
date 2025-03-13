import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
//import '../css/top.css';
import '../css/a-button.css';
import { registerUser } from '../backend/server';




interface LoginInputs {
  username: string;
  password: string;
}

interface SettingProps {
  setisLoading: (value: boolean) => void;
}


export default function RegisterUser() {
  const [UserName, setUserName] = useState<string>('');
  const [PassWord, setPassWord] = useState<string>('');
  const [displayname, setDisplayname] = useState<string>('');
  const navigate = useNavigate();

  const login = () => {
    registerUser(UserName, PassWord, displayname)
    sessionStorage.setItem("account", UserName)
    navigate('/')
  }

  


  return (
    <>
      <div className="top-window">
        <div className="top-BG">
          <h2 className="top-title">新規登録</h2>
          <div className="login-page">
            <div>
              <input className="loginInput" placeholder='ID' type='text' onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
              <input className="loginInput" placeholder='パスワード' type='password' onChange={(e) => setPassWord(e.target.value)}/>
            </div>
            <div>
              <input className="loginInput" placeholder='表示名' type='text' onChange={(e) => setDisplayname(e.target.value)}/>
            </div>
            <div>
              <a className="buttonSt" id="main_back" type="button" onClick={login}>
                登録
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
