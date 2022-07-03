export const state = () => ({
  updated: 1
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
  }
}

  