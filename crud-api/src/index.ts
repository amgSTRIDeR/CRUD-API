import http, { get } from 'http';
import dotenv from 'dotenv';
import Users from './users';
import sendResponse from './common/sendResponse';
import isUuid from './common/isUuid';
import getStringifyMessage from './common/getStringifyMessage';

dotenv.config();

const users = new Users();

const hostname: string = 'localhost';
const port = parseInt(process.env.PORT || '4200', 10);

const server = http.createServer((req, res) => {
  const urlArray = req.url?.split('/') || [];
  switch (req.method) {
    case 'GET':
      switch (urlArray[1]) {
        case 'users':
          if (!urlArray[2]) {
            const message = users.getUsers();
            sendResponse(res, 200, message);
          } else {
            const userId = urlArray[2];
            if (isUuid(userId)) {
              const userInfo = users.getUser(userId);
              userInfo
                ? sendResponse(res, 200, userInfo)
                : sendResponse(
                    res,
                    404,
                    getStringifyMessage(`user with id ${userId} doesn't exist`)
                  );
            } else {
              sendResponse(
                res,
                404,
                getStringifyMessage('parameter should be uuid')
              );
            }
          }
          break;
        default:
          sendResponse(res, 404, undefined);
      }
      break;
    case 'POST':
      switch (urlArray[1]) {
        case 'users':
          if (!urlArray[2]) {
            let body = '';

            req.on('data', (chunk) => {
              body += chunk.toString();
            });

            req.on('end', () => {
              try {
                const newUser = users.addUser(JSON.parse(body));
                newUser ? sendResponse(res, 201, newUser) : sendResponse(res, 400, getStringifyMessage('user information is not valid'));
              } catch (error) {
                sendResponse(res, 400, getStringifyMessage('user information is not valid'));
              }
            });
          } else {
            sendResponse(res, 404, undefined);
          }
          break;
      }
      break;

    default:
      sendResponse(res, 404, undefined);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at port ${port}/`);
});
