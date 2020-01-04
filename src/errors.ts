class ClientError {
    code: number;
    msg: string;
    constructor(code: number, msg: string) {
        this.code = code;
        this.msg = msg;
    }
}

class InternalError extends Error {
    msg: string;
    constructor(msg: string) {
        super(msg)
        this.msg = msg;
    }
}