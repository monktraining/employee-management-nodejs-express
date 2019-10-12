import { Request, Response} from 'express';
import {ConnectionPool, config, PreparedStatement, Int, VarChar} from 'mssql/msnodesqlv8';

export default class EmployeeController {
    private readonly connectionPool: ConnectionPool; 
    constructor(){
        
    }
    public async getEmployees(req: Request, res: Response) {
        try {     
            const connectionPool = new ConnectionPool({
                database: "Employees",
                server: 'CHINTANASUSTUF',
                driver: 'msnodesqlv8',
                options: {
                    trustedConnection: true
                }                
            });       
            const connection = await connectionPool.connect();
            const employees = await connection.query('SELECT * FROM Employees');
            connection.close();
            res.render('employees/employees', {employees: employees.recordset});
        }
        catch(ex){
            console.error(ex);
        }
    }

    public getEmployeeView(req: Request, res: Response) {
        res.render('employees/addEmployee');
    }

    public async addEmployee(req: Request, res: Response) {        
        const emp = req.body;        
        const connectionPool = new ConnectionPool({
            database: "Employees",
            server: 'CHINTANASUSTUF',
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            }                
        }); 
        const connection = await connectionPool.connect();
        const request = connection.request();
        request.input('name',VarChar(50),emp.Name);
        const result = await request.query('Insert INTO Employees (Name) VALUES (@name)');        
        connection.close();
        res.redirect('/employees');        
    }
    public getEditEmployeeView(req: Request, res: Response) {
        res.render('employees/editEmployee');
    }
    public async editEmployee(req: Request, res: Response) {        
        let emp = req.body;    
        const connectionPool = new ConnectionPool({
            database: "Employees",
            server: 'CHINTANASUSTUF',
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true
            }                
        });
        const connection = await connectionPool.connect();
        const request = connection.request();
        request.input('name', VarChar(50),emp.Name);
        request.input('id', Int, emp.Id);
        await request.query('UPDATE Employees SET Name = @name WHERE ID = @id');
        connection.close();
        res.redirect('/employees');        
    }
}