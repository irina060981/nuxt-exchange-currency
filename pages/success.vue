<template lang="pug">
  div.container 
    SuccessExchangeBlock( v-if="successPageAvailable" )

    div.crypto-page.crypto-page-no-success.container.text-center( v-if="!successPageAvailable" )
      div.card.card-success.mx-auto
        div.card-header
          h1 You need to do exchange first         
        div.card-footer
          p.crypto-button_block
              button.btn.btn-primary.btn-block(@click="backToExchange") Exchange
</template>

<script>

export default {
  name: 'SuccessPage',
  computed: {
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

