import { Router } from "express";
import userRouter from './users/index.mjs'
import productsRouter from './products/index.mjs'


const router = Router()


router.use(userRouter)
router.use(productsRouter)

export default router;