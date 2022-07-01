export default class StaticData {

    static get currencyArray () {
      return [ 'USD', 'AUD', 'JPY', 'CAD', 'GBP' ]
    }
  
    static get commissionsPercent () {
      return [ 1, 2, 3, 4, 5 ]
    }

    static get minRate () { return 10 }

    static get maxRate () { return 100 }
}

