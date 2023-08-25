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
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const encryption_1 = require("../lib/encryption");
const jwt_1 = require("../lib/jwt");
const router = (0, express_1.Router)();
const ONE_DAY = 24 * 3600;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }
        const isPasswordMatch = yield (0, encryption_1.compare)(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ msg: "username or password does not correct" });
        }
        const token = (0, jwt_1.createToken)({ username: user.username, email: user.email, id: user.id });
        res.cookie("token", token, { maxAge: ONE_DAY, httpOnly: false });
        res.json({ token, user: Object.assign(Object.assign({}, user), { password: undefined }) });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
