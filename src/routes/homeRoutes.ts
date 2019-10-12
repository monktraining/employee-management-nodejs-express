import { Router } from 'express';
import HomeController from '../controllers/homeController';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.use('/',homeController.home);

export default homeRouter;
