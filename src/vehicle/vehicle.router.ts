import{Hono} from "hono"
import { Context } from "hono";
import { listvehicle, getvehicle, createvehicle, updatevehicle, deletevehicle } from "./vehicle.controller"
import { zValidator } from "@hono/zod-validator";
import { vehicleSchema } from "../validator";
import { adminRoleAuth,userRoleAuth,userOrAdminRoleAuth } from '../middleware/midleware'
export const vehicleRouter=new Hono();
vehicleRouter.get("/vehicle", listvehicle);
vehicleRouter.get("/vehicle/:id",userRoleAuth, getvehicle)

vehicleRouter.post("/vehicle",adminRoleAuth, zValidator('json', vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createvehicle)

vehicleRouter.put("/vehicle/:id",updatevehicle)
vehicleRouter.delete("/vehicle/:id", deletevehicle)

