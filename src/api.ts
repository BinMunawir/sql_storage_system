var mysql = require('mysql');

let db: any;

export function connect(host: string, user: string, password: string, database: string) {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
    });

    connection.connect(function (err: any) {
        if (err)
            throw 'error connecting: ' + err.stack;
        console.log('connected as id ' + connection.threadId);
    });
    db = connection;
}


export async function sqlCreat(sql: any) {
    try {
        await sqlExcecute(sql)
    } catch (e) {
        console.log('error happend with create')
    }
}
export async function sqlRead(sql: any) {
    let result: any;
    try {
        result = await sqlExcecute(sql);
    } catch (e) {
        console.log('error happend with read')
    }
    result;
}
export async function sqlUpdate(sql: any) {
    try {
        await sqlExcecute(sql)
    } catch (e) {
        console.log('error happend with update')
    }
}
export async function sqlDelete(sql: any) {
    try {
        await sqlExcecute(sql)
    } catch (e) {
        console.log('error happend with delete')
    }
}


function prapareResult(data: any[]) {
    let newData: any[] = [];
    data.forEach(e => {

    });
    return newData;
}
async function sqlExcecute(sql: string) {
    let r: any;
    await new Promise((resolve, reject) => {
        db.query(sql, (err: any, result: any) => {
            if (err) throw err;
            console.log(err);
            r = result;
            resolve();
        })
    });
    return r;
}


