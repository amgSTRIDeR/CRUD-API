import http from 'http';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sendResponse from './utility/sendResponse';
import checkUuid from './utility/checkUuid';
import handleGet from './utility/handleGet';
dotenv.config();

const server = http.createServer((req, res) => {
    const method = req.method;
    const urlPath = req.url || '';
    const urlPathArr = urlPath.split('/') || '';
    const userId = urlPathArr[3];

    if (urlPathArr[1] !== 'api' || urlPathArr[2] !== 'users') {
        console.log('url false')
        return sendResponse(res)
    }
    
    if(userId && !checkUuid(userId) || urlPathArr[4]) {
        console.log('user id or after user id false')
        return sendResponse(res)
    }

    switch(method) {
        case 'GET':
        return handleGet(res, userId);
        break;
    }

    sendResponse(res, 200, 'ok')
});

server.listen(process.env.PORT || 4000);
