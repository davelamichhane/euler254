export {}

let testNum = 9;
const inputArray: [number, number][] = [[testNum, testNum]];
const factorials = [1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

function calculateMinDigits(num: number): number {
    return Math.ceil(num / 9)
}

function generateSpreadFromInteger(num: number, digit?: number): string {
    if (digit > num) return "STOP1"

    if (digit === Math.ceil(num / 9) || arguments.length === 1) {
        let nines = Math.floor(num / 9);
        let remainder = num % 9 === 0 ? "" : (num % 9).toString();
        return remainder + "9".repeat(nines);
    }

    return "1" + generateSpreadFromInteger(num - 1, digit - 1);
}

function generateNumberFromSpread(spread: string, minDigits?: number): string {
    let num = parseInt(spread);
    let totalDigits = 0;
    let str = "";

    while (num > 0) {
        for (let i = 0; i <= 8; i++) {
            if (factorials[i] > num) {
                let divisor = factorials[i - 1];
                let howMany = Math.floor(num / divisor);
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

function canBeChangedAt(spread: string): number {
    for (let i = spread.length - 1; i > 0; i--) {
        if (spread[i] != "1" && spread[i - 1] != "9") {
            return i - 1;
        }
    }
    return -1
}


function isFirstGreater(first: string, second: string): boolean {
    for (let i = 0; i < first.length; i++) {
        if (first[i] > second[i]) return true;
    }
    return false;
}

function checkedAllPossibleCandidates(_mySpread: string, _currentNumber: string, _smallestNumber: string): boolean {
    return _mySpread === "STOP1" || parseInt(_mySpread) > _smallestNumber.length * 362880;
}

// Begin Math
//
for (let i = testNum; i <= Math.max(...inputArray.map(arr => arr[0])); i++) {
    let spread = generateSpreadFromInteger(i);

    let smallestNumberSoFar = generateNumberFromSpread(spread);
    let smallestLengthSoFar = smallestNumberSoFar.length;

    let currentNumber = smallestNumberSoFar;
    let currentLength = currentNumber.length;

    let smallestNumberfound = false;
    let counter = 1;
    do {
        console.log(currentNumber, spread, counter);
        let changeableIndex = canBeChangedAt(spread);
        if (changeableIndex != -1) {
            let first = spread.substring(0, changeableIndex);
            let firstInt = first === "" ? 0 : first.split("").reduce((acc, cur) => acc + parseInt(cur), 0);
            let second = parseInt(spread[changeableIndex]) + 1;
            let third = generateSpreadFromInteger(i - firstInt - second, spread.length - first.length - 1);
            spread = first + second + third;
        } else {
            spread = generateSpreadFromInteger(i, calculateMinDigits(i) + counter);
            counter++;
        }

        currentNumber = generateNumberFromSpread(spread, smallestLengthSoFar)

        if (currentNumber.length < smallestLengthSoFar) {
            smallestNumberSoFar = currentNumber
        }

        if (currentNumber.length === smallestLengthSoFar) {
            if (isFirstGreater(smallestNumberSoFar, currentNumber)) smallestNumberSoFar = currentNumber;
        }

    } while (!checkedAllPossibleCandidates(spread, currentNumber, smallestNumberSoFar)) {

    }
}

// End Math
//
module.exports = {
    calculateMinDigits,
    canBeChangedAt,
    generateNumberFromSpread,
    generateSpreadFromInteger,
    isFirstGreater,
    checkedAllPossibleCandidates,
}
