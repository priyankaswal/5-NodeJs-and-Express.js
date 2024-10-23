const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);
const PORT = 3000;
server.listen(PORT, () =>{
  console.log(`Server Running at http://localhost:${PORT}`);
});