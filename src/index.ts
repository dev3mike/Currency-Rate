import Rate from "./models/Rate";
import RateInterface from './interfaces/Rate';

type PriceFilter = { currency: string } | undefined;
type ArchiveFilter = { startDate: string, endDate: string } | undefined;
type ServerResponse = void | [RateInterface] | RateInterface | undefined;

export default class CurrencyRate {

    private ApiKey: string;
    private serverResponse: ServerResponse;
    private filter: PriceFilter;

    // Convert Rates
    private amount_val = 0;
    private from_val = 0;
    private to_val = 0;

    constructor(ApiKey: string) {
        this.ApiKey = ApiKey;
    }

    async rates(filter?: PriceFilter, archiveFilter?: ArchiveFilter) {
        this.filter = filter;
        this.serverResponse =
            !archiveFilter ?
                await Rate.getLatestRates(this.ApiKey, this.filter?.currency)
                :
                await Rate.getArchiveRates(this.ApiKey, (this.filter?.currency) ?? 'USD', archiveFilter.startDate, archiveFilter.endDate);

        return this.serverResponse;
    }

    // Convert Rate
    async convert(amount: number, from_currency = 'Toman', to_currency = 'USD') {
        this.amount_val = amount;

        if (!this.serverResponse) this.serverResponse = await this.rates();
        if (!Array.isArray(this.serverResponse)) this.serverResponse = await this.rates();

        // From Data
        if (from_currency.toLowerCase() != 'toman') {
            const from_data = (this.serverResponse as [RateInterface]).find(item => item.title == from_currency.toUpperCase());
            if (!from_data) throw new Error("Invalid from_currency");

            this.from_val = from_data.price;
        }

        // From Data
        if (to_currency.toLowerCase() != 'toman') {
            const to_data = (this.serverResponse as [RateInterface]).find(item => item.title == to_currency.toUpperCase());
            if (!to_data) throw new Error("Invalid from_currency");

            this.to_val = to_data.price;
        }


        return this.calculation();
    }

    // Calculation
    calculation() {
        let calc;

        if (this.from_val > 0 && this.to_val === 0) {
            calc = this.amount_val * this.from_val;
        } else if (this.from_val === 0 && this.to_val > 0) {
            calc = (this.amount_val / this.to_val).toFixed(2);
        } else if (this.from_val > 0 && this.to_val > 0) {
            calc = ((this.from_val / this.to_val) * this.amount_val).toFixed(2);
        } else {
            calc = this.amount_val;
        }

        return calc;
    }


}