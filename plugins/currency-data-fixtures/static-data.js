export default class StaticData {

    static get currencyArray () {
      return [ 'USD', 'EUR', 'AUD', 'JPY', 'CAD', 'GBP', 'KOR', 'CHF', 'NZD', 'ZAR', 'SEK' ]
    }
  
    static get commissionsPercent () {
      return [ 1, 2, 3, 4, 5 ]
    }

    static get minRate () { return 10 }

    static get maxRate () { return 100 }

    static get rateUpdateIntervalMs () { return 30000 }
}

