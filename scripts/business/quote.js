//WHAT TO DO
var laborRateEntered = false;
var laborHourEntered = false;
var feePriceEntered = false;
var taxPerceEntered = false;
var tableRowCount = 5;
var totalPrice = 0;
var userPrices = {};
var userData = [
    [1, "John Smith", "2012 Toyota Camry", "Maintenance Check", "Engine Repair", "Transmission Repair"],
    [2, "Jane Smith", "2013 Toyota Camry", "Maintenance Check", "Engine Repair", "Windshield Replacement", "Engine Repair"],
    [3, "Joe Smith", "2014 Toyota Camry", "Maintenance Check", "Engine Repair", "Tire Replacement"],
    [4, "Jane Smith", "2015 Toyota Camry", "Maintenance Check", "Engine Repair", "Oil Change"],
    [5, "John Smith", "2016 Toyota Camry", "Maintenance Check", "Engine Repair", "Towing"],
    [6, "Jone Smith", "2017 Toyota Camry", "Maintenance Check", "Engine Repair", "AC Repair"],
    [7, "Joe Smith", "2018 Toyota Camry", "Maintenance Check", "Engine Repair", "Trunk Repair"],
    [8, "Jone Smith", "2019 Toyota Camry", "Maintenance Check", "Engine Repair", "Gear Repair"],
    [9, "John Smith", "2012 Toyota Camry", "Maintenance Check", "Engine Repair", "Transmission Repair"],
    [10, "Ginuwine", "2013 Toyota Camry", "Maintenance Check", "Engine Repair", "Windshield Replacement", "Engine Repair"],
    [11, "Jacob Collier", "2014 Toyota Camry", "Maintenance Check", "Engine Repair", "Tire Replacement"],
    [12, "Brandy", "2015 Toyota Camry", "Maintenance Check", "Engine Repair", "Oil Change"],
    [13, "Aaliyah", "2016 Toyota Camry", "Maintenance Check", "Engine Repair", "Towing"],
    [14, "Whitney Houston", "2017 Toyota Camry", "Maintenance Check", "Engine Repair", "AC Repair"],
    [15, "Michael Jackson", "2018 Toyota Camry", "Maintenance Check", "Engine Repair", "Trunk Repair"],
    [16, "Beyonce Knowles", "2019 Toyota Camry", "Maintenance Check", "Engine Repair", "Gear Repair"]
                ];
var errorMessage = {
    "noMatch": "We could not find an appointment with the entered ID",
    "repeat": "This is currently being shown",
    "format": "IDs only contain numbers",
    "none": "Please enter an ID"
};
var serviceCardShown = {

};

