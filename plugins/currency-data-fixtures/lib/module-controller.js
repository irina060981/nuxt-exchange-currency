
import CurrencyStaticGenerator from './generators/currency-static-generator.js'
import CurrencyRateGenerator from './generators/currency-rate-generator.js'

import CurrencyPair from './data/currency-pair.js'
import StaticData from '../static-data.js'

let lastUsedRates = []
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

    const currencyData = this.allCurrencyPairsCommissions
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

    lastUsedRates = rateData
  }

  get availableCurrency () {
    return StaticData.currencyArray
  }

  formatCurrencyToPair (baseCur, quoteCur) {
    return CurrencyPair.formatPairName (baseCur, quoteCur)
  }

  // for check page
  get allCurrencyPairsCommissions () {
    return CurrencyStaticGenerator.allCurrencyPairsCommissions
  }

  // for check page
  get recalcCurrencyPairsCommission () {
    return lastUsedRates
  }
 
}
