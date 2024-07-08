import{Hono} from "hono"
import { Context } from "hono";
import { listbook, getbook, createbook, updatebook, deletebook } from "./booking.controller"
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../validator";
import { adminRoleAuth,userRoleAuth,userOrAdminRoleAuth } from '../middleware/midleware'
export const bookRouter=new Hono();
bookRouter.get("/book", userRoleAuth,listbook);
bookRouter.get("/book/:id",userRoleAuth, getbook)

bookRouter.post("/book",userRoleAuth, zValidator('json', bookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createbook)

bookRouter.put("/book/:id",userRoleAuth, updatebook)
bookRouter.delete("/book/:id",userRoleAuth, deletebook)

