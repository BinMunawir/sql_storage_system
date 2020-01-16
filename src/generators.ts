export function generateCreateStm(table: string, data: any) {
    let keys: any[] = [];
    let values: any[] = [];
    Object.keys(data).forEach((key) => {
        keys.push(key);
        if (typeof data[key] == 'string')
            data[key] = "'" + data[key] + "'";
        values.push(data[key]);
    })

    return "INSERT INTO " + table + " (" + sparateByComma(keys) + ") VALUES (" + sparateByComma(values) + ");"
}

export function generateReadStm(table: string, query: any) {

    let filters: any = {};
    let keys: any[] = [];
    let values: any[] = [];
    if (query != null)
        Object.keys(query).forEach((key) => {
            if (key == 'limit' || key == 'page' || key == 'sort' || key == 'order') {
                filters[key] = query[key];
                return;
            }
            keys.push(key);
            if (typeof query[key] == 'string')
                query[key] = "'" + query[key] + "'";
            values.push(query[key]);
        })
    return "SELECT * FROM " + table + (keys.length > 0 ? " WHERE " : "") + sparateByAnd(combineByEqual(keys, values)) + " " + applyFilters(filters) + ";"
}

export function generateUpdateStm(table: string, data: any, query: any) {
    let keys: any[] = [];
    let values: any[] = [];
    Object.keys(data).forEach((key) => {
        keys.push(key);
        if (typeof data[key] == 'string')
            data[key] = "'" + data[key] + "'";
        values.push(data[key]);
    })
    let keys2: any[] = [];
    let values2: any[] = [];
    Object.keys(query).forEach((key) => {
        keys2.push(key);
        if (typeof query[key] == 'string')
            query[key] = "'" + query[key] + "'";
        values2.push(query[key]);
    })
    return "UPDATE " + table + " SET " + combineByEqual(keys, values) + " WHERE " + sparateByAnd(combineByEqual(keys2, values2)) + ";"
}

export function generateDeleteStm(table: string, query: any) {
    let keys: any[] = [];
    let values: any[] = [];
    Object.keys(query).forEach((key) => {
        keys.push(key);
        if (typeof query[key] == 'string')
            query[key] = "'" + query[key] + "'";
        values.push(query[key]);
    })
    return "DELETE FROM " + table + " WHERE " + sparateByAnd(combineByEqual(keys, values)); + ";"
}

function applyFilters(filters: any) {
    let filter = '';
    if (filters['sort']) {
        filter += ('ORDER BY ' + filters['sort'] + ' ' + (filters['order'] ? filters['order'] + ' ' : ''))
    }
    filters['limit'] = filters['limit'] ? filters['limit'] : 20;
    filter += ('LIMIT ' + filters['limit'])
    if (filters['page'])
        filter += (' OFFSET ' + (filters['page'] * filters['limit']))
    return filter;
}
function sparateByComma(array: any[]) {
    return array.toString();
}
function sparateByAnd(array: any[]) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        if (i != 0)
            result += ' && ';
        result += (array[i])
    }
    return result;
}
function combineByEqual(array1: any[], array2: any[]) {
    let result: any[] = [];
    for (let i = 0; i < array1.length; i++) {
        result.push((array1[i] + '=' + array2[i]))
    }
    return result;
}
