"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization = function (options) {
    return options.authenticate('jwt', { session: false });
};
exports.default = authorization;
//# sourceMappingURL=authorization.js.map