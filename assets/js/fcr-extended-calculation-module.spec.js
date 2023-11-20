import { expect, test } from "bun:test";

import FCRExtendedCalculation from "./fcr-extended-calculation-module"

let validExpectedInput = [
    {id:'total-no-incidents-opened', defaultValue:100, currentValue: 80},
    {id:'total-no-incidents-resolved', defaultValue: 80, currentValue: 75},
    {id:'total-no-incidents-reopened', defaultValue:20, currentValue: 30}]

let validExpectedInputWithMissingValue = [
    {id:'total-no-incidents-resolved', defaultValue: 80},
    {id:'total-no-incidents-resolved', defaultValue: 80, currentValue: 75},
    {id:'total-no-incidents-reopened', defaultValue:20, currentValue: 30}]
    
test("Valid constructor", () => {

    let extension = new FCRExtendedCalculation(validExpectedInput)

    expect(extension.totalNoIncidentsOpened).toBe(parseInt(validExpectedInput[0].currentValue))
    expect(extension.totalNoIncidentsResolved).toBe(parseInt(validExpectedInput[1].currentValue))
    expect(extension.totalNoIncidentsReopened).toBe(parseInt(validExpectedInput[2].currentValue))
})


test("Invalid constructor", () => {

    let t = () => {
        let extension2 = new FCRExtendedCalculation(validExpectedInputWithMissingValue)
    }

    expect(t).toThrow(Error)
})

test("Correct FCR rate result", () => {

    let extension = new FCRExtendedCalculation(validExpectedInput)

    expect(extension.result_fcr).toBe("67")

})


test("Correct FCR increase in pts result", () => {

    let extension = new FCRExtendedCalculation(validExpectedInput)

    expect(extension.result_fcr_increase).toBe("9.3")
})



test("Correct target FCR result", () => {

    let extension = new FCRExtendedCalculation(validExpectedInput)

    expect(extension.result_target_fcr).toBe("76")
})