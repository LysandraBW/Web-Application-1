// Dynamically loading the makes via AJAX and JSON
//Also loading the make, model, year of a car once a user enters a VIN

//Array of car makes
var makes = [
    "Alfa Romeo",
    "Audi",
    "BMW",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jeep",
    "Kia",
    "Land Rover",
    "Lexus",
    "Maserati",
    "Maybach",
    "Mazda",
    "Mercedes-Benz",
    "Mini",
    "Nissan",
    "Rover",
    "Subaru",
    "Suzuki",
    "Toyota",
    "Volkswagen",
  ]

//Used so the function can tell what to do after it loaded the years or models
var globalModelWorkAround =
{
    "call": "",
    "model": "",
    "year": "",
}

$(document).ready(function()
{
    //Load the makes
    loadMakes();

    //Once the user chooses a make
    $("select.b").change(function()
    {
        //selectedMakeIndex is the index of the option that the user chose; selectedMake is the actual text
        var selectedMakeIndex = document.getElementsByTagName("select")[1].selectedIndex;
        var selectedMake = document.getElementsByName("make")[selectedMakeIndex].value;
        getModels(selectedMake);
    })

    //If the user decides to type in a VIN
    $("#editForm > form > div.vehicle > div > input[name='VIN']").keyup(function()
    {
        var carVin = $("#editForm > form > div.vehicle > div > input[name='VIN']").val();
        if (verifyVin(carVin) == true)
        {
            decodeVin(carVin);
        }
    })
    


});

//Loading the car makes for the user
function loadMakes()
{
    for (var x = 0; x < makes.length; x++)
    {
        var make = makes[x];
        $("select.b").append(`<option value="${make}" name="make">${make}</option>`)
    }
}

//Dynamically getting the models for said make via AJAX
function getModels(make)
{
    var carModels = new XMLHttpRequest();
    carModels.open("GET", `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`);
    carModels.onload = function()
    {
        var listCarModels = JSON.parse(carModels.responseText).Results;
        loadModels(listCarModels); 
    }  
    carModels.send();
}

//Entering the models into HTML page
function loadModels(list)
{
    $("select.c").empty().append('<option disabled selected>Model</option>').append("<option>Don't Know</option>");
    for (var x = 0; x < list.length; x++)
    {
        var carModel = list[x].Model_Name;
        $("select.c").append(`<option value='${carModel}' name='${carModel}'>${carModel}</option>`)
    }
    if (globalModelWorkAround.call == "Decoding VIN")
    {
        document.getElementsByName(`${globalModelWorkAround.model}`)[0].selected = "true";
    }
    loadYears();
}

//Loading the years 
function loadYears()
{
    for (var year = 2021; year >= 1980; year--)
    {
        $("select.d").append(`<option value='${year}'>${year}</option>`)
    }
    if (globalModelWorkAround.call == "Decoding VIN")
    {
        $(`option[value='${globalModelWorkAround.year}']`).attr("selected", true);
    }
}

//Verying the VIN
function verifyVin(vin)
{
    var vinLength = 17;
    var vinRegex = /[^A-Z0-9]/gi;
    if (vin.length == vinLength && vinRegex.test(vin) == false)
    {
        return true;
    }
}

//Decoding the VIN
function decodeVin(vin)
{
    var carDetails = new XMLHttpRequest();
    carDetails.open("GET", `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json&modelyear=b`)
    carDetails.onload = function()
    {
        carMake = JSON.parse(carDetails.responseText).Results[0].Make;
        carModel = JSON.parse(carDetails.responseText).Results[0].Model;
        carYear = JSON.parse(carDetails.responseText).Results[0].ModelYear;
        autofillCar(carMake, carModel, carYear);
    }
    carDetails.send();
}

function autofillCar(make, model, year)
{
    var carMakesList = $("select.b > option");
    console.log(carMakesList)
    for (var x = 0; x < carMakesList.length; x++)
    {
        var carMake = document.getElementsByName("make")[x].value;
        if (carMake.toUpperCase() == make.toUpperCase())
        {
            console.log("Here C")
            document.getElementsByName("make")[x].selected = "true";
            globalModelWorkAround.call = "Decoding VIN";
            globalModelWorkAround.model = `${model}`;
            globalModelWorkAround.year = `${year}`;
            getModels(make);
        }
    }
}