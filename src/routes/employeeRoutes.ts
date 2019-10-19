import { Router, Request } from 'express';
import EmployeeController from '../controllers/employeeController';
import ConnectionFactory from '../utils/connectionFactory';
import multer from 'multer';
import path from 'path';

const employeeRouter = Router();
const connectionFactory = new ConnectionFactory();
const employeeController = new EmployeeController(connectionFactory);
const uploadDir = path.join(__dirname, '../../public/images');
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req: Request, file, cb) => {
        let emp = req.body;
      cb(null, `${emp.Name}-${file.fieldname}-${Date.now()}.jpg`);
    }
  })
const upload = multer({ storage: storage });

// Reason to use arrow function: https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
employeeRouter.get('/', (...args) => employeeController.getEmployees(...args));
employeeRouter.get('/add', (...args) => employeeController.getEmployeeView(...args));
employeeRouter.post('/add', upload.single('profilepic'), (...args) => employeeController.addEmployee(...args));

employeeRouter.get('/edit/:id', (...args) => employeeController.getEditEmployeeView(...args));
employeeRouter.post('/edit/:id', (...args) => employeeController.editEmployee(...args));

export default employeeRouter;