import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TImanage,TSmanage,TableManagement}from "../drizzle/schema"
export const manageService = async (limit?: number): Promise<TSmanage[] | null> => {
    if (limit) {
        return await db.query.TableManagement.findMany({
            limit: limit
        });
    }
    return await db.query.TableManagement.findMany();
}

export const getmanageService = async (id: number): Promise<TSmanage | undefined> => {
    return await db.query.TableManagement.findFirst({
        where: eq(TableManagement.fleet_id, id)
    })
}

export const createmanageService = async (user: TImanage):Promise<string> => {
    await db.insert(TableManagement).values(user)
    return "management added successfully";
}

export const updatemanageService = async (id: number, manage: TImanage)=> {
    await db.update(TableManagement).set(manage).where(eq(TableManagement.fleet_id, id))
    return "management updated successfully";
}

export const deletemanageService = async (id: number) => {
    await db.delete(TableManagement).where(eq(TableManagement.fleet_id, id))
    return "management deleted successfully";
}
