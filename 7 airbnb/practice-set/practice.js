const express = require("express");
const homeRouter = require('./routers/homeRouter');
const contactRouter = require("./routers/contactRouter");
const bodyParser = require("body-parser");
const rootDir = require('./util/path-util');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
  console.log("First middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Second middleware", req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   res.send(`
//     <h1>Response</h1>
//   `);
// });

app.use(homeRouter);
// app.use((req , res , next) => {
//   console.log(req.body);
//   next();
// })
app.use(contactRouter);

app.use((req , res , next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
