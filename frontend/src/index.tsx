import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PostProvider from './PostsContext';

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </React.StrictMode>,
  document.getElementById('root')
);