import React, { createContext, useCallback, useContext } from 'react';
import io from 'socket.io-client';
import { ChatMessage } from '../types/Messages';
import { fromEvent, Observable } from 'rxjs';

interface SocketContextData {
  init(): SocketIOClient.Socket;
  send(message: ChatMessage): void;
  onMessage(): Observable<ChatMessage>;
  disconnect(): void;
}

const SocketContext = createContext({} as SocketContextData);

const SocketProvider: React.FC = ({ children }) => {
  let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  const init = useCallback(() => {
    console.log('initiating socket service');
    socket = io('localhost:3333');
    return socket;
  }, [])

  const send = useCallback((message: ChatMessage) => {
    console.log('emitting message: ' + message);
    socket.emit('message', message);
  }, [socket])

  const onMessage = useCallback((): Observable<ChatMessage> => {
    return fromEvent(socket, 'message');
  }, [socket])

  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket])

  return (
    <SocketContext.Provider value={{ init, send, onMessage, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
}

const useSocket = () => useContext(SocketContext);

export { SocketContext, SocketProvider, useSocket };