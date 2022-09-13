var userData = [];
var userDataTest = [
    "John",
    "Smith",
    "johnSmith@gmail.com",
    "111-1111-1100",
    "Call",
    "4T1KZ1AK3MU048459",
    "Toyota",
    "Camry",
    "2021",
    "0123456",
    "123456",
    "I am available on Mondays. That***s when I can finally kick my shoes off!",
    "My car shudders when it starts",
    "Customer has requested car pick-up on Thursdays",
    "Under Repair",
    "10/05/2021",
    "10:00 AM",
    "10/14/2021",
    "02:00 PM",
    "Anthony Wahnsots",
    "540.89",
    "Unpaid",
    "Engine Repair",
    "Transmission Repair",
    "4x Tires"
];
$(document).ready(function()
{
    generalSetup();

    /*$("#editAppointment button[name='reset']").click(function(event)
    {
        generalSetup();
        event.preventDefault();
    });*/
});

function setSelects(name, index)
{
    var options = $(`#editForm select[name='${name}']`).find("option");
    for (var x = 0; x < options.length; x++) {
        var text = options[x].innerHTML;

        if (text.toUpperCase() == userData[index].toUpperCase()) {
            document.getElementsByName(`${name}`)[0].selectedIndex = x;
            break;
        }
    }
}
function setDates(date, time, type)
{
    
    
    time = (time.length == 8) ? time : "0" + time;
    
    var month = date.slice(0, 2);
    var day = date.slice(3, 5);
    var year = date.slice(6);

    var hour = time.slice(0, 2);
    var minute = time.slice(3, 5);
    var am_pm = time.slice(6);

    var arrayTime = [month, day, year, hour, minute, am_pm];

    setSelectsTime(`${type}Month`, 0, arrayTime);
    setSelectsTime(`${type}Day`, 1, arrayTime);
    setSelectsTime(`${type}Year`, 2, arrayTime);
    setSelectsTime(`${type}Hour`, 3, arrayTime);
    setSelectsTime(`${type}Min`, 4, arrayTime);
    setSelectsTime(`${type}AMPM`, 5, arrayTime);

}
function setSelectsTime(name, index, array)
{
    $(`#editForm select.${name}`).append(`<option selected value='${array[index]}' name='${array[index]}'>${array[index]}</option>`)
}
function generalSetup()
{
    userData = $("input[name='LOAD_DATA']").attr('value');
    userData = JSON.parse(userData);

    for (var x = 0; x < userData.length; x++) {
        userData[x] = userData[x].replaceAll("***", "'");
    }

    $("#editAppointment input[name='firstName']").attr('value', `${userData[0]}`);
    $("#editAppointment input[name='lastName']").attr('value', `${userData[1]}`);
    $("#editAppointment input[name='emailAddress']").attr('value', `${userData[2]}`);
    $("#editAppointment input[name='phoneNumber']").attr('value', `${userData[3]}`);
    $("#editAppointment input[name='VIN']").attr('value', `${userData[5]}`);
    $("#editAppointment input[name='licensePlate']").attr('value', `${userData[9]}`);
    $("#editAppointment input[name='mileage']").attr('value', `${userData[10]}`);
    $("#editAppointment textarea[name='availability']").html(`${userData[11]}`);
    $("#editAppointment textarea[name='other-customer']").html(`${userData[12]}`);
    $("#editAppointment textarea[name='other-employee']").html(`${userData[13]}`);
    $("#editAppointment input[name='servicePrice']").attr('value', `${userData[20]}`);

    for (var x = 22; x < userData.length; x++) {
        $("#editForm ul.servicesList").append(`<li class="text" value="${userData[x]}"><i>${userData[x]}</i><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></span></li>`)
    }

    setSelects("contactPreference", 4);
    setSelects("carMake", 6);
    setSelects("status", 14);
    setSelects("Mechanic", 19);
    setSelects("paymentStatus", 21);


    $("#editForm select.c").append(`<option value='${userData[7]}' name='${userData[7]}'>${userData[7]}</option>`)
    document.getElementsByName(`${userData[7]}`)[0].selected = "true";

    $("#editForm select.d").append(`<option value='${userData[8]}' name='${userData[8]}'>${userData[8]}</option>`)
    document.getElementsByName(`${userData[8]}`)[0].selected = "true";

    setDates(userData[15], userData[16], "drop");
    setDates(userData[17], userData[18], "get");
}