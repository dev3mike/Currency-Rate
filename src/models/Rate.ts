import axios from 'axios';

import RateInterface from '../interfaces/Rate';

export default class Rate implements RateInterface {
    protected static ApiBaseUrl: string = "https://api.api24.net/#apikey#/currency/latest";
    protected static ArchiveApiBaseUrl: string = "https://api.api24.net/#apikey#/currency/archive";

    constructor(
        public title: string,
        public price: number,
        public measure: string,
        public date?: number,
    ) {

    }

    static async getLatestRates(apiKey: string, singleRateFilter?: string): Promise<[RateInterface] | RateInterface> {
        const response = await axios.get(Rate.ApiBaseUrl.replace("#apikey#", apiKey) + (singleRateFilter ? `?filter=${singleRateFilter}` : ''));

        const { data, isSuccessful, error } = response.data;
        if (!isSuccessful) throw new Error(error ?? "Request UnSuccessful");

        const finalData = data.map(({ title, price, measure }: RateInterface) => {
            return new Rate(title, price, measure);
        });

        return finalData.length == 1 ? finalData[0] : finalData;
    }

    static async getArchiveRates(apiKey: string, title: string, start: string, end: string): Promise<[RateInterface] | RateInterface> {
        const response = await axios.get(Rate.ArchiveApiBaseUrl.replace("#apikey#", apiKey) + `?title=${title}&start=${start.replace(/\//g, '')}&end=${end.replace(/\//g, '')}`);

        const { data, isSuccessful, error } = response.data;
        if (!isSuccessful) throw new Error(error ?? "Request UnSuccessful");

        const finalData = data.map(({ title, price, measure, date }: RateInterface) => {
            return new Rate(title, price, measure, date);
        });

        return finalData.length == 1 ? finalData[0] : finalData;
    }

}