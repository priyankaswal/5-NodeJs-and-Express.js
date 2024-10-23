const http = require('http');
const fs = require('fs');

function requestHandler(req, res){
  console.log('Request Received', req.url , req.method);
  res.setHeader('Content-Type', 'text/html');

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
  if(req.url === '/'){
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
      `)
  }else if(req.url === '/buy-product'){
    console.log('Form data received');
    const buffer = [];
    req.on('data' , (chunk) => {
      console.log(chunk);
      buffer.push(chunk);
    })
    req.on('end' , () => {
      const body = Buffer.concat(buffer).toString();
      console.log(body);
    })

    fs.writeFileSync('buy.txt', 'Myntra app');
    res.statusCode = 302;
    res.setHeader('Location' , '/products')
  }
  else if(req.url === '/products'){
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
      `)
  }else{
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
      `)
  }
 
  res.end();
}

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT , () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Note: hum ye jo code yha pr likh rhe hai wo asal me server side rendering hoti hai mtlb ki server side apni trf se final UI bna kr bhj rhi hai aur client usko srf render kr raha hai
// Aur client side rendering ka mtlb hai ki sara ka sara client ka logic client pe hi hota hai aur wo bs kuch data backend se lera hota hai aur us basis pe decide krta hai ki UI kaisa dikhana hai.

// aisa bhi ho skta hai ki buffer me chunks ki ordering alg ho ya fir koi chunk missing ho, iske liye http me bhi ek buffer hota hai, wo buffer ye sb chije phle hi check krleta hai ki koi chunk missing to nhi hai, uske baad protocol wala buffer un chunks ko sequence me lgake server ko paas krdeta hai, isiliye humko(server) ko is baat ki koi tnsn lene ki jarurt nhi hoti qki protocol wala burffer is problem ko phle hi solve krdeta ha.

// req.on ye kaise pta chlega ki sara data aa chuka hai aur ab end wale event ko call krna hai?
// iske liye jb request aati hai to usme hi request ka size phle hi bhj diya jata hai, fir tb baad me server jb apne paas k chunka ka size dekhta hai aur wo phle se diye hue size k equal ho jata hai to fir "end" wala event call ho jata hai .  
