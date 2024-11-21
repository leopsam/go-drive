import { Router } from "express";
import { calculateRouteAndListDrivers } from "../controllers/ride-controller";

const rideRoutes = Router();

rideRoutes
  .post("/estimate", calculateRouteAndListDrivers)
  .patch("/confirm", calculateRouteAndListDrivers)
  .get("/:id?/:driver_id", calculateRouteAndListDrivers)
  .get("/teste", calculateRouteAndListDrivers) //retirar depois

export { rideRoutes };