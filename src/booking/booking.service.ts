import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIbook,TSbook,TableBooking}from "../drizzle/schema"
export const bookService = async (limit?: number): Promise<TSbook[] | null> => {
    if (limit) {
        return await db.query.TableBooking.findMany({
            limit: limit
        });
    }
    return await db.query.TableBooking.findMany();
}

export const getbookService = async (id: number): Promise<TSbook | undefined> => {
    return await db.query.TableBooking.findFirst({
        where: eq(TableBooking.booking_id, id)
    })
}

export const createbookService = async (book: TIbook):Promise<string> => {
    await db.insert(TableBooking).values(book)
    return "booking created successfully";
}

export const updatebookService = async (id: number, book: TIbook)=> {
    await db.update(TableBooking).set(book).where(eq(TableBooking.booking_id, id))
    return "booking updated successfully";
}

export const deletebookService = async (id: number) => {
    await db.delete(TableBooking).where(eq(TableBooking.booking_id, id))
    return "booking deleted successfully";
}
