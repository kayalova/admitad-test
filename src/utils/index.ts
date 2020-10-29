import * as crypto from "crypto"

export const hashStr = (value: string): string =>
    crypto.createHash("md5").update(value).digest("hex")
