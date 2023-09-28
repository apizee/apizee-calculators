import { expect, test } from "bun:test";

import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module"


let validExpectedInput = [
    {id:'num-truck-rolls', defaultValue:80, currentValue: 80},
    {id:'cost-per-distance', defaultValue: 20, currentValue: 20},
    {id:'avg-truck-roll-distance', defaultValue:30, currentValue: 30},
    {id:'avg-truck-roll-duration', defaultValue:2, currentValue: 2},
    {id:'num-technicians', defaultValue:5, currentValue: 5},
    {id:'no-fault-found-rate',  defaultValue:15, currentValue: 15}]

let validExpectedInputWithMissingValue = [
        {id:'num-truck-rolls', defaultValue:80},
        {id:'cost-per-distance', defaultValue: 20, currentValue: 20},
        {id:'avg-truck-roll-distance', defaultValue:30, currentValue: 30},
        {id:'avg-truck-roll-duration', defaultValue:2, currentValue: 2},
        {id:'num-technicians', defaultValue:5, currentValue: 5},
        {id:'no-fault-found-rate',  defaultValue:15, currentValue: 15}]
    
    

test("Valid Constructor", () => {

    let extension = new TruckRollExtendedCalculation(validExpectedInput)

    expect(extension.numTruckRolls).toBe(parseInt(validExpectedInput[0].currentValue))
    expect(extension.costPerDistance).toBe(parseFloat(validExpectedInput[1].currentValue))
    expect(extension.avgTruckRollDistance).toBe(parseFloat(validExpectedInput[2].currentValue))
    expect(extension.avgTruckRollDuration).toBe(parseFloat(validExpectedInput[3].currentValue))
    expect(extension.numTechnicians).toBe(parseFloat(validExpectedInput[4].currentValue))
    expect(extension.noFaultFoundRate).toBe(parseFloat(validExpectedInput[5].currentValue)/100)
});

test("Missing value in inputs", () => {

        let t = () => {
            let extension2 = new TruckRollExtendedCalculation(validExpectedInputWithMissingValue)
        }

        expect(t).toThrow(Error)
});

test("Correct number of truck roll", () =>{

    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_truckroll_per_month).toBe(80)
})

test("Correct avg distance", () =>{
    
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_avg_truckroll_distance).toBe(30)
})

test("Correct avg duration", () =>{
    
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_avg_truckroll_duration).toBe(2)
})


test("Correct cost per km", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_cost_km_truckroll).toBe(20)
})

test("Correct number of technicians", () =>{
        let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_num_technicians).toBe(5)
})

test("Correct rate of NFF", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.hypothesis_NFF).toBe(15)
})


test("Correct result total cost", () =>{

    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_total_cost).toBe('576 k')
})


test("Correct result cost per truck roll", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_cost_per_truckroll).toBe(600)
})


test("Correct result nff cost", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_cost_nff).toBe(86400)
})


test("Correct result total distance per year", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_total_distance_per_year).toBe(28800)
})


test("Correct result CO2 emissions", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_co2_emissions).toBe("5.3")
})

test("Correct result savings", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_savings).toBe("230 k")
})


test("Correct result fexer truck rolls", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_savings_truck_rolls).toBe("384")
})


test("Correct result avoided CO2 emissions", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(extension.result_co2_avoided).toBe("2.1")
})


test("Correct result time to breakeven", () =>{
    let extension = new TruckRollExtendedCalculation(validExpectedInput)
    expect(Math.round(extension.result_breakeven)).toBe(13)
})