$(document).ready(function()
{
    //Paired with function displayServicePriceButton() to show price on button
    $("#calculate > div > div.equationFormat > div > input[name='cPH']").keyup(function()
    {
        var laborRateInput = $("#calculate > div > div.equationFormat > div > input[name='cPH']").val();
        laborRateEntered = (laborRateInput != "") ? true : false;
        (laborHourEntered && laborRateEntered) ? displayServicePriceButton() : 0;
    });
    $("#calculate > div > div.equationFormat > div > input[name='amtHours']").keyup(function()
    {
        var laborHoursInput = $("#calculate > div > div.equationFormat > div > input[name='amtHours']").val();
        laborHourEntered = (laborHoursInput != "") ? true : false;
        (laborRateEntered && laborHourEntered) ? displayServicePriceButton() : 0;
    });
    //1.
    $("#calculate > div > div.equationFormat > button[name='serviceDisplay']").click(function() 
    {
        var servicePrice = (laborRateEntered && laborHourEntered) ? displayServicePriceButton() : 0;
        if (servicePrice == 0) 
        {
            return;
        }
        var serviceTitle = $("#calculate > div > div.equationFormat > div > input[name='laborName']").val();
        
        addTableRow(serviceTitle, servicePrice);
        tableRowCount--;
        
    });
    //2.
    $("#calculate > div > div.equationFormat > div > input[name='feePrice']").keyup(function() 
    {
        var feePrice = $("#calculate > div > div.equationFormat > div > input[name='feePrice']").val();
        
        feePriceEntered = (feePrice != "") ? true : false;
        (feePriceEntered) ? displayFeePriceButton() : false;
    });
    $("#calculate > div > div.equationFormat > button[name='feeDisplay']").click(function()
    {
        var feePrice = (feePriceEntered) ? displayFeePriceButton() : 0;
        if (feePrice == 0) 
        {
            return;
        }
        var feeTitle = $("#calculate > div > div.equationFormat > div > input[name='feeInput']").val();

        addTableRow(feeTitle, feePrice);
        tableRowCount--;
    });
    //3.
    $("#calculate > div > div.equationFormat > div > input[name='taxPrice']").keyup(function()
    {
        var taxPercent = $("#calculate > div > div.equationFormat > div > input[name='taxPrice']").val();

        taxPerceEntered = (taxPercent != "") ? true : false;
        (taxPerceEntered) ? displayTaxButton() : false;
    });
    $("#calculate > div > div.equationFormat > button[name='taxDisplay']").click(function()
    {
        var taxPrice = (taxPerceEntered) ? displayTaxButton() : 0;
        if (taxPrice == 0) 
        {
            return;
        }
        var taxBald = $("#calculate > div > div.equationFormat > div > input[name='taxPrice']").val();
        taxBald = taxBald.replaceAll(/[^\d.]/gi, "");

        var taxTitle = `Tax - ${taxBald}%` ;

        addTableRow(taxTitle, taxPrice);
        tableRowCount--;
    });
    //7.
    $(document).on('click', "#overview .bi-x-lg", function(){
        
        var test = $(this).parent().attr('value');
        test = parseFloat(test, 10);
    

        if (isNaN(test)) 
        {
            return;
        }

        totalPrice -= test;

        internationalNumberFormat = new Intl.NumberFormat('en-US')
        var modifiedPrice = internationalNumberFormat.format(Number(totalPrice).toFixed(2));
    
        $("#overview p[name='totalPrice'] span").html(`$${modifiedPrice}`);

        $(this).parent().parent().remove();
        /*tableRowCount++;
        console.log("There are now " + tableRowCount + " available rows after deletion of one");
        if (tableRowCount > 0) {
            addTableRow(null, null);
        }*/
    });
    //5.
    $(document).on('click', "#quickView div > div.serviceCard > button", function(){
        $(this).html('Price Set <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></svg>');
        $(this).addClass("priceSet");

        var userID = $(this).parent().attr('value');
        updateObjectPrices(totalPrice, userID);
    });
    //6.
    $(document).on('click', '#quickView div > div.serviceCard > span > svg', function(){
        $(this).parent().parent().remove();
    });
    $("#quoteContainer form").ready(function()
    {
        userData = $("#quoteContainer form > input[name='loadData']").attr('value');
        userData = JSON.parse(userData);
        $("#quoteContainer form > input[name='loadData']").attr('value', "");
        console.log(userData);
    });
    $("#quickView > div > button[name='view']").click(function()
    {
        const idRegex = /[^\d]/;
        var idNumber = $("#quickView > div > input[name='appointmentID']").val();
        idNumber = idNumber.trim();
        if ( (!idRegex.test(idNumber)) && idNumber != "" && (`${idNumber}` in serviceCardShown) == false) {
            if (!addServiceCard(idNumber)) {
                //error message
                console.log("This is not a correct ID")
                $("#quickView .quickViewErrorMessage").html("This ID was not found in our database.");
            }
        }
        else if (idRegex.test(idNumber)) {
            //error message
            console.log("Appointment IDs are made up of numbers only")
            $("#quickView .quickViewErrorMessage").html("IDs must only contain numbers.");
        }
        else if (idNumber == "") {
            //error message
            console.log("Please enter an ID")
            $("#quickView .quickViewErrorMessage").html("Please enter an ID.");
        }
        else if (`${idNumber}` in serviceCardShown) {
            //error message
            console.log("This ID is already being shown")
            $("#quickView .quickViewErrorMessage").html("This ID is already being shown");
        }
    });
    //8. 9.
    $(".changeAction > button[name='save']").click(function() {
        const userDataStringified = JSON.stringify(userPrices);
        $("#quoteContainer form > input[name='objectPrices']").attr('value', userDataStringified);
        
        $("#quoteContainer form").submit();
    });
    $(".changeAction > button[name='delete']").click(function() {
        userPrices = {};
    });

    

});

