export const state = () => ({
  updated: 1,
  lastExchangeData: {},
  successPageAvailable: false
})

export const actions = {
  updateRateData ( context ) {
    this.$currencyDataFixtures.updateRateData()
    context.commit('incrementUpdated')
  }
}

export const mutations = {
  incrementUpdated (state) {
    state.updated++
  },
  saveLastExchangeData (state, data) {
    state.lastExchangeData = {
      dt: data.dt,
      baseCurrency: data.baseCurrency,
      quoteCurrency: data.quoteCurrency,
      baseAmount: data.baseAmount,
      quoteAmount: data.quoteAmount,
      rate: data.rate,
      commision: data.commision
    }

    state.successPageAvailable = true
  },
  clearLastExchangeData (state) {
    state.lastExchangeData = {}
    state.successPageAvailable = false
  }
}

  