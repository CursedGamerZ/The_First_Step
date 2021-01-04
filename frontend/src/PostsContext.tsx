import React, { createContext, useEffect, useState } from "react";
import { AddPosts, DeletePosts, GetPosts, IPost, UpdatePosts } from "./api";

interface IPostContext {
  Posts: IPost[];
  AddPosts: (ps: IPost) => Promise<boolean>;
  DeletePosts: (ps: number) => Promise<boolean>;
  updatePosts: (ps: IPost) => Promise<boolean>;
}

export const PostContext = createContext<IPostContext | null>(null);

const PostProvider = (props: any) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await GetPosts();
      if (resp) {
        setPosts(resp);
      }
    };
    fetchPosts();
  }, []);

  const addPosts = async (ps: IPost): Promise<boolean> => {
    const ok = await AddPosts(ps);
    if (!ok) {
      return false;
    }
    setPosts([ok, ...posts]);
    return true;
  };

  const deletePosts = async (id: number): Promise<boolean> => {
    const ok = await DeletePosts(id);
    if (ok) {
      setPosts(posts.filter((x) => x.id !== id));
      return true;
    }
    return false;
  };

  const updatePosts = async (td: IPost): Promise<boolean> => {
    if (!td.id) {
      return false;
    }
    const ok = await UpdatePosts(td);
    if (!ok) {
      return false;
    }
    const index = posts.findIndex((x) => x.id === td.id);
    if (index === -1) {
      return false;
    }
    posts[index].title = td.title;
    posts[index].content = td.content;
    setPosts([...posts]);
    return true;
  };

  return (
    <PostContext.Provider
      value={{
        Posts: posts,
        AddPosts: addPosts,
        DeletePosts: deletePosts,
        UpdatePosts: updatePosts,
      }}
      {...props}
    />
  );
};

export default PostProvider;
