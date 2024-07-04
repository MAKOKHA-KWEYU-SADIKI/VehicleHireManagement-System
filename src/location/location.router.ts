import{Hono} from "hono"
import { listlocation, getlocation, createlocation, updatelocation, deletelocation } from "./location.controller"
import { zValidator } from "@hono/zod-validator";
import { locateSchema } from "../validator";
export const locateRouter=new Hono();
locateRouter.get("/locate", listlocation);
locateRouter.get("/locate/:id", getlocation)

locateRouter.post("/locate", zValidator('json', locateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createlocation)

locateRouter.put("/locate/:id", updatelocation)
locateRouter.delete("/locate/:id", deletelocation)

