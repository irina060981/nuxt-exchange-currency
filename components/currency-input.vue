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
    /**
     * We could catch an update from parent, when it is recalculated base on other date
     */
    externalValue () {
      this.value = this.externalValue
      this.checkValue()
    }
  },
  methods: {
    /**
     * Checks if value is a number (string number would be considered as number)
     * @param {Any} value 
     * @returns {Boolean}
     */
    isNumeric (value) {
      let checkValue = "" + value
      return !isNaN(checkValue) && !isNaN(parseFloat(checkValue));
    },

    /**
     * Checks if value has decimal part
     * @param {Number} value 
     * @returns {Boolean}
     */
    hasDecimal (value) {
      return (value - Math.floor(value)) !== 0
    },

    /**
     * Checks this.value to be a number, tries to convert to float with max 2 decimals
     */
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
        this.value = parseFloat(parseFloat(this.value).toFixed(2))
      }

      if (!this.isNumeric(this.value)) {
        this.value = undefined
      }
    },
    /**
     * Checks this.value to be a number and sends to $parent
     */
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