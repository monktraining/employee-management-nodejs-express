import { Router } from 'express';
import EmployeeController  from '../controllers/employeeController';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.get('/',employeeController.getEmployees);
employeeRouter.get('/add', employeeController.getEmployeeView);
employeeRouter.post('/add', employeeController.addEmployee);

employeeRouter.get('/edit', employeeController.getEditEmployeeView);
employeeRouter.post('/edit/:id', employeeController.editEmployee);

export default employeeRouter;