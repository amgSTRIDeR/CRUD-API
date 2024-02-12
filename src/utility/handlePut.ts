import { ServerResponse } from "http";
import User from "../interfaces/UserInterface";
import Users from "./users";
import sendResponse from "./sendResponse";

const users = Users.getInstance();

export default function handlePut(res: ServerResponse, user: User) {
    const updatedUser = users.updateUser(user);
    updatedUser ? sendResponse(res, 200, updatedUser) : sendResponse(res, 404, `user with id: ${user.id} does not exist`);
}