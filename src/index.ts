
export * from "./facade";

// import { sqlSetup, sqlRead, sqlCreate, sqlUpdate, sqlDelete } from "./facade";
// async function test() {
//     await sqlSetup('localhost', 'root', '123456789', 'x', '');
//     let r;
//     r = await sqlRead('Users')
//     console.log(r);
    // await sqlCreate('Users', { userID: '5', password: '5' });
    // r = await sqlRead('Users', { userID: '5' })
    // console.log(r);
    // await sqlUpdate('Users', { fName: 'abdullah', gender: '1' }, { userID: '1' });
    // r = await sqlRead('Users')
    // console.log(r);
    // await sqlDelete('Users', { userID: '5' });
    // r = await sqlRead('Users')
    // console.log(r);
// }
// test()