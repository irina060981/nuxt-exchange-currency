
import CurrencyStaticGenerator from './generators/currency-static-generator.js'
import CurrencyRateGenerator from './generators/currency-rate-generator.js'

import CurrencyPair from './data/currency-pair.js'
import StaticData from '../static-data.js'

let lastUsedRates = []
export default class ModuleController {

  /**
   * @constructor
  */
  constructor () {
    this.currencyData = null
  }

  /**
   * Creates this.currencyData with pairs and commissions info
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
   * Updates this.currencyData with rates info
   * Caches to lastUsedRates (would be changed on next rates update)
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

  /**
   * @returns Array[String] - all currencies
   */
  get availableCurrency () {
    return StaticData.currencyArray
  }

  /**
   * Creates formalized currency pair string
   * @param {String} baseCur 
   * @param {String} quoteCur 
   * @returns {String}
   */
  formatCurrencyToPair (baseCur, quoteCur) {
    return CurrencyPair.formatPairName (baseCur, quoteCur)
  }

  /**
   * Used for check component
   * @returns Array[{ pair: String, base_currency: String, quote_currency: String, commission: Number }]
   */
  get allCurrencyPairsCommissions () {
    return CurrencyStaticGenerator.allCurrencyPairsCommissions
  }

  /**
   * Used for check component
   * @returns Object{ pair: CurrencyPair }
   */
  get lastUsedCurrencyRateData () {
    return lastUsedRates
  }

  get rateUpdateIntervalMs () {
    return StaticData.rateUpdateIntervalMs
  }
 
}
