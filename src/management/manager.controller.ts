import { Context } from "hono";
import { manageService, getmanageService, createmanageService, updatemanageService, deletemanageService, } from "./manager.service";
export const listmanagement = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await manageService(limit);
        if (data == null || data.length == 0) {
            return c.text("management not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getmanagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getmanageService(id);
    if (user == undefined) {
        return c.text("management not found", 404);
    }
    return c.json(user, 200);
}
export const createmanagement = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdmanagement = await createmanageService(user);


        if (!createdmanagement) return c.text("management not added", 404);
        return c.json({ msg: createdmanagement }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}



export const updatemanagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400); // Check if the ID is valid

    try {
        const state = await c.req.json(); // Parse the JSON request body
        console.log('Parsed state:', state); // Log the parsed state for debugging

        const searchedmanagement = await getmanageService(id);
        if (searchedmanagement === undefined) return c.text("User not found", 404); // Check if the management exists

        const res = await updatemanageService(id, state); // Update the management

        if (!res) return c.text("Management not updated", 404); // Check if the update was successful

        return c.json({ msg: res }, 201); // Return success response
    } catch (error: any) {
        console.error('Error:', error); // Log the error for debugging
        return c.json({ error: error?.message }, 400); // Return error response
    }
}


export const deletemanagement = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the management
        const manage = await getmanageService(id);
        if (manage == undefined) return c.text("managemennt not found", 404);
        //deleting the management
        const res = await deletemanageService(id);
        if (!res) return c.text("management not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
