var completedInputs = true;
var verifySubmit = false;
var errorMessages = {
    "firstName": "Please make sure that you have entered a first name.",
    "lastName": "Please make sure that you have entered a last name.",
    "email": "Please make sure that you have entered a valid email address.",
    "phoneNumber": "Please make sure that you have entered a phone number in the specified format.",
    "appointmentNumber": "Please make sure that you have entered in an appointment number."
}



$(document).ready(function()
{
    //WHILE USER IS TYPING:
    //If character typed into first or last name has any symbols and/or numbers, prevent the event from happening
    $("#pay input[name='firstName'], #pay input[name='lastName']").keypress(function(event)
    {
        var name = String.fromCharCode(event.keyCode);
        var verificationPass = verifyName(name);
        if (!verificationPass)
        {
            event.preventDefault();
        }
    });
    //If character typed into appointment number field has any symbols or letters, prevent the event from happening
    $("#pay input[name='appointmentNumber']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var verificationPass = verifyNumber(number);
        if (!verificationPass)
        {
            event.preventDefault();
        }
    });
    //If character typed into phone number field has any symbols or letters, prevent the event from happening
    $("#pay input[name='phoneNumber']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var verificationPass = verifyPhone(number);
        if (verificationPass == false)
        {
            event.preventDefault();
        }
    });

    //WHEN USER HAS CLICKED OUT OF THE BOX:
    //If first or last name has any symbols/numbers, display an error message with an X on the side; if not, add the checkmark
    $("#pay input[name='firstName'], #pay input[name='lastName']").focusout(function()
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
                resetMessages(nameOfInput);
            }
        }
        else
        {
            resetMessages(nameOfInput);
        }
    });
    //If email does not match the pattern, display an error message with an X on the side; if not, add the checkmark
    $("#pay input[type='email']").focusout(function()
    {
        var email = $(this).val();
        if (email != "")
        {
            var verificationPass = verifyEmail();
            if (verificationPass == true)
            {
                resetMessages('email');
            }
            else
            {
                inputBad('email');
            }
        }
        else
        {
            resetMessages('email');
        }
    });
    //If appointment number has any symbols or letters, display an error message with an X on the side; if not, add the checkmark
    $("#pay input[name='appointmentNumber']").focusout(function()
    {
        var number = $(this).val();
        if (number != "")
        {
            var verificationPass = verifyNumber(number);
            if (verificationPass == true)
            {
                resetMessages('appointmentNumber');
            }
            else
            {
                inputBad('appointmentNumber');
            }
        }
        else
        {
            resetMessages('appointmentNumber');
        }
    });
    //If phone number has any symbols or letters, display an error message with an X on the side; if not, add the checkmark
    $("#pay input[name='phoneNumber']").focusout(function()
    {
        var phone = $(this).val();
        var nameOfInput = $(this).attr('name');
        if (phone != "")
        {
            var verificationPass = verifyPhone(phone);
            if (verificationPass == true)
            {
                resetMessages(nameOfInput)
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
    
    //WHEN USER PRESSES SUBMIT:
    $("#pay form button").click(function(event)
    {
        verifySubmit = true;
        var firstName = $("#pay form input[name='firstName']").val();
        var lastName = $("#pay form input[name='lastName']").val();
        let phoneInput = document.getElementsByName("phoneNumber")[0].value;
        var appointmentNumber = $("#pay form input[name='appointmentNumber']").val();

        if (!verifyName(firstName))
        {
            completedInputs = false;
            inputBad('firstName');
        }
        if (!verifyName(lastName))
        {
            completedInputs = false;
            inputBad('lastName');
        }
        if (!verifyEmail())
        {
            completedInputs = false;
            inputBad('email');
        }
        if (!verifyPhone(phoneInput))
        {
            completedInputs = false;
            inputBad('phoneNumber');
        }
        if (!verifyNumber(appointmentNumber))
        {
            completedInputs = false;
            inputBad('appointmentNumber');
        }
        if (completedInputs)
        {
            $("#pay form").submit();
            console.log("Submitting");
        }
        else
        {
            event.preventDefault();
            resetMessages();
            document.getElementById("pay").scrollIntoView();
            verifySubmit = false;
        }
    })
});


function verifyNumber(value)
{
    if (value >= 0 && value <= 1000 && value.length != 0)
    {
        return true;
    }
    return false;
}

function verifyName(value)
{
    let nameRegex = /[^A-Z'-\s]/i;
    if (!nameRegex.test(value))
    {
        if (verifySubmit)
        {
            if (value.length > 0)
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
    var email = $("#pay input[type='email']")[0];
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

function inputBad(name)
{
    resetMessages(name);

    $(`#pay [name=${name}]`).addClass("signifyError");
    
    var duplicateMessage = $(`#pay li[value='${name}']`).length;
    if (duplicateMessage == 0)
    {
        var node = document.createElement("li");
        node.setAttribute('value', `${name}`);
        node.setAttribute('class', 'text error');
        var errorNode = document.createTextNode(`${errorMessages[name]}`);
        node.appendChild(errorNode);
        document.getElementsByClassName("errorMessageContainer3")[0].appendChild(node);
    }
    
}

function resetMessages(name)
{
    if (verifySubmit == true && name == null)
    {
        $(`#pay .errorMessageContainer`).empty();
    }
    else
    {
        $(`#pay li[value='${name}']`).remove();
        $(`#pay [name=${name}]`).removeClass("signifyError");
    }
}