import { sqlConnect, sqlCreat, sqlRead, sqlUpdate, sqlDelete } from "../api";


export async function test() {
    sqlConnect('localhost','root','123456789', 'x')
    let c = "INSERT INTO Users (userID, password, gender) VALUES ('2', '2',0);"
    let r = "SELECT * FROM Users";
    let u = "UPDATE Users SET fName='hi' WHERE userID='2' && gender=0;"
    let d = "DELETE FROM Users WHERE userID='2';"
    try {
        // await sqlCreat(c)
        // await sqlUpdate(u)
        // await sqlDelete(d)
        let result = await sqlRead(r);
        console.log(result);
    } catch (e) {
        console.log(e.msg)
    }
    // console.log(r);
}