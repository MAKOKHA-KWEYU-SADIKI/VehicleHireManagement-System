import { Context } from "hono";
import { vehicleService, getvehicleService, createvehicleService, updatevehicleService, deletevehicleService, } from "./vehicle.service";
export const listvehicle = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await vehicleService(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicle not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getvehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getvehicleService(id);
    if (user == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(user, 200);
}
export const createvehicle = async (c: Context) => {
    try {
        const vehicle = await c.req.json();
        const addedVehicle = await createvehicleService(vehicle);


        if (!addedVehicle) return c.text("vehicle not added", 404);
        return c.json({ msg: addedVehicle }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatevehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searchvehicle = await getvehicleService(id);
        if (searchvehicle == undefined) return c.text("vehicle not found", 404);
        
        const res = await updatevehicleService(id, state);
        
        if (!res) return c.text("vehicle not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletevehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        
        const user = await getvehicleService(id);
        if (user == undefined) return c.text("vehicle not found", 404);
        
        const res = await deletevehicleService(id);
        if (!res) return c.text("vecle not removed", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
