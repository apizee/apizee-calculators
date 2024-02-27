import { expect, test } from "bun:test";
import CESCalculation from "./ces-calculation-module";

let validExpectedInput = [
    {id:'total-no-level1', currentValue:0},
    {id:'total-no-level2', currentValue:20},
    {id:'total-no-level3', currentValue:40},
    {id:'total-no-level4', currentValue:60},
    {id:'total-no-level5', currentValue:100}
]

let noneExpectedInput = [
    {id:'total-no-level1', currentValue:""},
    {id:'total-no-level2', currentValue:""},
    {id:'total-no-level3', currentValue:""},
    {id:'total-no-level4', currentValue:""},
    {id:'total-no-level5', currentValue:""}
]

let goodExpectedInput = [
    {id:'total-no-level1', currentValue:1000},
    {id:'total-no-level2', currentValue:30},
    {id:'total-no-level3', currentValue:50},
    {id:'total-no-level4', currentValue:60},
    {id:'total-no-level5', currentValue:40}
]

let averageExpectedInput = [
    {id:'total-no-level1', currentValue:0},
    {id:'total-no-level2', currentValue:20},
    {id:'total-no-level3', currentValue:30},
    {id:'total-no-level4', currentValue:40},
    {id:'total-no-level5', currentValue:0}
]

let badExpectedInput = [
    {id:'total-no-level1', currentValue:0},
    {id:'total-no-level2', currentValue:20},
    {id:'total-no-level3', currentValue:30},
    {id:'total-no-level4', currentValue:50},
    {id:'total-no-level5', currentValue:1000}
]

let inputWithZeros = [
    {id:'total-no-level1', currentValue:0},
    {id:'total-no-level2', currentValue:0},
    {id:'total-no-level3', currentValue:0},
    {id:'total-no-level4', currentValue:0},
    {id:'total-no-level5', currentValue:0}
]

let inputWithMissingField = [
    {id:'total-no-level1', currentValue:100},
    {id:'total-no-level2', currentValue:80},
    {id:'total-no-level3', currentValue:60},
    {id:'total-no-level4', currentValue:40}
]

let partialInput = [
    {id:'total-no-level1', currentValue:50},
    {id:'total-no-level2', currentValue:30},
    {id:'total-no-level3', currentValue:""},
    {id:'total-no-level4', currentValue:20},
    {id:'total-no-level5', currentValue:""}
];

let inputWithMissingValue = [
    {id:'total-no-level1'},
    {id:'total-no-level2', currentValue:80},
    {id:'total-no-level3', currentValue:60},
    {id:'total-no-level4', currentValue:40},
    {id:'total-no-level5', currentValue:20}
]

test("Valid constructor", () => {
    let ces = new CESCalculation(validExpectedInput);
    expect(ces.values['total-no-level1']).toBe(parseInt(validExpectedInput[0].currentValue));
    expect(ces.values['total-no-level2']).toBe(parseInt(validExpectedInput[1].currentValue));
    expect(ces.values['total-no-level3']).toBe(parseInt(validExpectedInput[2].currentValue));
    expect(ces.values['total-no-level4']).toBe(parseInt(validExpectedInput[3].currentValue));
    expect(ces.values['total-no-level5']).toBe(parseInt(validExpectedInput[4].currentValue));
});

test("Invalid constructor", () => {
    // Passing an undefined object as param should throw error
    let a = () => {
        let ces = new CESCalculation(undefined);
    };
    expect(a).toThrow(Error);

    // Missing a field should throw error
    let b = () => {
        let ces = new CESCalculation(inputWithMissingField);
    };
    expect(b).toThrow(Error);

});

test("Missing CurrentValue", () => {
    let ces = new CESCalculation(inputWithMissingValue);

    expect(ces.values['total-no-level1']).toBe(CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES[0].defaultValue);
});

test("Correct CES result", () => {
    let ces = new CESCalculation(validExpectedInput);
    expect(ces.ces).toBe(4.090909090909091); // Replace with actual calculation logic
    expect(ces.result_ces).toBe("4.09"); // Replace with actual calculation logic
    expect(ces.ces_level).toBe(CESCalculation.CES_LEVELS.Bad)
});

 test("Handle No Inputs", () => {
    let ces = new CESCalculation(noneExpectedInput);
    expect(ces.result_ces).toBe("-"); // When there's no  input, CES should be a placeholder
    expect(ces.ces_level).toBe(CESCalculation.CES_LEVELS.None); // When there's no  input, CES should be a placeholder

    let cesZ = new CESCalculation(inputWithZeros);
    expect(cesZ.result_ces).toBe("-"); // When there's no  input, CES should be a placeholder
    expect(cesZ.ces_level).toBe(CESCalculation.CES_LEVELS.None); // When there's no  input, CES should be a placeholder

});

test("Handle Partial Inputs", () => {
    // Scenario where some of the levels have values and others don't
   
    let ces = new CESCalculation(partialInput);
    expect(ces.result_ces).not.toBe("-"); // CES calculation should still work with partial input
    expect(ces.result_ces).toBe("1.90"); // CES calculation should still work with partial input
    expect(ces.ces_level).toBe(CESCalculation.CES_LEVELS.Good);
});

test("Level corresponds to CES", () => {
    let cesB = new CESCalculation(badExpectedInput);
    expect(cesB.ces_level).toBe(CESCalculation.CES_LEVELS.Bad)

    let cesA = new CESCalculation(averageExpectedInput);
    expect(cesA.ces_level).toBe(CESCalculation.CES_LEVELS.Average)

    let cesG = new CESCalculation(goodExpectedInput);
    expect(cesG.ces_level).toBe(CESCalculation.CES_LEVELS.Good)

});

export default CESCalculation;
