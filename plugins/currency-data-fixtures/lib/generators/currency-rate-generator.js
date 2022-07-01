import RandomUtility from './../utility/random.js'
import StaticData from './../../static-data.js'
import CurrencyPair from './../data/currency-pair.js'

export default class CurrencyRateGenerator {

  /**
   * Creates an object, that stores all currency pairs with rate
   * @returns Array[{ pair: String, rate: Number }]
   */
  static createAllCurrencyRates () {
    return CurrencyPair.createAllPairs().map(pair => {
      return {
        pair, rate: RandomUtility.getRandomFromRange(StaticData.minRate, StaticData.maxRate)
      }
    })
  }

}
