const errorInvalidRequest = -1

/**
 * select index for start loop
 * @param index
 * @param lastIndex
 * @return {number|*}
 * @private
 */
const _selectStartIndex = function (index = 0, lastIndex = 0, M = 0, L = [0]) {
  if (M === L[index] || (M > L[index] && index === lastIndex)) {
    return index
  }

  if (M > L[index]) {
    return _selectStartIndex(lastIndex  + Math.trunc((index / 2)), lastIndex)
  }

  if (M >= L[L.length - 1]) {
    return _selectStartIndex(L.length - Math.trunc(((L.length - 1) - index) / 2), index)
  }

  return -1
}

/**
 * select bills for amount
 * @return {number|*}
 */
const selectBills = function(M = 0, L = [0]) {
  const startIndexBills = _selectStartIndex(0, 0, M, L)
  if (startIndexBills === errorInvalidRequest) {
    return errorInvalidRequest
  }

  let bills = [].concat(L)
  if (startIndexBills > 0) {
   bills.splice(0, 2)
  }

  const b = bills.reduce((f, bill, i, arr) => {
    let res = f.restAmount / bill

    if (Number.isSafeInteger(res)) {
      arr.splice(i)
    }

    if ((Math.trunc(res) - res) < 0) {
      res = Math.trunc(res)
    }

    if (res !== 0) {
      f.restAmount = f.restAmount - bill * res
      f.bills.push({ nb: res, bill })
    }

    return f

  }, { restAmount: M, bills: [] })

  if (b.restAmount !== 0) {
    return errorInvalidRequest
  }

  return b
}

/**
 * number bills
 * @param {number|{bills:[{nb: number, bill: number}]}} list
 * @return {number}
 */
const nbBills = function(list) {
    if (list === errorInvalidRequest) {
      return errorInvalidRequest
    }
    console.log(list.bills)
    return list.bills.reduce((f, c) => f + c.nb, 0)
}

//exemple 1
const Ma = 626.5
const La = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
Pa = nbBills(selectBills(Ma, La))
console.log(Pa)

// exemple 2
const Mb = 626.5
const Lb =  [500, 200, 100, 50, 20, 10, 5]
Pb = nbBills(selectBills(Mb, Lb))
console.log(Pb)