// import { mount } from '@vue/test-utils'
import CurrencyPair from '@/modules/currency-data-fixtures/lib/data/currency-pair.js'
import StaticData from '@/modules/currency-data-fixtures/static-data.js'
import ModuleController from '@/modules/currency-data-fixtures/lib/module-controller.js'

import CurrencyStaticGenerator from '@/modules/currency-data-fixtures/lib/generators/currency-static-generator.js'
import CurrencyRateGenerator from '@/modules/currency-data-fixtures/lib/generators/currency-rate-generator.js'

import { expect, it } from '@jest/globals'

describe('currency-data-fixtures functions', () => {
  
  it('1. CurrencyStaticGenerator.allCurrencyPairs returns correct amount of pairs', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    expect(currencyPairs.length).toEqual(StaticData.currencyArray.length * (StaticData.currencyArray.length-1))
  })

  it('2. CurrencyStaticGenerator.getAllCurrencyPairsCommissions returns correct amount of pairs', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    const currencyPairsCom = CurrencyStaticGenerator.allCurrencyPairsCommissions

    // console.info('currencyPairsCom - ', currencyPairsCom)

    expect(currencyPairsCom.length).toEqual(currencyPairs.length)
    
    currencyPairsCom.forEach(pairCom => 
      expect(pairCom).toEqual(expect.objectContaining({
        pair: expect.any(String),
        commission: expect.any(Number)
      }))
    )
  })

  it('3. CurrencyRateGenerator.getAllCurrencyRates returns correct amount of pairs', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    const currencyPairsRate = CurrencyRateGenerator.createAllCurrencyRates()
    // console.info('currencyPairsRate - ', currencyPairsRate)
    
    expect(currencyPairsRate.length).toEqual(currencyPairs.length)

    currencyPairsRate.forEach(pairCom => 
      expect(pairCom).toEqual(expect.objectContaining({
        pair: expect.any(String),
        rate: expect.any(Number)
      }))
    )
  })

  it('4. ModuleController.initCurrencyData creates currency list with comissions', () => {
    const moduleC = new ModuleController()
    moduleC.initCurrencyData()

    moduleC.updateRateData()

    console.info('moduleC - ', moduleC.currencyList)
  })
  
  
})
