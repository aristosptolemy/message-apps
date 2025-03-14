import React, { useEffect, useState } from 'react';
import { groupsGet, IPAddress } from '../backend/server';
import Select from 'react-select';
import '../css/message.css';
import { useRef } from "react";

import RoomRelated from './newRoom';
import AcountManegement from './acount';





const MessageDisplay = () => {
  const [input, setInput] = useState('');
  const socket = new WebSocket(`wss://aristos.server-on.net:8000`);
  const acountName = sessionStorage.getItem('account') ?? '';
  const acountId = Number(sessionStorage.getItem('acountID') ?? '')
  const [messagedata, setMessagedata] = useState<any[]>([]);
  const [groupdatas, setGroupdatas] = useState([]);
  const [SelectRoomdata, setSelectRoomdata] = useState<any[]>([]);
  const [groupmembersdata, setGroupmembersdata] = useState([])
  const [SelectRoomMessages, setSelectRoomMessages] = useState([]);
  const [SelectRoomMembers, setSelectRoomMembers] = useState([]);

  const SelectRoomdataRef = useRef(SelectRoomdata);
  const messagedataRef = useRef(messagedata);

  const [dialogisOpen, setisOpen] = useState(false)
  const [acountDialogOpen, setisAcountOpen] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    dataGet()
  },[])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[SelectRoomMessages])

  useEffect(() => {
    
    if (Object.keys(SelectRoomdata).length !== 0) {
      const dataSearch = messagedata.find(item => item.groupDataId === SelectRoomdata.id)
      setSelectRoomMessages(dataSearch.detail)
      setSelectRoomMembers(groupmembersdata.find(item => item.groupDataId === SelectRoomdata.id).detail)
    }
  },[SelectRoomdata])

  useEffect(() => {
    messagedataRef.current = messagedata;
  }, [messagedata]);

  useEffect(() => {
    SelectRoomdataRef.current = SelectRoomdata;
  }, [SelectRoomdata]);

  const firstSet = (roomdata,message, groupmembers) => {
    const dataSearch = message.find(item => item.groupDataId === roomdata.id)
    setSelectRoomMessages(dataSearch.detail)
    setSelectRoomMembers(groupmembers.find(item => item.groupDataId === roomdata.id).detail)
  };

  const dataGet = async () => {
    const ID = acountId;
    const data = await groupsGet(ID)
    setMessagedata(data.Messages)
    setGroupdatas(data.groupdata)
    RoomSet(data.groupdata[0])
    setGroupmembersdata(data.membersdata)
    firstSet(data.groupdata[0],data.Messages,data.membersdata)
  }

  const usernameSerach = (data) => {
    //console.log(data)
    let result = ''
    if(data.group_id !== 3){
      const username = SelectRoomMembers.find(item => item.user_id === data.user_id)
      result = username.display_name
    }else {
      result = '自分';
    }
    return result
  }

  const addmessage = (data) => {
    //console.log(data)
    const insertdata = {
      roomId: data["roomId"],
      message: data["message"],
      username: data["username"],
      userId: data["userId"]
    };
    //console.log(messagedataRef.current)
    const updatedMessagedata = messagedataRef.current.map(item =>
      item.groupDataId === insertdata.roomId
        ? {
            ...item,
            detail: [
              ...item.detail,
              {
                group_id: insertdata.roomId,
                user_id: insertdata.userId,
                message: insertdata.message
              }
            ]
          }
        : item
    );
    //console.log(updatedMessagedata)
    setMessagedata(updatedMessagedata)
  }

  const RoomSet = (data) => {
    setSelectRoomdata(data)
  }

  useEffect(() => {
    if(messagedata.length !== 0){
      //console.log(messagedata)
      const roomID = SelectRoomdataRef.current.id
      //console.log(messagedata)
      const dataSearch = messagedata.find(item => item.groupDataId === roomID)
      //console.log(dataSearch.detail)
      setSelectRoomMessages(dataSearch.detail)
    }
  },[messagedata])





  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket 接続が開かれました');
    };

    socket.onmessage = (event) => {
      addmessage(JSON.parse(event.data))
    };

    socket.onclose = () => {
      console.log('WebSocket 接続が閉じられました');
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const data = JSON.stringify(["message", acountName, input, acountId, SelectRoomdata.id])
      socket.send(data);
      setInput('');
    }
  };

  return (
    <div className='main-window'>
      <div className="menu">
        <div>
          <a className="group-button" type="button" onClick={() => setisOpen(true)}>
            ルーム
          </a>
        </div>
        <div>
          <a className="group-button" type="button" onClick={() => setisAcountOpen(true)}>
            アカウント
          </a>
        </div>
        <div>
          <h1>メッセージアプリ(勉強用)</h1>
        </div>
      </div>
      
      <div className='messageWindow'>
        <div className="group-area">
          <h2 className="group-area-title">所属ルーム一覧</h2>
          <RoomRelated
            onCancel={() => setisOpen(false)}
            isOpen={dialogisOpen}
          />
          <AcountManegement 
            onCancel={() => setisAcountOpen(false)}
            isOpen={acountDialogOpen}
          />
          <div className="groupdatas">
            {groupdatas.map((row,index) => (
              <div key={index}>
                <a className="group-button" type="button" onClick={() => RoomSet(row)}>
                  {row.group_name}
                </a>
              </div>
            ))}
          </div>
          
        </div>
        <div className="message-area">
          <div className="roomTitle">
            <h2 className="roomName">{SelectRoomdata.group_name}</h2>
          </div>
          <div className="message-table-area">
            <table className="messagetable" >
              <tbody>
                {SelectRoomMessages.map((row,index) => (
                  <tr key={index} className="row-message">
                    
                    <td className="username">{usernameSerach(row)}</td>
                    <td className="messages">{row.message}</td>
                  
                  </tr>
                ))}
                <tr ref={messagesEndRef} />
              </tbody>
            </table>
          </div>
          <div className="messageInput">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力"
            />
            <button onClick={sendMessage}>送信</button>
          </div>
        </div>
      </div>
      
      {/* <button onClick={() => addmessage(testdata)}>テスト</button> */}
    </div>
  );
};

export default MessageDisplay;