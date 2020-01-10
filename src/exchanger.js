class Exchanger {
    constructor() {
        this.currencies = {};
    }

    getCurrencyRate(currency) {
        if (this.currencies[currency]) {
            return;
        } else {
            fetch('http://api.nbp.pl/api/exchangerates/rates/a/'+currency)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.currencies[currency] = myJson.rates[0].mid;
            });
        }
    }

    getValueInPLN(value, currency) {
        let currencyRate = this.currencies[currency];
        if (currencyRate) {
            return value * currencyRate;
        } else {
            this.getCurrencyRate(currency);
            return false;
        }
    }
}