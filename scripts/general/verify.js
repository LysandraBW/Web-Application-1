//Verifying and managing the input the user enters
var verifySubmit = false;
var errorMessages =
{
    "firstName": "Please ensure that your first name has no symbols or numbers.",
    "lastName": "Please ensure that your last name has no symbols or numbers.",
    "email": "Please ensure that the entered email address is valid.",
    "phoneNumber": "Please ensure that the entered phone number is in the correct format.",
    "contactContainer": "Please ensure that you have answered all the questions.",
    "VIN": "Please ensure that your VIN is 17 digits and accurate.",
    "carMake": "Please ensure that you have entered in the car's make.",
    "carModel": "Please ensure that you have entered in the car's model.",
    "carYear": "Please ensure that you have entered in the car's year.",
    "userServices": "Please ensure that you have selected at least one (1) service.",
    "available": "Please ensure that you answer the question regarding availability."
}

$(document).ready(function()
{
    //WHILE USER IS TYPING:
    //If character typed into first or last name has any symbols and/or numbers, prevent the event from happening
    $("#sch input[name='firstName'], #sch input[name='lastName']").keypress(function(event)
    {
        var name = String.fromCharCode(event.keyCode);
        var verificationPass = verifyName(name);
        if (verificationPass == false)
        {
            event.preventDefault();
        }
    });
    //If character typed into phone number field has any symbols or letters, prevent the event from happening
    $("#sch input[name='phoneNumber']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var verificationPass = verifyPhone(number);
        if (verificationPass == false)
        {
            event.preventDefault();
        }
    });
    //If character typed into VIN has any symbols, prevent the event from happening; if the length is longer than 17, prevent the event from happening
    $("#sch input[name='VIN']").keypress(function(event)
    {
        var VIN = String.fromCharCode(event.keyCode);
        var verificationPass = verifyVIN(VIN);
        if (verificationPass == false)
        {
            event.preventDefault();
        }
    });
    
    


    //WHEN USER HAS CLICKED OUT OF THE BOX:
    //If first or last name has any symbols/numbers, display an error message with an X on the side; if not, add the checkmark
    $("#sch input[name='firstName'], #sch input[name='lastName']").focusout(function()
    {
        var name = $(this).val();
        var nameOfInput = $(this).attr('name');
        if (name != "")
        {
            var verificationPass = verifyName(name);
            if (verificationPass == false)
            {
                inputBad(nameOfInput);
            }
            else
            {
                inputGood(nameOfInput);
            }
        }
        else
        {
            resetMessages(nameOfInput);
        }
    });
    //If email does not match the pattern, display an error message with an X on the side; if not, add the checkmark
    $("#sch input[type='email']").focusout(function()
    {
        var email = $(this).val();
        var nameOfInput = $(this).attr('name');
        if (email != "")
        {
            var verificationPass = verifyEmail();
            if (verificationPass == true)
            {
                inputGood(nameOfInput)
            }
            else
            {
                inputBad(nameOfInput);
            }
        }
        else
        {
            resetMessages(nameOfInput);
        }
    });
    //If phone number has any symbols or letters, display an error message with an X on the side; if not, add the checkmark
    $("#sch input[name='phoneNumber']").focusout(function()
    {
        var phone = $(this).val();
        var nameOfInput = $(this).attr('name');
        if (phone != "")
        {
            var verificationPass = verifyPhone(phone);
            if (verificationPass == true)
            {
                inputGood(nameOfInput)
            }
            else
            {
                inputBad(nameOfInput);
            }
        }
        else
        {
            resetMessages(nameOfInput);
        }
    });
    //If VIN has any symbols, display an error message with an X on the side; if not, add the checkmark
    $("#sch input[name='VIN']").focusout(function()
    {
        var VIN = $(this).val();
        var carMake = $("#sch [name='carMake']");
        var carModel = $("#sch [name='carModel']");
        var carYear = $("#sch [name='carYear']");
        var nameOfInput = $(this).attr('name');
        if (VIN != "")
        {
            var verificationPass = verifyVIN(VIN);
            if (verificationPass == true)
            {
                inputGood(nameOfInput)
            }
            else
            {
                inputBad(nameOfInput);
            }
        }
        else
        {
            resetMessages(nameOfInput);
            resetMessages(carMake.attr('name'));
            resetMessages(carModel.attr('name'));
            resetMessages(carYear.attr('name'));
        }
    });



    //Resetting CSS for inputs that aren't verified immediately after they have been changed
    $("select").change(function()
    {
        resetMessages("carMake");
        resetMessages("carModel");
        resetMessages("carYear");
    });
    $("input[type='checkbox']").change(function()
    {
        resetMessages("userServices");
    });
    $("input[type='radio']").change(function()
    {
        resetMessages("contactContainer");
    })
    $("textarea").change(function()
    {
        resetMessages("available");
    })



    //WHEN USER PRESSES SUBMIT:
    $("#sch button").click(function(event)
    {
        verifySubmit = true;
        resetMessages();

        var firstName = $("#sch [name='firstName']");
        var lastName = $("#sch [name='lastName']");
        var emailAddress = $("#sch [name='email']");
        var phoneNumber = $("#sch [name='phoneNumber");
        var VIN = $("#sch [name='VIN']");
        var userAvailability = $("#sch [name='available']");
        var carMake = $("#sch [name='carMake']");
        var carModel = $("#sch [name='carModel']");
        var carYear = $("#sch [name='carYear']");
        var contactPreference = $("#sch [name='contactContainer']");
        var userServices = $("#sch [name='userServices']");
        var correctInputs = true;

        if (!verifyName(firstName.val()))
        {
            inputBad(firstName.attr('name'));
            correctInputs = false;
        }
        if (!verifyName(lastName.val()))
        {
            inputBad(lastName.attr('name'));
            correctInputs = false;
        }
        if (!verifyPhone(phoneNumber.val()))
        {
            inputBad(phoneNumber.attr('name'));
            correctInputs = false;
        }
        if (!verifyVIN(VIN.val()))
        {
            inputBad(VIN.attr('name'));
            correctInputs = false;
        }
        if (!verifyAvailability(userAvailability.val()))            
        {
            inputBad(userAvailability.attr('name'));
            correctInputs = false;
        }
        if (!verifyEmail())          
        {
            inputBad(emailAddress.attr('name'));
            correctInputs = false;
        }
        if (!verifyManufacturer())
        {
            inputBad(carMake.attr('name'));
            inputBad(carModel.attr('name'));
            inputBad(carYear.attr('name'));
            correctInputs = false;
        }
        if (!verifyContact())
        {
            inputBad(contactPreference.attr('name'));
            correctInputs = false;
        }
        if (!verifyServices())
        {
            inputBad(userServices.attr('name'));
            correctInputs = false;
        }

        if (!correctInputs)
        {
            document.getElementById("sch").scrollIntoView();
            event.preventDefault();
            verifySubmit = false;
        }
        else
        {
            $("#sch form").submit();
        }
    })
})

