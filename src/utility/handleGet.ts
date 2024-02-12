import { ServerResponse } from "http";
import Users from "./users";
import sendResponse from "./sendResponse";

const users = Users.getInstance();

export default function handleGet(res: ServerResponse, userId: string) {
    if(userId) {
        const user = users.getUser(userId) || `User with id: ${userId} not found`;
        return sendResponse(res, 200,user)
    }

    return sendResponse(res, 200, users.getUsers())
}