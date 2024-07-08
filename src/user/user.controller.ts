import { Context } from "hono";
import { userService, getuserService, createuserService, updateuserService, deleteuserService, } from "./user.sevice";
export const listuser = async (c: Context) => {
    try {
        

        const limit = Number(c.req.query('limit'))

        const data = await userService(limit);
        if (data == null || data.length == 0) {
            return c.text("user not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getuser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getuserService(id);
    if (user == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(user, 200);
}
export const createuser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createduser = await createuserService(user);


        if (!createduser) return c.text("user not created", 404);
        return c.json({ msg: createduser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateuser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
       
        const searcheduser = await getuserService(id);
        if (searcheduser == undefined) return c.text("user not found", 404);
        
        const res = await updateuserService(id, state);
        
        if (!res) return c.text("user not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteuser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getuserService(id);
        if (user == undefined) return c.text("user not found", 404);
        //deleting the user
        const res = await deleteuserService(id);
        if (!res) return c.text("user not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
// import { Context } from "hono";
// import { userService, getuserService, createuserService, updateuserService, deleteuserService } from "./user.sevice";
// import bycrpt from 'bcrypt';
// export const listUsers = async (c: Context) => {
//     try {
//         //limit the number of users to be returned

//         const limit = Number(c.req.query('limit'))

//         const data = await userService(limit);
//         if (data == null || data.length == 0) {
//             return c.text("User not found", 404)
//         }
//         return c.json(data, 200);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const getUser = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const user = await getuserService(id);
//     if (user == undefined) {
//         return c.text("User not found", 404);
//     }
//     return c.json(user, 200);
// }
// export const createUser = async (c: Context) => {
//     try {
//         const user = await c.req.json();
//         const pass = user.password;
//         const hashedPassword = await bycrpt.hash(pass, 10);
//         user.password = hashedPassword;
//         const createdUser = await createuserService(user);

//         if (!createdUser) return c.text("User not created", 404);
//         return c.json({ msg: createdUser }, 201);

//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const updateUser = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const user = await c.req.json();
//     try {
//         // search for the user
//         const searchedUser = await getuserService(id);
//         if (searchedUser == undefined) return c.text("User not found", 404);
//         // get the data and update it
//         const res = await updateuserService(id, user);
//         // return a success message
//         if (!res) return c.text("User not updated", 404);

//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const deleteUser = async (c: Context) => {
//     const id = Number(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     try {
//         //search for the user
//         const user = await getuserService(id);
//         if (user == undefined) return c.text("User not found", 404);
//         //deleting the user
//         const res = await deleteuserService(id);
//         if (!res) return c.text("User not deleted", 404);

//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }