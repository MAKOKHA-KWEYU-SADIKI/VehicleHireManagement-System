// import{Hono} from "hono"
// import { Context } from "hono";
// import { listuser, getuser, createuser, updateuser, deleteuser } from "./user.controller"
// import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validator";
// export const userRouter=new Hono();
// userRouter.get("/user", listuser);
// userRouter.get("/user/:id", getuser)

// userRouter.post("/user", zValidator('json', userSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400)
//     }
// }), createuser)

// userRouter.put("/user/:id", updateuser)
// userRouter.delete("/user/:id", deleteuser)

import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/midleware";

export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", adminRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id", userRoleAuth, getUser)
// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)

//https:domai.com/api/users?limit=10