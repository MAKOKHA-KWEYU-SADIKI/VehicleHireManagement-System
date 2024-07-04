import { Context } from "hono";
import { customerService, getcustomerService, createcustomerService, updatecustomerService, deletecustomerService, } from "./customer.service";
export const listcustomer = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await customerService(limit);
        if (data == null || data.length == 0) {
            return c.text("customer not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getcustomer = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getcustomerService(id);
    if (user == undefined) {
        return c.text("customer not found", 404);
    }
    return c.json(user, 200);
}
export const createcustomer = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createduser = await createcustomerService(user);


        if (!createduser) return c.text("customer not created", 404);
        return c.json({ msg: createduser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatecustomer = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searcheduser = await getcustomerService(id);
        if (searcheduser == undefined) return c.text("customer not found", 404);
        
        const res = await updatecustomerService(id, state);
        
        if (!res) return c.text("customer not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletecustomer = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the customer
        const user = await getcustomerService(id);
        if (user == undefined) return c.text("user not found", 404);
        //deleting the customer
        const res = await deletecustomerService(id);
        if (!res) return c.text("customer not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
