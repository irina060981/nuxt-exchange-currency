
import CurrencyStaticGenerator from './generators/currency-static-generator.js'
import CurrencyRateGenerator from './generators/currency-rate-generator.js'

import CurrencyPair from './data/currency-pair.js'
import StaticData from '../static-data.js'

export default class ModuleController {

  /**
   * @constructor
  */
  constructor (moduleObj) {
    this.currencyData = null
  }

  /**
   * Creates this.currencyData with pairs and commissions data
   */
  initCurrencyData () {
    this.currencyData = {}

    const currencyData = CurrencyStaticGenerator.allCurrencyPairsCommissions
    currencyData.forEach(item => {
        this.currencyData[item.pair] = new CurrencyPair(item.pair)
        this.currencyData[item.pair].setCommission(item.commission)
    })
  }

  /**
   * Updates this.currencyData with rate data
  */
  updateRateData () {
    const rateData = CurrencyRateGenerator.createAllCurrencyRates()

    rateData.forEach(item => {
      if (!this.currencyData[item.pair]) {
        console.error(`There is no base and commission information for the pair ${item.pair}, rate would be skipped. `)
      } else {
        this.currencyData[item.pair].setRate(item.rate)
      }
    })
  }

  get availableCurrency () {
    return StaticData.currencyArray
  }

  formatCurrencyToPair (baseCur, quoteCur) {
    return CurrencyPair.formatPairName (baseCur, quoteCur)
  }
}
