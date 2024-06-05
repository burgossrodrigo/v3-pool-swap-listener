import mongoose, { Mongoose } from "mongoose";
import { Block } from "ethers";
import { ISwap } from "../interfaces";
require("dotenv").config()


const swapSchema = new mongoose.Schema({
    pool: String,
    buyer: String,
    amount0In: Number,
    amount1In: Number,
    to: String,
    price: Number,
    block: Number
});

// Register the schema with Mongoose
const Swap = mongoose.model('swap', swapSchema);

export const inserSwap = async (pool: ISwap, connection: Mongoose) => {
    const db = connection.connection.useDb("hidrogen");
    try {
        // Use the registered model
        const newSwap = new Swap(pool);
        console.log(pool, 'on insert')
        await newSwap.save();
    } catch (error: Error | any) {
        throw new Error(`Error inserting pool: ${error.message}`);
    }
}