const assert = require("assert");
const CurrencyRate = require("../dist/index");

const demoApiKey = "SAMPLE_API_KEY";
let cr = null;
let prices = null;

describe("Getting Rates Test", () => {

    before(async () => {
        cr = new CurrencyRate.default(demoApiKey);
        prices = await cr.rates()
    });

    it("it should return an array of rates", async () => {
        assert.equal(prices instanceof Array, true);
    });

    it("type of price should be number", async () => {
        assert.equal(typeof (prices[0].price), 'number');
    });

    it("the result of conversion should be number", async () => {
        const convert = await cr.convert(100, "USD", "EUR");
        assert.equal(Number(convert) > 0, true);
    });

});