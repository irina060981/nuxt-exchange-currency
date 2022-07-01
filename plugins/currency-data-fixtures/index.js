import ModuleController from './lib/module-controller.js'

export default ({ app }, inject) => {
  let moduleC = new ModuleController(this)

  moduleC.initCurrencyData()
  moduleC.updateRateData()

  inject('currencyDataFixtures', {
    currencyData: moduleC.currencyData,
    availableCurrency: moduleC.availableCurrency,
    updateRateData: moduleC.updateRateData.bind(moduleC),
    formatCurrencyToPair: moduleC.formatCurrencyToPair.bind(moduleC)
  })
}


  