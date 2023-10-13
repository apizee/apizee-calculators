class TruckRollExtendedCalculation {

    /**
     * 
     * @param {Object[]} inputArray 
     * @param {string} inputArray.id id of the form input
     * @param {Number} inputArray.currentValue value for the input
     * @param {Number} inputArray.defaultValue 
     */
    constructor(inputArray) {

        inputArray.forEach(input => {

            if(input.currentValue == undefined){
                throw Error("Missing input parameter value for "+input.id)
            }

            switch(input.id){
            
                case 'num-truck-rolls': 
                    this.numTruckRolls= input.currentValue
                    break;
                case 'cost-per-distance': 
                    this.costPerDistance = input.currentValue
                    break;
                case 'avg-truck-roll-distance': 
                    this.avgTruckRollDistance = input.currentValue
                    break;
                case 'num-technicians':
                    this.numTechnicians = input.currentValue
                    break;
                case 'no-fault-found-rate':
                    this.noFaultFoundRate = input.currentValue/100
                    break;    
                default:
                    throw Error("Input not implemented in class: "+input.id)
            }
        })
    }

    get hypothesis_truckroll_per_month(){
        return this.numTruckRolls
    }

    get hypothesis_avg_truckroll_distance(){
        return this.avgTruckRollDistance
    }

    get hypothesis_cost_km_truckroll(){
        return this.costPerDistance
    }
    
    get hypothesis_num_technicians(){
        return this.numTechnicians
    }

    get hypothesis_NFF(){
        return this.noFaultFoundRate*100
    }

    get total_cost(){
        return this.numTruckRolls * this.avgTruckRollDistance * this.costPerDistance * 12
    }

    /**
     * Return total cost in k format
     */
    get result_total_cost(){
        return ( this.total_cost/ 1000).toFixed(0)+" k"
    } 
    get result_cost_per_truckroll(){
        return this.avgTruckRollDistance*this.costPerDistance
    } 

    get cost_nff(){
        return this.noFaultFoundRate * this.total_cost
    } 

    get result_cost_nff(){
        return this.cost_nff >= 10000 ? (this.cost_nff/1000).toFixed(1)+" k" : this.cost_nff
    } 


    get result_total_distance_per_year(){
        return this.numTruckRolls * this.avgTruckRollDistance * 12
    } 

    /**
     * Return co2 emissions in tons C02 eq.
     */
    get total_co2_emissions(){
        return this.result_total_distance_per_year * TruckRollExtendedCalculation.CO2_EMISSION_FACTOR / 1000 / 1000
    } 

    /**
     * Return CO2 emission in Tons
     * output: string
     */
    get result_co2_emissions() {
        return this.total_co2_emissions.toFixed(1)
    }

    get savings(){
        return this.total_cost * TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR
    }

    /**
     * Returns savings in k format
     * output: String
     */
    get result_savings(){
        return (this.savings / 1000).toFixed(0)+" k"
    } 

    get savings_truck_rolls(){
        return this.numTruckRolls * TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR * 12
    }
    
    /**
     * Returns number of spared truck rolls
     * output: string
     */
    get result_savings_truck_rolls(){
        return (this.savings_truck_rolls).toFixed(0)
    } 

    /**
     * Return amount of CO2 avoided
     */
    get result_co2_avoided(){
        return (this.savings_truck_rolls * this.avgTruckRollDistance * TruckRollExtendedCalculation.CO2_EMISSION_FACTOR/1000/1000).toFixed(1)
    } 

    /**
     * Return breakeven period in days
     */
    get breakeven(){
        //TOTAL PRICE PER YEAR 
        let totalPricePerYear = TruckRollExtendedCalculation.APIZEE_LICENCE_PRICE * this.numTechnicians * 12
        let savingsPerDay =  (this.savings / 356)
        
        return totalPricePerYear / savingsPerDay
    }

    get result_breakeven(){
        return this.breakeven
    }
}

TruckRollExtendedCalculation.CO2_EMISSION_FACTOR = 185.3 //source: European Environment Agency
TruckRollExtendedCalculation.APIZEE_TR_REDUCTION_FACTOR = 0.4
TruckRollExtendedCalculation.APIZEE_LICENCE_PRICE = 140


export default TruckRollExtendedCalculation