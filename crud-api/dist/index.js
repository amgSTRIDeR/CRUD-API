"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./users"));
const sendResponse_1 = __importDefault(require("./common/sendResponse"));
const isUuid_1 = __importDefault(require("./common/isUuid"));
const getStringifyMessage_1 = __importDefault(require("./common/getStringifyMessage"));
dotenv_1.default.config();
const users = new users_1.default();
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '4200', 10);
const server = http_1.default.createServer((req, res) => {
    var _a;
    const urlArray = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/')) || [];
    switch (req.method) {
        case 'GET':
            switch (urlArray[1]) {
                case 'users':
                    if (!urlArray[2]) {
                        const message = users.getUsers();
                        (0, sendResponse_1.default)(res, 200, message);
                    }
                    else {
                        const userId = urlArray[2];
                        if ((0, isUuid_1.default)(userId)) {
                            const userInfo = users.getUser(userId);
                            userInfo
                                ? (0, sendResponse_1.default)(res, 200, userInfo)
                                : (0, sendResponse_1.default)(res, 404, (0, getStringifyMessage_1.default)(`user with id ${userId} doesn't exist`));
                        }
                        else {
                            (0, sendResponse_1.default)(res, 404, (0, getStringifyMessage_1.default)('userId is invalid (not uuid)'));
                        }
                    }
                    break;
                default:
                    (0, sendResponse_1.default)(res, 404, undefined);
            }
            break;
        case 'POST':
            switch (urlArray[1]) {
                case 'users':
                    if (!urlArray[2]) {
                        let body = '';
                        req.on('data', (chunk) => {
                            body += chunk.toString();
                        });
                        req.on('end', () => {
                            try {
                                const newUser = users.addUser(JSON.parse(body));
                                newUser
                                    ? (0, sendResponse_1.default)(res, 201, newUser)
                                    : (0, sendResponse_1.default)(res, 400, (0, getStringifyMessage_1.default)('user information is not valid'));
                            }
                            catch (error) {
                                (0, sendResponse_1.default)(res, 400, (0, getStringifyMessage_1.default)('user information is not valid'));
                            }
                        });
                    }
                    else {
                        (0, sendResponse_1.default)(res, 404, undefined);
                    }
                    break;
            }
            break;
        case 'PUT':
            switch (urlArray[1]) {
                case 'users':
                    if (urlArray[2]) {
                        const userId = urlArray[2];
                        if ((0, isUuid_1.default)(userId)) {
                            let body = '';
                            req.on('data', (chunk) => {
                                body += chunk.toString();
                            });
                            req.on('end', () => {
                                try {
                                    if (users.getUser(userId) === undefined) {
                                        (0, sendResponse_1.default)(res, 404, (0, getStringifyMessage_1.default)(`user with id ${userId} doesn't exist`));
                                        return;
                                    }
                                    const updatedUser = users.updateUser(userId, JSON.parse(body));
                                    updatedUser
                                        ? (0, sendResponse_1.default)(res, 200, updatedUser)
                                        : (0, sendResponse_1.default)(res, 400, (0, getStringifyMessage_1.default)('user information is not valid'));
                                }
                                catch (error) {
                                    (0, sendResponse_1.default)(res, 400, (0, getStringifyMessage_1.default)('user information is not valid'));
                                }
                            });
                        }
                        else {
                            (0, sendResponse_1.default)(res, 404, (0, getStringifyMessage_1.default)('userId is invalid (not uuid)'));
                        }
                        break;
                    }
                    else {
                        (0, sendResponse_1.default)(res, 404, undefined);
                    }
            }
            break;
        case 'DELETE':
            switch (urlArray[1]) {
                case 'users':
                    if (urlArray[2]) {
                        const userId = urlArray[2];
                        if ((0, isUuid_1.default)(userId)) {
                            const isUserDeleted = users.deleteUser(userId);
                            isUserDeleted
                                ? (0, sendResponse_1.default)(res, 204, (0, getStringifyMessage_1.default)(`User with id ${userId} was deleted`))
                                : (0, sendResponse_1.default)(res, 404, (0, getStringifyMessage_1.default)(`user with id ${userId} doesn't exist`));
                        }
                        else {
                            (0, sendResponse_1.default)(res, 400, (0, getStringifyMessage_1.default)('userId is invalid (not uuid)'));
                        }
                    }
                    else {
                        (0, sendResponse_1.default)(res, 404, undefined);
                    }
                    break;
            }
            break;
        default:
            (0, sendResponse_1.default)(res, 404, undefined);
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at port ${port}/`);
});
