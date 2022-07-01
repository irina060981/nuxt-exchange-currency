<template lang="pug">
    div.crypto-exchange_input_block.input-group
        input.crypto-currency_input.form-control( type="text" placeholder="Pay Amount" v-model="amount" @keyup = "emitUpdateCurrencyAmount")
        select.crypto-currency_list.form-control( v-model="currency" @change = "emitUpdateCurrencyItem" )
            option(v-for="currencyItem in availableCurrency" :key="currencyItem") {{ currencyItem }}
</template>

<script>
export default {
  name: 'CurrencyInput',
  props: {
    mode: {
      type: String,
      required: true
    },
    excludeCurrency: {
      type: String,
      required: false,
      default: null
    },
    calcValue: {
      type: [String, Number],
      required: false,
      default: undefined
    },
    calcCurrency: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      currency: null,
      amount: null
    }
  },
  watch: {
    calcValue () {
      this.amount = this.calcValue
    },
    calcCurrency () {
      this.currency = this.calcCurrency
    },
    async excludeCurrency () {
      await this.$nextTick()
      if (!this.currency) {
        this.initCurrencyChoice()
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    this.initCurrencyChoice()
  },
  computed: {
    allAvailableCurrency () {
      return this.$currencyDataFixtures.availableCurrency
    },

    availableCurrency () {
      console.info('availableCurrency - ', this.mode, this.excludeCurrency )
      const result = this.excludeCurrency ? 
                this.allAvailableCurrency.filter(currency => currency != this.excludeCurrency) :
                this.allAvailableCurrency
      console.info('availableCurrency - result - ', this.mode, result)
      return result
    }
  },
  methods: {
    initCurrencyChoice () {
      this.currency = this.availableCurrency[0]
      this.emitUpdateCurrencyItem()
    },
    emitUpdateCurrencyItem () {
      this.$emit('updateCurrencyItem', this.currency)
    },
    emitUpdateCurrencyAmount () {
      this.$emit('updateCurrencyAmount', this.amount)
    }
  }
}
</script>
<style lang="scss">
  $brightColor: #2d7efa;
  $borderColor: #ddd;

  .crypto-currency_input,
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
</style>