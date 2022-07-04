<template lang="pug">
    div.row.justify-content-between
      div.crypto-exchange_block_container.col-md-5
        h2 Exchange {{ baseCurrency }} to {{ quoteCurrency }}
        div.crypto-exchange_input_block_container

          p.crypto-label You Pay

          div.crypto-exchange_input_block.input-group
            CurrencyInput( placeholder="Pay Amount" @updateValue = "updateValueBase" :externalValue = "updateBaseAmount")
            select.crypto-currency_list.form-control( v-model="baseCurrency" @change="recalculateQuote")
                option(v-for="currencyItem in availableBaseCurrency" :key="currencyItem") {{ currencyItem }}

          p.crypto-arrows_icon_container.d-flex.justify-content-end
            span.crypto-arrows_icon( @click="exchangeCurrency" )
            
          p.crypto-label You Get

          div.crypto-exchange_input_block.input-group
            CurrencyInput( placeholder="Pay Amount" @updateValue = "updateValueQuote" :externalValue = "updateQuoteAmount")
            select.crypto-currency_list.form-control( v-model="quoteCurrency" @change="recalculateQuote")
                option(v-for="currencyItem in availableQuoteCurrency" :key="currencyItem") {{ currencyItem }}

      div.crypto-exchange_block_container.col-md-6
        h2 Summary
        div.crypto-info_container.container
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Rate 
            span.col-sm-6.crypto-value_part 1{{ baseCurrency }} = {{ exchangeRateDirect }} {{ quoteCurrency }} 
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Commission
            span.col-sm-6.crypto-value_part {{ exchangeCommission }}%
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Update Counter
            span.col-sm-6.crypto-value_part {{ updated }}
          p.crypto-button_block
            button.btn.btn-primary.btn-block.crypto-button_exchange( @click="exchange" :disabled="!exchangeAvailable") Exchange
