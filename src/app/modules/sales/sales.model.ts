import { Schema, model } from "mongoose";

import { TSales } from "./sales.interface";
import { Smartphone } from "../smartphone/smartphone.model";
import AppError from "../../error/AppError";

export const salesSchema = new Schema<TSales>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Smartphone",
      required: [true, "Smartphone is Required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
    },
    buyerName: {
      type: String,
      required: [true, "NameOfBuyer is Required"],
    },
    
  },
  { timestamps: true }
);


export const Sales = model<TSales>("Sales", salesSchema);
