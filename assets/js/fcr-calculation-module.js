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
        let value = (this.fcr * 100)
        return isNaN(value) ? "-" : value.toFixed(0)
    }

    get fcr_increase_pts() {
        return this.fcr * FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT
    }

    get result_fcr_increase_pts(){
        let value = (this.fcr_increase_pts * 100)
        return isNaN(value) ? "-" : value.toFixed(1)
    }

    get result_fcr_target(){
        let value = (this.fcr * (1 + FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT) * 100)
        return isNaN(value) ? "-" : value.toFixed(1)
    }

    get result_fcr_increase_percent(){
        return isNaN(this.fcr) ? "-" :  "+"+(FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT*100).toFixed(0)
    }
}

FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT = 0.14

FCRExtendedCalculation.EXPECTED_DEFAULT_VALUES = [
    {id:'total-no-incidents-opened', defaultValue:0},
    {id:'total-no-incidents-resolved', defaultValue: 0},
    {id:'total-no-incidents-reopened', defaultValue:0}
]
 
export default FCRExtendedCalculation;