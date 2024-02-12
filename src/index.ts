import http from 'http';
import dotenv from 'dotenv';
import sendResponse from './utility/sendResponse';
import checkUuid from './utility/checkUuid';
import handleGet from './utility/handleGet';
import handlePost from './utility/handlePost';
import handlePut from './utility/handlePut';
import handleDelete from './utility/handleDelete';
import isProperUser from './utility/isProperUser';
dotenv.config();

const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = req.url || '';
  const urlPathArr = urlPath.split('/') || '';
  const userId = urlPathArr[3];
  if (urlPathArr[1] !== 'api' || urlPathArr[2] !== 'users' || urlPathArr[4]) {
    console.log('url false');
    return sendResponse(res);
  }

  if (userId && !checkUuid(userId)) {
    console.log('user id or after user id false');
    return sendResponse(
      res,
      400,
      `userID: ${userId} is invalid, should be in UUID format`
    );
  }

  switch (method) {
    case 'GET':
      handleGet(res, userId);
      break;
    case 'POST':
      let postBody = '';
      req.on('data', (chunk) => {
        postBody += chunk;
      });

      req.on('end', () => {
        try {
          const user = JSON.parse(postBody);
          isProperUser(user)
            ? handlePost(res, user)
            : sendResponse(res, 400, 'Wrong properties for user');
        } catch {
          sendResponse(res, 400, 'Request body is wrong');
        }
      });
      break;
    case 'PUT':
      let putBody = '';
      req.on('data', (chunk) => {
        putBody += chunk;
      });

      req.on('end', () => {
        try {
          const user = JSON.parse(putBody);
          isProperUser(user)
            ? handlePut(res, user, userId)
            : sendResponse(res, 400, 'Wrong properties for user');
        } catch {
          sendResponse(res, 400, 'Request body is wrong');
        }
      });
      break;
    case 'DELETE':
      handleDelete(res, userId);
      break;
    default:
      sendResponse(res);
  }
});

server.listen(process.env.PORT || 4000);
