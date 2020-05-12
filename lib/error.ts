export class HttpResponseError extends Error {
    constructor(readonly status: number,readonly message: string) {
        super(`Status: ${status}, Message: ${message}`);
    }
}