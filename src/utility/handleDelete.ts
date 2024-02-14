import { ServerResponse } from "http";
import User from "../interfaces/UserInterface";
import Users from "./users";
import sendResponse from "./sendResponse";

const users = Users.getInstance();

export default function handleDelete(res: ServerResponse, id: string) {
    const isSuccessfullyDeleted = users.deleteUser(id);
    isSuccessfullyDeleted ? sendResponse(res, 204, '') : sendResponse(res, 404, `user with id: ${id} doesn't exist (couldn't be deleted)`);
}