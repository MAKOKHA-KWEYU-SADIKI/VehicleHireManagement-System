// import "dotenv/config";
// import {drizzle} from "drizzle-orm/node-postgres"
// import { Client } from "pg";
// import *  as schema from "./schema"
// export const client=new Client({
//     connectionString:process.env.Database_URL as string
// })
// const main=async()=>{
//     await client.connect()

// }
// main()
// const db=drizzle(client,{schema,logger:true})
// export default db;
import "dotenv/config";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';

const databaseUrl = process.env.Database_URL as string;
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const sql = neon(databaseUrl);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema, logger: true });