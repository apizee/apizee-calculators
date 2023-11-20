class FCRExtendedCalculation {

    /**
     * 
     * @param {Object[]} inputArray 
     * @param {string} inputArray[].id id of the form input
     * @param {Number} inputArray[].currentValue value for the input
     * @param {Number} inputArray[].defaultValue 
     */
    constructor(inputArray){

        inputArray.forEach(input => {

           //if current value si not set
           if(input.currentValue === undefined){
                throw Error("Missing input parameter value for "+input.id)
            }
 
            switch(input.id){
                case 'total-no-incidents-opened': 
                    this.totalNoIncidentsOpened= input.currentValue
                    break;
                case 'total-no-incidents-resolved': 
                this.totalNoIncidentsResolved= input.currentValue
                break;
                case 'total-no-incidents-reopened': 
                this.totalNoIncidentsReopened= input.currentValue
                break;

                default:
                    //In case of extra parameter not implemented in the class
                    throw Error("Input not implemented in class: "+input.id)
            }
        }) 

    }

    get fcr(){
        return (this.totalNoIncidentsOpened-this.totalNoIncidentsReopened) / this.totalNoIncidentsResolved
    }

    get result_fcr(){
        return (this.fcr * 100).toFixed(0)
    }

    get fcr_increase() {
        return this.fcr * FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT
    }

    get result_fcr_increase(){
        return (this.fcr_increase * 100).toFixed(1)
    }

    get result_target_fcr(){
        return (this.fcr * (1 + FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT) * 100).toFixed(0)
    }
}

FCRExtendedCalculation.APIZEE_FCR_INCREASE_PERCENT = 0.14
 
export default FCRExtendedCalculation;