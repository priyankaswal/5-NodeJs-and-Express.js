const fs = require("fs");

// external module
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  console.log("Request Received", req.url, req.method, req.body);
  next();
});

app.get("/", (req, res, next) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Myntra</title>
      </head>
      <body>
        <h1>Welcome to First server.</h1>
        <form action="/buy-product" method="POST">
          <input type="text" placeholder="Enter the product that you want" name="product"/>
          <br />
          <input type="text" placeholder="Enter your budget" name="budget"/>
          <input type="submit" />
        </form>
      </body>
    </html>
  `);
});

app.post("/buy-product", (req, res, next) => {
  fs.writeFile("buy.json", JSON.stringify(req.body), (err) => {
    res.statusCode = 302;
    res.setHeader("Location", "/products");
    res.end(); 
  });
});

app.get("/products", (req, res, next) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Products</title>
      </head>
      <body>
        <h1>Products list will appear here.</h1>
      </body>
    </html>
  `);
});

app.use((req, res, next) => {
  res.statusCode = 404;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <h1>404 Page Not Found.</h1>
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// next ek callback type hai aur iske use hai ki, agr app response bhjne wala hai tb to fir next ko ignore krdena, aur agr app response nhi bhjne wala hai to uske koi aise tareeka chaiye ye btane ka ki next wale middleware ko call krna hai, qki kbhi aisa ho skta hai ki current middleware function complete ho gya aur usne koi network call kr rkhi hai jiska response aane me time lgega, to express ko kaise pta chlega us time ki next wale middleware ko call krna hai ya fir abhi bhi reponse k liye rukna hai , usi case me next ka use hota hai. Agr hum next call nhi krte hai to express ye maan leta hai ki wo wala middleware abhi bhi khud request ki handling krra hai aur agr wo middleware next call krdeta hai to express ko pta chl jata hai ki usne jitni handling krni thi reques ki wo usne krli aur ab aage wale handler ko call krna hai.

// The next function is important for scenarios where multiple middleware functions need to be executed in a sequence. When a middleware function is done processing, it can call next() to pass control to the next middleware in line. If next() is not called, the request will hang, and the server won't proceed to the next function or send a response.

// Note: ye jitni bhi chije hai middleware aur baad me routing bhi aaegi ye sari jis sequence me likhi hui hai usi sequence me chlti hai.

// res.send(): This method sends a response to the client, effectively ending the request-response cycle. Once a response has been sent (using res.send(), res.json(), res.end(), etc.), the client has received a response, and no further middleware should execute.

// next(): This function is used to pass control to the next middleware in line. If you call next() after res.send(), Express will try to pass the request to the next middleware, but it may cause issues since the response has already been sent

// Note: Jb hum app.use me path dere hai, to mtlb ki wo wala middleware srf usi path k liye chlega aur dusre path k liye nhi chlega, ek aur chij ki agr hum likhte hai localhost:3000/test/afhv - to phle jaise hum krte the usme kya hota tha ki jis path k liye req aayi hai usi path wala if else chlta tha, lekin isme aise nhi hota, usse phle wale jo bhi path honge us req me wo sare middleware bhi phle execute honge, mtlb localhost:3000/test/afhv isme sbse phle app.use("/") ye wala execute hoga uske baad "/test" wala bhi execute hoga aur tb jake req "/afhv" pe aaegi.
