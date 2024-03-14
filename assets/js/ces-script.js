import PostSender from "./post-sender-module.js";
import CESCalculation from "./ces-calculation-module.js";

let currentLanguage = 'en'
let ces_levels = {}

function populateCESResults(lang, ces_levels_labels) {
    'use strict'

    if (lang !== undefined && lang !== null && lang !== '') {
        currentLanguage = lang
    }

    if (ces_levels_labels !== undefined && ces_levels_labels !== null && ces_levels_labels !== '') {
        ces_levels = ces_levels_labels
    }


    let queryString = ""

    let searchParams = new URLSearchParams(location.search)

    let collectedValuesFromDOM = {}
    collectedValuesFromDOM["lang"] = currentLanguage

    let inputArray = CESCalculation.EXPECTED_DEFAULT_INPUT_VALUES

    //Retrieve the value of all the input elements specified in the expectedInput array
    inputArray.forEach((input, index) => {

        // If there is no value in form , complete the form with the searchQuery or default value
        if ($("#" + input.id).val() === "") {
            if (!searchParams.has(input.id)) {
                console.log("search param undefined")
                $("#" + input.id).val(input.defaultValue)
            } else {
                console.log("search param found")
                $("#" + input.id).val(searchParams.get(input.id))
            }
        }

        //Retrieve the expectedInput array with the value 
        inputArray[index].currentValue = $("#" + input.id).val() === "" ? 0 : $("#" + input.id).val()
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
    let calculationModule = new CESCalculation(inputArray)


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

    // Initialize the CES level status
    $(".ces_level").css("display", "none");
    $(".ces_level#smiley_" + calculationModule['ces_level']).css("display", "inline");


    $(".feedback").css("display", "none");
    $(".feedback_" + calculationModule['ces_level']).css("display", "inline");

    updateBarChart(calculationModule, ces_levels)


    return { ...collectedValuesFromDOM, ...calculationModule.values }
}

function updateBarChart(calculationModule, ces_levels) {


    function updateCanvas(canvasId, options) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        // Check if a chart instance is already associated with the canvas
        if (canvas.chart) {
            // Destroy the previous chart instance
            canvas.chart.destroy();
        }

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const myChart = new Chart(ctx, options);
    }

    let bgColors = {
        "total-no-level1": "#F1F5F8",
        "total-no-level2": "#D3DEE9",
        "total-no-level3": "#BBCCDD",
        "total-no-level4": "#5079A0",
        "total-no-level5": "#2E455C"
    }
    let datasetsBar = []

    for (const id in bgColors) {

        let value = {
            label: ces_levels[id],
            data: [calculationModule.values[id] / calculationModule.total_respondents * 100], // Percentage for Dataset 1
            backgroundColor: bgColors[id],
            barThickness: 10
        }
        datasetsBar.push(value)
    }

    let optionsBar = {
        type: 'bar',
        data: {
            labels: ['CES'], // Add more labels for multiple bars
            datasets: datasetsBar
        },
        options: {
            indexAxis: 'y', // Makes the bar chart horizontal
            scales: {
                x: {
                    stacked: true, // Enable stacking
                    display: false,
                    ticks: {
                        callback: function (value) {
                            return value + "%"; // Display percentages on x-axis
                        }
                    }
                },
                y: {
                    stacked: true, // Enable stacking
                    display: false
                }
            },
            cutout: 0 // Make the pie chart a disc
        }
    };

    let optionsPie =  {
        type: 'pie',
        data: {
            labels: Object.values(ces_levels),
            datasets: [{
                data: Object.keys(ces_levels).map(key => { return calculationModule.values[key]/ calculationModule.total_respondents *100 }),
                backgroundColor: Object.values(bgColors)
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            cutout: 0 // Set to 0 for a disc chart
        }
    }

    updateCanvas('cesBarChart', optionsBar)
    updateCanvas('cesPieChart', optionsPie)
}

// Event handler on form submit
let form = document.getElementById("ces-form")

form.addEventListener('submit', event => {
    form.classList.remove('was-validated')

    //Use bootstrap validation mecanism
    if (form.checkValidity()) {

        form.classList.add('was-validated')
        let data = populateCESResults()

        setTimeout((data) => {
            //const sender = new PostSender("https://hooks.zapier.com/hooks/catch/436453/3w9vkm6/")
            //sender.postData(data)
        }, 1000, data)
    }

    event.preventDefault()
    event.stopPropagation()
})


//Way to pass the populate function to the script in the main HTML page
window.populateCESResults = populateCESResults