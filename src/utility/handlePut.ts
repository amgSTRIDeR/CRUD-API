import { ServerResponse } from "http";
import User from "../interfaces/UserInterface";
import Users from "./users";
import sendResponse from "./sendResponse";

const users = Users.getInstance();

export default function handlePut(res: ServerResponse, user: User, userId: string) {
    const updatedUser = users.updateUser(user, userId);
    updatedUser ? sendResponse(res, 200, updatedUser) : sendResponse(res, 404, `user with id: ${userId} does not exist`);
}