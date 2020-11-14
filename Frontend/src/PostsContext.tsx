import { createContext, useState } from "react";
import { IPosts } from "./api";


interface IPostsContext {
    Posts: IPosts[];
    AddPosts: (ps:IPosts) => Promise<boolean>;
    DeletePosts: (ps: number) => Promise<boolean>;
    updatePosts: (ps: IPosts) => Promise<boolean>; 
}

export const PostsContext = createContext<IPostsContext | null>(null);
const PostsProvider = (props:any) => {
    const [posts, setPosts] = useState<IPosts[]>([]);
}