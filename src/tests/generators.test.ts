
import { generateCreateStm, generateDeleteStm, generateReadStm, generateUpdateStm } from "../generators";



export function test() {
    let r = generateCreateStm('Users', { name: 'abdullah', gender: 1, isUser: true });
    console.log(r);
}