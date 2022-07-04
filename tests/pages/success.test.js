import { expect, it, jest } from '@jest/globals'
import { mount, createLocalVue  } from '@vue/test-utils'
import Vuex from "vuex"

import SuccessPage from '@/pages/success.vue'
import SuccessExchangeBlock from '@/components/success-exchange-block.vue'

import { mutations, state, actions } from '@/store/currency.js'

describe('SuccessPage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  const store = new Vuex.Store({ 
    modules: {
      currency: { namespaced: true, state, mutations, actions }
    }
  })
  
  it('1. SuccessPage - shows crypto-page-no-success block if there is no ready change', async () => {
    const page = mount(SuccessPage, {
      localVue,
      store, 
      stubs: { SuccessExchangeBlock }
    }) 

    const successComponent = page.findComponent(SuccessExchangeBlock)
    expect(successComponent.exists()).toBeFalsy()

    const nonSuccessDiv = page.find('.crypto-page-no-success')
    expect(nonSuccessDiv.exists()).toBeTruthy()
  })

  it('2. SuccessPage - shows SuccessExchangeBlock if there is a ready change', async () => {
    const page = mount(SuccessPage, {
      localVue,
      store, 
      stubs: { SuccessExchangeBlock }
    }) 

    await store.commit('currency/saveLastExchangeData', {
      dt: '2022-07-04 22:12:05',
      baseCurrency: 'USD',
      quoteCurrency: 'EUR',
      baseAmount: 1,
      quoteAmount: 34,
      rate: 34,
      commision: 1
    })

    const successComponent = page.findComponent(SuccessExchangeBlock)
    expect(successComponent.exists()).toBeTruthy()

    const nonSuccessDiv = page.find('.crypto-page-no-success')
    expect(nonSuccessDiv.exists()).toBeFalsy()
  })
})
