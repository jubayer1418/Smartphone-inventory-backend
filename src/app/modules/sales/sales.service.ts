import AppError from "../../error/AppError";
import { Smartphone } from "../smartphone/smartphone.model";
import { TSales } from "./sales.interface";
import { Sales } from "./sales.model";
import http from "http-status-codes";
export const createSalesToDb = async (payload: TSales) => {
  const result = await Smartphone.findOneAndUpdate(
    { _id: payload.productId, quantity: { $gte: payload.quantity } },
    {
      $inc: { quantity: -payload.quantity },
    },
    { new: true }
  );

  if (result) {
    if (result.quantity === 0) {
      await Smartphone.deleteOne({ _id: payload.productId });
    }
    const salesResult = await Sales.create(payload);
    return salesResult;
  } else {
    throw new AppError(
      http.BAD_REQUEST,
      "Insufficient quantity or smartphone not found"
    );
  }
};
export const getSalesToDb = async (query: Record<string, unknown>) => {
  const { filterBy } = query;

  let dateFilter: Record<string, unknown> = {};

  if (filterBy) {
    const currentDate = new Date();

    switch (filterBy) {
      case "daily":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 1
            ),
          },
        };
        break;
      case "weekly":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - currentDate.getDay()
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + (6 - currentDate.getDay()) + 1
            ),
          },
        };
        break;
      case "monthly":
        dateFilter = {
          createdAt: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            ),
          },
        };
        break;
      case "yearly":
        dateFilter = {
          createdAt: {
            $gte: new Date(currentDate.getFullYear(), 0, 1),
            $lt: new Date(currentDate.getFullYear() + 1, 0, 1),
          },
        };
        break;
      default:
        // Handle invalid filterBy values or no filterBy parameter
        break;
    }
  }
  const result = await Sales.find(dateFilter)
  .populate("productId");
  return result;
};
