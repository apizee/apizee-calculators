import PostSender from "./post-sender-module.js";
import FCRCalculation from "./fcr-calculation-module.js";

let currentLanguage = ''

function populateFCRResults(lang) {
    'use strict'

    if(lang !== undefined && lang !== null && lang !== ''){
        currentLanguage = lang
    }

    let queryString = ""

    let searchParams = new URLSearchParams(location.search)

    let collectedValuesFromDOM = {}
    collectedValuesFromDOM["lang"] = currentLanguage


    let inputArray = FCRCalculation.EXPECTED_DEFAULT_VALUES

    //Retrieve the value of all the input elements specified in the expectedInput array
    inputArray.forEach((input, index) => {

        // If no value found, complete the form with the searchQuery or default value
        if ($("#" + input.id).val() == "") {
            if (!searchParams.has(input.id)) {
                $("#" + input.id).val(input.defaultValue)
            } else {
                $("#" + input.id).val(searchParams.get(input.id))
            }
        }

        //Retrieve the expectedInput array with the value 
        inputArray[index].currentValue = $("#" + input.id).val()
    })


    //Forge the queryString
    inputArray.forEach((input, index) => {
        queryString += input.id + "=" + inputArray[index].currentValue + "&"
    })


    //Update the url with the query string
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
        window.history.pushState({ path: newurl }, '', newurl);
    }

    // instanciate the Calulation module
    let calculationModule = new FCRCalculation(inputArray)


    // For each result field with "generated" in their classnames, insert the calculated value
    $(".generated").each(function () {
        var id = $(this).attr("id");

        if (calculationModule[id] !== undefined) {

            $("#" + id).text(calculationModule[id].toLocaleString(lang))

            collectedValuesFromDOM[id] = $("#" + id).text()

        } else {
            throw Error("Missing result in calculation class :" + id)
        }
    });

    return {...collectedValuesFromDOM, ...calculationModule.values}
}

function crossValidation() {

    let boolReturn = true

    //tickets resolved must be less than number of tickets opened 
    if(parseInt($("#total-no-incidents-resolved").val()) > parseInt($("#total-no-incidents-opened").val())){
        $("#total-no-incidents-resolved").addClass("is-invalid").removeClass("is-valid")
        boolReturn = false
    } else {
        $("#total-no-incidents-resolved").removeClass("is-invalid").addClass("is-valid")
    }

    //tickets resolved must be less than number of tickets opened 
    if(parseInt($("#total-no-incidents-reopened").val()) > parseInt($("#total-no-incidents-resolved").val()))
    {
        $("#total-no-incidents-reopened").addClass("is-invalid").removeClass("is-valid")
        boolReturn = false
    } else {
        $("#total-no-incidents-reopened").removeClass("is-invalid").addClass("is-valid")
    }

    return boolReturn

}

// Event handler on for submit
let form = document.getElementById("fcr-form")

form.addEventListener('submit', event => {


    form.classList.remove('was-validated')

    //Use bootstrap validation mecanism
    if (crossValidation() && form.checkValidity()) {

       form.classList.add('was-validated')
       let data = populateFCRResults()

       setTimeout((data) =>{
            const sender = new PostSender("https://hooks.zapier.com/hooks/catch/436453/3w52vtb/")
            sender.postData(data)
       }, 1000, data)
    }

    event.preventDefault()
    event.stopPropagation()
})



//Way to pass the populate function to the script in the main HTML page
window.populateFCRResults = populateFCRResults