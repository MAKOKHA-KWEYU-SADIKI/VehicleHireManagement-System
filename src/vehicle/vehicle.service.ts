import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIvehicle,TSvehilcle,TableVehicle}from "../drizzle/schema"
export const vehicleService = async (limit?: number): Promise<TSvehilcle[] | null> => {
    if (limit) {
        return await db.query.TableVehicle.findMany({
            limit: limit
        });
    }
    return await db.query.TableVehicle.findMany();
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

// export const updatevehicleService = async (id: number, user: TIvehicle)=> {
//     await db.update(TableVehicle).set(user).where(eq(TableVehicle.vehicleSpecs_id, id))
//     return "vehicle updated successfully";
// }

// export const deletevehicleService = async (id: number) => {
//     await db.delete(TableVehicle).where(eq(TableVehicle.vehicleSpecs_id, id))
//     return "vehicle removed successfully";
// }
export const updatevehicleService = async (id: number, vehicle: TIvehicle)=> {
    await db.update(TableVehicle).set(vehicle).where(eq(TableVehicle.vehicleSpecs_id, id))
    return "vehicle updated successfully";
}

export const deletevehicleService = async (id: number) => {
    await db.delete(TableVehicle).where(eq(TableVehicle.vehicleSpecs_id, id))
    return "vehicle deleted successfully";
}
