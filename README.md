# Currency-Rate

If you need any information about our webservice Please visit Currency Rate Official Documentation
# <a href="https://api24.net/api/currency-gold-rate#help">Currency Rate API Documentation (Farsi)</a>


If you need latest rate of currencies in Iran in your application, you can easily use our webservice.

For more information and check other products check our [WebSite](https://api24.net)


## Installation
<p>
First of all, You need to make an account on Api24.net from <a href="https://api24.net/register">Here</a>
</p>
<p>
After that you just need to pick API-KEY up from <a href="https://api24.net/p/dashboard">Dashboard</a> section.
</p>

<p> For installing CurrencyRate use this command via npm </p>

```node
npm install @dev3mike/currencyrate
```


If you don't have npm you can easily install it from  [npm website](https://www.npmjs.com/)


## Usage

Well, There is three examples to get Data from the service:

<b>Get List of All Rates</b>
```node
const { CurrencyRate } = require("@dev3mike/currencyrate");
const cr = new CurrencyRate("YOUR_API_KEY");

// Get List of Rates
const prices = await cr.rates(); // Result in Array 
console.log("Prices in Array", prices);

/*
Output:
[
  Rate {
    title: 'USD',
    price: 10000,
    measure: 'TOMAN',
    date: undefined
  },
  Rate {
    title: 'EUR',
    price: 10000,
    measure: 'TOMAN',
    date: undefined
  },
  ....
]
*/
```



<b>Get a Single Rate</b>
```node
const { CurrencyRate } = require("@dev3mike/currencyrate");
const cr = new CurrencyRate("YOUR_API_KEY");

// Get a Single Rate
const rateUSD = await cr.rates({ currency: 'USD' });
const rateUSD_price = rateUSD.price;
console.log("Single USD Rate", rateUSD, rateUSD_price);


/*
Output:
  Rate {
    title: 'USD',
    price: 10000,
    measure: 'TOMAN',
    date: undefined
  }
*/
```


<b>Convert Rates</b>
```node
const { CurrencyRate } = require("@dev3mike/currencyrate");
const cr = new CurrencyRate("YOUR_API_KEY");

// Convert Rates
const amount = 100;
const convertResult = await cr.convert(amount, 'USD', 'Toman');
console.log("Convert Result", convertResult);


/*
Output should be float
*/
```

<a href="https://api24.net/api/currency-gold-rate" title="وب سرویس نرخ ارز">وب سرویس نرخ ارز</a>