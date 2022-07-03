<template lang="pug">
  input.crypto-currency_input.form-control( type="text" :placeholder="placeholder" v-model="value" @keyup = "changeValue")
</template>
<script>
export default {
  name: 'CurrencyInput',
  props: {
    placeholder: {
      type: String,
      required: false
    },
    externalValue: {
      type: [String, Number],
      required: false
    }
  },
  data () {
    return {
      value: undefined
    }
  },
  watch: {
    externalValue () {
      this.value = this.externalValue
      this.checkValue()
    }
  },
  methods: {
    isNumeric (value) {
      let checkValue = "" + value
      return !isNaN(checkValue) && !isNaN(parseFloat(checkValue));
    },
    
    hasDecimal (value) {
      return (value - Math.floor(value)) !== 0
    },

    checkValue () {
      if (!this.value) { return }
      if (this.value.length >1) {
        this.value = this.value.replace(',', '.')
      }
      
      if (this.isNumeric(this.value)) {
        if (this.hasDecimal(this.value)) {
          this.value = parseFloat(parseFloat(this.value).toFixed(2))
        }
        return        
      }
      if (!this.isNumeric(this.value)) {
        this.value = parseFloat(this.value)
      }

      if (!this.isNumeric(this.value)) {
        this.value = undefined
      }
    },
    changeValue () {
      this.checkValue()
      this.$emit('updateValue', this.value)
    }

  }
}
</script>
<style lang="scss">
  .crypto-currency_input {
    box-shadow: none;

    &:focus {
      box-shadow: none;
    }
  }
</style>