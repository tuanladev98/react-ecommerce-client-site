import React from 'react';
import io from 'socket.io-client';

export const socket = io('http://localhost:4001', {
  transports: ['websocket', 'polling'], // use WebSocket first, if available
});

export const SocketContext = React.createContext();
