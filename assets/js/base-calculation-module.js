class BaseCalculation {

    /**
     * 
     * @param {*} inputDataArray 
     * @param {string} inputDataArray[].id id of the form input
     * @param {Number} inputDataArray[].currentValue value for the input
     * @param {*} expectedFieldsArray 
     * @param {string} expectedFieldsArray[].id id of the form input
     * @param {Number} expectedFieldsArray[].defaultValue 
     */
    constructor(inputDataArray, expectedFieldsArray){

        if(expectedFieldsArray === undefined) {
            throw Error("Missing the expected input parameter to the calculation module constructor")
        }

        this.expectedFieldsArray = expectedFieldsArray
        this.values = {}

        function isSameId(inputObjectToCompare){
            return function(inputObject) {
                return inputObject.id === inputObjectToCompare.id
            }
        }

        //Check if all the expected values are provided in the inputDataArray
        expectedFieldsArray.forEach(expectedInput => {
            let inputValue = inputDataArray.find(isSameId(expectedInput))

            // Error If expectedObject not found
            if(inputValue === undefined) {
                throw Error("Missing input parameter: "+ inputValue.id)
            }

            //if currentValue of the input Object is missing
            if(inputValue.currentValue === undefined) {
                inputValue.currentValue = expectedInput.defaultValue
            }
        })

        // Initialize the values key-value map
        inputDataArray.forEach(input => {
            //Check if it is an unexpected value and warn
            if(expectedFieldsArray.find(isSameId(input)) === undefined){
                console.warn("Unexpected value passed in input: " + input.id)
            }

            this.values[input.id] = input.currentValue
        })

    }
}

export default BaseCalculation