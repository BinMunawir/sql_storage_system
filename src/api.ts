import { ClientError, InternalError } from "./errors";

var mysql = require('mysql');

let db: any;
let dbhost: string;
let dbuser: string;
let dbpassword: string;
let dbdatabase: string;

export async function executeConnect(host: string = dbhost, user: string = dbuser,
    password: string = dbpassword, database: string = dbdatabase, tables: string = '') {

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
                resolve();
            }
        });
    });

    connection.on('error', function (err: any) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            executeConnect();
        } else {
            throw err;

        }
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
    await sqlExcecute(sql);
}
export async function executeRead(sql: any) {
    let result: any;
    result = await sqlExcecute(sql);
    return prapareResult(result);
}
export async function executeUpdate(sql: any) {
    await sqlExcecute(sql)
}
export async function executeDelete(sql: any) {
    await sqlExcecute(sql)
}
export async function executeCustom(sql: string) {
    let result: any;
    result = await sqlExcecute(sql);
    return prapareResult(result);
}

function prapareResult(data: any) {
    let newData: any[] = [];
    data.forEach((e: any, i: any) => {
        newData.push(JSON.parse(JSON.stringify(e)))
    });
    return newData;
}
async function sqlExcecute(sql: string) {

    console.log(sql);
    let r: any;
    await new Promise((resolve, reject) => {
        db.query(sql, (err: any, result: any) => {
            if (err) reject(err);
            else {
                r = result;
                resolve()
            }
        })
    });
    return r;
}


