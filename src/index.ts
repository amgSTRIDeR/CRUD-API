import http from 'http';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sendResponse from './utility/sendResponse';
import checkUuid from './utility/checkUuid';
import handleGet from './utility/handleGet';
import handlePost from './utility/handlePost';
import isProperUser from './utility/isProperUser';
import handleBody from './utility/handleBody';
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
            handleGet(res, userId);
            break;
        case 'POST':
            handleBody(req, res, handlePost)
            break;
        case 'PUT':
            // handleBody(req, res, handlePost)
            break;
            // return res.end()

            
    }

    // sendResponse(res, 200, 'ok')
});

server.listen(process.env.PORT || 4000);
