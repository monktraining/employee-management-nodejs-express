import { ConnectionPool } from 'mssql/msnodesqlv8';
import mssqlConfig from './config';

export default class ConnectionFactory {
    private readonly connectionPool: ConnectionPool;
    constructor() {
        this.connectionPool = new ConnectionPool(mssqlConfig);
    }

    public async getConnection(): Promise<ConnectionPool> {
        if (this.connectionPool.connected) {
            return this.connectionPool;
        }
        return await this.connectionPool.connect();
    }
}