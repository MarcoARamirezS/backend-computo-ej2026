import { Router } from 'express'
import healthRoutes from '../modules/health/health.routes.js'
import authRoutes from '../modules/auth/auth.routes.js'
import usersRoutes from '../modules/users/users.routes.js'
import rolesRoutes from '../modules/roles/roles.routes.js'
import permissionsRoutes from '../modules/permissions/permissions.routes.js'
import clientsRoutes from '../modules/clients/clients.routes.js'
import suppliersRoutes from '../modules/suppliers/suppliers.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/roles', rolesRoutes)
router.use('/permissions', permissionsRoutes)
router.use('/clients', clientsRoutes)
router.use('/suppliers', suppliersRoutes)

export default router