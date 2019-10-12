import { Router } from 'express';
import HomeController from '../controllers/homeController';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get('/',homeController.home);

export default homeRouter;
