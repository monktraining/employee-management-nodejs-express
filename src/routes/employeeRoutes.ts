import { Router } from 'express';
import EmployeeController  from '../controllers/employeeController';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.get('/',employeeController.getEmployees);
employeeRouter.get('/add', employeeController.getAddEmployeeView);
employeeRouter.post('/add', employeeController.addEmployee);

export default employeeRouter;