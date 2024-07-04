import { Context } from "hono";
import { locationService, getlocationService, createlocationService, updatelocationService, deletelocationService, } from "./location.srvice";
export const listlocation = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await locationService(limit);
        if (data == null || data.length == 0) {
            return c.text("location not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getlocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getlocationService(id);
    if (user == undefined) {
        return c.text("location  not found", 404);
    }
    return c.json(user, 200);
}
export const createlocation = async (c: Context) => {
    try {
        const locate = await c.req.json();
        const createdlocation = await createlocationService(locate);


        if (!createdlocation) return c.text("management not added", 404);
        return c.json({ msg: createdlocation }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatelocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searchedmanagement = await getlocationService(id);
        if (searchedmanagement == undefined) return c.text("location not found", 404);
        
        const res = await updatelocationService(id, state);
        
        if (!res) return c.text("location not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletelocation = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the location
        const manage = await getlocationService(id);
        if (manage == undefined) return c.text("location not found", 404);
        //deleting the location
        const res = await deletelocationService(id);
        if (!res) return c.text("location not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
