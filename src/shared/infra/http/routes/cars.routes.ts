import { Router } from 'express'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarsController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarsController.handle)

export { carsRoutes } 