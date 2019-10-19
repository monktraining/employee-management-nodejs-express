import {config} from 'mssql/msnodesqlv8';

const mssqlConfig: config = {
    database: "Employees",
    server: 'CHINTANASUSTUF',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }                
};

export default mssqlConfig;