import{Hono} from "hono"
import { listmanagement, getmanagement, createmanagement, updatemanagement, deletemanagement } from "./manager.controller"
import { zValidator } from "@hono/zod-validator";
import { manageSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/midleware";
export const manageRouter=new Hono();
manageRouter.get("/manage", listmanagement);
manageRouter.get("/manage/:id", getmanagement)

manageRouter.post("/manage",adminRoleAuth, zValidator('json', manageSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createmanagement)

manageRouter.put("/manage/:id", updatemanagement)
manageRouter.delete("/manage/:id", deletemanagement)

