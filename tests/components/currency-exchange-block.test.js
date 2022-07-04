import { expect, it, jest } from '@jest/globals'

import { mount, createLocalVue  } from '@vue/test-utils'
import Vuex from "vuex"

import CurrencyExchangeBlock from '@/components/currency-exchange-block.vue'
import CurrencyInput from '@/components/currency-input.vue'

import { mutations, state, actions } from '@/store/currency.js'
import CurrencyDataFixtures from '@/plugins/currency-data-fixtures'

describe('CurrencyExchangeBlock component', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const store = new Vuex.Store({ 
    modules: {
      currency: { namespaced: true, state, mutations, actions }
    }
  })

  const pluginInjects = CurrencyDataFixtures()
  const $currencyDataFixtures = {
    currencyData: pluginInjects.currencyData,
    availableCurrency: pluginInjects.availableCurrency,
    allCurrencyPairsCommissions: pluginInjects.allCurrencyPairsCommissions,
    lastUsedCurrencyRateData: pluginInjects.lastUsedCurrencyRateData,

    updateRateData: pluginInjects.updateRateData,
    formatCurrencyToPair: pluginInjects.formatCurrencyToPair
  }

  it('1. CurrencyExchangeBlock - has 2 inputs with currency available list', async () => {
    const pluginInjects = CurrencyDataFixtures()

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    const inputs = exComp.findAllComponents(CurrencyInput)
    expect(inputs.length).toEqual(2)
  })

  it('2. CurrencyExchangeBlock - has two currency lists, each of them has all currencies besides chosen for the other currency', async () => {
    const pluginInjects = CurrencyDataFixtures()

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    const selects = exComp.findAll('select')
    expect(selects.length).toEqual(2)

    const availableCurrency = pluginInjects.availableCurrency

    expect(exComp.vm.baseCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.quoteCurrency).toEqual(availableCurrency[1])

    expect(exComp.vm.availableBaseCurrency).toHaveLength(availableCurrency.length-1)
    expect(exComp.vm.availableBaseCurrency.includes(exComp.vm.quoteCurrency)).toBeFalsy()

    expect(exComp.vm.availableQuoteCurrency).toHaveLength(availableCurrency.length-1)
    expect(exComp.vm.availableQuoteCurrency.includes(exComp.vm.baseCurrency)).toBeFalsy()
  })

  it('3. CurrencyExchangeBlock - after baseAmount is set in the input, quoteAmount is calculated', async () => {
    const pluginInjects = CurrencyDataFixtures()

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    await exComp.vm.updateValueBase(1)

    const quoteAmount = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount)
  })

  it('4. CurrencyExchangeBlock - after quoteAmount is set in the input, baseAmount is calculated', async () => {
    const pluginInjects = CurrencyDataFixtures()

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    await exComp.vm.updateValueQuote(1)

    const baseAmount = exComp.vm.calcAmount(1, exComp.vm.exchangeRateBack, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.baseAmount).toEqual(baseAmount)
  })

  it('5. CurrencyExchangeBlock - after change baseCurrency - quoteAmount is recalculated', async () => {
    const pluginInjects = CurrencyDataFixtures()
    const availableCurrency = pluginInjects.availableCurrency

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    await exComp.vm.updateValueBase(1)

    const quoteAmount1 = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[1])
    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount1)

    await exComp.setData({
        baseCurrency: availableCurrency[2]
    })

    await exComp.findAll('select').at(0).trigger('change')

    const quoteAmount2 = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[2])
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[1])
    expect(exComp.vm.$data.quoteAmount).not.toEqual(quoteAmount1)
    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount2)

  })

  it('6. CurrencyExchangeBlock - after change quoteCurrency - quoteAmount is recalculated', async () => {
    const pluginInjects = CurrencyDataFixtures()
    const availableCurrency = pluginInjects.availableCurrency

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    await exComp.vm.updateValueBase(1)

    const quoteAmount1 = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[1])
    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount1)

    await exComp.setData({
        quoteCurrency: availableCurrency[3]
    })

    await exComp.findAll('select').at(1).trigger('change')

    const quoteAmount2 = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 

    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[3])
    expect(exComp.vm.$data.quoteAmount).not.toEqual(quoteAmount1)
    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount2)
  })

  it('7. CurrencyExchangeBlock - after click on change order icon - baseCurrency data is changed with quoteCurrency data and vice versa', async () => {
    const pluginInjects = CurrencyDataFixtures()
    const availableCurrency = pluginInjects.availableCurrency

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { $currencyDataFixtures },
      stubs: { CurrencyInput }
    }) 

    await exComp.vm.updateValueBase(1)

    const quoteAmount = exComp.vm.calcAmount(1, exComp.vm.exchangeRateDirect, exComp.vm.exchangeCommission) 
    
    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.$data.baseAmount).toEqual(1)
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[1])
    expect(exComp.vm.$data.quoteAmount).toEqual(quoteAmount)

    await exComp.find('span.crypto-arrows_icon').trigger('click')
    
    expect(exComp.vm.$data.baseCurrency).toEqual(availableCurrency[1])
    expect(exComp.vm.$data.baseAmount).toEqual(quoteAmount)
    expect(exComp.vm.$data.quoteCurrency).toEqual(availableCurrency[0])
    expect(exComp.vm.$data.quoteAmount).toEqual(1)
  })

  it('8. CurrencyExchangeBlock - exchange button click - saves exchange data to store and does redirect if both amounts are defined', async () => {
    const pluginInjects = CurrencyDataFixtures()
    const availableCurrency = pluginInjects.availableCurrency

    const exComp = mount(CurrencyExchangeBlock, {
      localVue,
      store, 
      mocks: { 
        $currencyDataFixtures,
        $router: {
          push: jest.fn()
        }
      },
      stubs: { CurrencyInput }
    }) 

    const exchangeButton = exComp.find('button.crypto-button_exchange')
    jest.spyOn(exComp.vm, 'doChange')
    jest.spyOn(exComp.vm.$router, 'push')

    expect(exComp.vm.baseAmount).not.toBeDefined()
    expect(exComp.vm.quoteAmount).not.toBeDefined()

    expect(exchangeButton.attributes('disabled')).toBe('disabled') // it is disabled

    await exComp.vm.updateValueBase(1)
    
    expect(exchangeButton.attributes('disabled')).toBeUndefined() // it is not disabled

    await exchangeButton.trigger('click')

    expect(exComp.vm.doChange).toHaveBeenCalled()
    expect(exComp.vm.$router.push).toHaveBeenCalled()
  })
})

