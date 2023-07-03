import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const hostname = 'localhost';
const port = parseInt(process.env.PORT || '4200', 10);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at port ${port}/`);
});
