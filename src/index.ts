

import sqlFacade from "./facade";

let tables = `
CREATE TABLE Users (
    userID		            VARCHAR(255)          NOT NULL,
    password	        	VARCHAR(255)	    NOT NULL,
    fName	        		VARCHAR(50)	    , 
    lName	        		VARCHAR(50)	    , 
    phone	VARCHAR(50),
    email   VARCHAR(100),
    birthDate	        		INT	    , 
    gender	        		INT	    , 
    nationality	        		VARCHAR(50)	    , 
    address	        		VARCHAR(200)	    , 
    avatar	        		VARCHAR(255)	    , 
    PRIMARY KEY (userID)
);
CREATE TABLE Notes (
    userID		            VARCHAR(255)          NOT NULL,
    noteID		            VARCHAR(255)          NOT NULL,
    title	        		VARCHAR(50)	    , 
    content	        		VARCHAR(255)	    , 
    date	        		INT	    , 
    PRIMARY KEY (userID, noteID),
    FOREIGN KEY (userID) REFERENCES Users (userID)
);
`;
export async function test() {
    await sqlFacade.sqlSetup('localhost', 'root', '123456789', 'x', tables);
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