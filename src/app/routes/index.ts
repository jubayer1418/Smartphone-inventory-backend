import { Router } from "express";
import { UserRouter } from "../modules/user/user.router";
import { salesRouter } from "../modules/sales/sales.router";
import { smartphoneRouter } from "../modules/smartphone/smartphone.router";
export const router = Router();
const allRouters = [
  { path: "/users", route: UserRouter },
  { path: "/smartphone", route: smartphoneRouter },
  { path: "/sales", route: salesRouter },
];
allRouters.forEach((route) => router.use(route.path, route.route));
