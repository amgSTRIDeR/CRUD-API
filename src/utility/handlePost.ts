import { ServerResponse } from "http";
import Users from "./users";
import sendResponse from "./sendResponse";
import User from "../interfaces/UserInterface";

const users = Users.getInstance();

export default function handlePost(res: ServerResponse, user: User) {
    const createdUser = users.addUser(user);
    return sendResponse(res, 201, createdUser);
}