const {
    calculateMinDigits,
    canBeChangedAt,
    generateNumberFromSpread,
    generateSpreadFromInteger,
    isFirstGreater,
    checkedAllPossibleCandidates,
    generateNextSpread
} = require('../solution');

test("calculateMinDigits should return correct min digit", () => {
    expect(calculateMinDigits(18)).toBe(2)
    expect(calculateMinDigits(23)).toBe(3)
    expect(calculateMinDigits(8)).toBe(1)
    expect(calculateMinDigits(100)).toBe(12)
})

test("generateSpreadFromInteger shoudl return correct spread", () => {
    expect(generateSpreadFromInteger(8)).toBe("8")
    expect(generateSpreadFromInteger(23, 3)).toBe("599")
    expect(generateSpreadFromInteger(18)).toBe("99")
    expect(generateSpreadFromInteger(19, 4)).toBe("1189")
    expect(generateSpreadFromInteger(19, 3)).toBe("199")
})

test("generateNumberFromSpread function should return correct number", () => {
    expect(generateNumberFromSpread("321111", 14)).toBe("12233344445555")
    expect(generateNumberFromSpread("11", 4)).toBe("1223")
    expect(generateNumberFromSpread("599", 13)).toBe("STOP2")
    expect(generateNumberFromSpread("11", 3)).toBe("STOP2")
})

test("canBeChangedAt function should return correct index", () => {
    expect(canBeChangedAt("321111")).toBe(0)
    expect(canBeChangedAt("599")).toBe(0)
    expect(canBeChangedAt("995")).toBe(-1)
    expect(canBeChangedAt("4518")).toBe(2)
})

test("isFirstGreater should return correct boolean", () => {
    expect(isFirstGreater("1111112", "1111112")).toBe(false)
    expect(isFirstGreater("1111112", "1111110")).toBe(true)
    expect(isFirstGreater("1111112", "1111113")).toBe(false)
    expect(isFirstGreater("1111112", "4512983")).toBe(false)
})

test("checkedAllPossibleCandidates should return correct boolean", () => {
    expect(checkedAllPossibleCandidates("599", "1451520", "2222")).toBe(false)
    expect(checkedAllPossibleCandidates("599", "1451521", "2222")).toBe(true)
})

test("generateNextSpread should return correct spread", () => {
    expect(generateNextSpread())
})
