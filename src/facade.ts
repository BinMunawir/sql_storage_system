import { executeConnect, executeCreate, executeUpdate, executeDelete, executeRead } from './api';
import { generateCreateStm, generateReadStm, generateUpdateStm, generateDeleteStm } from './generators';

export async function sqlSetup(host: string, user: string, password: string, database: string, tables: string) {
    await executeConnect(host, user, password, database, tables);
}

export async function sqlCreate(table: string, data: any): Promise<void> {
    let sql = generateCreateStm(table, data);
    await executeCreate(sql)
}

export async function sqlRead(table: string, query: any = null, requestedData: any = []): Promise<any> {
    let sql = generateReadStm(table, query, requestedData);
    let result = await executeRead(sql)
    return result;
}

export async function sqlUpdate(table: string, query: any, data: any): Promise<void> {
    let sql = generateUpdateStm(table, data, query);
    await executeUpdate(sql)
}

export async function sqlDelete(table: string, query: any): Promise<void> {
    let sql = generateDeleteStm(table, query);
    await executeDelete(sql)
}

export async function sqlCustom(sql: string): Promise<any> {
    let result = await executeRead(sql)
    return result;
}
