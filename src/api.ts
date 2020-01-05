import { ClientError, InternalError } from "./errors";

var mysql = require('mysql');

let db: any;

export async function executeConnect(host: string, user: string, password: string, database: string) {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });

    connection.connect(function (err: any) {
        if (err)
            throw 'error connecting ';
        console.log('DB connected  ');
    });
    db = connection;
}


export async function executeCreate(sql: any) {
    try {
        await sqlExcecute(sql);
    } catch (e) {
        if (e.sqlMessage.includes('Duplicate entry'))
            throw new ClientError(101, 'error: the data already exist in the db');
        throw new InternalError('error: ' + e.sqlMessage)
    }
}
export async function executeRead(sql: any) {
    let result: any;
    try {
        result = await sqlExcecute(sql);
    } catch (e) {
        console.log('error happend with read')
    }
    return prapareResult(result);
}
export async function executeUpdate(sql: any) {
    try {
        await sqlExcecute(sql)
    } catch (e) {
        console.log('error happend with update')
    }
}
export async function executeDelete(sql: any) {
    try {
        await sqlExcecute(sql)
    } catch (e) {
        console.log('error happend with delete')
    }
}


function prapareResult(data: any) {
    let newData: any[] = [];
    data.forEach((e: any, i: any) => {
        newData.push(JSON.parse(JSON.stringify(e)))
    });
    return newData;
}
async function sqlExcecute(sql: string) {
    let r: any;
    await new Promise((resolve, reject) => {
        db.query(sql, (err: any, result: any) => {
            if (err) reject(err);
            else {
                // console.log(result);
                r = result;
                resolve()
            }
        })
    });
    return r;
}


