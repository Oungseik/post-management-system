import { z } from "zod";

const UserSchema = z
  .object({
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "password does not match!",
    path: ["password", "passwordConfirm"],
  });

const parseUser = UserSchema.parse;

export { parseUser };
