import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import './GroupChat.css';
import ScrollToBottom from 'react-scroll-to-bottom'
import Swal from 'sweetalert2';

var stompClient = null;
const GroupChat = ({
  idxState,
  detailNum,
  detailTitle
}) => {
  const userID = window.sessionStorage.getItem('userID');
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: window.sessionStorage.getItem('userID'),
    receivername: '',
    connected: false,
    message: '',
    roomId: idxState
  });

  const connect = () => {
    let Sock = new SockJS(`http://localhost:8088/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe(`/chatroom/public/${idxState}`, onMessageReceived);
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send(`/app/message/${idxState}`, {}, JSON.stringify(chatMessage));
  }

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    // eslint-disable-next-line default-case
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  }

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  }

  const onError = (err) => {
    // console.log(err);
  }

  // useEffect(() => {
  //   onMessageReceived();
  // }, [userData, privateChats]);

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        roomId: idxState,
        date: new Date().toLocaleString()
      };
//       console.log(typeof(chatMessage));
      stompClient.send(`/app/message/${idxState}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "username": value });
  }

  useEffect(() => {
    connect();
  }, []);

  if (userData.connected) {
    return (
      <div className="container">
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>{detailTitle}</li>
{/*               { */}
{/*                 [...privateChats.keys()] */}
{/*                   .map((name, index) => ( */}
{/*                     <li */}
{/*                       onClick={() => { setTab(name); }} */}
{/*                       className={`member ${tab === name && "active"}`} */}
{/*                       key={index} */}
{/*                       style={name === userID ? { display: `none` } : {}} */}
{/*                     > */}
{/*                       {name} */}
{/*                     </li> */}
{/*                   )) */}
{/*               } */}
            </ul>
          </div>
          {/* <ScrollToBottom> */}
          {tab === "CHATROOM" && <div className="chat-content">
            <ul className="chat-messages">
              {publicChats.map((chat, index) => (
                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                  {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                  <div className="message-data">{chat.message}</div>
                  {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                </li>
              ))}
            </ul>

            <div className="send-message">
              <input
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendValue();
                  }
                }}
                type="text"
                className="input-message"
                placeholder="enter the message"
                value={userData.message}
                onChange={handleMessage}
              />
              <button
                type="button"
                className="send-button"
                onClick={sendValue}
              >
                send
              </button>
            </div>
          </div>}
          {/* </ScrollToBottom> */}

          {/* <ScrollToBottom> */}
{/*           {tab !== "CHATROOM" && <div className="chat-content"> */}
{/*             <ul className="chat-messages"> */}
{/*               {[...privateChats.get(tab)].map((chat, index) => ( */}
{/*                 <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}> */}
{/*                   {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>} */}
{/*                   <div className="message-data">{chat.message}</div> */}
{/*                   {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>} */}
{/*                 </li> */}
{/*               ))} */}
{/*             </ul> */}

{/*             <div className="send-message"> */}
{/*               <input */}
{/*                 onKeyPress={(e) => { */}
{/*                   if (e.key === 'Enter') { */}
{/*                     sendPrivateValue(); */}
{/*                   } */}
{/*                 }} */}
{/*                 type="text" */}
{/*                 className="input-message" */}
{/*                 placeholder="enter the message" */}
{/*                 value={userData.message} */}
{/*                 onChange={handleMessage} */}
{/*               /> */}
{/*               <button */}
{/*                 type="button" */}
{/*                 className="send-button" */}
{/*                 onClick={sendPrivateValue} */}
{/*               > */}
{/*                 send */}
{/*               </button> */}
{/*             </div> */}
{/*           </div>} */}
          {/* </ScrollToBottom> */}
        </div>
      </div >
    )
  }
}

export default GroupChat;