import {migrate} from 'drizzle-orm/neon-http/migrator';
import {db} from './db';

async function migration(){
    try{
        console.log('__________Migration started__________');
        await migrate(db,{
            migrationsFolder: __dirname + '/migrations',
        });
        console.log("_________Migration completed_________");
        process.exit(0);
    } catch(error){
        console.log("Migration unsuccessful", error);
       
    }
}

migration().catch((e) => {
    console.error("Unexpected error", e);
   
})