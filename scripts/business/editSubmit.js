$(document).ready(function() {
    console.log("LEAVE ME ALONE, JUST STOP DOGGING ME AORUND!")
    $("#editA button[name='find']").click(function(event)
    {
        const idRegex = /[^\d]/;
        var appointmentID = $("#editA input[name='appointmentID']").val().trim();
        if (idRegex.test(appointmentID) || appointmentID == "") {
            $("#searchAppointment + p.editAError").css("display", "block");
            event.preventDefault();
        }
        else
        {
            $("#searchAppointment").submit();
        }

    });

    $("#editAppointment button[name='save']").click(function(event)
    {
        console.log("Leave me alone!")
        
        getDropTime();
        getGetTime();
        
        var validInputs = false;

        var firstName = $("#editAppointment input[name='firstName']").val();
        var lastName = $("#editAppointment input[name='lastName']").val();
        var emailAddress = $("#editAppointment input[name='emailAddress']").val();
        var phoneNumber = $("#editAppointment input[name='phoneNumber']").val();
        var VIN = $("#editAppointment input[name='VIN']").val();
        var licensePlate = $("#editAppointment input[name='licensePlate']").val();
        var mileage = $("#editAppointment input[name='mileage']").val();
        var price = $("#editAppointment input[name='servicePrice']").val();
        
        validInputs = (verifyName(firstName) && verifyName(lastName)) ? true : false;
        
        validInputs = (hasLength(emailAddress) && hasLength(phoneNumber)) ? true : false;
        
        validInputs = (noSymbols(VIN)) ? true : false;
        
        validInputs = (noSymbols(licensePlate)) ? true : false;
        
        validInputs = (noSymbols(mileage)) ? true : false;
        
        validInputs = (noSymbols(price)) ? true : false;
        
        if (validInputs) {
            $("#editAppointment").submit();
        }
        else {
            $("p.mainError").css("display", "block");
            event.preventDefault();
        }
        
    });

    $("#createAppointment button[name='save']").click(function(event)
    {
        
        
        getDropTimeC();
        getGetTimeC();
        
        var validInputs = false;

        var firstName = $("#createAppointment input[name='firstName']").val();
        var lastName = $("#createAppointment input[name='lastName']").val();
        var emailAddress = $("#createAppointment input[name='emailAddress']").val();
        var phoneNumber = $("#createAppointment input[name='phoneNumber']").val();
        var VIN = $("#createAppointment input[name='VIN']").val();
        var licensePlate = $("#createAppointment input[name='licensePlate']").val();
        var mileage = $("#createAppointment input[name='mileage']").val();
        var price = $("#createAppointment input[name='servicePrice']").val();
        
        validInputs = (verifyName(firstName) && verifyName(lastName)) ? true : false;
        
        validInputs = (hasLength(emailAddress) && hasLength(phoneNumber)) ? true : false;
        
        validInputs = (noSymbols(VIN)) ? true : false;
        
        validInputs = (noSymbols(licensePlate)) ? true : false;
        
        validInputs = (noSymbols(mileage)) ? true : false;
        
        validInputs = (noSymbols(price)) ? true : false;
        
        if (validInputs) {
            $("#createAppointment").submit();
        }
        else {
            $("#createAppointment p.mainError").css("display", "block");
            event.preventDefault();
        }
        
    });
    
});

function getDropTime() 
{
    var month = $("#editAppointment select.dropMonth").val();
    var day = $("#editAppointment select.dropDay").val();
    var year = $("#editAppointment select.dropYear").val();
    var hour = $("#editAppointment select.dropHour").val();
    var min = $("#editAppointment select.dropMin").val();
    var ampm = $("#editAppointment select.dropAMPM").val();

    var date = month + "/" + day + "/" + year;
    var time = hour + ":" + min + " " + ampm;
    console.log("There's a time when you're right and you know you must fight. It's the choice that we make and the chocie that you take")
    $("#editAppointment input[name='dropDate']").attr('value', date);
    $("#editAppointment input[name='dropTime']").attr('value', time);

}

function getGetTime() 
{
    var month = $("#editAppointment select.getMonth").val();
    var day = $("#editAppointment select.getDay").val();
    var year = $("#editAppointment select.getYear").val();
    var hour = $("#editAppointment select.getHour").val();
    var min = $("#editAppointment select.getMin").val();
    var ampm = $("#editAppointment select.getAMPM").val();

    var date = month + "/" + day + "/" + year;
    var time = hour + ":" + min + " " + ampm;

    $("#editAppointment input[name='getDate']").attr('value', date);
    $("#editAppointment input[name='getTime']").attr('value', time);

}

function getDropTimeC() {
    var month = $("#createAppointment select.dropMonth").val();
    var day = $("#createAppointment select.dropDay").val();
    var year = $("#createAppointment select.dropYear").val();
    var hour = $("#createAppointment select.dropHour").val();
    var min = $("#createAppointment select.dropMin").val();
    var ampm = $("#createAppointment select.dropAMPM").val();

    var date = month + "/" + day + "/" + year;
    var time = hour + ":" + min + " " + ampm;

    $("#createAppointment input[name='dropDate']").attr('value', date);
    $("#createAppointment input[name='dropTime']").attr('value', time);

}

function getGetTimeC() {
    var month = $("#createAppointment select.getMonth").val();
    var day = $("#createAppointment select.getDay").val();
    var year = $("#createAppointment select.getYear").val();
    var hour = $("#createAppointment select.getHour").val();
    var min = $("#createAppointment select.getMin").val();
    var ampm = $("#createAppointment select.getAMPM").val();

    var date = month + "/" + day + "/" + year;
    var time = hour + ":" + min + " " + ampm;

    $("input[name='getDate']").attr('value', date);
    $("input[name='getTime']").attr('value', time);
}

function verifyName(name)
{
    let nameRegex = /[^A-Z'-\s]/i;
    if (nameRegex.test(name) == false && name.length > 0)
    {
        return true;
    }
    return false; 
}

function noSymbols(text)
{
    let symbolRegex = /[^A-Z\d\s.,\-]/;
    if (symbolRegex.test(text)) {
        return false;
    }
    return true;
}

function hasLength(text)
{
    text = text.trim();
    if (text.length > 0) {
        return true;
    }
    return false;
}