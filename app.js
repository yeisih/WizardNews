const express = require("express");
const morgan= require("morgan");
const postBank= require("./postBank.js");
const app = express();
const path=require("path");
const timeAgo=require


const staticFunction=express.static(path.join(__dirname,"public"))
app.use(morgan('dev'));
app.use(staticFunction);



app.get("/", (req, res,next) => {
const posts=postBank.list();

  const html=`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position"><a href="/posts/${post.id}">${post.title}</a></span>

            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`

res.send(html);
});

app.get('/posts/:id',(req,res)=>{

  const id = req.params.id;
  const post= postBank.find(id);
  if(!post.id){
    throw new Error("Not Found")
  }

  res.send(`<DOCTYPE html>)
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="../style.css" />
    </head>
    <body>
        <div class="news-list">
          <header><img src="/logo.png" />${post.title}.</header>
          <div>${post.date}${post.name}</div>
          <div>${post.content}</div>
        </div>
      </body>
</html>`)
});

// app.get("/",(req,res,next)=>{
//   fstat.readFile('file')
// }


const PORT=3000;
app.listen(PORT,()=>{
console.log('APP listening in port ${ PORT}');
});
