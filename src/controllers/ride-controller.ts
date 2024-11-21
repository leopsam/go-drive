import { Request, Response } from "express";
import rideServices from "../services/ride-services";

export async function calculateRouteAndListDrivers(req: Request, res: Response): Promise<void> {
  try {
    const allUsers = await rideServices.getAllUser();;
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
}

