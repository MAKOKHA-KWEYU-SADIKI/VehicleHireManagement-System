// import { Context } from "hono";
// // import { authService, getauthService, createauthService, updateauthService, deleteauthService, } from "./auth.service";
// // export const listauth = async (c: Context) => {
// //     try {
        

// //         const limit = Number(c.req.query('limit'))

// //         const data = await authService(limit);
// //         if (data == null || data.length == 0) {
// //             return c.text("auth not found", 404)
// //         }
// //         return c.json(data, 200);
// //     } catch (error: any) {
// //         return c.json({ error: error?.message }, 400)
// //     }
// // }

// // export const getauth = async (c: Context) => {
// //     const id = parseInt(c.req.param("id"));
// //     if (isNaN(id)) return c.text("Invalid ID", 400);

// //     const auth = await getauthService(id);
// //     if (auth == undefined) {
// //         return c.text("auth not found", 404);
// //     }
// //     return c.json(auth, 200);
// // }
// // export const createauth = async (c: Context) => {
// //     try {
// //         const auth = await c.req.json();
// //         const createdauth = await createauthService(auth);


// //         if (!createdauth) return c.text("auth not created", 404);
// //         return c.json({ msg: createdauth }, 201);

// //     } catch (error: any) {
// //         return c.json({ error: error?.message }, 400)
// //     }
// // }

// // export const updateauth = async (c: Context) => {
// //     const id = parseInt(c.req.param("id"));
// //     if (isNaN(id)) return c.text("Invalid ID", 400);

// //     const state = await c.req.json();
// //     try {
       
// //         const searchedauth = await getauthService(id);
// //         if (searchedauth == undefined) return c.text("auth not found", 404);
        
// //         const res = await updateauthService(id, state);
        
// //         if (!res) return c.text("auth not updated", 404);

// //         return c.json({ msg: res }, 201);
// //     } catch (error: any) {
// //         return c.json({ error: error?.message }, 400)
// //     }
// // }

// // export const deleteauth = async (c: Context) => {
// //     const id = Number(c.req.param("id"));
// //     if (isNaN(id)) return c.text("Invalid ID", 400);

// //     try {
// //         //search for the auth
// //         const auth = await getauthService(id);
// //         if (auth == undefined) return c.text("auth not found", 404);
// //         //deleting the auth
// //         const res = await deleteauthService(id);
// //         if (!res) return c.text("auth not deleted", 404);

// //         return c.json({ msg: res }, 201);
// //     } catch (error: any) {
// //         return c.json({ error: error?.message }, 400)
// //     }
// // }
// import { registerUserService } from "./auth.service";
// export const registerUser=async(c:Context)=>{
  
//     try {
//         const auth = await c.req.json();
//         const createdauth = await registerUserService(auth);


//         if (!createdauth) return c.text("registration unsuccessful", 404);
//         return c.json({ msg: createdauth }, 201);

//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400)
//     }
// }



// export const loginUser=async(c:Context)=>{

// }
import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";
import assert from "assert";

assert(process.env.JWT_SECRET, "JWT_SECRET is not set in the .env file");


export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}
export const loginUser = async (c: Context) => {

    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await userLoginService(user);
        if (userExist === null) return c.json({ error: "User not found" }, 404);  // not found         
        const userMatch = await bycrpt.compare(user.password, userExist?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);  // unauthorized
        } else {
            // create a payload
            const payload = {
                sub: userExist?.email,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)  // 3 hour  => SESSION EXPIRATION
            }
            let secret = process.env.JWT_SECRET as string;  // secret key
            const token = await sign(payload, secret);   // create a JWT token
            let user = userExist?.user;
            let role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);  // return token and user details
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }

}

