"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const posts_router_1 = __importDefault(require("./routers/posts.router"));
const register_router_1 = __importDefault(require("./routers/register.router"));
const login_router_1 = __importDefault(require("./routers/login.router"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.get("/health", (_, res) => {
    res.send("server is up and running.");
});
app.use("/register", register_router_1.default);
app.use("/login", login_router_1.default);
app.use("/api/posts", posts_router_1.default);
exports.default = app;
