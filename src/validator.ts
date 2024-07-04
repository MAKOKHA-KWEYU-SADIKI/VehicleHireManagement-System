import {z} from "zod"
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

})
export const customerSchema=z.object({
    
})