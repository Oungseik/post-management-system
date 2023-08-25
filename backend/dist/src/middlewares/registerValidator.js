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
exports.registerValidator = void 0;
const validator_1 = require("../lib/validator");
function registerValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (0, validator_1.parseUser)(req.body);
            req.body = user;
            next();
        }
        catch (err) {
            res.status(400).json(err);
        }
    });
}
exports.registerValidator = registerValidator;
