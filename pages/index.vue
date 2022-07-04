<template lang="pug">
  div.crypto-page.container.text-left
    div.row
    h1 Currency Exchange

    CurrencyExchangeBlock

    p.crypto-line-link(@click="showCheckData = !showCheckData") See generated data structures
    CheckDataBlock(v-show = "showCheckData")
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      showCheckData: false
    }
  }
}
</script>
<style lang="scss">
  $brightColor: #2d7efa;

  .crypto-line-link {
    text-decoration: underline;
    font-size: 110%;
    color: $brightColor;
    cursor: pointer;
  }
</style>
