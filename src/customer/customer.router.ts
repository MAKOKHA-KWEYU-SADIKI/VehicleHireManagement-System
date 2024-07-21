import{Hono} from "hono"
import { Context } from "hono";
import { listcustomer, getcustomer, createcustomer, updatecustomer, deletecustomer } from "./customer.controller"
import { zValidator } from "@hono/zod-validator";
import { customerSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/midleware";
export const customerRouter=new Hono();
customerRouter.get("/customer", listcustomer);
customerRouter.get("/customer/:id", getcustomer)

customerRouter.post("/customer", zValidator('json', customerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createcustomer)

customerRouter.put("/customer/:id", updatecustomer)
customerRouter.delete("/customer/:id", deletecustomer)

