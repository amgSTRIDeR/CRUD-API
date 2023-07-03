"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStringifyMessage_1 = __importDefault(require("./getStringifyMessage"));
function sendResponse(res, statusCode, content) {
    const errorMessage = (0, getStringifyMessage_1.default)('Sorry, the requested resource was not found');
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(content || errorMessage);
}
exports.default = sendResponse;
