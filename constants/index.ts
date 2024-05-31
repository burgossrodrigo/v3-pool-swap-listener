import { ethers } from "ethers";
require('dotenv').config()

export const wss = new ethers.WebSocketProvider(process.env.WSS_URL as string)
 