import { expect, test } from "bun:test";

import FCRCalculation from "./fcr-calculation-module"

let validExpectedInput = [
    { id: 'total-no-incidents-opened', defaultValue: 100, currentValue: 80 },
    { id: 'total-no-incidents-resolved', defaultValue: 80, currentValue: 75 },
    { id: 'total-no-incidents-reopened', defaultValue: 20, currentValue: 30 }]

let inputWithMissingField = [
    { id: 'total-no-incidents-resolved', currentValue: 75 },
    { id: 'total-no-incidents-reopened', currentValue: 30 }]

let inputWithMissingValue = [
    { id: 'total-no-incidents-opened', defaultValue: 80 },
    { id: 'total-no-incidents-resolved', defaultValue: 80, currentValue: 75 },
    { id: 'total-no-incidents-reopened', defaultValue: 20, currentValue: 30 }]


test("Valid constructor", () => {

    let extension = new FCRCalculation(validExpectedInput)

    expect(extension.values['total-no-incidents-opened']).toBe(parseInt(validExpectedInput[0].currentValue))
    expect(extension.values['total-no-incidents-resolved']).toBe(parseInt(validExpectedInput[1].currentValue))
    expect(extension.values['total-no-incidents-reopened']).toBe(parseInt(validExpectedInput[2].currentValue))
})

test("Invalid constructor", () => {


    //Passing an undefined object as param throw error
    let a = () => {
        let extension2 = new FCRCalculation(undefined, validExpectedInput)
    }

    expect(a).toThrow(Error)

    //Missing a param
    let v = () => {
        let extension2 = new FCRCalculation(inputWithMissingField)
    }

    expect(v).toThrow(Error)

    
    // Missing expected input 
    let t = () => {
        let extension2 = new FCRCalculation(inputWithMissingField,validExpectedInput)
    }

    expect(t).toThrow(Error)
})

test("Missing CurrentValue", () => {

    let extension = new FCRCalculation(inputWithMissingValue, validExpectedInput)

    expect(extension.values['total-no-incidents-opened']).toBe(parseInt(validExpectedInput[0].defaultValue))

})

test("Correct FCR rate result", () => {

    let extension = new FCRCalculation(validExpectedInput)

    expect(extension.result_fcr).toBe("56")

})

test("Correct FCR increase in pts result", () => {

    let extension = new FCRCalculation(validExpectedInput)

    expect(extension.result_fcr_increase_pts).toBe("7.9")
})

test("Correct target FCR result", () => {

    let extension = new FCRCalculation(validExpectedInput)

    expect(extension.result_fcr_target).toBe("64")
})