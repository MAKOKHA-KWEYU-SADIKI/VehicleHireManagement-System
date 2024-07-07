import {number, z} from "zod"
export const userSchema=z.object({
    full_name:z.string(),
    email:z.string(),
    contact_phone:z.string()
})
export const vehicleSchema=z.object({
    vehicle_id:z.number(),
    avalilability:z.string()
})
export const specsSchema=z.object({
    manufacture:z.string(),
    model:z.string(),
    year:z.string(),
    fuel_type:z.string(),
    engine_capacity:z.string(),
    transmission:z.string(),
    color:z.string(),
    seating_capacity:z.number(),
    features:z.string()
})
export const manageSchema=z.object({
    vehicle_id: z.number(),
    acquisition_date: z.string(),
    depreciation_rate: z.string(),
    current_value: z.string(),
    maintainance_cost: z.string(),
    status: z.string()

})
export const locateSchema=z.object({
    name:z.string(),
    address:z.string(),
    contact_phone:z.string(),


})
export const customerSchema=z.object({
    user_id:z.number(),
    subject:z.string(),
    description:z.string(),
    status:z.string()
})
export const bookSchema=z.object({
    user_id:z.number(),
    vehicle_id:z.number(),
    location_id:z.number(),
    booking_date:z.string(),
    return_date:z.string(),
    total_amount:z.string(),
    booking_status:z.string(),
})

export const paymentSchema=z.object({
    amount:z.string(),
    payment_status:z.string(),
    payment_date:z.string(),
    payment_method:z.string(),
    transaction_id:z.string()
})
export const loginSchema=z.object({
    email:z.string(),
    password:z.string()
})
export const registerSchema=z.object({
    user_id:z.number(),
    email:z.string(),
    password:z.string(),
    role:z.string()
})