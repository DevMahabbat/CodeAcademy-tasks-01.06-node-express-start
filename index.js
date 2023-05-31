const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
let posts = require("./posts.json");
let comments = require("./comments.json");
const fileUpload = require("express-fileupload");
const { log } = require("console");
let id = posts[posts.length - 1].id + 1;

app.use(fileUpload());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(posts);
  console.log(comments);
  res.send("Hello World!");
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});
app.get("/api/posts/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let dataToReturn = posts.find((p) => p.id == id);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});
app.post("/api/posts", (req, res) => {
  let req_data = req.body;
  let title = req_data.title;
  let body = req_data.body;
  let likeCount = req_data.likeCount;

  let newobj = {
    title: title,
    body: body,
    likeCount: likeCount,
    id: id
  };

  id++;
  let dataToReturn = newobj;
posts.push(newobj);

  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});



app.get("/api/posts/:id/comments", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let dataToReturn = comments.find((p) => p.postId == id);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});

app.put("/api/posts/:id", (req, res)=>{
  let id = req.params.id;
     let put_obj = posts.find((p) => p.id == id);
     if(!put_obj){
      res.status(404).json({ messagge: `Cannot find post with id ${id}`})
     }
  let title  =req.body.title;
    let body  = req.body.body;
   let likeCount =req.body.likeCount;

if(title){
  put_obj.title = title;
}
if(body){
  put_obj.body = body;
}
if(likeCount){
  put_obj.likeCount = likeCount;
}
  
    let newalldata = posts.filter((p) => p.id != id);
 newalldata.push(put_obj)

   let dataToReturn = put_obj
   if (dataToReturn) {
     res.json(dataToReturn);
   } else {
     res.status(404).json({ messagge: `Cannot find post with id ${id}` });
   }

})

app.get("/api/comments?postId=:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let dataToReturn = comments.find((p) => p.postId == id);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});

app.delete("/api/posts/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  posts =  posts.filter(post => post.id != id);
  let dataToReturn= comments.find((p) => p.postId == id);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});



app.get("api/comments?username=:username", (req, res) => {
  let username = req.params.username;
  console.log(username);
  let dataToReturn = comments.find((p) => p.username == username);
  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    res.status(404).json({ messagge: `Cannot find post with id ${id}` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
