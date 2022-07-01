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
    let result = []

    for(let i=0; i< StaticData.currencyArray.length; i++) {
      const curBase = StaticData.currencyArray[i]

      for(let j=0; j< StaticData.currencyArray.length; j++) {
        if (i===j) { continue; }
        const curQuote = StaticData.currencyArray[j]

        result.push(CurrencyPair.formatPairName(curBase, curQuote))
      }
    }

    return result
  }
}