function displayServicePriceButton() 
{
    var laborRate = $("#calculate > div > div.equationFormat > div > input[name='cPH']").val();
    var laborHour = $("#calculate > div > div.equationFormat > div > input[name='amtHours']").val();
   
    const laborFormat = /[^\d.]/gi;
    laborRate = laborRate.replaceAll(laborFormat, "");
    laborHour = laborHour.replaceAll(laborFormat, "");
    
    var servicePrice = laborRate * laborHour;
    servicePrice = servicePrice.toFixed(2);


    if (isNaN(servicePrice)) 
    {
        return 0;
    }  

    $("#calculate > div > div.equationFormat button[name='serviceDisplay'] > i").html(`$${servicePrice}`);

      
    return servicePrice;
}
function displayFeePriceButton() 
{
    var feePrice = $("#calculate > div > div.equationFormat > div > input[name='feePrice']").val();
   
    const feeFormat = /[^\d.]/gi;

    feePrice = parseFloat(feePrice.replaceAll(feeFormat, ""), 10);
    
    feePrice = feePrice.toFixed(2);

    if (isNaN(feePrice)) 
    {
        return 0;
    }

    $("#calculate > div > div.equationFormat > button[name='feeDisplay'] > i").html(`$${feePrice}`);

    
    return feePrice;
}
function displayTaxButton() 
{
    var taxPrice = String($("#calculate > div > div.equationFormat > div > input[name='taxPrice']").val() * totalPrice * 0.01);
    
    const taxFormat = /[^\d.]/gi;

    taxPrice = parseFloat(taxPrice.replaceAll(taxFormat, ""), 10);
    
    taxPrice = taxPrice.toFixed(2);
    
    if (isNaN(taxPrice)) 
    {
        return 0;
    }
    

    $("#calculate > div > div.equationFormat > button[name='taxDisplay'] > i").html(`$${taxPrice}`);

    
    return taxPrice;
}
function addTableRow(name, price)
{
    //console.log("There will be or are " + (tableRowCount - 1) + " available rows after the addition of one");
    name = (name == "") ? "Unknown" : name;
    //Means there are blank rows left
    if (tableRowCount > 0)
    {
        $(`#overview tr[name='def${tableRowCount}'] > td:nth-child(1)`).html(name);
        $(`#overview tr[name='def${tableRowCount}'] > td:nth-child(2)`).html(`$${price}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
      </svg>`);
        $(`#overview tr[name='def${tableRowCount}'] > td:nth-child(2)`).attr("value", `${price}`);
    }
    else
    {
        $(`#overview table`).append(`<tr class="text">
        <td>${name}</td>
        <td value='${price}'>$${price}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
          </svg></td>
    </tr>`);
    }

    totalPrice = Number(totalPrice) + Number(price);
  


    internationalNumberFormat = new Intl.NumberFormat('en-US')
    var modifiedPrice = internationalNumberFormat.format(Number(totalPrice).toFixed(2));
    
   
    $("#overview p[name='totalPrice'] span").html(`$${modifiedPrice}`);

}
function updateObjectPrices(price, id) 
{
    if(`${price}` in userPrices) 
    {
        var newValue = userPrices[`${price}`] + `, ${id}`;
        userPrices[`${price}`] = newValue;
    }
    else
    {
        userPrices[`${price}`] = `${id}`;
    }

    var displayObject = JSON.stringify(userPrices, null, 4);
    console.log(displayObject);
}
function addServiceCard(id)
{
    
    var matchingID = false;
    var userIndex = 0;
    for(var i = 0; i < userData.length; i++) {
        matchingID = (userData[i][0] == parseInt(id, 10)) ? true : false;
        if (matchingID) {
            userIndex = i;
            break;
        }
    }
    if (!matchingID) {
        return false;
    }
    console.log(userIndex);
    serviceCardShown[id] = "true";

    $("#quickView > div:nth-child(3)").append(`<div value="${userData[userIndex][0]}" class="serviceCard">
    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
      </svg></span>
    <h3 class="text">Viewing ${userData[userIndex][1]}'s Service(s):</h3>
    <p class="text insertAfter-indicator">(${userData[userIndex][2]})</p>
    <button class='text'>Set Price</button>
</div>`);

    for(var x = 3; x < userData[userIndex].length; x++) {
        $(`<p class="text"><span>-</span>${userData[userIndex][x]}</p>`).insertAfter(`div.serviceCard[value='${userData[userIndex][0]}'] > p.insertAfter-indicator`);
    }
    return true;
}

























