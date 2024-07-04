import{Hono} from "hono"
import { listspecs, getspecs, createspecs, updatespecs, deletespecs } from "./specs.controller"
import { zValidator } from "@hono/zod-validator";
import { specsSchema } from "../validator";
export const specsRouter=new Hono();
specsRouter.get("/specs", listspecs);
specsRouter.get("/specs/:id", getspecs)

specsRouter.post("/specs", zValidator('json', specsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createspecs)

specsRouter.put("/specs/:id", updatespecs)
specsRouter.delete("/specs/:id", deletespecs)

