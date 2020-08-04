"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rate_1 = __importDefault(require("./models/Rate"));
class CurrencyRate {
    constructor(ApiKey) {
        // Convert Rates
        this.amount_val = 0;
        this.from_val = 0;
        this.to_val = 0;
        this.ApiKey = ApiKey;
    }
    async rates(filter, archiveFilter) {
        var _a, _b, _c;
        this.filter = filter;
        this.serverResponse =
            !archiveFilter ?
                await Rate_1.default.getLatestRates(this.ApiKey, (_a = this.filter) === null || _a === void 0 ? void 0 : _a.currency)
                :
                    await Rate_1.default.getArchiveRates(this.ApiKey, (_c = ((_b = this.filter) === null || _b === void 0 ? void 0 : _b.currency)) !== null && _c !== void 0 ? _c : 'USD', archiveFilter.startDate, archiveFilter.endDate);
        return this.serverResponse;
    }
    // Convert Rate
    async convert(amount, from_currency = 'Toman', to_currency = 'USD') {
        this.amount_val = amount;
        if (!this.serverResponse)
            this.serverResponse = await this.rates();
        if (!Array.isArray(this.serverResponse))
            this.serverResponse = await this.rates();
        // From Data
        if (from_currency.toLowerCase() != 'toman') {
            const from_data = this.serverResponse.find(item => item.title == from_currency.toUpperCase());
            if (!from_data)
                throw new Error("Invalid from_currency");
            this.from_val = from_data.price;
        }
        // From Data
        if (to_currency.toLowerCase() != 'toman') {
            const to_data = this.serverResponse.find(item => item.title == to_currency.toUpperCase());
            if (!to_data)
                throw new Error("Invalid from_currency");
            this.to_val = to_data.price;
        }
        return this.calculation();
    }
    // Calculation
    calculation() {
        let calc;
        if (this.from_val > 0 && this.to_val === 0) {
            calc = this.amount_val * this.from_val;
        }
        else if (this.from_val === 0 && this.to_val > 0) {
            calc = (this.amount_val / this.to_val).toFixed(2);
        }
        else if (this.from_val > 0 && this.to_val > 0) {
            calc = ((this.from_val / this.to_val) * this.amount_val).toFixed(2);
        }
        else {
            calc = this.amount_val;
        }
        return calc;
    }
}
exports.default = CurrencyRate;
