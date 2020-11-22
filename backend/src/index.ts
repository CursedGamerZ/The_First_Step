import express from "express";
import cors from "cors";
import { createConnection, getConnection } from "typeorm";
import "reflect-metadata";
import { Posts } from "./entity/posts";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

createConnection().catch((err) => {
  throw new Error(err);
});

app.get("/posts", async (req, res) => {
  const posts = await getConnection().getRepository(Posts).find();
  if (posts.length === 0) {
    return res.sendStatus(204);
  }
  return res.sendStatus(200).send(posts);
});

/*
 *   posting route
 */
app.post("/posts", async (req, res) => {
  const post = req.body as Posts;

  if (!post.catagory || !post.title || !post.content) {
    return res.sendStatus(400);
  }
  if (post.title.length > 128 || post.content.length > 10000) {
    return res.sendStatus(413);
  }
  const sendIt = await getConnection().getRepository(Posts).save(post);
  if (!sendIt) {
    return res.sendStatus(500);
  }
  return res.status(200).send(post);
});

/*
 *   Delete Post Route
 */
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(400);
  }
  const parseID = parseInt(id, 10);
  const posts = await getConnection().getRepository(Posts).findOne({ id: parseID });
  if (!posts) {
    return res.sendStatus(404);
  }
  const ok = await getConnection().getRepository(Posts).delete(posts);
  if (!ok) {
    return res.sendStatus(500);
  }
  return res.sendStatus(200);
});

/*
 *   Searching Route
 */
app.get("/search/:content", async (req, res) => {
  const content = req.params;
  const firstUser = await getConnection()
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .where("title Like :content", { content: "%" + content.content + "%" })
    .getMany();
  return res.status(200).send(firstUser);
});

/*
 *   New posts route
 */
app.get("/newests", async (req, res) => {
  const newPosts = await getConnection()
    .getRepository(Posts)
    .createQueryBuilder("posts")
    .orderBy("posts.date")
    .getMany();
  return res.status(200).send(newPosts);
});

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
