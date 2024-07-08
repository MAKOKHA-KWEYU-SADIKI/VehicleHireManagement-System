import{Hono} from "hono"
import { listspecs, getspecs, createspecs, updatespecs, deletespecs } from "./specs.controller"
import { zValidator } from "@hono/zod-validator";
import { specsSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/midleware";
export const specsRouter=new Hono();
specsRouter.get("/specs",userRoleAuth, listspecs);
specsRouter.get("/specs/:id",userRoleAuth, getspecs)

specsRouter.post("/specs",adminRoleAuth, zValidator('json', specsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createspecs)

specsRouter.put("/specs/:id",adminRoleAuth, updatespecs)
specsRouter.delete("/specs/:id",adminRoleAuth, deletespecs)

