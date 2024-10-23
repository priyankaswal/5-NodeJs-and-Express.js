const http = require('http');
console.log("i am inside the server");

const requestHandler = (req, res) => {
  if(req.url === '/'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Simple Navbar</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
            }

            .navbar {
              background-color: #333;
              overflow: hidden;
            }

            .navbar a {
              float: left;
              display: block;
              color: #f2f2f2;
              text-align: center;
              padding: 14px 20px;
              text-decoration: none;
            }

            .navbar a:hover {
              background-color: #ddd;
              color: black;
            }

            .navbar a.active {
              background-color: #4caf50;
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="navbar">
            <a href="home">Home</a>
            <a href="men">Men</a>
            <a href="women">Women</a>
            <a href="kids">Kids</a>
            <a href="cart">Cart</a>
          </div>
        </body>
      </html>
    `)
  }else if(req.url === '/home'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Home</title>
        </head>
        <body>
          <h1>Welcome to Home Section.</h1>
        </body>
      </html>
    `)
  }else if(req.url === '/men'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Men</title>
        </head>
        <body>
          <h1>Welcome to Men Section.</h1>
        </body>
      </html>
    `)
  }else if(req.url === '/women'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Women</title>
        </head>
        <body>
          <h1>Welcome to Women Section.</h1>
        </body>
      </html>
    `)
  }else if(req.url === '/kids'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Kids</title>
        </head>
        <body>
          <h1>Welcome to Kids Section.</h1>
        </body>
      </html>
    `)
  }else if(req.url === '/cart'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Cart</title>
        </head>
        <body>
          <h1>Welcome to Cart Section.</h1>
        </body>
      </html>
    `)
  }else{
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>error</title>
        </head>
        <body>
          <h1>404 Page Not Found.</h1>
        </body>
      </html>
    `)
  }
  res.end();
}

const server = http.createServer(requestHandler);
const PORT = 3000;
server.listen(PORT , () => {
  console.log(`Running Server at http://localhost:${PORT}`);
});