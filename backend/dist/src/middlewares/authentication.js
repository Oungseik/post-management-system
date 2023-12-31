"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticator = void 0;
const jwt_1 = require("../lib/jwt");
function authenticator(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ").at(1);
        if (!token)
            return res.status(401).json({ msg: "Not signed in yet!" });
        try {
            req.jwtPayload = (0, jwt_1.parseToken)(token);
            next();
        }
        catch (err) {
            res.status(403).json(err);
        }
    });
}
exports.authenticator = authenticator;
