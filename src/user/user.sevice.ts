import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIuser,TSuser,TableUser}from "../drizzle/schema"
export const userService = async (limit?: number): Promise<TSuser[] | null> => {
    if (limit) {
        return await db.query.TableUser.findMany({
            limit: limit
        });
    }
    return await db.query.TableUser.findMany();
}

export const getuserService = async (id: number): Promise<TSuser | undefined> => {
    return await db.query.TableUser.findFirst({
        where: eq(TableUser.user_id, id)
    })
}

export const createuserService = async (user: TIuser):Promise<string> => {
    await db.insert(TableUser).values(user)
    return "user created successfully";
}

export const updateuserService = async (id: number, user: TIuser)=> {
    await db.update(TableUser).set(user).where(eq(TableUser.user_id, id))
    return "user updated successfully";
}

export const deleteuserService = async (id: number) => {
    await db.delete(TableUser).where(eq(TableUser.user_id, id))
    return "user deleted successfully";
}
