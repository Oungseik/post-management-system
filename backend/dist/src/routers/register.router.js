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
const encryption_1 = require("../lib/encryption");
const prisma_1 = require("../lib/prisma");
const registerValidator_1 = require("../middlewares/registerValidator");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", registerValidator_1.registerValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const users = yield prisma_1.prisma.user.findMany({ where: { OR: [{ username }, { email }] } });
        if (users.length) {
            return res.status(400).json({ msg: "Username or Email is already in used." });
        }
        const user = yield prisma_1.prisma.user.create({ data: { username, email, password: yield (0, encryption_1.hash)(password) } });
        res.status(201).json(Object.assign(Object.assign({}, user), { password: undefined }));
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
