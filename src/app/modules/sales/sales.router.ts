import { Router } from "express";
import { auth } from "../../middleware/auth";
import { createSales, getSales } from "./sales.controller";
import validateRequest from "../../middleware/validateRequest";
import { SalesZodValidations } from "./sales.validation";
const router = Router()
router.post("/create-sales", validateRequest(SalesZodValidations.createSalesValidationSchema),auth, createSales)
router.get("/get-all-sales",auth, getSales)
export const salesRouter = router