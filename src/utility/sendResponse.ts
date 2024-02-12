import { ServerResponse } from "http";

export default function sendResponse(res: ServerResponse, statusCode: number = 404, content: string = "The request resource wasn't found") {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.end(content);
}