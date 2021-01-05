export function createBaseResponse (source: any, fail = false) {
    return {
        status: fail ? 400 : 200,
        serverTime: new Date().getTime(),
        result: source
    };
}
