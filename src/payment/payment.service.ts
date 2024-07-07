import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIpayment,TSpayment,TablePayment}from "../drizzle/schema"
export const paymentService = async (limit?: number): Promise<TSpayment[] | null> => {
    if (limit) {
        return await db.query.TablePayment.findMany({
            limit: limit
        });
    }
    return await db.query.TablePayment.findMany();
}

export const getpaymentService = async (id: number): Promise<TSpayment | undefined> => {
    return await db.query.TablePayment.findFirst({
        where: eq(TablePayment.payment_id, id)
    })
}

export const createpaymentService = async (payment: TIpayment):Promise<string> => {
    await db.insert(TablePayment).values(payment)
    return "payment created successfully";
}

export const updatepaymentService = async (id: number, payment: TIpayment)=> {
    await db.update(TablePayment).set(payment).where(eq(TablePayment.payment_id, id))
    return "payment updated successfully";
}

export const deletepaymentService = async (id: number) => {
    await db.delete(TablePayment).where(eq(TablePayment.payment_id, id))
    return "payment deleted successfully";
}
