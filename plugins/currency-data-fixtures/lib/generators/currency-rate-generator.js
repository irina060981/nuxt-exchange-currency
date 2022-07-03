import RandomUtility from './../utility/random.js'
import StaticData from './../../static-data.js'
import CurrencyPair from './../data/currency-pair.js'

export default class CurrencyRateGenerator {

  /**
   * Creates an object, that stores all currency pairs with rate
   * @returns Array[{ pair: String, rate: Number }]
   */
  static createAllCurrencyRates () {
    let finalResult = []
    CurrencyPair.createAllUniquePairs().forEach(pair => {
      const directRate = RandomUtility.getRandomFromRange(StaticData.minRate, StaticData.maxRate)

      finalResult.push({
        pair, rate: directRate
      })
      
      const backPair = CurrencyPair.reversePair(pair)
      const backRate = parseFloat((1/directRate * RandomUtility.getRandomFromRange(1, 10)).toFixed(4))
      finalResult.push({
        pair: backPair, rate: backRate
      })

    })

    return finalResult
  }

}
