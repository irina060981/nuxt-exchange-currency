<template lang="pug">
  div.crypto-page.crypto-page-success.container.text-center
    div.card.card-success.mx-auto
      div.card-header
        div.crypto-checkmark
          i.checkmark ✓
        h1 Success
        h3 Your exchange was done!
      div.card-body
        div.crypto-info_container.container
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange date/time
            span.col-sm-6.crypto-value_part {{ lastExchangeData.dt }} 
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange amount
            span.col-sm-6.crypto-value_part {{ lastExchangeData.baseAmount }} {{ lastExchangeData.baseCurrency }} = {{ lastExchangeData.quoteAmount }} {{ lastExchangeData.quoteCurrency }}
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange rate
            span.col-sm-6.crypto-value_part 1{{ lastExchangeData.baseCurrency }} = {{ lastExchangeData.rate }} {{ lastExchangeData.quoteCurrency }}
          p.row.justify-content-between
            span.col-sm-6.crypto-label_part Exchange commission
            span.col-sm-6.crypto-value_part {{ lastExchangeData.commision }}%
          
      div.card-footer
        p.crypto-button_block
            button.btn.btn-primary.btn-block(@click="backToExchange") Exchange again
</template>

<script>

export default {
  name: 'SuccessExchangeBlock',
  data () {
    return {
      showCheckData: false
    }
  },
  computed: {
    lastExchangeData () {
      return this.$store.state.currency.lastExchangeData
    },
    successPageAvailable () {
      return this.$store.state.currency.successPageAvailable
    }
  },
  methods: {
    backToExchange () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
  $brightColor: #2d7efa;

  .crypto-page.crypto-page-success {
    margin-top: 50px;
  }

  .card.card-success {
    width: 90%;
    max-width: 400px;

    .card-header {
      background-color: #fff;
    }
  }

  .crypto-checkmark {
    border-radius:200px; 
    height:200px; 
    width:200px; 
    background: #2d7efa; 
    margin:0 auto;

    i {
        color: #fff;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
    }
  }

</style>
