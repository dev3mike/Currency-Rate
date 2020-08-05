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
npm install CurrencyRate
```


If you don't have npm you can easily install it from  [npm website](https://www.npmjs.com/)


## Usage

Well, There is three examples to get Data from the service:

```node
const CurrencyRate = require('currencyrate');
const cr = new CurrencyRate("YOUR_API_KEY");

// Get List of Rates
const prices = await cr.rates(); // Result in Array 
console.log("Prices in Array", prices);


