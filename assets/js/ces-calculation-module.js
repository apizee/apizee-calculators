import BaseCalculation from './base-calculation-module.js'



class CESCalculation extends BaseCalculation {

    /**
     * 
     * @param {Object[]} inputArray 
     * @param {string} inputArray[].id id of the form input
     * @param {Number} inputArray[].currentValue value for the input
     * @param {Number} inputArray[].defaultValue 
     * 
     */
    constructor(inputArray){
        super(inputArray, CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES)
    }

    get total_respondents(){
        
        let total = CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES.reduce( (total, input) => {

            if(this.values[input.id] === "")
                return total

            return total + parseInt(this.values[input.id])
            
        },0)

        return total
    }

    get result_total_respondents(){
        return this.total_respondents
    }

    get ces(){

        if(this.total_respondents === 0)
            return 0;
        
        let score = CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES.reduce( (total, input) => {
            if(this.values[input.id] === "") { 
                return total
            }

            return total + input.score * parseInt(this.values[input.id])
        },0)

        return score / this.total_respondents
    }

    get result_ces(){

        if(this.ces === 0)
            return '-'

        return this.ces.toFixed(2)
    }

    get ces_level(){

        if(this.ces === 0)
            return CESCalculation.CES_LEVELS.None

        if(this.ces < 2.5)
            return CESCalculation.CES_LEVELS.Good

        if(this.ces < 3.5)
            return CESCalculation.CES_LEVELS.Average

        return CESCalculation.CES_LEVELS.Bad
    }
}

CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES = [
    {id:'total-no-level1', defaultValue:"", score: 1},
    {id:'total-no-level2', defaultValue:"", score: 2},
    {id:'total-no-level3', defaultValue:"", score: 3},
    {id:'total-no-level4', defaultValue:"", score: 4},
    {id:'total-no-level5', defaultValue:"", score: 5}
]

CESCalculation.CES_LEVELS = {
	Good: "good",
	Average: "average",
    Bad:"bad", 
    None: "none"
}
 
export default CESCalculation;