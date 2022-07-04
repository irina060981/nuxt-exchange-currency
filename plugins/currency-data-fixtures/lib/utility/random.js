export default class RandomUtility {

  /**
   * Gets a random item from the input array
   * @param {Array} arr 
   * @returns {Element from Array}
   */
  static getRandomFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /**
   * Gets a random value from the delta (min-max)
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  static getRandomFromRange (min, max) {
    const delta = max - min
    const initialRandom = Math.max(Math.random(), 0.1)
    const multiplied = initialRandom * delta
    
    return Math.floor(multiplied)
  }
}
