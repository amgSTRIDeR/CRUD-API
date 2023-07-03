"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStringifyMessage_1 = __importDefault(require("./common/getStringifyMessage"));
const uuid_1 = require("uuid");
class Users {
    constructor() {
        this.users = [
            {
                id: '3d7e8a9b-7c5c-4c3d-8d5e-6f7f6c7d8f9a',
                username: 'John Cena',
                age: 45,
                hobbies: ['WWE', 'sport', 'kittens'],
            },
        ];
    }
    getUsers() {
        if (this.users.length === 0) {
            return (0, getStringifyMessage_1.default)('No users found');
        }
        return JSON.stringify(this.users);
    }
    getUser(userId) {
        const user = this.users.find((user) => user.id === userId);
        return user ? JSON.stringify(user) : undefined;
    }
    addUser(user) {
        if (!this.checkUserInfo(user)) {
            return undefined;
        }
        const newUser = {
            id: (0, uuid_1.v4)(),
            username: user.username,
            age: user.age,
            hobbies: user.hobbies,
        };
        this.users.push(newUser);
        return JSON.stringify(newUser);
    }
    checkUserInfo(user) {
        const isHobbyArrayOfStrings = user.hobbies.every((hobby) => typeof hobby === 'string');
        if (!user.username ||
            typeof user.username !== 'string' ||
            !user.age ||
            typeof user.age !== 'number' ||
            user.age < 0 ||
            !user.hobbies ||
            !Array.isArray(user.hobbies) ||
            !isHobbyArrayOfStrings) {
            return false;
        }
        return true;
    }
    updateUser(userId, user) {
        if (!this.checkUserInfo(user)) {
            return undefined;
        }
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return undefined;
        }
        this.users[userIndex] = user;
        this.users[userIndex].id = userId;
        return JSON.stringify(user);
    }
    deleteUser(userId) {
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return false;
        }
        this.users.splice(userIndex, 1);
        return true;
    }
}
exports.default = Users;
