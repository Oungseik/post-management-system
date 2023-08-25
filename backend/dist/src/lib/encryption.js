"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUND = 10;
const hash = (data) => bcrypt_1.default.hash(data, SALT_ROUND);
exports.hash = hash;
exports.compare = bcrypt_1.default.compare;
