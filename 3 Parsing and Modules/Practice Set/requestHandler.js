const fs = require('fs');
const {URLSearchParams} = require('url');
const addition = require('./addition'); 

const requestHandler = (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if(req.url === '/'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Calculator</title>
        </head>
        <body>
          <h1>Welcome to the home page of calculator project.</h1>
          <a href="/calculator">Go to Calculator </a>
        </body>
      </html>
    `)
    res.end();
  }else if(req.url === '/calculator'){
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Calculator</title>
      </head>
      <body>
          <form action="/calculate-result" method="POST">
            <input type="text" name="num1">
            <br>
            <input type="text" name="num2">
            <br>
            <input type="submit" value="sum" />
          </form>
      </body>
      </html> 
      `)
      res.end(); 
  }else if(req.url === '/calculate-result'){
    console.log("inside calculate result");
    const buffer = [];
    req.on('data' , (chunk) => {
      console.log(chunk);
      buffer.push(chunk);
    })
    req.on('end' , () => {
      const reqData = Buffer.concat(buffer).toString();
      const urlParams = new URLSearchParams(reqData);
      const bodyJson = {};
      for(const [key , value] of urlParams.entries()){
        bodyJson[key] = value;
      }
      fs.writeFile('Response.txt' , JSON.stringify(bodyJson), (err) => {
        res.setHeader('Location' , '/result-page')
        res.statusCode = 302;
        res.end();
        console.log('Sending Response');
      });
    })
  }else if(req.url === '/result-page'){
    console.log("inside result page");
    
    fs.readFile('Response.txt', (err , fileData) => {
      const data = JSON.parse(fileData);
      // Convert the string values of num1 and num2 to numbers
      const num1 = parseInt(data.num1);
      const num2 = parseInt(data.num2);
      const sum = addition(num1 , num2);
      res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>Answer</title>
        </head>
        <body>
          <h1>The sum of ${num1} and ${num2} is: ${sum}</h1>
        </body>
        </html>
      `)
      res.end();
    });
  }
}

module.exports = requestHandler;