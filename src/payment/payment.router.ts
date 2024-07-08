import{Hono} from "hono"
import { Context } from "hono";
import { listpayment, getpayment, createpayment, updatepayment, deletepayment } from "./payment.controller"
import { zValidator } from "@hono/zod-validator";
import { paymentSchema } from "../validator";
import { adminRoleAuth, userRoleAuth } from "../middleware/midleware";
export const paymentRouter=new Hono();
paymentRouter.get("/payment",adminRoleAuth, listpayment);
paymentRouter.get("/payment/:id",adminRoleAuth, getpayment)

paymentRouter.post("/payment",userRoleAuth, zValidator('json', paymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createpayment)

paymentRouter.put("/payment/:id",userRoleAuth,updatepayment)
paymentRouter.delete("/payment/:id",adminRoleAuth, deletepayment)

