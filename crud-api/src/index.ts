import http from 'http';
import dotenv from 'dotenv';
import Users from './users';

dotenv.config();

const users = new Users();

const hostname: string = 'localhost';
const port = parseInt(process.env.PORT || '4200', 10);

const server = http.createServer((req, res) => {


  if (req.method === 'GET' && req.url === '/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'JSON');
    res.end(users.getUsers());
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at port ${port}/`);
});
