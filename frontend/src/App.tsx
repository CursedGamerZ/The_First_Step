import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { PostContext } from "./PostsContext";
import { IPost } from "./api";


function App() {
  const ctx = useContext(PostContext);

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let temp: IPost[] = [];
    Array.from(Array(10).keys()).forEach((i) => {
      const p = {
        author: "User",
        catagory: "Test",
        content: "Test",
        date: new Date().toUTCString(),
        title: `Title ${i + 1}`,
      };
      temp.push(p);
    });
    setPosts(temp);
  }, []);

  return (
    <div>
      {posts.map((p) => {
        return <div>{p.title}</div>;
      })}
    </div>
  );
}

export default App;
