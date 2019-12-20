declare var hash: Hash;

declare module "hash.js" {
    export = hash;
}

interface BlockHash<T> {
    hmacStrength: number
    padLength: number
    endian: 'big' | 'little'
}

interface MessageDigest<T> {
    blockSize: number
    outSize: number
    update(msg: any, enc?: 'hex'): T
    digest(): number[]
    digest(enc: 'hex'): string
}

interface Hash {
    hmac: HmacConstructor
    ripemd: RipemdSet
    ripemd160: Ripemd160Constructor
    sm3: Sm3Constructor
    utils: Utils
}

interface Utils {
    toArray(msg: any, enc: 'hex'): Array<number>
    toHex(msg: any): string
}

interface HmacConstructor { (hash: BlockHash<any>, key: any, enc?: 'hex'): Hmac }
interface Sm3Constructor { (): Sm3; }

interface Hmac extends MessageDigest<Hmac> {
    blockSize: 512
    outSize: 160
}

interface Sm3 extends BlockHash<Sm3>, MessageDigest<Sm3> {
    blockSize: 512
    hmacStrength: 192
    outSize: 256
    padLength: 64
    endian: 'big'
}
