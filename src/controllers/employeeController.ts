import {Request, Response} from 'express';

export default class EmployeeController {

    public getEmployees(req: Request, res: Response) {
        res.render('employee/employees');
    }    

    public getAddEmployeeView(req: Request, res: Response) {
        res.render('employee/addEmployee');
    }

    public addEmployee(req: Request, res: Response) {
        let emp = req.body;
        // Some to save
        res.redirect('/employees');
    }
}