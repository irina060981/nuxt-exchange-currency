import { expect, it, jest } from '@jest/globals'

import { mount, createLocalVue, config   } from '@vue/test-utils'
import Vuex from "vuex"

import CurrencyInput from '@/components/currency-input.vue'
import CurrencyDataFixtures from '@/plugins/currency-data-fixtures'

describe('CurrencyInput component', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  it('1. CurrencyInput - change value with integer number, emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: 45
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45 ])
  })

  it('2. CurrencyInput - change value with float number (1 decimal), emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: 45.2
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45.2)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45.2 ])
  })

  it('3. CurrencyInput - change value with float number (2 decimal), emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: 45.25
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45.25)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45.25 ])
  })

  it('4. CurrencyInput - change value with float number (3 decimal), number would be rounded 2 decimals, emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: 45.258
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45.26)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45.26 ])
  })

  it('5. CurrencyInput - change value with float number with comma, comma would be replaced with point, emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: '45,258'
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45.26)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45.26 ])
  })

  it('6. CurrencyInput - change value with float number with letters at the end, letters would be removed, emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    inputComp.setData({
      value: '45,258ghgj'
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(45.26)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ 45.26 ])
  })

  it('7. CurrencyInput - change value with with letters at the end, value would be set to undefined, emit event should happen', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    await inputComp.setData({
      value: 'ghgj'
    })
    await inputComp.trigger('keyup', { key: 32 })

    expect(inputComp.vm.$data.value).toEqual(undefined)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    expect(inputComp.emitted()['updateValue']).toBeTruthy()
    expect(inputComp.emitted()['updateValue'][0]).toEqual( [ undefined ])
  })

  it('8. CurrencyInput - update value with externalValue - check would be done', async () => {
    const inputComp = mount(CurrencyInput, {
      localVue,
      propsData: {
        placeholder: 'test placeholder'
      }
    })

    jest.spyOn(inputComp.vm, 'checkValue')

    await inputComp.setData({
      value: '24'
    })
    
    await inputComp.setProps({
      externalValue: 84
    })
    
    expect(inputComp.vm.$data.value).toEqual(84)
    expect(inputComp.vm.checkValue).toHaveBeenCalled()

    await inputComp.setProps({
      externalValue: '74,54'
    })

    expect(inputComp.vm.$data.value).toEqual(74.54)
  })

})
