import { Context } from "hono";
import { specsService, getspecsService, createspecsService, updatespecsService, deletespecsService, } from "./spec.sevice";
export const listspecs = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await specsService(limit);
        if (data == null || data.length == 0) {
            return c.text("specs not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getspecs = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const specs = await getspecsService(id);
    if (specs == undefined) {
        return c.text("specification not found", 404);
    }
    return c.json(specs, 200);
}
export const createspecs = async (c: Context) => {
    try {
        const specs = await c.req.json();
        const createdspecs = await createspecsService(specs);


        if (!createdspecs) return c.text("specs not added", 404);
        return c.json({ msg: createdspecs }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatespecs = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searcheduser = await getspecsService(id);
        if (searcheduser == undefined) return c.text("specification not found", 404);
        
        const res = await updatespecsService(id, state);
        
        if (!res) return c.text("specification not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletespecs = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the specs
        const specs = await getspecsService(id);
        if (specs == undefined) return c.text("specification not found", 404);
        //deleting the specs
        const res = await deletespecsService(id);
        if (!res) return c.text("specification not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
