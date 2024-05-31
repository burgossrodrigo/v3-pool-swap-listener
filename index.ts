import { ethers } from "ethers"
import { V3Pool } from "./types/ethers-contracts/V3Pool"
import { V3Pool__factory } from "./types/ethers-contracts/factories/V3Pool__factory"
require('dotenv').config()

const wss = new ethers.WebSocketProvider(process.env.WSS_URL as string)
console.log(process.env.WSS_URL, 'WSS_URL')

const poolInstance: V3Pool = V3Pool__factory.connect(process.env.POOL_ADDRESS as string, wss)

const main = async () => {
    (poolInstance as any).on('Swap', (
        sender: string, 
        amount0In: string, 
        amount1In: string, 
        amount0Out: bigint, 
        amount1Out: bigint, 
        to: string
    ) => {
        console.log('Swap', sender, amount0In, amount1In, amount0Out, amount1Out, to)
    })
}

main().then(() => {
    console.log('Listening for Swap events')
})


