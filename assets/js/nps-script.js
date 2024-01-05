import PostSender from "./post-sender-module.js";
import NPSCalculation from "./nps-calculation-module.js";

let currentLanguage = ''

function populateNPSResults(lang) {
    'use strict'

    if(lang !== undefined && lang !== null && lang !== ''){
        currentLanguage = lang
    }

    let queryString = ""

    let searchParams = new URLSearchParams(location.search)

    let collectedValuesFromDOM = {}
    collectedValuesFromDOM["lang"] = currentLanguage

    let inputArray = NPSCalculation.EXPECTED_DEFAULT_INPUT_VALUES

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

    // Instanciate the Calculation module
    let calculationModule = new NPSCalculation(inputArray)


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

    // Initialize the NPS level status
    $(".nps_level").css("display","none");
    $(".nps_level#"+calculationModule['nps_level']).css("display","inline");

    return {...collectedValuesFromDOM, ...calculationModule.values}
}

// Event handler on form submit
let form = document.getElementById("nps-form")

form.addEventListener('submit', event => {


    form.classList.remove('was-validated')

    //Use bootstrap validation mecanism
    if (form.checkValidity()) {

       form.classList.add('was-validated')
       let data = populateNPSResults()

       setTimeout((data) =>{
            const sender = new PostSender("https://hooks.zapier.com/hooks/catch/436453/3w9vkm6/")
            sender.postData(data)
       }, 1000, data)
    }

    event.preventDefault()
    event.stopPropagation()
})


//Way to pass the populate function to the script in the main HTML page
window.populateNPSResults = populateNPSResults