import BaseCalculation from './base-calculation-module.js'

class NPSExtendedCalculation extends BaseCalculation {

    /**
     * 
     * @param {Object[]} inputArray 
     * @param {string} inputArray[].id id of the form input
     * @param {Number} inputArray[].currentValue value for the input
     * @param {Number} inputArray[].defaultValue 
     * 
     */
    constructor(inputArray){

        super(inputArray, NPSExtendedCalculation.EXPECTED_DEFAULT_VALUES)
    }

    get total_respondents(){
        return this.values['total-no-promoters'] + this.values['total-no-passives'] + this.values['total-no-detractors']
    }

    get result_total_respondents(){
        return isNaN(this.total_respondents) ||  ? "-" : this.total_respondents.toFixed(0)
    }

    get nps(){
        return (this.values['total-no-promoters']/this.total_respondents - this.values['total-no-detractors']/this.total_respondents)*100
    }

    get result_nps(){
       return isNaN(this.nps) ? "-" : this.nps.toFixed(0)
    }
}

NPSExtendedCalculation.EXPECTED_DEFAULT_VALUES = [
    {id:'total-no-promoters', defaultValue:0},
    {id:'total-no-passives', defaultValue: 0},
    {id:'total-no-detractors', defaultValue:0}
]
 
export default NPSExtendedCalculation;