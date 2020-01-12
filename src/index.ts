

import sqlFacade from "./facade";

export async function test() {
    try {
        await sqlFacade.sqlSetup('localhost', 'root', '123456789', 'x');
    } catch (e) {
        console.log(44);
    }
    // let r;
    // r = await sqlFacade.sqlRead('Users')
    // console.log(r);
    // await sqlFacade.sqlCreate('Users', { userID: '5', password: '5' });
    // r = await sqlFacade.sqlRead('Users', { userID: '5' })
    // console.log(r);
    // await sqlFacade.sqlUpdate('Users', { fName: 'abdullah', lName: 'munawer', gender: 1 }, { userID: '5' });
    // r = await sqlFacade.sqlRead('Users')
    // console.log(r);
    // await sqlFacade.sqlDelete('Users', { userID: '5' });
    // r = await sqlFacade.sqlRead('Users')
    // console.log(r);
}

test()