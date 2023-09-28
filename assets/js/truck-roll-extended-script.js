import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module.js";

function CalculateTruckRollCosts() {
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

    //Retrieve the value of all the input elements specified in the expectedInput array
    expectedInput.forEach((input, index) =>{

        // If no value found, take the default value
        if($("#"+input.id).val() == ""){
            $("#"+input.id).val(input.defaultValue)
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
            $("#" + id).text(calculationModule[id].toLocaleString('en-US'))
        } else {
            console.log("get " + id + "(){}")
        }
    });
}


let form = document.getElementById("truck-roll-form")
form.addEventListener('submit', event => {
    if (form.checkValidity()) {
        form.classList.add('was-validated')
        CalculateTruckRollCosts()
    }            

    event.preventDefault()
    event.stopPropagation()

})

CalculateTruckRollCosts()