import{Hono} from "hono"
import { Context } from "hono";
import {registerUser,loginUser} from "./auth.controller"
import { zValidator } from "@hono/zod-validator";
import { loginSchema,registerSchema } from "../validator";
import { adminRoleAuth,userRoleAuth,userOrAdminRoleAuth } from '../middleware/midleware'
import { createUser,getUser,listUsers,updateUser,deleteUser } from '../user/user.controller'
export const authRouter=new Hono();
// authRouter.get("/auth", listauth);
// authRouter.get("/auth/:id", getauth)
authRouter.get("/users/:id",userOrAdminRoleAuth)
authRouter.get('/users',adminRoleAuth,listUsers)
authRouter.delete('/users/:id',adminRoleAuth,deleteUser)
authRouter.post('/users',adminRoleAuth,createUser)
authRouter.put('/users/:id',adminRoleAuth,updateUser)
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
// authRouter.put("/auth/:id", updateauth)
// authRouter.delete("/auth/:id", deleteauth)

