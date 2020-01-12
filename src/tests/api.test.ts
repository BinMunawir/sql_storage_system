import { executeConnect, executeCreate, executeRead, executeUpdate, executeDelete } from "../api";


export async function test() {
    executeConnect('localhost','root','123456789', 'x', '')
    let c = "INSERT INTO Users (userID, password, gender) VALUES ('2', '2',0);"
    let r = "SELECT * FROM Users";
    let u = "UPDATE Users SET fName='hi' WHERE userID='2' && gender=0;"
    let d = "DELETE FROM Users WHERE userID='2';"
    try {
        // await executeCreate(c)
        // await executeUpdate(u)
        // await executeDelete(d)
        let result = await executeRead(r);
        console.log(result);
    } catch (e) {
        console.log(e.msg)
    }
    // console.log(r);
}