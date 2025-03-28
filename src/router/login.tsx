import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, testConnect } from '../backend/server';
import toast from 'react-hot-toast';

import '../css/login.css';
//import '../css/top.css';
import '../css/a-button.css';




interface LoginInputs {
  username: string;
  password: string;
}

interface SettingProps {
  setisLoading: (value: boolean) => void;
}


export default function LoginPage({ setisLoading }: SettingProps) {
  const [UserName, setUserName] = useState<string>('');
  const [PassWord, setPassWord] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    //testConnect()
  },[])

  const login = async () => {
    if(UserName !== '' && PassWord !== ''){
      toast.promise(
        Login(UserName,PassWord),
        {
          loading: 'Verifying...',
          success: () => {
            navigate('/message');
            sessionStorage.setItem("account", UserName)
            sessionStorage.setItem("accountPass", PassWord)
            return<b>ログインに成功しました!</b>},
          error: <b>ログインに失敗しました.</b>,
        }
      );
    }else {
      toast.error("未入力があります")
    }
    
  }

  const ResetPass = async () => {
    if(UserName !== ''){
      testConnect(UserName)
    }
    
  }

  


  return (
    <>
      <div className="top-window">
        <div className="top-BG">
          <h2 className="top-title">ログイン</h2>
          <div className="login-page">
            <div>
              <input className="loginInput" placeholder='ログインID' type='text' onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
              <input className="loginInput" placeholder='パスワード' type='password' onChange={(e) => setPassWord(e.target.value)}/>
            </div>
            <div>
              <a className="buttonSt" id="main_back" type="button" onClick={login}>
                ログイン
              </a>
              <a className="buttonSt" id="main_back" type="button" onClick={() => navigate('/register')}>
                新規登録
              </a>
              <a className="buttonSt" id="main_back" type="button" onClick={() => ResetPass()}>
                パスワードリセット
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