//HELPER FUNCTIONS
function verifyName(name)
{
    let nameRegex = /[^A-Z'-\s]/i;
    if (nameRegex.test(name) == false)
    {
        if (verifySubmit == true)
        {
            if (name.length > 0)
            {
                return true;
            }
            return false;
        }
        return true;
    }
    return false; 
}

function verifyEmail()
{
    var email = $("#sch input[type='email']")[0];
    if (email.checkValidity() == true)
    {
        return true;
    }
    return false;
}

function verifyPhone(number)
{
    let phoneInput = document.getElementsByName("phoneNumber")[0].value;
    let phoneRegex = /[^0-9-]/;
    let phoneFormatRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (verifySubmit == true)
    {
        if (number.length == 12 && phoneFormatRegex.test(number) == true)
        {
            return true;
        }
        return false;
    }
    if (phoneRegex.test(number) == false && phoneInput.length < 13)
    {
        return true;
    }
    return false;


}

function verifyVIN(vin)
{
    let vinInput = document.getElementsByName("VIN")[0].value;
    let vinRegex = /[^A-Z0-9]/i;
    let vinFormatRegex = /[A-Z0-9]{17}/i;
    if (verifySubmit == true)
    {
        if (vinFormatRegex.test(vin) == true || vin == "")
        {
            return true;
        }
        return false; 
    }
    if (vinRegex.test(vin) == false && vinInput.length < 18)
    {
        return true;
    }
    return false;
}

function verifyManufacturer()
{
    var carMakeCheck = document.getElementsByName("make")[0].selected;
    var carModelCheck = document.getElementsByName("make")[0].selected;
    var carYearCheck = document.getElementsByName("make")[0].selected;
    if (carMakeCheck == true || carModelCheck == true || carYearCheck == true)
    {
        return false
    }
    return true;
}

function verifyContact()
{
    var radioButton = $("#sch input[type='radio']");
    var radioButtonCount = $("#sch input[type='radio']").length;
    var radioButtonChecked = 0;
    for (var x = 0; x < radioButtonCount; x++)
    {
        if (radioButton[x].checked == true)
        {
            radioButtonChecked++;
        }
    }
    if (radioButtonChecked == 1)
    {
        return true;
    }
    return false;
}

function verifyServices()
{
    var checkbox = $("#sch input[type='checkbox']");
    var checkboxCount =  $("#sch input[type='checkbox']").length;
    var checkboxChecked = false;
    for (var x = 0; x < checkboxCount; x++)
    {
        if (checkbox[x].checked == true)
        {
            checkboxChecked = true;
        }
    }
    return checkboxChecked;
}

function verifyAvailability(text)
{
    if (text.length > 5)
    {
        return true;
    }
}

function inputGood(name)
{
    resetMessages(name);
}

function inputBad(name)
{
    resetMessages(name);

    $(`[name=${name}]`).addClass("signifyError");
    var duplicateMessage = $(`#sch li[value='${name}']`).length;
    if (duplicateMessage == 0)
    {
        var node = document.createElement("li");
        node.setAttribute('value', `${name}`);
        node.setAttribute('class', 'text error');
        var errorNode = document.createTextNode(`${errorMessages[name]}`);
        node.appendChild(errorNode);
        document.getElementsByClassName("errorMessageContainer")[0].appendChild(node);
    }
    
}

function resetMessages(name)
{
    if (verifySubmit == true && name == null)
    {
        $(`#sch .errorMessageContainer`).empty();
    }
    else
    {
        $(`#sch li[value='${name}']`).remove();
        $(`#sch [name=${name}]`).removeClass("signifyError");
    }
}