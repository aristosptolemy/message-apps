import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
//import { groupsGet, IPAddress } from '../backend/server';


//https://aristos.server-on.net:8000/resetpass?id=test


export default function PassWordReset () {
  const location = useLocation();
  

  useEffect(() => {
    // location.search には "?keyword=React" のような文字列が入る
    const params = new URLSearchParams(location.search);
    console.log(params)
    //const query = params.get("keyword");

  }, [location.search]);
  return (
    <div>
      <div>パスワードリセット</div>
    </div>
  );
}