import BaseCalculation from './base-calculation-module.js'

class FCRExtendedCalculation extends BaseCalculation {

    /**
     * 
     * @param {Object[]} inputArray 
     * @param {string} inputArray[].id id of the form input
     * @param {Number} inputArray[].currentValue value for the input
     * @param {Number} inputArray[].defaultValue 
     * 
     */
    constructor(inputArray){

        super(inputArray, FCRExtendedCalculation.EXPECTED_DEFAULT_VALUES)

    }

    get fcr(){
        return (this.values['total-no-incidents-resolved']-this.values['total-no-incidents-reopened']) / this.values['total-no-incidents-opened']
    }

    get result_fcr(){
        return (this.fcr * 100).toFixed(0)
    }

    get fcr_increase_pts() {
        return this.fcr * FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT
    }

    get result_fcr_increase_pts(){
        return (this.fcr_increase_pts * 100).toFixed(1)
    }

    get result_fcr_target(){
        return (this.fcr * (1 + FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT) * 100).toFixed(0)
    }

    get result_fcr_increase_percent(){
        return "+"+(FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT*100).toFixed(0)
    }
}

FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT = 0.14

FCRExtendedCalculation.EXPECTED_DEFAULT_VALUES = [
    {id:'total-no-incidents-opened', defaultValue:100},
    {id:'total-no-incidents-resolved', defaultValue: 80},
    {id:'total-no-incidents-reopened', defaultValue:20}
]
 
export default FCRExtendedCalculation;