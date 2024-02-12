import { ServerResponse } from "http";
import Users from "./users";
import sendResponse from "./sendResponse";

const users = Users.getInstance();

export default function handleGet(res: ServerResponse, userId: string) {
    if (userId) {
        const user = users.getUser(userId);
        return user ? sendResponse(res, 200, user) : sendResponse(res, 404, `User with id: ${userId} doesn't exist`)
    }

    return sendResponse(res, 200, users.getUsers())
}