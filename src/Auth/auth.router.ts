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

