
import bcrypt from "bcrypt";
import { db}  from "../drizzle/db"; // Importing the database instance
import { TableUser, TableAuthendication } from "../drizzle/schema"; // Importing the Users and Authentication table schemas
import { userSchema, authSchema, loginSchema } from "../validator"; // Importing the validation schemas
import { eq } from "drizzle-orm"; 
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET; // Getting the secret key for JWT from environment variables
const expiresIn = process.env.EXPIRESIN; 
export const registerUser = async (user: any) => {
    userSchema.parse(user); // Validating the user object against the user schema
    authSchema.parse(user);
    const existingUser = await db.select().from(TableUser).where(eq(TableUser.email, user.email)).execute();

    if (existingUser.length > 0) {
        throw new Error("User already exists"); // Throwing an error if the user already exists
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await db.insert(TableUser)
        .values({
            full_name:user.full_name,
            email:user.email,
            adress:user.adress,
            contact_phone:user.contact_phone,
            role:user.role
        })
        .returning({ id: TableUser.user_id })
        .execute();

    const userId = newUser[0].id;

    try {
        await db.insert(TableAuthendication)
            .values({
                user_id: userId,
                password: hashedPassword
            })
            .execute();
        return 'User registered successfully'; // Returning success message
    } catch (error) {
        // Rollback: Deleting the user from the Users table if the second insert fails
        await db.delete(TableUser).where(eq(TableUser.user_id, userId)).execute();
        throw new Error('Registration failed. Please try again.'); // Throwing an error if the registration fails
    }
}

// Service function to login a user
export const loginUser = async (email: string, password: string) => {
    loginSchema.parse({ email, password }); // Validating the login data against the login schema

    // Fetching the user by email from the Users table
    const users = await db.select().from(TableUser).where(eq(TableUser.email, email)).execute();

    if (users.length === 0) {
        throw new Error('User not found! Try Again'); // Throwing an error if the user is not found
    }

    const user = users[0];

    // Fetching the user's hashed password from the Authentication table
    const auths = await db.select().from(TableAuthendication).where(eq(TableAuthendication.user_id, user.user_id)).execute();

    if (auths.length === 0) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the authentication details are not found
    }

    const auth = auths[0];

    // Validating the provided password against the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials! Try again'); // Throwing an error if the passwords don't match
    }

    // Creating a JWT token
    const token = jwt.sign(
        { id: user.user_id, email: user.email, role: user.role },
        secret!,
        { expiresIn }
    );

    return { token, user }; // Returning the token and user details
};

// Service function to verify a JWT token
export const verifyToken = (token: string) => {
    try {
        if (!secret) {
            throw new Error('Secret is undefined'); // Throwing an error if the secret is undefined
        }
        return jwt.verify(token, secret); // Verifying the token with the secret
    } catch (error) {
        throw new Error('Invalid token'); // Throwing an error if the token is invalid
    }
};