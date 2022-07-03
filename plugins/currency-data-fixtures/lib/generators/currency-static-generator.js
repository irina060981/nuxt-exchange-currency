import RandomUtility from './../utility/random.js'
import StaticData from './../../static-data.js'
import CurrencyPair from './../data/currency-pair.js'

let savedPairs = []
let savedPairsComissions = {}

export default class CurrencyStaticGenerator {
  /**
   * Creates an object, that stores all currency pairs with commission
   * @returns Array[{ pair: String, commission: Number }]
   */
  static createAllCurrencyPairsCommissions () {
    return this.allCurrencyPairs.map(pair => {
      const currencies = pair.split('-')
      return {
        pair, 
        base_currency: currencies[0],
        quote_currency: currencies[1],
        commission: RandomUtility.getRandomFromArray(StaticData.commissionsPercent)
      }
    })
  }

  /**
   *
   * @returns Boolean - true - currency pairs list doesn't need to be reloaded, false - otherwise
   */
  static get savedPairsReady () {
    const checkCurrencyPairsAmount = StaticData.currencyArray.length * (StaticData.currencyArray.length-1)
    return !((savedPairs.length === 0) || (savedPairs.length !== checkCurrencyPairsAmount))
  }

  /**
   * Checks if app has cached array of currencyPair, if not - recreates
   * @returns Array[String] - array of currency pairs in format like USD-JPY
   */
  static get allCurrencyPairs () {
    if (!this.savedPairsReady) {
      savedPairs = CurrencyPair.createAllPairs()
    }

    return savedPairs
  }

  /**
   * Checks if app has cached array of currencyPair with commissions, if not - recreates
   * @returns Object - pair (USD-JPY): CurrencyPair
   */
  static get allCurrencyPairsCommissions () {
    if (!this.savedPairsReady || Object.keys(savedPairsComissions).length === 0) {
      savedPairsComissions = this.createAllCurrencyPairsCommissions()
    }

    return savedPairsComissions
  }
}
