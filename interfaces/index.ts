export interface ISwap {
    pool: string,
    buyer: string,
    amount0In: number,
    amount1In: number,
    to: string,
    price: number,
    block: number
}