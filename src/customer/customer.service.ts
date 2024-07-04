import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIcustomer,TScustomer,TableCustomerSupport}from "../drizzle/schema"
export const customerService = async (limit?: number): Promise<TScustomer[] | null> => {
    if (limit) {
        return await db.query.TableCustomerSupport.findMany({
            limit: limit
        });
    }
    return await db.query.TableCustomerSupport.findMany();
}

export const getcustomerService = async (id: number): Promise<TScustomer | undefined> => {
    return await db.query.TableCustomerSupport.findFirst({
        where: eq(TableCustomerSupport.ticket_id, id)
    })
}

export const createcustomerService = async (customer: TIcustomer):Promise<string> => {
    await db.insert(TableCustomerSupport).values(customer)
    return "customer suport created successfully";
}

export const updatecustomerService = async (id: number, customer: TIcustomer)=> {
    await db.update(TableCustomerSupport).set(customer).where(eq(TableCustomerSupport.ticket_id, id))
    return "customer suport updated successfully";
}

export const deletecustomerService = async (id: number) => {
    await db.delete(TableCustomerSupport).where(eq(TableCustomerSupport.ticket_id, id))
    return "customer suport deleted successfully";
}
