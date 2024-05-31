import { ethers } from "ethers"
import { V3Pool } from "./types/ethers-contracts/V3Pool"
import { V3Pool__factory } from "./types/ethers-contracts/factories/V3Pool__factory"
import { wss } from "./constants"
import { convertDecimalsFrom, getDecimals } from "./ERC20Handler/ERC20Handler"
import { getToken0, getToken1, poolInstance, sqrtPriceToPrice } from "./PoolHandler/PoolHandler"



const main = async () => {

    (poolInstance as any).on('Swap', async (
        sender: string,
        recipient: string,
        amount0: bigint,
        amount1: bigint,
        sqrtPriceX96: bigint,
        liquidity: bigint,
        tick: bigint
    ) => {
        console.log(
            {
                "buyer": sender === recipient ? sender : recipient,
                "amount0In": await convertDecimalsFrom(await getToken0(), Number(amount0)),
                "amount1In": await convertDecimalsFrom(await getToken1(), Number(amount1)),
                "to": recipient,
                "price:": await sqrtPriceToPrice(Number(sqrtPriceX96))
            }
        )
        // console.log('Swap', sender, amount0In, amount1In, amount0Out, amount1Out, "to", to)
    })
}

main().then(() => {
    console.log('Listening for Swap events')
})


