import { expect, test } from "bun:test";

import NPSCalculation from "./nps-calculation-module"

let validExpectedInput = [
    {id:'total-no-promoters', currentValue:100},
    {id:'total-no-passives', currentValue: 50},
    {id:'total-no-detractors', currentValue:20}
]

let goodExpectedInput = [
    {id:'total-no-promoters', currentValue:50},
    {id:'total-no-passives', currentValue: 50},
    {id:'total-no-detractors', currentValue:20}
]

let excellentExpectedInput = [
    {id:'total-no-promoters', currentValue:100},
    {id:'total-no-passives', currentValue: 20},
    {id:'total-no-detractors', currentValue:0}
]

let needImprovmentExpectedInput = [
    {id:'total-no-promoters', currentValue:0},
    {id:'total-no-passives', currentValue: 50},
    {id:'total-no-detractors', currentValue:50}
]

let inputWithZeros = [
    {id:'total-no-promoters', currentValue:0},
    {id:'total-no-passives', currentValue: 0},
    {id:'total-no-detractors', currentValue:0}
]


let inputWithMissingField = [
    { id: 'total-no-promoters', currentValue: 100 },
    { id: 'total-no-passives', currentValue: 50 }]

let inputWithMissingValue = [
    { id: 'total-no-promoters' },
    { id: 'total-no-passives',  currentValue: 50 },
    { id: 'total-no-detractors',  currentValue: 20 }]


test("Valid constructor", () => {

    let extension = new NPSCalculation(validExpectedInput)

    expect(extension.values['total-no-promoters']).toBe(parseInt(validExpectedInput[0].currentValue))
    expect(extension.values['total-no-passives']).toBe(parseInt(validExpectedInput[1].currentValue))
    expect(extension.values['total-no-detractors']).toBe(parseInt(validExpectedInput[2].currentValue))
})

test("Invalid constructor", () => {


    //Passing an undefined object as param throw error
    let a = () => {
        let extension2 = new NPSCalculation(undefined, validExpectedInput)
    }

    expect(a).toThrow(Error)

    //Missing a param
    let v = () => {
        let extension2 = new NPSCalculation(inputWithMissingField)
    }

    expect(v).toThrow(Error)

    
    // Missing expected input 
    let t = () => {
        let extension2 = new NPSCalculation(inputWithMissingField,validExpectedInput)
    }

    expect(t).toThrow(Error)
})

test("Missing CurrentValue", () => {

    let extension = new NPSCalculation(inputWithMissingValue, validExpectedInput)

    expect(extension.values['total-no-promoters']).toBe(parseInt(NPSCalculation.EXPECTED_DEFAULT_VALUES[0].defaultValue))

})

test("Correct NPS result", () => {

    let extension = new NPSCalculation(validExpectedInput)
    expect(extension.result_nps).toBe("47")
    expect(extension.nps_level).toBe(NPSCalculation.NPS_LEVELS.Great)

})

test("Corresponding NPS Levels", () => {

    let extension = new NPSCalculation(validExpectedInput)
    expect(extension.result_nps).toBe("47")
    expect(extension.nps_level).toBe(NPSCalculation.NPS_LEVELS.Great)

    extension = new NPSCalculation(goodExpectedInput)
    expect(extension.result_nps).toBe("25")
    expect(extension.nps_level).toBe(NPSCalculation.NPS_LEVELS.Good)

    extension = new NPSCalculation(needImprovmentExpectedInput)
    expect(extension.result_nps).toBe("-50")
    expect(extension.nps_level).toBe(NPSCalculation.NPS_LEVELS.NeedImprovment)

    extension = new NPSCalculation(excellentExpectedInput)
    expect(extension.result_nps).toBe("83")
    expect(extension.nps_level).toBe(NPSCalculation.NPS_LEVELS.Excellent)
})

test("Correct total respondents result", () => {

    let extension = new NPSCalculation(validExpectedInput)

    expect(extension.result_total_respondents).toBe("170")

})


test("Zeros in input returns - char", () => {

    let extension = new NPSCalculation(inputWithZeros)

    expect(extension.result_total_respondents).toBe("-")
    expect(extension.result_nps).toBe("-")

})