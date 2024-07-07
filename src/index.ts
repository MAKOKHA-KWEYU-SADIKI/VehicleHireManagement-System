import{serve} from '@hono/node-server'
import { Hono } from 'hono'

import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'

const app=new Hono()

const customTimeoutException = () =>
    new HTTPException(408, {
      message: `Request timeout after waiting for more than 10 seconds`,
})
app.use(logger()) 
app.use(csrf()) 
app.use(trimTrailingSlash()) 
const { printMetrics, registerMetrics } = prometheus()
app.use('/timing', timeout(10000, customTimeoutException))
app.use('*', registerMetrics)
//my routing
import { userRouter } from './user/user.router'
import { vehicleRouter } from './vehicle/vehicle.router'
import { specsRouter } from './specification/specs.router'
import { manageRouter } from './management/manager.router'
import { locateRouter } from './location/location.router'
import { customerRouter } from './customer/customer.router'
import { bookRouter } from './booking/booking.router'
import { authRouter } from './Auth/auth.router'
import { paymentRouter } from './payment/payment.router'


app.route('/',userRouter)
app.route('/',vehicleRouter)
app.route('/',specsRouter)
app.route('/',manageRouter)
app.route('/',locateRouter)
app.route('/',customerRouter)
app.route('/',bookRouter)
app.route('/',authRouter)
app.route('/',paymentRouter)

const port=3000
serve({
    fetch:app.fetch,
    port:Number(process.env.PORT || 3000)
})
console.log('The application is runing on port 3000')