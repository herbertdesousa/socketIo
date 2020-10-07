import React from 'react';
import ReactDOM from 'react-dom';

import { SocketProvider } from './hooks/socket';

import App from './pages/App';


ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);