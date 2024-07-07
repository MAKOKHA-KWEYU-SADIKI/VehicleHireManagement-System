// import {db} from "../drizzle/db"
// import {eq} from "drizzle-orm"
// import{TIAuth,TSAuth,TableAuthendication}from "../drizzle/schema"
// export const authService = async (limit?: number): Promise<TSAuth[] | null> => {
//     if (limit) {
//         return await db.query.TableAuthendication.findMany({
//             limit: limit
//         });
//     }
//     return await db.query.TableAuthendication.findMany();
// }

// export const getauthService = async (id: number): Promise<TSAuth | undefined> => {
//     return await db.query.TableAuthendication.findFirst({
//         where: eq(TableAuthendication.auth_id, id)
//     })
// }

// export const registerUserService = async (auth: TIAuth):Promise<string> => {
//     await db.insert(TableAuthendication).values(auth)
//     return "auth created successfully";
// }

// export const updateauthService = async (id: number, auth: TIAuth)=> {
//     await db.update(TableAuthendication).set(auth).where(eq(TableAuthendication.auth_id, id))
//     return "auth updated successfully";
// }

// export const deleteauthService = async (id: number) => {
//     await db.delete(TableAuthendication).where(eq(TableAuthendication.auth_id, id))
//     return "auth deleted successfully";
// }
import { TableAuthendication, TIAuth, TSAuth } from "../drizzle/schema";
import {db} from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuth): Promise<string | null> => {
    await db.insert(TableAuthendication).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuth) => {
    const { email, password } = user;
    return await db.query.TableAuthendication.findFirst({
        columns: {
            email: true,
            role: true,
            password: true
        }, where: sql` ${TableAuthendication.email} = ${email}`,
        with: {
            user: {
                columns: {
                    full_name: true,
                    contact_phone: true,
                    user_id: true
                }
            }
        }
    })
}