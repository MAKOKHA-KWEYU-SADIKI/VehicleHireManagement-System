import{Hono} from "hono"
import { Context } from "hono";
import {registerUser,loginUser} from "./auth.controller"
import { zValidator } from "@hono/zod-validator";
import { loginSchema,registerSchema } from "../validator";

export const authRouter=new Hono();

authRouter.post("/register", zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), registerUser)
authRouter.post("/login", zValidator('json', loginSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)

