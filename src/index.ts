import http from 'http';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sendResponse from './utility/sendResponse';
import checkUuid from './utility/checkUuid';
import handleGet from './utility/handleGet';
import handlePost from './utility/handlePost';
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
    
    if(userId && !checkUuid(userId)) {
        console.log('user id or after user id false');
        return sendResponse(res, 400, `userID: ${userId} is invalid`);
    }

    switch(method) {
        case 'GET':
            return handleGet(res, userId);
            break;
        case 'POST':
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                try {
                    const user = JSON.parse(body);
                    isProperUser(user) ? handlePost(res, user) : sendResponse(res, 400, 'Wrong properties for user')
                } catch {
                    return sendResponse(res, 400, 'Request body is wrong')
                }
            })
            // return res.end()

            
    }

    // sendResponse(res, 200, 'ok')
});

server.listen(process.env.PORT || 4000);
