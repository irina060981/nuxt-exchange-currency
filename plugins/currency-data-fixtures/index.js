import ModuleController from './lib/module-controller.js'

export default ( _, inject) => {

  let moduleC = new ModuleController(this)

  moduleC.initCurrencyData()
  moduleC.updateRateData()

  const injectData = {
    currencyData: moduleC.currencyData,
    availableCurrency: moduleC.availableCurrency,
    rateUpdateIntervalMs: moduleC.rateUpdateIntervalMs,
    
    allCurrencyPairsCommissions: moduleC.allCurrencyPairsCommissions,

    lastUsedCurrencyRateData: moduleC.lastUsedCurrencyRateData,

    updateRateData: moduleC.updateRateData.bind(moduleC),
    formatCurrencyToPair: moduleC.formatCurrencyToPair.bind(moduleC)
  }

  if (inject) {
    inject('currencyDataFixtures', injectData)
    return
  }
  return injectData

}


  