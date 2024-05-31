import { wss } from "../constants";
import { ERC20__factory } from "../types/ethers-contracts/factories/ERC20__factory";


const tokenInstance = (tokenAddress: string) => {
    return ERC20__factory.connect(tokenAddress as string, wss)
}

export const getDecimals = async (tokenAddress: string): Promise<number> => {
    try {
        const ERC20 = tokenInstance(tokenAddress)
        const decimals = await ERC20.decimals()
        return Number(decimals)
    } catch (error: Error | any) {
        throw new Error(`Error getting decimals: ${error.message}`)
    }
}

export const convertDecimalsFrom = async (tokenAddress: string, amount: number): Promise<number> => {
    try {
        const decimals = await getDecimals(tokenAddress)
        const amountConverted = amount / Math.pow(10, Number(decimals))
        return amountConverted
    } catch (error: Error | any) {
        throw new Error(`Error converting decimals: ${error.message}`)
    }
}