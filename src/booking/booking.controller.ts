// import { Context } from "hono";
// import { userService, getuserService, createuserService, updateuserService, deleteuserService, } from "./user.sevice";
// export const listuser = async (c: Context) => {
//     try {
        

//         const limit = Number(c.req.query('limit'))

//         const data = await userService(limit);
//         if (data == null || data.length == 0) {
//             return c.text("user not found", 404)
//         }
//         return c.json(data, 200);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const getuser = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const user = await getuserService(id);
//     if (user == undefined) {
//         return c.text("user not found", 404);
//     }
//     return c.json(user, 200);
// }
// export const createuser = async (c: Context) => {
//     try {
//         const user = await c.req.json();
//         const createduser = await createuserService(user);


//         if (!createduser) return c.text("user not created", 404);
//         return c.json({ msg: createduser }, 201);

//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const updateuser = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     const state = await c.req.json();
//     try {
       
//         const searcheduser = await getuserService(id);
//         if (searcheduser == undefined) return c.text("user not found", 404);
        
//         const res = await updateuserService(id, state);
        
//         if (!res) return c.text("user not updated", 404);

//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }

// export const deleteuser = async (c: Context) => {
//     const id = Number(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);

//     try {
//         //search for the user
//         const user = await getuserService(id);
//         if (user == undefined) return c.text("user not found", 404);
//         //deleting the user
//         const res = await deleteuserService(id);
//         if (!res) return c.text("user not deleted", 404);

//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }
