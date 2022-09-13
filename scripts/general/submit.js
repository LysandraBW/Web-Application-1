var completedInputs = true;
var verifySubmit = false;
var errorMessages = {
    "firstName": "Please make sure that you have entered a first name.",
    "lastName": "Please make sure that you have entered a last name.",
    "email": "Please make sure that you have entered a valid email address.",
    "appointmentNumber": "Please make sure that you have entered in an appointment number."
}



$(document).ready(function()
{
    //WHILE USER IS TYPING:
    //If character typed into first or last name has any symbols and/or numbers, prevent the event from happening
    $("#view input[name='firstName'], #view input[name='lastName']").keypress(function(event)
    {
        var name = String.fromCharCode(event.keyCode);
        var verificationPass = verifyName(name);
        if (!verificationPass)
        {
            event.preventDefault();
        }
    });
    //If character typed into appointment number field has any symbols or letters, prevent the event from happening
    $("#view input[name='appointmentNumber']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var verificationPass = verifyNumber(number);
        if (!verificationPass)
        {
            event.preventDefault();
        }
    });


    //WHEN USER HAS CLICKED OUT OF THE BOX:
    //If first or last name has any symbols/numbers, display an error message with an X on the side; if not, add the checkmark
    $("#view input[name='firstName'], #view input[name='lastName']").focusout(function()
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
    $("#view input[type='email']").focusout(function()
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
    $("#view input[name='appointmentNumber']").focusout(function()
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
    
    
    //WHEN USER PRESSES SUBMIT:
    $("#view form button").click(function(event)
    {
        verifySubmit = true;
        var firstName = $("#view form input[name='firstName']").val();
        var lastName = $("#view form input[name='lastName']").val();
        var appointmentNumber = $("#view form input[name='appointmentNumber']").val();

        if (!verifyName(firstName))
        {
            completedInputs = false;
            inputBad('firstName')
        }
        if (!verifyName(lastName))
        {
            completedInputs = false;
            inputBad('lastName')
        }
        if (!verifyEmail())
        {
            completedInputs = false;
            inputBad('email')
        }
        if (!verifyNumber(appointmentNumber))
        {
            completedInputs = false;
            inputBad('appointmentNumber')
        }
        if (completedInputs)
        {
            $("#view form").submit();
        }
        else
        {
            event.preventDefault();
            resetMessages();
            document.getElementById("view").scrollIntoView();
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
    var email = $("#view input[type='email']")[0];
    if (email.checkValidity() == true)
    {
        return true;
    }
    return false;
}

function inputBad(name)
{
    resetMessages(name);

    $(`#view [name=${name}]`).addClass("signifyError");
    
    var duplicateMessage = $(`#view li[value='${name}']`).length;
    if (duplicateMessage == 0)
    {
        var node = document.createElement("li");
        node.setAttribute('value', `${name}`);
        node.setAttribute('class', 'text error');
        var errorNode = document.createTextNode(`${errorMessages[name]}`);
        node.appendChild(errorNode);
        document.getElementsByClassName("errorMessageContainer2")[0].appendChild(node);
    }
    
}

function resetMessages(name)
{
    if (verifySubmit == true && name == null)
    {
        $(`#view .errorMessageContainer`).empty();
    }
    else
    {
        $(`#view li[value='${name}']`).remove();
        $(`#view [name=${name}]`).removeClass("signifyError");
    }
}