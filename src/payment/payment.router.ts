import{Hono} from "hono"
import { Context } from "hono";
import { listpayment, getpayment, createpayment, updatepayment, deletepayment } from "./payment.controller"
import { zValidator } from "@hono/zod-validator";
import { paymentSchema } from "../validator";
export const paymentRouter=new Hono();
paymentRouter.get("/payment", listpayment);
paymentRouter.get("/payment/:id", getpayment)

paymentRouter.post("/payment", zValidator('json', paymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createpayment)

paymentRouter.put("/payment/:id", updatepayment)
paymentRouter.delete("/payment/:id", deletepayment)

