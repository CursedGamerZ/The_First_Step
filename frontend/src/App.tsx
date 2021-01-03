import React, {useContext, useState} from 'react';
import './App.css';
import PostProvider from './PostsContext';
import { IPost }from "./api"
import UpdateModal from "./UpdateModal";

function App() {

  const ctx = useContext (PostProvider);

  const [updatePosts, setUpdatePosts] = useState<IPost>();

  const ok = ctx?.AddTodo(ps);
  return (
    <div>

    </div>
  )
};

export default App;
