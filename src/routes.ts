import { Router } from 'express'
import userRoutes from './controllers/userControllers'
import contentRoutes from './controllers/contentControllers'
import admRoutes from './controllers/admControllers'

const routers = Router() 

routers.use('/users', userRoutes)  
routers.use('/admins', admRoutes)
routers.use('/contents', contentRoutes)

export default routers