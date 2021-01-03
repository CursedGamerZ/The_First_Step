export interface IPost {
  catagory: String;
  id?: number;
  author: string;
  title: string;
  content: string;
  date: string;
}

export async function GetPosts(): Promise<IPost[] | undefined> {
  const resp = await fetch("/posts");
  if (resp.ok) {
    if (resp.status === 200) {
      return [];
    }
    return resp.json();
  }
}

export async function AddPosts(ps: IPost): Promise<IPost | undefined> {
  const resp = await fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ps),
  });
  if (resp.ok) {
    return resp.json();
  }
}

export async function DeletePosts(id: number): Promise<boolean> {
  const resp = await fetch(`/posts/${id}`, {
    method: "DELETE",
  });
  return resp.ok;
}

export async function UpdatePosts(ps: IPost) {
  const resp = await fetch(`/posts/${ps.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ps),
  });
  return resp.ok;
}
