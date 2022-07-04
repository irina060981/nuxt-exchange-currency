// import { mount } from '@vue/test-utils'
import CurrencyPair from '@/plugins/currency-data-fixtures/lib/data/currency-pair.js'
import StaticData from '@/plugins/currency-data-fixtures/static-data.js'
import ModuleController from '@/plugins/currency-data-fixtures/lib/module-controller.js'

import CurrencyStaticGenerator from '@/plugins/currency-data-fixtures/lib/generators/currency-static-generator.js'
import CurrencyRateGenerator from '@/plugins/currency-data-fixtures/lib/generators/currency-rate-generator.js'

import { expect, it } from '@jest/globals'

describe('currency-data-fixtures functions', () => {

  it('1. CurrencyStaticGenerator.allCurrencyPairs returns correct amount of pairs', () => {
    const allCurrencies = StaticData.currencyArray

    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs

    const allPairsCheck = CurrencyStaticGenerator.allCombinationsAmount(allCurrencies.length)

    expect(currencyPairs.length).toEqual(allPairsCheck)

    const currencyUniquePairs = CurrencyStaticGenerator.allUniqueCurrencyPairs

    const allUniquePairsCheck = CurrencyStaticGenerator.uniqueCombinationsAmount(allCurrencies.length)
    expect(currencyUniquePairs.length).toEqual(allUniquePairsCheck)
  })

  it('2. CurrencyStaticGenerator.getAllCurrencyPairsCommissions returns correct amount of pairs', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    const currencyPairsCom = CurrencyStaticGenerator.allCurrencyPairsCommissions

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
    
    expect(currencyPairsRate.length).toEqual(currencyPairs.length)

    currencyPairsRate.forEach(pairCom => 
      expect(pairCom).toEqual(expect.objectContaining({
        pair: expect.any(String),
        rate: expect.any(Number)
      }))
    )
  })

  it('4. ModuleController.initCurrencyData creates currency list with comissions', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    const allCurrencies = StaticData.currencyArray
    const allCommissions = StaticData.commissionsPercent

    const moduleC = new ModuleController()
    moduleC.initCurrencyData()

    expect(Object.keys(moduleC.currencyData)).toHaveLength(currencyPairs.length)

    Object.values(moduleC.currencyData).forEach(currencyDataItem => {
      expect(currencyDataItem).toBeInstanceOf(CurrencyPair)
      
      expect(allCurrencies.includes(currencyDataItem.baseCurrency)).toBeTruthy()
      expect(allCurrencies.includes(currencyDataItem.quoteCurrency)).toBeTruthy()
      
      expect(allCommissions.includes(currencyDataItem.commission)).toBeTruthy()
    })
  })

  it('5. ModuleController.updateRateData updates currency list with rates', () => {
    const currencyPairs = CurrencyStaticGenerator.allCurrencyPairs
    const allCurrencies = StaticData.currencyArray
    const allCommissions = StaticData.commissionsPercent

    const moduleC = new ModuleController()
    moduleC.initCurrencyData()
    moduleC.updateRateData()

    expect(Object.keys(moduleC.currencyData)).toHaveLength(currencyPairs.length)

    Object.values(moduleC.currencyData).forEach(currencyDataItem => {     
      expect(currencyDataItem.rate).toEqual(expect.any(Number))
    })

  })

  it('6. ModuleController check that direct and back pair have the same commission', () => {
    const currencyUniquePairs = CurrencyStaticGenerator.allUniqueCurrencyPairs

    const moduleC = new ModuleController()
    moduleC.initCurrencyData()
    moduleC.updateRateData()

    currencyUniquePairs.forEach(pair => {
      const backPair = CurrencyPair.reversePair(pair)

      expect(moduleC.currencyData[pair].commission).toEqual(moduleC.currencyData[backPair].commission)
    })
  })

  it('7. ModuleController check that direct and back pair have rates like rate; 1/rate', () => {
    const currencyUniquePairs = CurrencyStaticGenerator.allUniqueCurrencyPairs

    const moduleC = new ModuleController()
    moduleC.initCurrencyData()
    moduleC.updateRateData()

    currencyUniquePairs.forEach(pair => {
      const backPair = CurrencyPair.reversePair(pair)

      expect(moduleC.currencyData[pair].rate).toBeCloseTo(Math.round(1/moduleC.currencyData[backPair].rate))
    })
  })

})
