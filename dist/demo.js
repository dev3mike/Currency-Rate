"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
// import RateInterface from './interfaces/Rate';
const rates = async () => {
    try {
        const demoApiKey = "YOUR_API_KEY";
        const cr = new index_1.default(demoApiKey);
        // Get List of Rates
        const prices = await cr.rates(); // Result in Array 
        console.log("Prices in Array", prices);
        // Get a Single Rate
        const rateUSD = await cr.rates({ currency: 'USD' });
        const rateUSD_price = rateUSD.price;
        console.log("Single USD Rate", rateUSD, rateUSD_price);
        // Convert Rates
        const amount = 100;
        const convertResult = await cr.convert(amount, 'USD', 'Toman');
        console.log("Convert Result", convertResult);
    }
    catch (err) {
        console.log(err);
    }
};
rates();
