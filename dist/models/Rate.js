"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Rate {
    constructor(title, price, measure, date) {
        this.title = title;
        this.price = price;
        this.measure = measure;
        this.date = date;
    }
    static async getLatestRates(apiKey, singleRateFilter) {
        const response = await axios_1.default.get(Rate.ApiBaseUrl.replace("#apikey#", apiKey) + (singleRateFilter ? `?filter=${singleRateFilter}` : ''));
        const { data, isSuccessful, error } = response.data;
        if (!isSuccessful)
            throw new Error(error !== null && error !== void 0 ? error : "Request UnSuccessful");
        const finalData = data.map(({ title, price, measure }) => {
            return new Rate(title, price, measure);
        });
        return finalData.length == 1 ? finalData[0] : finalData;
    }
    static async getArchiveRates(apiKey, title, start, end) {
        const response = await axios_1.default.get(Rate.ArchiveApiBaseUrl.replace("#apikey#", apiKey) + `?title=${title}&start=${start.replace(/\//g, '')}&end=${end.replace(/\//g, '')}`);
        const { data, isSuccessful, error } = response.data;
        if (!isSuccessful)
            throw new Error(error !== null && error !== void 0 ? error : "Request UnSuccessful");
        const finalData = data.map(({ title, price, measure, date }) => {
            return new Rate(title, price, measure, date);
        });
        return finalData.length == 1 ? finalData[0] : finalData;
    }
}
exports.default = Rate;
Rate.ApiBaseUrl = "https://api.api24.net/#apikey#/currency/latest";
Rate.ArchiveApiBaseUrl = "https://api.api24.net/#apikey#/currency/archive";
