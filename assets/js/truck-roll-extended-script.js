import TruckRollExtendedCalculation from "./truck-roll-extended-calculation-module.js";

(function () {
    'use strict'

    let expectedInput = [
        {id:'num-truck-rolls', defaultValue:80},
        {id:'cost-per-distance', defaultValue: 20},
        {id:'avg-truck-roll-distance', defaultValue:30},
        {id:'avg-truck-roll-duration', defaultValue:2},
        {id:'num-technicians', defaultValue:5},
        {id:'no-fault-found-rate',  defaultValue:15}]

    let queryString = ""

    expectedInput.forEach((input, index) =>{
        if($("#"+input.id).val() == ""){
            $("#"+input.id).val(input.defaultValue)
        }

        expectedInput[index].currentValue= $("#"+input.id).val()

        queryString+= input.id+"="+expectedInput[index].currentValue+"&"
    })


    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+queryString;
        window.history.pushState({path:newurl},'',newurl);
    }

    let calculationModule = new TruckRollExtendedCalculation(expectedInput)

    
    $(".generated").each(function () {
        var id = $(this).attr("id");

        if (calculationModule[id] != undefined) {
            $("#" + id).text(calculationModule[id].toLocaleString('en-US'))
        } else {
            console.log("get " + id + "(){}")
        }

    });
})()