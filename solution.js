"use strict";
exports.__esModule = true;
var testNum = 9;
var inputArray = [[testNum, testNum]];
var factorials = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
function calculateMinDigits(num) {
    return Math.ceil(num / 9);
}
function generateSpreadFromInteger(num, digit) {
    if (digit > num)
        return "STOP1";
    if (digit === Math.ceil(num / 9) || arguments.length === 1) {
        var nines = Math.floor(num / 9);
        var remainder = num % 9 === 0 ? "" : (num % 9).toString();
        return remainder + "9".repeat(nines);
    }
    return "1" + generateSpreadFromInteger(num - 1, digit - 1);
}
function generateNumberFromSpread(spread, minDigits) {
    var num = parseInt(spread);
    var totalDigits = 0;
    var str = "";
    while (num > 0) {
        for (var i = 0; i <= 8; i++) {
            if (factorials[i] > num) {
                var divisor = factorials[i - 1];
                var howMany = Math.floor(num / divisor);
                str = i.toString().repeat(howMany) + str;
                num -= factorials[i - 1] * howMany;
                totalDigits += howMany;
                break;
            }
        }
        // if (arguments.length === 2) {
        //     if (totalDigits > minDigits) return "STOP2";
        // }
    }
    return str;
}
function canBeChangedAt(spread) {
    for (var i = spread.length - 1; i > 0; i--) {
        if (spread[i] != "1" && spread[i - 1] != "9") {
            return i - 1;
        }
    }
    return -1;
}
function isFirstGreater(first, second) {
    for (var i = 0; i < first.length; i++) {
        if (first[i] > second[i])
            return true;
    }
    return false;
}
function checkedAllPossibleCandidates(_mySpread, _currentNumber, _smallestNumber) {
    return _mySpread === "STOP1" || parseInt(_mySpread) > _smallestNumber.length * 362880;
}
// Begin Math
//
for (var i = testNum; i <= Math.max.apply(Math, inputArray.map(function (arr) { return arr[0]; })); i++) {
    var spread = generateSpreadFromInteger(i);
    var smallestNumberSoFar = generateNumberFromSpread(spread);
    var smallestLengthSoFar = smallestNumberSoFar.length;
    var currentNumber = smallestNumberSoFar;
    var currentLength = currentNumber.length;
    var smallestNumberfound = false;
    var counter = 1;
    do {
        console.log(currentNumber, spread, counter);
        var changeableIndex = canBeChangedAt(spread);
        if (changeableIndex != -1) {
            var first = spread.substring(0, changeableIndex);
            var firstInt = first === "" ? 0 : first.split("").reduce(function (acc, cur) { return acc + parseInt(cur); }, 0);
            var second = parseInt(spread[changeableIndex]) + 1;
            var third = generateSpreadFromInteger(i - firstInt - second, spread.length - first.length - 1);
            spread = first + second + third;
        }
        else {
            spread = generateSpreadFromInteger(i, calculateMinDigits(i) + counter);
            counter++;
        }
        currentNumber = generateNumberFromSpread(spread, smallestLengthSoFar);
        if (currentNumber.length < smallestLengthSoFar) {
            smallestNumberSoFar = currentNumber;
        }
        if (currentNumber.length === smallestLengthSoFar) {
            if (isFirstGreater(smallestNumberSoFar, currentNumber))
                smallestNumberSoFar = currentNumber;
        }
    } while (!checkedAllPossibleCandidates(spread, currentNumber, smallestNumberSoFar));
    {
    }
}
// End Math
//
module.exports = {
    calculateMinDigits: calculateMinDigits,
    canBeChangedAt: canBeChangedAt,
    generateNumberFromSpread: generateNumberFromSpread,
    generateSpreadFromInteger: generateSpreadFromInteger,
    isFirstGreater: isFirstGreater,
    checkedAllPossibleCandidates: checkedAllPossibleCandidates
};
