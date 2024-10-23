const http = require('http');

console.log("I was here");

function requestHandler(req, res){
  // console.log("I was here in handler" ,req);
  console.log('Rewuest Received', req.url , req.method , req.headers);
  res.setHeader('Content-Type', 'text/html');
  // res.write('<!DOCTYPE html>');
  // res.write('<html lang="en">');
  // res.write('<head>');
  // res.write('<title>Document</title>');
  // res.write('</head>');
  // res.write('<body>');
  // res.write('<h1>Welcome to First server.</h1>');
  // res.write('</body>');
  // res.write('</html>');
  // res.end();

  // upr jo kiya hai usko aise krke asani se kr skte hai.
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Document</title>
      </head>
      <body>
        <h1>Welcome to First server.</h1>
      </body>
    </html>
    `)
  res.end();
}

const server = http.createServer(requestHandler);

// both are correct
// const server = http.createServer((req, res) => requestHandler(req, res));

// The http.createServer() method in Node.js expects a function as its argument. This function, which in your case is requestHandler, will automatically be called with two arguments: the request object (req) and the response object (res) whenever a request is made to the server.

const PORT = 3000;
server.listen(PORT , () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
