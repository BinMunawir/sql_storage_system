import { ClientError, InternalError } from "./errors";

var mysql = require('mysql');

let db: any;
let dbhost: string;
let dbuser: string;
let dbpassword: string;
let dbdatabase: string;

export async function executeConnect(host: string, user: string, password: string, database: string, tables: string) {

    dbhost = host;
    dbuser = user;
    dbpassword = password;
    dbdatabase = database;

    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });
    await new Promise((resolve, reject) => {
        connection.connect(async function (err: any) {
            if (err) {
                if (err.message.includes('Unknown database')) {
                    await initDB(host, user, password, database, tables);
                    await executeConnect(host, user, password, database, tables);
                    resolve();
                }
                reject(new Error('DB connection failed ' + err.message))
            }
            else {
                console.log('DB connected');
                db = connection;
                // db.end()
                resolve();
            }
        });
    });


    async function initDB(host: string, user: string, password: string, database: string, tables: string) {
        var connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
        });
        await new Promise((resolve, reject) => {
            connection.connect(async function (err: any) {
                if (err)
                    reject(new Error('DB connection failed ' + err.message))
                else {
                    await createDatabase();
                    resolve()
                }
            });
        });

        async function createDatabase() {
            await new Promise((resolve, reject) => {
                let sql = 'CREATE DATABASE ' + database + ';';
                connection.query(sql, async function (error: any) {
                    if (error) reject(error)
                    else {
                        await new Promise((resolve, reject) => {
                            let sql = 'USE ' + database + ';';
                            connection.query(sql, function (error: any) {
                                if (error) reject(error)
                                else {
                                    resolve();
                                }
                            });
                        });
                        await createTables();
                        console.log('db created');
                        resolve();
                    }
                });
            });
        }

        async function createTables() {
            let t = tables.split(';');
            t.forEach(async e => {
                if (e == t[t.length - 1]) return;
                await new Promise((resolve, reject) => {
                    let sql = e;
                    connection.query(sql, function (error: any) {
                        if (error) reject(error)
                        else {
                            resolve();
                        }
                    });
                });
            })
        }

        connection.end();
    }
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
    result = await sqlExcecute(sql);
    try {
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
    await new Promise(async (resolve, reject) => {
        db = mysql.createConnection({
            host: dbhost,
            user: dbuser,
            password: dbpassword,
            database: dbdatabase,
        });
        db.connect((e: any) => {
            if (e) reject('db not connected ' + e.message);
            else resolve()
        })
    })

    let r: any;
    await new Promise((resolve, reject) => {
        db.query(sql, (err: any, result: any) => {
            if (err) reject(err);
            else {
                // console.log(result);
                r = result;
                db.end();
                resolve()
            }
        })
    });
    return r;
}


