<template lang="pug">
  div.crypto-page.crypto-page-success.container.text-center
    div.card.card-success.mx-auto
      div.card-header
        div.crypto-checkmark
          i.checkmark ✓
      div.card-body
        h1 Success
        h3 Your exchange<br />was done!    
</template>

<script>

export default {
  name: 'SuccessPage',
  data () {
    return {
      showCheckData: false
    }
  }
}
</script>
<style lang="scss">
  $brightColor: #2d7efa;

  .crypto-page.crypto-page-success {
    margin-top: 150px;
  }

  .card.card-success {
    width: 300px;

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
