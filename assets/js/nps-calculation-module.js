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
        return parseInt(this.values['total-no-promoters']) + parseInt(this.values['total-no-passives']) + parseInt(this.values['total-no-detractors'])
    }

    get result_total_respondents(){
        return isNaN(this.total_respondents) || this.total_respondents == 0 ? "-" : (this.total_respondents).toFixed(0)
    }

    get nps(){
        return (this.values['total-no-promoters']/this.total_respondents - this.values['total-no-detractors']/this.total_respondents)*100
    }

    get result_nps(){
       return isNaN(this.nps) ? "-" : this.nps.toFixed(0)
    }

    get nps_level(){

        if(isNaN(this.nps))
            return NPSExtendedCalculation.NPS_LEVELS.None

        if(this.nps < 0)
            return NPSExtendedCalculation.NPS_LEVELS.NeedImprovment

        if(this.nps < 30)
            return NPSExtendedCalculation.NPS_LEVELS.Good

        if(this.nps < 70)
            return NPSExtendedCalculation.NPS_LEVELS.Great


        return NPSExtendedCalculation.NPS_LEVELS.Excellent

    }
}

NPSExtendedCalculation.EXPECTED_DEFAULT_VALUES = [
    {id:'total-no-promoters', defaultValue:""},
    {id:'total-no-passives', defaultValue: ""},
    {id:'total-no-detractors', defaultValue:""}
]

NPSExtendedCalculation.NPS_LEVELS = {
	Excellent: "excellent",
	Great: "great",
	Good: "good",
	NeedImprovment: "needimprovment", 
    None:"none"
}
 
export default NPSExtendedCalculation;