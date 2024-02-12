import { ClientRequest, IncomingMessage, ServerResponse } from "http";
import isProperUser from "./isProperUser";
import sendResponse from "./sendResponse";
import User from "../interfaces/UserInterface";

export default function handleBody(req: IncomingMessage, res: ServerResponse, callback: (res: ServerResponse, user: User) => void) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const user = JSON.parse(body);
            isProperUser(user) ? callback(res, user) : sendResponse(res, 400, 'Wrong properties for user')
        } catch {
            sendResponse(res, 400, 'Request body is wrong')
        }
    })
}