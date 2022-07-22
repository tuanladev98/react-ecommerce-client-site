import { useContext, useEffect, useState } from 'react';
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import { SocketContext } from '../socket/socketContext';

const ChatWidget = () => {
  const clientId = JSON.parse(localStorage.getItem('currentUser')).userInfo.id;

  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('client_online', {
      clientId,
    });

    socket.on('new_message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket.on('client_seen_message_for_admin', (data) => {
      const { clientId } = data;
    });

    return () => {
      socket.off('new_message');
      socket.off('client_seen_message_for_admin');
    };
  }, [socket, clientId, messages]);

  const handleNewUserMessage = (text) => {
    console.log(text);
  };

  return <Widget emojis handleNewUserMessage={handleNewUserMessage} />;
};

export default ChatWidget;
