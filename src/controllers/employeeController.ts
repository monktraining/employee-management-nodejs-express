import { Request, Response } from 'express';
import { ConnectionPool, Int, VarChar, PreparedStatement } from 'mssql/msnodesqlv8';
import ConnectionFactory from '../utils/connectionFactory';
import debug from 'debug';

export default class EmployeeController {
    private readonly d: debug.Debugger;
    constructor(private readonly connectionFactory: ConnectionFactory) {
        this.d = debug("app:employee:controller");
    }
    public async getEmployees(req: Request, res: Response, next: Function) {
        try {
            const connection: ConnectionPool = await this.connectionFactory.getConnection();
            const employees = await connection.query('SELECT * FROM Employees');
            await connection.close();
            res.render('employee/employees', { employees: employees.recordset });
        } catch (ex) {
            this.d(ex);
        }
    }

    public getEmployeeView(req: Request, res: Response, next: Function) {
        res.render('employee/addEmployee');
    }

    public async addEmployee(req: Request, res: Response, next: Function) {
        const emp = req.body;
        const connection = await this.connectionFactory.getConnection();
        const request = connection.request();
        request.input('name', VarChar(50), emp.Name);
        request.input('profilepic', VarChar(200), req.file.filename);
        await request.query('Insert INTO Employees (Name, ProfilePic) VALUES (@name, @profilepic)');
        await connection.close();
        res.redirect('/employees');
    }
    public async getEditEmployeeView(req: Request, res: Response, next: Function) {
        try {
            const connection = await this.connectionFactory.getConnection();
            const ps = new PreparedStatement(connection);
            ps.input('id', Int);
            await ps.prepare('SELECT * FROM Employees WHERE Id = @id');
            const empId = req.params.id;
            const result = await ps.execute({ id: empId });
            await ps.unprepare();
            await connection.close();
            res.render('employee/editEmployee', { emp: result.recordset[0] });
        } catch (err) {
            this.d(err);
        }

    }
    public async editEmployee(req: Request, res: Response, next: Function) {
        let emp = req.body;
        const connection = await this.connectionFactory.getConnection();
        const request = connection.request();
        request.input('name', VarChar(50), emp.Name);
        request.input('id', Int, req.params.id);
        await request.query('UPDATE Employees SET Name = @name WHERE ID = @id');
        await connection.close();
        res.redirect('/employees');
    }
}