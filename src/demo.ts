import { CurrencyRate } from './index';
// import RateInterface from './interfaces/Rate';

const rates = async () => {

    try {
        const demoApiKey: string = "YOUR_API_KEY";
        const cr: CurrencyRate = new CurrencyRate(demoApiKey);


        // Get List of Rates
        const prices = await cr.rates(); // Result in Array 
        console.log("Prices in Array", prices);


        // Get a Single Rate
        const rateUSD = await cr.rates({ currency: 'USD' });
        const rateUSD_price: number = (rateUSD as { price: number }).price;
        console.log("Single USD Rate", rateUSD, rateUSD_price);

        // Convert Rates
        const amount = 100;
        const convertResult = await cr.convert(amount, 'USD', 'Toman');
        console.log("Convert Result", convertResult);

    } catch (err) {
        console.log(err);
    }
}

rates();