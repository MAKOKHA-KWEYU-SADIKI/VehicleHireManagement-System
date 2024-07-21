//import { timestamp } from "drizzle-orm/mysql-core";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { PgTable,timestamp,serial,text } from "drizzle-orm/pg-core";
import { timeStamp } from "console";
import { integer } from "drizzle-orm/pg-core";
import { relations,One,Many } from "drizzle-orm";

export const TableVehicle=pgTable("vehicle",{
    vehicleSpecs_id:serial("id").primaryKey(),
    img_url:text("img_url"),
    vehicle_id:integer("vehicleSpec_id").references(()=>TableSpecifications.vehicle_id,{onDelete:"cascade"}),
    avalilability:text("avalilability"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const TableSpecifications=pgTable("specifications",{
    vehicle_id:serial("vehicle_id").primaryKey(),
    manufacture:text("manufacturer"),
    model:text("model"),
    year:integer("year"),
    fuel_type:text("fuel_type"),
    engine_capacity:text("engine_capacity"),
    transmission:text("transmission"),
    color:text("color"),
    seating_capacity:integer("seating _capacity"),
    features:text("features")
})
export const TableBooking=pgTable("booking",{
    booking_id:serial("booking _id").primaryKey(),
    user_id:integer("user_id").references(()=>TableUser.user_id,{onDelete:"cascade"}),
    vehicle_id:integer("vehicle_id").references(()=>TableSpecifications.vehicle_id,{onDelete:"cascade"}),
    location_id:integer("location_id").references(()=>TableLocationBranches.location_id,{onDelete:"cascade"}),
    booking_date:text("booking_date"),
    return_date:text("return_date"),
    total_amount:text("total_amount"),
    booking_status:text("booking_status").default("pending"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const TablePayment=pgTable("payment",{
    payment_id:serial("payment_id").primaryKey(),
    amount:text("amount"),
    payment_status:text("payment_status").default("pending"),
    payment_date:text("payment_date"),
    payment_method:text("method"),
    transaction_id:text("transaction_id"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("udated_at").defaultNow()
})
export const roleEnum=pgEnum("role",["admin","user","user && admin"])
export const TableUser=pgTable("users",{
    user_id:serial("id").primaryKey(),
    full_name:text("full_name").notNull(),
    email:text("email").unique(),
    adress:text("adress").notNull(),
    contact_phone:text("contact_phone").notNull(),
    role:roleEnum("role").default("user").notNull(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const TableAuthendication=pgTable("Authendication",{
    auth_id:serial("auth_id").primaryKey(),
    user_id:integer("user_id").unique().references(()=>TableUser.user_id,{onDelete:"cascade"}),
    password:text("password").notNull(),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow(),
    
})
export const AuthonUser=relations(TableAuthendication,({one})=>({
    user:one(TableUser,{
        fields:[TableAuthendication.user_id],
        references:[TableUser.user_id]
    })
}))
export const TableCustomerSupport=pgTable("customerSupport",{
    ticket_id:serial("ticket_id").primaryKey(),
    user_id:integer("user_id").references(()=>TableUser.user_id,{onDelete:"cascade"}),
    subject:text("subject"),
    description:text("description"),
    status:text("status"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const TableLocationBranches=pgTable("location",{
    location_id:serial("location_id").primaryKey(),
    name:text("name"),
    address:text("address"),
    contact_phone:text("contact_phone"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()

})
export const TableManagement=pgTable("management",{
    fleet_id:serial("fleet_id").primaryKey(),
    vehicle_id:integer("vehicle_id").references(()=>TableSpecifications.vehicle_id,{onDelete:"cascade"}),
    acquisition_date:text("date"),
    depreciation_rate:text("depreciation_rate"),
    current_value:text("current_value"),
    maintainance_cost:text("maintainance_cost"),
    status:text("status"),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").defaultNow()
})
export const specsVehicleRelations = relations(TableSpecifications,({one,many})=>({
    specs:many(TableVehicle),
}));


export const vehicleSpecRelations = relations(TableVehicle, ({ one }) => ({
    vehicle: one(TableSpecifications, {
        fields: [TableVehicle.vehicle_id],
        references: [TableSpecifications.vehicle_id]
    })
}));
export const bookingUserRelations = relations(TableUser,({one,many})=>({
    bookings:many(TableBooking),
}));


export const userBokingRelations = relations(TableBooking, ({ one }) => ({
    book: one(TableUser, {
        fields: [TableBooking.user_id],
        references: [TableUser.user_id]
    })
}));    
export const bookingVehicleRelations = relations(TableSpecifications,({one,many})=>({
    bookVehicle:many(TableBooking),
}));


export const vehicleBookingRelations = relations(TableBooking, ({ one }) => ({
    vehicle: one(TableSpecifications, {
        fields: [TableBooking.vehicle_id],
        references: [TableSpecifications.vehicle_id]
    })
}));
export const locationVehicleRelations = relations(TableLocationBranches,({one,many})=>({
    location:many(TableBooking),
}));


export const vehicleLocationRelations = relations(TableBooking, ({ one }) => ({
    loc: one(TableLocationBranches, {
        fields: [TableBooking.booking_id],
        references: [TableLocationBranches.location_id]
    })
}));


export const customerUseRelations = relations(TableUser,({one,many})=>({
    customer:many(TableCustomerSupport),
}));


export const userCustomerRelations = relations(TableCustomerSupport, ({ one }) => ({
    customerUser: one(TableUser, {
        fields: [TableCustomerSupport.user_id],
        references: [TableUser.user_id]
    })
}));
export const managmentRelations = relations(TableSpecifications,({one,many})=>({
    manage:many(TableManagement),
}));


export const vehicleManagementRelations = relations(TableManagement, ({ one }) => ({
    management: one(TableSpecifications, {
        fields: [TableManagement.vehicle_id],
        references: [TableSpecifications.vehicle_id]
    })
}));
export type TIuser =typeof TableUser.$inferInsert;
export type TSuser= typeof TableUser.$inferSelect;
export type TIvehicle= typeof TableVehicle.$inferInsert;
export type TSvehilcle=typeof TableVehicle.$inferSelect;
export type TIspecs=typeof TableSpecifications.$inferInsert;
export type TSspecs=typeof TableSpecifications.$inferSelect;
export type TIbook=typeof TableBooking.$inferInsert;
export type TSbook=typeof TableBooking.$inferSelect;
export type TIpayment=typeof TablePayment.$inferInsert;
export type TSpayment=typeof TablePayment.$inferSelect;
export type TIAuth=typeof TableAuthendication.$inferInsert;
export type TSAuth=typeof TableAuthendication.$inferSelect;
export type TIcustomer=typeof TableCustomerSupport.$inferInsert;
export type TScustomer=typeof TableCustomerSupport.$inferSelect;
export type TIlocation=typeof TableLocationBranches.$inferInsert;
export type TSlocation=typeof TableLocationBranches.$inferSelect;
export type TImanage=typeof TableManagement.$inferInsert;
export type TSmanage=typeof TableManagement.$inferSelect;