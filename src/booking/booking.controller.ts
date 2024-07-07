import { Context } from "hono";
import { bookService, getbookService, createbookService, updatebookService, deletebookService, } from "./booking.service";
export const listbook = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await bookService(limit);
        if (data == null || data.length == 0) {
            return c.text("book not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getbook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await getbookService(id);
    if (book == undefined) {
        return c.text("book not found", 404);
    }
    return c.json(book, 200);
}
export const createbook = async (c: Context) => {
    try {
        const book = await c.req.json();
        const createdbook = await createbookService(book);


        if (!createdbook) return c.text("booking unsuccessful", 404);
        return c.json({ msg: createdbook }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatebook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searchedbook = await getbookService(id);
        if (searchedbook == undefined) return c.text("booking unavailable", 404);
        
        const res = await updatebookService(id, state);
        
        if (!res) return c.text("booking not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletebook = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the booking
        const book = await getbookService(id);
        if (book == undefined) return c.text("booking not found", 404);
        //deleting the booking
        const res = await deletebookService(id);
        if (!res) return c.text("booking not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
