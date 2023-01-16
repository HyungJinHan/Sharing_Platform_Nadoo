import React, { useEffect, useRef, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import '../../styles/Group/GroupChat.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Swal from 'sweetalert2';
import NavigatorChat from '../Navigator/NavigatorChat';
import { Outlet } from 'react-router-dom';

var stompClient = null;
const GroupChat = ({
  idxState,
  detailTitle
}) => {
  const scrollRef = useRef();
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

  useEffect(() => {
    connect();
  }, []);

  if (userData.connected) {
    return (
      <>
        <p className='member'>{detailTitle} 채팅방입니다!</p>
        <ScrollToBottom>
          <div className='chat-wrapp'>
            {publicChats.map((chat, index) => (
              chat.senderName !== userData.username
                ?
                <div className={`message`} key={index}>
                  <div className='just_message'>
                    {chat.senderName}
                  </div>
                  <div className="avatar">
                    {chat.message}
                  </div>
                  <div className="chat_date">
                    {chat.date.substring(6, 20)}
                  </div>
                </div>
                :
                <div
                  className={`message self`}
                  key={index}
                >
                  <div className="chat_date_self">
                    {chat.date.substring(6, 20)}
                  </div>
                  <div className="avatar self">
                    {chat.message}
                  </div>
                </div>
            ))}
          </div>
        </ScrollToBottom>
        <NavigatorChat
          message={userData.message}
          sendValue={sendValue}
          handleMessage={handleMessage}
        />
        <Outlet />
      </>
    )
  }
}

export default GroupChat;