</template>
<script>
import ConvertUtility from './utility/convert-utility.js'
export default {
  name: 'CurrencyExchangeBlock',
  data () {
    return {
      baseCurrency: null,
      quoteCurrency: null,

      baseAmount: undefined,
      quoteAmount: undefined,

      updateBaseAmount: undefined,
      updateQuoteAmount: undefined,

      rateUpdateInterval: null
    }
  },
  watch: {
     /**
     * Catches rates update
     */
    updated () {
      this.recalculateQuote()
    }
  },
  /**
   * Restarts rates update interval and inits base/quote data to defaults
   */
  mounted () {
    this.initFormaData()
    this.defineRateUpdateInterval()
  },
  computed: {
    allAvailableCurrency () {
      return this.$currencyDataFixtures.availableCurrency
    },
    availableBaseCurrency () {
        return this.allAvailableCurrency.filter(currency => currency != this.quoteCurrency)
    },
    availableQuoteCurrency () {
        return this.allAvailableCurrency.filter(currency => currency != this.baseCurrency)
    },
    updated () {
      return this.$store.state.currency.updated
    },

    currencyPairDirect () {
      return this.$currencyDataFixtures.formatCurrencyToPair(this.baseCurrency, this.quoteCurrency)
    },

    currencyPairBack () {
      return this.$currencyDataFixtures.formatCurrencyToPair(this.quoteCurrency, this.baseCurrency)
    },

    currencyData () {
      return this.$store.state.currency.updated ? this.$currencyDataFixtures.currencyData : {}
    },

    exchangeRateDirect () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairDirect] ? 
                  this.currencyData[this.currencyPairDirect].rate : 
                  0
    },

    exchangeCommission () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairDirect] ? 
                  this.currencyData[this.currencyPairDirect].commission : 
                  0
    },

    exchangeRateBack () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairBack] ? 
                  this.currencyData[this.currencyPairBack].rate : 
                  0
    },

    exchangeAvailable () {
      return this.baseAmount > 0 && this.quoteAmount > 0
    },

    rateUpdateIntervalMs () {
      return this.$currencyDataFixtures.rateUpdateIntervalMs ? this.$currencyDataFixtures.rateUpdateIntervalMs : 0
    }
  },
  methods: {
    /**
     * Default base currency - the first from the list
     * Default quote currency - the second from the list
     * Both amounts are undefined - to show placeholders
     * Also clears last exchange data from store
     */
    initFormaData () {
      this.baseCurrency = this.allAvailableCurrency[0]
      this.baseAmount = undefined

      this.quoteCurrency = this.allAvailableCurrency[1]
      this.recalculateQuote()

      this.$store.commit('currency/clearLastExchangeData')
    },

    /**
     * Defines interval for rate updates
     */
    defineRateUpdateInterval () {
      this.rateUpdateInterval = setInterval(() => {
        this.updateRateData()
      }, this.rateUpdateIntervalMs)
    },

    /**
     * Calculates amount according to the rate/commision formula
     */
    calcAmount (amount, rate, commisison) {
      return amount ? Math.floor(amount * rate * (1 - commisison/100)*100)/100 : undefined
    },
    
    /**
     * This action triggers currency fetch plugin to update rates
     */
    updateRateData () {
      this.$store.dispatch('currency/updateRateData')
    },

    /**
     * Recalculates base amount and sends update to input
     */
    recalculateBase () {
      this.baseAmount = this.quoteAmount ? this.calcAmount(this.quoteAmount, this.exchangeRateBack, this.exchangeCommission) : undefined
      this.updateBaseAmount = this.baseAmount
    },

    /**
     * Recalculates quote amount and sends update to input
     */
    recalculateQuote () {
      this.quoteAmount = this.baseAmount ? this.calcAmount(this.baseAmount, this.exchangeRateDirect, this.exchangeCommission) : undefined
      this.updateQuoteAmount = this.quoteAmount
    },

    /**
     * Exchange base and quote amount/currency with each other
     */
    exchangeCurrency () {
      const cachedBaseCurrency = this.baseCurrency
      const cachedBaseAmount = this.baseAmount

      const cachedQuoteCurrency = this.quoteCurrency
      const cachedQuoteAmount = this.quoteAmount
      
      this.baseAmount = 0
      this.quoteAmount = 0

      this.baseCurrency = cachedQuoteCurrency
      this.quoteCurrency = cachedBaseCurrency
      
      this.baseAmount = cachedQuoteAmount
      this.updateBaseAmount = this.baseAmount

      this.quoteAmount = cachedBaseAmount
      this.updateQuoteAmount = this.quoteAmount
    },

    /**
     * Catch changes of base amount from input
     */
    updateValueBase (value) {
      this.baseAmount = value
      this.recalculateQuote()
    },

    /**
     * Catch changes of quote amount from input
     */
    updateValueQuote (value) {
      this.quoteAmount = value
      this.recalculateBase()
    },

    /**
     * Does currency exchange - saves data to store, and stops rate updates as a user would leave the page
     */
    doChange () {

      const date = new Date()

      this.$store.commit('currency/saveLastExchangeData', {
        dt: ConvertUtility.convertDateToString(date),
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
        baseAmount: this.baseAmount,
        quoteAmount: this.quoteAmount,
        rate: this.exchangeRateDirect,
        commision: this.exchangeCommission
      })

      clearInterval(this.rateUpdateInterval)
    },

    /**
     * If both amounts are defined - doChange and redirects to SuccessPage
     */
    async exchange () {
      if (!this.exchangeAvailable) { return }
      this.doChange()

      await this.$nextTick()
      this.$router.push('/success')
    }
  }
}
</script>
<style lang="scss">
  $brightColor: #2d7efa;
  $borderColor: #ddd;
  .crypto-page.container {
    background-color: #f9f9f9;
    margin-top: 50px;
    h1 {
      margin-bottom: 20px;
      color: $brightColor;
    }
  }
  .crypto-exchange_block_container {
    background-color: #fff;
    padding: 30px;
    border: 1px solid $borderColor;
    margin-bottom: 50px;
    h2 {
      border-bottom: 1px solid $borderColor;
      padding-bottom: 10px;
    }
  }
  .crypto-exchange_input_block_container,
  .crypto-info_container {
    padding: 10px 0;
  }
  .crypto-label {
    margin: 0 0 10px;
    font-weight: bold;
  }
  
  .crypto-input_description {
    color: #afafaf;
    padding: 10px 5px 0;
    margin: 0;
  }
  .crypto-info_container {
    .crypto-label_part {
      text-align: left;
    }
    .crypto-value_part {
      text-align: right;
      font-weight: bold;
    }
  }
  .crypto-arrows_icon_container {
    margin: 0;
    padding: 20px 0 0;
  }
  
  .crypto-arrows_icon {
    display: inline-block;
    min-width: 100px;
    min-height: 20px;
    background-image: url("~/assets/images/arrows.svg");
    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0;
    cursor: pointer;
  }

  .crypto-currency_list {
    box-shadow: none;

    &:focus {
      box-shadow: none;
    }
  }

  .crypto-currency_list {
    max-width: 100px;
    background: $brightColor;
    color: #fff;

    &:focus {
      color: #fff;
      background-color: $brightColor;
      border-color: $brightColor;
    }
  }

  .crypto-button_block {
    margin-top: 40px;
  }
</style>