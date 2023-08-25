"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = void 0;
const zod_1 = require("zod");
const UserSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(4).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8)
        .max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    passwordConfirm: zod_1.z.string(),
})
    .refine((data) => data.password === data.passwordConfirm, {
    message: "password does not match!",
    path: ["password", "passwordConfirm"],
});
const parseUser = UserSchema.parse;
exports.parseUser = parseUser;
