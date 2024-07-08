import{Hono} from "hono"
import { listlocation, getlocation, createlocation, updatelocation, deletelocation } from "./location.controller"
import { zValidator } from "@hono/zod-validator";
import { locateSchema } from "../validator";
import { adminRoleAuth } from "../middleware/midleware";
export const locateRouter=new Hono();
locateRouter.get("/locate",adminRoleAuth, listlocation);
locateRouter.get("/locate/:id",adminRoleAuth, getlocation)

locateRouter.post("/locate",adminRoleAuth, zValidator('json', locateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createlocation)

locateRouter.put("/locate/:id",adminRoleAuth, updatelocation)
locateRouter.delete("/locate/:id",adminRoleAuth, deletelocation)

