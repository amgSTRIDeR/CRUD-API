import http from 'http';
import dotenv from 'dotenv';
import User from './interfaces/UserInterface';
import crypto from 'crypto';
import sendResponse from './utility/sendResponse';
import isUuid from './utility/isUUID';
dotenv.config();

const users: User[] = [{
    id: 'a32e059d-20af-4522-940a-5095c9742172',
    username: 'Strider', age: 36, hobbies: ['videogames', 'development']}];

const server = http.createServer((req, res) => {
    const urlPath = req.url || '';
    const urlPathArr = urlPath.split('/') || '';
    const userId = urlPathArr[3];

    if (urlPathArr[1] !== 'api' || urlPathArr[2] !== 'users') {
        return sendResponse(res)
    }
    
    if(userId && !isUuid(userId) || urlPathArr[4]) {
        return sendResponse(res)
    }

    sendResponse(res, 200, 'ok')
    const method = req.method;
    // console.log(method)
    // switch(method) {
    //     case 'GET':

    // }
});

server.listen(process.env.PORT || 4000);
