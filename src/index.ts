import express from "express";
import cors from "cors";
import { Any, createConnection, getConnection } from "typeorm";
import "reflect-metadata";
import { Posts } from "./entity/posts"
import { stringify } from "querystring";
import { parse } from "path";
import { JsonObjectExpression, parseJsonText } from "typescript";

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

app.get("/search/:content", async (req, res) => {
    const {content} = req.params;
    console.log({content});

    const test = {content}
    console.log(test);
    
    const searchQ = await getConnection().getRepository(Posts).find()
    
    /*const lookup = await getConnection().getRepository(Posts).find({content})*/

    return res.sendStatus(200);
});



app.post("/posts", async (req, res) => {
    const{ title , content } = req.body as {title : string; content : string};

})


app.listen(port, () => {
    console.log(`App Listening on port ${port}`);
});