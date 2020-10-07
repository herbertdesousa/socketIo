import React, { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../hooks/socket';
import { ChatMessage } from '../types/Messages';

const App: React.FC = () => {
  const { init, onMessage, send, disconnect } = useSocket();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message: 'Welcome! Type a message and press Send Message to continue the chat.',
      author: 'Bot'
    }
  ]);

  useEffect(() => {
    init();

    const observable = onMessage();

    observable.subscribe((m: ChatMessage) => {

      setMessages(state => [...state, m]);
    });

    return () => {
      disconnect();
    }
  }, [disconnect, init, messages, onMessage])

  const handleOnChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }, []);

  const handleSendMessage = useCallback((): void => {
    const author: string = 'Ross';

    if (text) {
      send({
        message: text,
        author: author,
      });
      setText('');
    }
  }, [text, send])

  return (
    <>
      <div>
        {
          messages.map((msg: ChatMessage) => (
            <div key={Math.random() * 1000}>
              <p>{msg.author}</p>
              <p>{msg.message}</p>
            </div>
          ))
        }
      </div>
      <input
        placeholder="escreva uma mensagem..."
        onChange={handleOnChangeText}
        value={text}
      />
      <p>
        <button onClick={handleSendMessage}>
          Send Message
        </button>
      </p>
    </>
  );
}

export default App;
