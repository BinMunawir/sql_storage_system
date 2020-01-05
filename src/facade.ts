import { executeConnect, executeCreate, executeUpdate, executeDelete, executeRead } from './api';
import { generateCreateStm, generateReadStm, generateUpdateStm, generateDeleteStm } from './generators';

async function sqlSetup(host: string, user: string, password: string, database: string) {
    executeConnect(host, user, password, database);
}

async function sqlCreate(table: string, data: any): Promise<void> {
    let sql = generateCreateStm(table, data);
    await executeCreate(sql)
}

async function sqlRead(table: string, query: any = null): Promise<any> {
    let sql = generateReadStm(table, query);
    let result = await executeRead(sql)
    return result;
}

async function sqlUpdate(table: string, data: any, query: any): Promise<void> {
    let sql = generateUpdateStm(table, data, query);
    await executeUpdate(sql)
}

async function sqlDelete(table: string, query: any): Promise<void> {
    let sql = generateDeleteStm(table, query);
    await executeDelete(sql)
}

export default {
    sqlSetup,
    sqlCreate,
    sqlRead,
    sqlUpdate,
    sqlDelete,
}