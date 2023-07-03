"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUuid(uuid) {
    const uuidRegex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i');
    return uuidRegex.test(uuid);
}
exports.default = isUuid;
