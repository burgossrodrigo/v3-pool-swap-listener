import { getDecimals } from "../ERC20Handler/ERC20Handler"
import { wss } from "../constants"
import { V3Pool } from "../types/ethers-contracts/V3Pool"
import { V3Pool__factory } from "../types/ethers-contracts/factories/V3Pool__factory"

export const poolInstance: V3Pool = V3Pool__factory.connect(process.env.POOL_ADDRESS as string, wss)

export const getToken0 = async (): Promise<string> => {
    try {
        const token0 = await poolInstance.token0()
        return token0
    } catch (error: Error | any) {
        throw new Error(`Error getting token0: ${error.message}`)
    }
}

export const getToken1 = async (): Promise<string> => {
    try {
        const token1 = await poolInstance.token1()
        return token1
    } catch (error: Error | any) {
        throw new Error(`Error getting token1: ${error.message}`)
    }
}

export const sqrtPriceToPrice = async (sqrtPriceX96: number): Promise<number> => {
    const priceMath = Math.pow(sqrtPriceX96, 2) / Math.pow(2, 192)
    const decimals0 = await getDecimals(await getToken0())
    const decimals1 = await getDecimals(await getToken1())
    const decimalsAdjustment = Math.pow(10, decimals0 - decimals1)
    return priceMath * decimalsAdjustment
}