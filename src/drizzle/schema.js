"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableUser = void 0;
//import { timestamp } from "drizzle-orm/mysql-core";
var pg_core_1 = require("drizzle-orm/pg-core");
var pg_core_2 = require("drizzle-orm/pg-core");
exports.TableUser = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_2.serial)("id").primaryKey(),
    full_name: (0, pg_core_2.text)("full_name"),
    email: (0, pg_core_2.text)("email"),
    contact_pnone: (0, pg_core_2.text)("contact_phone"),
    created_at: (0, pg_core_2.timestamp)("created_at"),
    updated_at: (0, pg_core_2.timestamp)("updated_at")
});
