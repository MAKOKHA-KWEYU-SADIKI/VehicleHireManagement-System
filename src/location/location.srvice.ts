import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIlocation,TSlocation,TableLocationBranches}from "../drizzle/schema"
export const locationService = async (limit?: number): Promise<TSlocation[] | null> => {
    if (limit) {
        return await db.query.TableLocationBranches.findMany({
            limit: limit
        });
    }
    return await db.query.TableLocationBranches.findMany();
}

export const getlocationService = async (id: number): Promise<TSlocation | undefined> => {
    return await db.query.TableLocationBranches.findFirst({
        where: eq(TableLocationBranches.location_id, id)
    })
}

export const createlocationService = async (locate: TIlocation):Promise<string> => {
    await db.insert(TableLocationBranches).values(locate)
    return "location added successfully";
}

export const updatelocationService = async (id: number, manage: TIlocation)=> {
    await db.update(TableLocationBranches).set(manage).where(eq(TableLocationBranches.location_id, id))
    return "location updated successfully";
}

export const deletelocationService = async (id: number) => {
    await db.delete(TableLocationBranches).where(eq(TableLocationBranches.location_id, id))
    return "location deleted successfully";
}
