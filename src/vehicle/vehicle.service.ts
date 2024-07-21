import {db} from "../drizzle/db"
import {Column, eq} from "drizzle-orm"
import{TIvehicle,TSvehilcle,TableVehicle}from "../drizzle/schema"
export const vehicleService = async () => {
    return await db.query.TableVehicle.findMany({
        columns:{
            vehicle_id:true,
            vehicleSpecs_id:true,
            avalilability:true
        },
        with:{
            vehicle:{
                columns:{
                    manufacture:true,
                    model:true,
                    engine_capacity:true,
                    fuel_type:true,
                    seating_capacity:true,
                    year:true
                }
            }
        }
     
    })
}
  
 

export const getvehicleService = async (id: number) => {
    return await db.query.TableVehicle.findFirst({
        where: eq(TableVehicle.vehicle_id, id)
    })
}

export const createvehicleService = async (user: TIvehicle):Promise<string> => {
    await db.insert(TableVehicle).values(user)
    return "vehicle added successfully";
}

export const updatevehicleService = async (id: number, vehicle: TIvehicle)=> {
    await db.update(TableVehicle).set(vehicle).where(eq(TableVehicle.vehicleSpecs_id, id))
    return "vehicle updated successfully";
}

export const deletevehicleService = async (id: number) => {
    await db.delete(TableVehicle).where(eq(TableVehicle.vehicleSpecs_id, id))
    return "vehicle deleted successfully";
}
