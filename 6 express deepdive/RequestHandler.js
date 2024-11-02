const fs = require("fs");
const { URLSearchParams } = require("url");

function RequestHandler(req, res) {
  console.log("Request Received", req.url, req.method);
  res.setHeader("Content-Type", "text/html");

  // if(req.url === '/'){
  //   res.write(`
  //     <!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <title>Home</title>
  //       </head>
  //       <body>
  //         <h1>Welcome to First server.</h1>
  //       </body>
  //     </html>
  //     `)
  // }
  if (req.url === "/") {
    res.write(`
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
    res.end();
  } else if (req.url === "/buy-product") {
    console.log("Form data received");
    const buffer = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      buffer.push(chunk);
    });
    req.on("end", () => {
      const body = Buffer.concat(buffer).toString();
      const urlParams = new URLSearchParams(body);
      const bodyJson = {};
      // [["product", "jeans"] , ["price", "999"]] aise format me milra hai hmko data URLSearchParams(body) se. fir hum usko destructure krre hai.
      for (const [key, value] of urlParams.entries()) {
        bodyJson[key] = value;
        // yha pr hum dot notation lga skte the lekin key ek variable k andr thi aur hmko key ki exact value nhi pta thi, isiliye hmne bracket notation hi lgaya.
      }
      // fs.writeFileSync('buy.txt', JSON.stringify(bodyJson));
      // upr wale k bdle niche wala likhna chaiye aur iske reason niche de rkha hai.
      console.log(JSON.stringify(bodyJson));
      fs.writeFile("buy.txt", JSON.stringify(bodyJson), (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/products");
        res.end();
        console.log("Sending Response");
      });
    });
  } else if (req.url === "/products") {
    res.write(`
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
    res.end();
  } else {
    res.statusCode = 404;
    res.write(`
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
    res.end();
  }
}

// module.exports = RequestHandler;
// OR
module.exports = {
  handler: RequestHandler,
};

// Mwthod 2: Setting multiple properties
// module.exports.handler = RequestHandler;
// module.exports.extra = "Extra";

// Method 3: Shortcut using exports
// exports.handler = RequestHandler;
// exports.extra = "Extra";

// Note:
// qki writeFileSync method forcefully main thread a execution krata hai jisse ki baki code ka execution block ho jata hai, isiliye writeFile likhna chaiye.

// writeFileSync: Performs a blocking operation, meaning the program will halt and wait for the file-writing process to complete before proceeding to the next line of code. This can lead to performance issues, especially in I/O-heavy or high-traffic applications, as it blocks the event loop.

// writeFile: Uses a non-blocking, asynchronous operation. Instead of waiting for the file to be written, the program can continue executing other code, and the callback is invoked once the operation is complete. This ensures better performance, particularly in scenarios with many I/O tasks.

// writeFile wale method k andr ek teesra argument likha hai, uska kaam ye hai ki uske andr ka kaam tbhi execute hoga jb file write ho chuki hogi.
