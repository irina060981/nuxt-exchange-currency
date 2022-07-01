<template lang="pug">
    div.row.justify-content-between
      div.crypto-exchange_block_container.col-md-5
        h2 Exchange {{ baseCurrency }} to {{ quoteCurrency }}
        div.crypto-exchange_input_block_container
          p.crypto-label You Pay
          CurrencyInput( mode = "base" :excludeCurrency = "quoteCurrency" :calcValue = "baseAmount" @updateCurrencyAmount = "updateBaseCurrencyAmount" @updateCurrencyItem = "updateBaseCurrencyItem" )
          p.crypto-input_description Available: 0 {{ baseCurrency }}

          p.crypto-arrows_icon_container.d-flex.justify-content-end
            span.crypto-arrows_icon( @click="exchangeCurrency" )
            
          p.crypto-label You Get
          CurrencyInput( mode = "quote" :excludeCurrency = "baseCurrency" :calcValue = "quoteAmount"  @updateCurrencyAmount = "updateQuoteCurrencyAmount" @updateCurrencyItem = "updateQuoteCurrencyItem" )
          p.crypto-input_description Available: 0 {{ quoteCurrency }}

      div.crypto-exchange_block_container.col-md-6
        h2 Summary
        div.crypto-info_container.container
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Your {{ baseCurrency }} Balance
            span.col-sm-6.crypto-value_part 0 {{ baseCurrency }}
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Your {{ quoteCurrency }} Balance
            span.col-sm-6.crypto-value_part 0 {{ quoteCurrency }}  
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Rate ({{ baseCurrency }} -> {{ quoteCurrency }})
            span.col-sm-6.crypto-value_part {{ exchangeRateDirect }}
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Commission ({{ baseCurrency }} -> {{ quoteCurrency }})
            span.col-sm-6.crypto-value_part {{ exchangeCommissionDirect }}%
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Rate ({{ quoteCurrency }} -> {{ baseCurrency }})
            span.col-sm-6.crypto-value_part {{ exchangeRateBack }}
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange Commission ({{ quoteCurrency }} -> {{ baseCurrency }})
            span.col-sm-6.crypto-value_part {{ exchangeCommissionBack }}%
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Update Counter
            span.col-sm-6.crypto-value_part {{ updated }}
</template>
<script>
export default {
  name: 'CurrencyExchangeBlock',
  data () {
    return {
      baseCurrency: null,
      quoteCurrency: null,

      baseAmount: undefined,
      quoteAmount: undefined
    }
  },
  watch: {
    'this.$store.state.currency.updated' () {
      this.reCalculateQuote()
    }
  },
  mounted () {
    // this.initCurrencyChoice()

    /*
    setInterval(() => {
    // setTimeout(() => {
      this.updateRateData()
    }, 10000)
    */
  },
  computed: {
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

    exchangeCommissionDirect () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairDirect] ? 
                  this.currencyData[this.currencyPairDirect].commission : 
                  0
    },

    exchangeRateBack () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairBack] ? 
                  this.currencyData[this.currencyPairBack].rate : 
                  0
    },

    exchangeCommissionBack () {
      return  this.$store.state.currency.updated && this.currencyData[this.currencyPairBack] ? 
                  this.currencyData[this.currencyPairBack].commission : 
                  0
    }
  },
  methods: {
    updateRateData () {
      this.$store.dispatch('currency/updateRateData')
    },

    updateBaseCurrencyAmount (newAmount) {
      this.baseAmount = newAmount
      this.reCalculateQuote()
    },

    updateBaseCurrencyItem (newCurrencyItem) {
      this.baseCurrency = newCurrencyItem
      this.reCalculateQuote()
    },

    updateQuoteCurrencyAmount (newAmount) {
      this.quoteAmount = newAmount
      this.reCalculateBase()
    },

    updateQuoteCurrencyItem (newCurrencyItem) {
      this.quoteCurrency = newCurrencyItem
      this.reCalculateQuote()
    },

    reCalculateBase () {
      this.baseAmount = this.quoteAmount ? this.quoteAmount * this.exchangeRateBack * (1 - this.exchangeCommissionBack/100) : undefined
    },

    reCalculateQuote () {
      this.quoteAmount = this.baseAmount ? this.baseAmount * this.exchangeRateDirect * (1 - this.exchangeCommissionDirect/100) : undefined
    },

    async exchangeCurrency () {
      const cachedBaseCurrency = this.baseCurrency
      const cachedBaseAmount = this.baseAmount

      const cachedQuoteCurrency = this.quoteCurrency
      const cachedQuoteAmount = this.quoteAmount
      
      this.baseCurrency = null
      this.quoteCurrency = null

      await this.$nextTick()

      this.baseCurrency = cachedQuoteCurrency
      this.baseAmount = cachedQuoteAmount

      this.quoteCurrency = cachedBaseCurrency
      this.quoteAmount = cachedBaseAmount
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
  }
</style>


