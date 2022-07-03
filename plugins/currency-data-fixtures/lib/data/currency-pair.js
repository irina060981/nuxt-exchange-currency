import StaticData from './../../static-data.js'

export default class CurrencyPair {
  /**
   * @constructor
   * @param {String} pair - currency pair in format like USD-JPY
   * @param {Number} commission - exchange comission
   */
  constructor( pair ) {
    if (!pair) {
      throw new Error('Data is incomplete for creating a currency pair.')
    }

    const currencies = pair.split('-')

    this.baseCurrency = currencies[0]
    this.quoteCurrency = currencies[1]
  }

  setCommission (commission) {
    this.commission = commission
  }

  setRate (rate) {
    this.rate = rate
  }

  static formatPairName (baseCur, quoteCur) {
    return `${baseCur}-${quoteCur}`
  }

  get shortName () {
    return CurrencyPair.formatPairName(this.baseCurrency, this.quoteCurrency)
  }

  /**
   * Creates an array of currency pairs in format like USD-JPY
   * @returns Array[String]
   */
  static createAllPairs () {
    const allCur = StaticData.currencyArray
    let result = []

    for(let i=0; i< allCur.length; i++) {
      const curBase = allCur[i]

      for(let j=0; j< allCur.length; j++) {
        if (i===j) { continue; }
        const curQuote = allCur[j]

        result.push(CurrencyPair.formatPairName(curBase, curQuote))
      }
    }

    return result
  }

  static createAllUniquePairs () {
    const allCur = StaticData.currencyArray

    return allCur.reduce( (acc, v, i) =>
      acc.concat(allCur.slice(i+1).map( w => this.formatPairName(v, w) )),
    [])
  }

  static reversePair (pair) {
    const currencies = pair.split('-').reverse()    
    return this.formatPairName(currencies[0], currencies[1])
  }
}
