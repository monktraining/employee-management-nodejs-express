import { Router } from 'express';
import EmployeeController  from '../controllers/employeeController';
import ConnectionFactory from '../utils/connectionFactory';

const employeeRouter = Router();
const connectionFactory = new ConnectionFactory();
const employeeController = new EmployeeController(connectionFactory);

// Reason to use arrow function: https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
employeeRouter.get('/', (...args) => employeeController.getEmployees(...args));
employeeRouter.get('/add', (...args) => employeeController.getEmployeeView(...args));
employeeRouter.post('/add', (...args) => employeeController.addEmployee(...args));

employeeRouter.get('/edit/:id', (...args) => employeeController.getEditEmployeeView(...args));
employeeRouter.post('/edit/:id', (...args) => employeeController.editEmployee(...args));

export default employeeRouter;