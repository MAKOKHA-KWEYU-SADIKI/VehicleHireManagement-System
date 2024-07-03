import{serve} from '@hono/node-server'
import { Hono } from 'hono'

const app=new Hono()
const port=3000
serve({
    fetch:app.fetch,
    port:Number(process.env.PORT || 3000)
})
console.log('The application is runing on port 3000')


