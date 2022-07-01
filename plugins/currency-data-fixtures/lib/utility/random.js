export default class RandomUtility {

  static getRandomFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  static getRandomFromRange (min, max) {
    const delta = max - min
    const initialRandom = Math.random()
    const multiplied = initialRandom * delta
    const floored = Math.floor(multiplied)
    
    return floored * min
  }
}
