import{Hono} from "hono"
import { Context } from "hono";
import { listvehicle, getvehicle, createvehicle, updatevehicle, deletevehicle } from "./vehicle.controller"
import { zValidator } from "@hono/zod-validator";
import { vehicleSchema } from "../validator";
export const vehicleRouter=new Hono();
vehicleRouter.get("/vehicle", listvehicle);
vehicleRouter.get("/vehicle/:id", getvehicle)

vehicleRouter.post("/vehicle", zValidator('json', vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createvehicle)

vehicleRouter.put("/vehicle/:id", updatevehicle)
vehicleRouter.delete("/vehicle/:id", deletevehicle)

