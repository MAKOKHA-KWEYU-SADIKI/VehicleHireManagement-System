import { Context } from "hono";
import { paymentService, getpaymentService, createpaymentService, updatepaymentService, deletepaymentService, } from "./payment.service";
export const listpayment = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await paymentService(limit);
        if (data == null || data.length == 0) {
            return c.text("payment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getpayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await getpaymentService(id);
    if (payment == undefined) {
        return c.text("payment not found", 404);
    }
    return c.json(payment, 200);
}
export const createpayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const createdpayment = await createpaymentService(payment);


        if (!createdpayment) return c.text("payment not created", 404);
        return c.json({ msg: createdpayment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatepayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searchedpayment = await getpaymentService(id);
        if (searchedpayment == undefined) return c.text("payment not found", 404);
        
        const res = await updatepaymentService(id, state);
        
        if (!res) return c.text("payment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletepayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the payment
        const payment = await getpaymentService(id);
        if (payment == undefined) return c.text("payment not found", 404);
        //deleting the payment
        const res = await deletepaymentService(id);
        if (!res) return c.text("payment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
