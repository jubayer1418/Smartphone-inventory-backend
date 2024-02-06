import { z } from "zod";

export const createEyeglassesSchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    releaseDate: z.string(),
    brand: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    storageCapacity: z.string(),
    screenSize:  z.string(),
    camera: z.string(),
    battery:z.string()
});

export const ProductValidation = {
  createEyeglassesSchema,
};