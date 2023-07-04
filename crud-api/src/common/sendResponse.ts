import { ServerResponse } from 'http';
import getStringifyMessage from './getStringifyMessage';

export default function sendResponse(
  res: ServerResponse,
  statusCode: number,
  content: string | undefined
): void {
  const errorMessage = getStringifyMessage(
    'Sorry, the requested resource was not found'
  );
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(content || errorMessage);
}
