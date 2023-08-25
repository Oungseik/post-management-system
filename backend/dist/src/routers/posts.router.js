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
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { count, page, user } = req.query;
    if (!(count && page)) {
        const posts = yield prisma_1.prisma.post.findMany({ take: Number(count) || 10, include: { user: Boolean(user) }, orderBy: [{ id: "desc" }] });
        posts.forEach(post => { var _a; return ((_a = post.user) === null || _a === void 0 ? void 0 : _a.password) && (post.user.password = ""); });
        return res.json({ posts });
    }
    let skip = Number(page) > 0 ? (Number(page) - 1) * Number(count) : 0;
    const posts = yield prisma_1.prisma.post.findMany({
        skip,
        take: Number(count),
        include: { user: Boolean(user) },
        orderBy: [{ id: "desc" }]
    });
    posts.forEach(post => { var _a; return ((_a = post.user) === null || _a === void 0 ? void 0 : _a.password) && (post.user.password = ""); });
    res.json({ posts });
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = Number(req.params.id);
    const post = yield prisma_1.prisma.post.findUnique({ where: { id }, include: { user: true } });
    if (!post) {
        return res.status(404).json({ msg: "not found" });
    }
    ((_a = post.user) === null || _a === void 0 ? void 0 : _a.password) && (post.user.password = "");
    res.json(post);
}));
// login first to perform CUD operation
router.use(authentication_1.authenticator);
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id: userId } = req.jwtPayload;
    const { title, content, image } = req.body;
    if (!(title && content)) {
        return res.status(400).json({ msg: "post must have the title and content" });
    }
    try {
        const post = yield prisma_1.prisma.post.create({ data: { title, content, image, userId }, include: { user: true } });
        ((_b = post.user) === null || _b === void 0 ? void 0 : _b.password) && (post.user.password = "");
        res.status(201).json({ post });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = Number(req.params.id);
    const { id: userId } = req.jwtPayload;
    const { title, content } = req.body;
    const post = yield prisma_1.prisma.post.findUnique({ where: { id } });
    if (!post) {
        return res.status(404).json({ msg: "not found" });
    }
    if (userId !== post.userId) {
        return res.status(403).json({ msg: "unable to edit other user's post" });
    }
    const updatedPost = yield prisma_1.prisma.post.update({
        where: { id },
        data: {
            title, content
        },
        include: { user: true }
    });
    ((_c = updatedPost.user) === null || _c === void 0 ? void 0 : _c.password) && (updatedPost.user.password = "");
    res.json({ post: updatedPost });
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { id: userId } = req.jwtPayload;
    const post = yield prisma_1.prisma.post.findUnique({ where: { id } });
    if (!post) {
        return res.status(204).end();
    }
    if (userId !== post.userId) {
        return res.status(403).json({ msg: "unable to delete other user's post" });
    }
    yield prisma_1.prisma.post.delete({ where: { id } });
    res.status(204).end();
}));
exports.default = router;
