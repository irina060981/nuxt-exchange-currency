<template lang="pug">
  div.container.text-left
    h6 Currency Pairs list with commssion/rate ({{ currencyCommission.length }} pairs of {{ allAvailableCurrency.length }} items)

    p.crypto-line-link( @click = "toggleSection(0)" ) All available currencies 
    pre(v-show="sectionsShow[0]") {{ allAvailableCurrency }}

    p.crypto-line-link( @click = "toggleSection(1)" ) Generated list currency/commision   
    pre(v-show="sectionsShow[1]") {{ JSON.stringify(currencyCommission, null, 2) }}

    p.crypto-line-link( @click = "toggleSection(2)" ) Generated list currency/rate   
    pre(v-show="sectionsShow[2]") {{ JSON.stringify(currencyRate, null, 2) }}
</template>

<script>

export default {
  name: 'CheckDataBlock',
  data () {
    return {
      sectionsShow: [ false, false, false ]
    }
  },
  computed: {
    allAvailableCurrency () {
      return this.$currencyDataFixtures.availableCurrency
    },
    currencyCommission () {
      return this.$store.state.currency.updated ? this.$currencyDataFixtures.allCurrencyPairsCommissions : {}
    },
    currencyRate () {
      return this.$store.state.currency.updated ? this.$currencyDataFixtures.lastUsedCurrencyRateData : {}
    }
  },
  methods: {
    toggleSection (sectionNum) {
      this.$set(this.sectionsShow, sectionNum, !this.sectionsShow[sectionNum])
    }
  }
}
</script>

