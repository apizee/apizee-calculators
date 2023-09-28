import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module.js";

function populateTruckRollCosts(lang) {
    'use strict'

    // State expected input id to be found in the HTML DOM
    let expectedInput = [
        {id:'num-truck-rolls', defaultValue:80},
        {id:'cost-per-distance', defaultValue: 20},
        {id:'avg-truck-roll-distance', defaultValue:30},
        {id:'avg-truck-roll-duration', defaultValue:2},
        {id:'num-technicians', defaultValue:5},
        {id:'no-fault-found-rate',  defaultValue:15}]

    let queryString = ""

    let searchParams = new URLSearchParams(location.search)

    //Retrieve the value of all the input elements specified in the expectedInput array
    expectedInput.forEach((input, index) =>{

        // If no value found, take the default value
        if($("#"+input.id).val() == ""){
            if(!searchParams.has(input.id)) {
                $("#"+input.id).val(input.defaultValue)
            } else {
                $("#"+input.id).val(searchParams.get(input.id))
            }
        }

        //Store the expectedInput array with the value 
        expectedInput[index].currentValue= $("#"+input.id).val()

        //Forge the queryString
        queryString+= input.id+"="+expectedInput[index].currentValue+"&"
    })


    //Update the url with the query string
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+queryString;
        window.history.pushState({path:newurl},'',newurl);
    }

    // instanciate the Calulation module
    let calculationModule = new TruckRollExtendedCalculation(expectedInput)

    
    // For each result field with "generated" in their classnames, insert the calculated value
    $(".generated").each(function () {
        var id = $(this).attr("id");

        if (calculationModule[id] != undefined) {

            //Adapt the time unit (days, weeks, months) depending on the value returned
            if(id === 'result_breakeven'){
                document.getElementById("breakeven-unit-weeks").classList.remove("show")
                document.getElementById("breakeven-unit-months").classList.remove("show")
                document.getElementById("breakeven-unit-days").classList.remove("show")
                document.getElementById("breakeven-unit-weeks").classList.add("collapse")
                document.getElementById("breakeven-unit-months").classList.add("collapse")
                document.getElementById("breakeven-unit-days").classList.add("collapse")

                let value = calculationModule.result_breakeven
                let result = ""

                if (value > 30) {
                    result = (value/30).toFixed(0)
                    document.getElementById("breakeven-unit-months").classList.add("show")
                } else if(value > 7){
                    result = (value/7).toFixed(0)
                    document.getElementById("breakeven-unit-weeks").classList.add("show")
                } else {
                    result = value.toFixed(0)
                    document.getElementById("breakeven-unit-days").classList.add("show")
                }

                $("#" + id).text(result.toLocaleString(lang))

            } else {            
                $("#" + id).text(calculationModule[id].toLocaleString(lang))
            }

        } else {
            throw Error("Missing result in calculation class :" + id)
        }
    });
}

// Event handler on for submit
let form = document.getElementById("truck-roll-form")
form.addEventListener('submit', event => {

    //Use bootstrap validation mecanism
    if (form.checkValidity()) {
        form.classList.add('was-validated')
        populateTruckRollCosts()
    }

    event.preventDefault()
    event.stopPropagation()

})


window.populateTruckRollCosts = populateTruckRollCosts
