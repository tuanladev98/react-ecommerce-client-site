import { useContext, useEffect, useRef, useState } from 'react';
import Linkify from 'react-linkify';
import * as dayjs from 'dayjs';

import './ChatWidget.css';
import './ChatWindow.css';
import './ChatWidgetInput.css';
import './ChatWidgetMessage.css';

import { SocketContext } from '../../../socket/socketContext';

import ChatWidgetHeader from '../chat-widget-header/ChatWidgetHeader';

import launcherIcon from '../../../assets/logo-no-bg.svg';
import incomingMessageSound from '../../../assets/sounds/notification.mp3';
import launcherIconActive from '../../../assets/close-icon.png';

import chatApis from '../../../api/chat.api';

const ChatWidget = () => {
  const clientId = JSON.parse(localStorage.getItem('currentUser')).userInfo.id;

  const socket = useContext(SocketContext);

  const [isOpen, setIsOpen] = useState(false);
  const [countUnread, setCountUnread] = useState(0);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const userInputRef = useRef(null);
  const messageListRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('client_online', {
      clientId,
    });

    socket.on('new_message', (newMessage) => {
      setMessages([...messages, newMessage]);
      if (newMessage.sender === 'ADMIN') {
        playIncomingMessageSound();
        if (!isOpen) setCountUnread(countUnread + 1);
      }
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, clientId, messages, countUnread, isOpen]);

  useEffect(() => {
    messageListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    chatApis
      .getMessages(clientId)
      .then((result) => {
        setMessages(result.data);
        setCountUnread(
          result.data.filter(
            (mess) => mess.sender === 'ADMIN' && mess.seen === 0
          ).length
        );
      })
      .catch((error) => setMessages([]));
  }, [clientId]);

  const playIncomingMessageSound = () => {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      return _submitText(e);
    }
  };

  const handleFocusUserInput = (e) => {
    e.preventDefault();
    setIsActiveInput(true);
    socket.emit('client_seen', { clientId });
    setCountUnread(0);
  };

  const _submitText = (e) => {
    e.preventDefault();
    const text = userInputRef.current.textContent;

    if (text && text.length > 0) {
      socket.emit('client_send_message_text', { clientId, text });
    }

    userInputRef.current.textContent = '';
  };

  return (
    <div id="sc-launcher">
      <div
        className={['sc-launcher', isOpen ? 'opened' : ''].join(' ')}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <MessageCount count={countUnread} isOpen={isOpen} />
        <img className={'sc-open-icon'} src={launcherIconActive} alt="" />
        <img className={'sc-closed-icon'} src={launcherIcon} alt="" />
      </div>

      <div
        className={['sc-chat-window', isOpen ? 'opened' : 'closed'].join(' ')}
      >
        <ChatWidgetHeader
          clientName={
            JSON.parse(localStorage.getItem('currentUser')).userInfo.name
          }
        />

        <div className="sc-message-list">
          {messages.map((message) => {
            return (
              <div className="sc-message" key={message.id}>
                <div
                  className={[
                    'sc-message--content',
                    message.sender === 'CLIENT' ? 'sent' : 'received',
                  ].join(' ')}
                >
                  <div className="sc-message--avatar"></div>
                  <div className="sc-message--detail">
                    <div className="sc-message--text">
                      <Linkify properties={{ target: '_blank' }}>
                        {message.text}
                      </Linkify>
                    </div>
                    <span className="sc-message--time">
                      {dayjs(message.createdAt).format('DD-MM-YYYY HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messageListRef}></div>
        </div>

        <form className={`sc-user-input ${isActiveInput ? 'active' : ''}`}>
          <div
            role="button"
            tabIndex="0"
            onFocus={handleFocusUserInput}
            onBlur={() => setIsActiveInput(false)}
            ref={userInputRef}
            onKeyDown={handleKeyDown}
            contentEditable="true"
            placeholder="Write a reply..."
            className="sc-user-input--text"
          ></div>
          <div className="sc-user-input--buttons">
            <div className="sc-user-input--button">
              <button
                className="sc-user-input--send-icon-wrapper"
                onClick={_submitText}
              >
                <svg
                  version="1.1"
                  className="sc-user-input--send-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="37.393px"
                  height="37.393px"
                  viewBox="0 0 37.393 37.393"
                  enableBackground="new 0 0 37.393 37.393"
                >
                  <g id="Layer_2">
                    <path
                      d="M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className={'sc-new-messages-count'}>{props.count}</div>;
};

export default ChatWidget;
