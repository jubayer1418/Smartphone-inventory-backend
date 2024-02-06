import { Router } from "express";
import { auth } from "../../middleware/auth";
import { createSmartphone, deleteManyProduct, deleteSmartphone, getSingleProduct, getSmartphone, patchSmartphone } from "./smartphone.controller";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./smartphone.validation";
const router = Router()
router.post("/add-product",validateRequest(ProductValidation.createEyeglassesSchema), auth, createSmartphone)
router.get("/get-all-products", auth, getSmartphone)
router.get("/get-single-product/:id", auth, getSingleProduct)
router.delete("/delete-product/:id", auth, deleteSmartphone)
router.delete("/delete-products", auth, deleteManyProduct)
router.put("/update-product/:id", auth, patchSmartphone)
export const smartphoneRouter = router