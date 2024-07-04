import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIspecs,TSspecs,TableSpecifications}from "../drizzle/schema"
export const specsService = async (limit?: number): Promise<TSspecs[] | null> => {
    if (limit) {
        return await db.query.TableSpecifications.findMany({
            limit: limit
        });
    }
    return await db.query.TableSpecifications.findMany();
}

export const getspecsService = async (id: number): Promise<TSspecs | undefined> => {
    return await db.query.TableSpecifications.findFirst({
        where: eq(TableSpecifications.vehicle_id, id)
    })
}

export const createspecsService = async (specs: TIspecs):Promise<string> => {
    await db.insert(TableSpecifications).values(specs)
    return "specification added successfully";
}

export const updatespecsService = async (id: number, specs: TIspecs)=> {
    await db.update(TableSpecifications).set(specs).where(eq(TableSpecifications.vehicle_id, id))
    return "specification updated successfully";
}

export const deletespecsService = async (id: number) => {
    await db.delete(TableSpecifications).where(eq(TableSpecifications.vehicle_id, id))
    return "specification deleted successfully";
}
