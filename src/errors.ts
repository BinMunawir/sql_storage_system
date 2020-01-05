export class ClientError extends Error{
    code: number;
    msg: string;
    constructor(code: number, msg: string) {
        super(msg)
        this.code = code;
        this.msg = msg;
    }
}

export class InternalError extends Error {
    msg: string;
    constructor(msg: string) {
        super(msg)
        this.msg = msg;
    }
}