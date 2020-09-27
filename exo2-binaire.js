const bit32 = 0x80000000 // number bit 32

/**
 * select the stronger big
 * @param {number} number
 * @return {number}
 */
function getBit (number = 0) {
  // iter Max bit from min bit
  for (let i = 32; i > 0; i--) {
    if ((number & bit32) !== 0) {
      return i
    }
    number = number << 1
  }
}

/**
 * return the maximum value
 * @param {number} number
 * @return {number}
 */
function getMaxValue(number = 0) {
  const bit = getBit(number)
  let maxValue = 0
  let count = 0

  for (let i = 0; i < bit; i++) {
    if((number & 1) === 0) {
      count++
    } else {
      count = 0
    }
    if(count > maxValue) maxValue = count
    number = number >>> 1
  }

  return maxValue
}

let numberA = 123456
console.log(getMaxValue(numberA))

let numberB = 65535
console.log(getMaxValue(numberB))


