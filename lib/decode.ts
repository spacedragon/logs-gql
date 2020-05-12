import zlib from 'zlib';


export async function decode(str: string) {
    const buff = Buffer.from(str, "base64");
    return new Promise<string>((resolve, reject) => {
        zlib.unzip(buff, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data.toString("utf8"))
            }
        })
    })
}