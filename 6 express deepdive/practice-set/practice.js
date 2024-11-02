const express = require("express");
const path = require("path");
const homeRouter = require('./routers/homeRouter');
const contactRouter = require("./routers/contactRouter");

const app = express();

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
app.use(contactRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
