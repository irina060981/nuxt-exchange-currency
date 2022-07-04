import RandomUtility from './../utility/random.js'
import StaticData from './../../static-data.js'
import CurrencyPair from './../data/currency-pair.js'

let savedPairs = []
let savedUniquePairs = []
let savedPairsComissions = {}

export default class CurrencyStaticGenerator {
  /**
   * Creates an object, that stores all currency pairs with commission
   * Direct and back pairs have the same commision, e.g. USD->JPY, JPY->USD
   * @returns Array[{ pair: String, base_currency: String, quote_currency: String, commission: Number }]
   */
  static createAllCurrencyPairsCommissions () {
    let result = []
    this.allUniqueCurrencyPairs.forEach(pair => {
      const currencies = pair.split('-')
      const commission = RandomUtility.getRandomFromArray(StaticData.commissionsPercent)

      result.push({
        pair, 
        base_currency: currencies[0],
        quote_currency: currencies[1],
        commission
      })

      const backPair = CurrencyPair.reversePair(pair)

      result.push({
        pair:backPair, 
        base_currency: currencies[1],
        quote_currency: currencies[0],
        commission
      })
    })

    return result
  }

  /**
   * @param {Number} n 
   * @returns Number - amount of all combinations 
   */
  static allCombinationsAmount (n) {
    return n*(n-1)
  }

  /**
   * @param {Number} n 
   * @returns Number - amount of unique combinations
   */
  static uniqueCombinationsAmount (n) {
    return n*(n-1)/2
  }

  /**
   * (USD-JPY and JPY-USD both would be included)
   * @returns Boolean - true - currency all pairs list doesn't need to be reloaded, false - otherwise
   */
  static get savedPairsReady () {
    const checkCurrencyPairsAmount = this.allCombinationsAmount(StaticData.currencyArray.length)
    return !((savedPairs.length === 0) || (savedPairs.length !== checkCurrencyPairsAmount))
  }

  /**
   * (USD-JPY would be included, JPY-USD not)
   * @returns Boolean - true - currency unique pairs list doesn't need to be reloaded, false - otherwise
   */
  static get savedUniquePairsReady () {
    const checkCurrencyPairsAmount = this.uniqueCombinationsAmount(StaticData.currencyArray.length)
    return !((savedUniquePairs.length === 0) || (savedUniquePairs.length !== checkCurrencyPairsAmount))
  }

  /**
   * Checks if app has cached array of all currency pairs, if not - recreates
   * @returns Array[String] - array of currency pairs in format like USD-JPY
   */
  static get allCurrencyPairs () {
    if (!this.savedPairsReady) {
      savedPairs = CurrencyPair.createAllPairs()
    }

    return savedPairs
  }

  /**
   * Checks if app has cached array of unique currency pairs, if not - recreates
   * @returns Array[String] - array of currency pairs in format like USD-JPY
   */
  static get allUniqueCurrencyPairs () {
    if (!this.savedUniquePairsReady) {
      savedUniquePairs = CurrencyPair.createAllUniquePairs()
    }

    return savedUniquePairs
  }

  /**
   * Checks if app has cached array of currencyPair with commissions, if not - recreates
   * @returns Array[{ pair: String, base_currency: String, quote_currency: String, commission: Number }]
   */
  static get allCurrencyPairsCommissions () {
    if (!this.savedPairsReady || Object.keys(savedPairsComissions).length === 0) {
      savedPairsComissions = this.createAllCurrencyPairsCommissions()
    }

    return savedPairsComissions
  }
}
