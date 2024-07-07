import{Hono} from "hono"
import { Context } from "hono";
import { listbook, getbook, createbook, updatebook, deletebook } from "./booking.controller"
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../validator";
export const bookRouter=new Hono();
bookRouter.get("/book", listbook);
bookRouter.get("/book/:id", getbook)

bookRouter.post("/book", zValidator('json', bookSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createbook)

bookRouter.put("/book/:id", updatebook)
bookRouter.delete("/book/:id", deletebook)

