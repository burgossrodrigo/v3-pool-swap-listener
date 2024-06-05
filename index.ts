import { ethers } from "ethers"
import { V3Pool } from "./types/ethers-contracts/V3Pool"
import { V3Pool__factory } from "./types/ethers-contracts/factories/V3Pool__factory"
import { wss } from "./constants"
import { convertDecimalsFrom, getDecimals } from "./ERC20Handler/ERC20Handler"
import { getToken0, getToken1, poolInstance, sqrtPriceToPrice } from "./PoolHandler/PoolHandler"
import { ISwap } from "./interfaces"
import mongoose from "mongoose"
import { inserSwap } from "./db"



const main = async () => {

    const connection = await mongoose.connect(process.env.MONGO_DB_URI as string);

    (poolInstance as any).on('Swap', async (
        sender: string,
        recipient: string,
        amount0: bigint,
        amount1: bigint,
        sqrtPriceX96: bigint,
        liquidity: bigint,
        tick: bigint
    ) => {
        const block = await wss.getBlockNumber()
        const swap: ISwap =
        {   
            "pool": process.env.POOL_ADDRESS as string,
            "buyer": sender === recipient ? sender : recipient,
            "amount0In": await convertDecimalsFrom(await getToken0(), Number(amount0)),
            "amount1In": await convertDecimalsFrom(await getToken1(), Number(amount1)),
            "to": recipient,
            "price": await sqrtPriceToPrice(Number(sqrtPriceX96)),
            "block": block
        }
        inserSwap(swap, connection)
    }
    )
}

main().then(() => {
    console.log('Listening for Swap events')
})


