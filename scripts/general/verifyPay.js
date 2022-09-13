var errorMessages = {
    "creditName": "Please enter a name",
    "creditDate": "Please enter a valid expiration date",
    "creditCVV": "Please enter a valid CVV",
    "creditNumber": "Please enter a valid credit card number"
}
var cvvMax = false;
var dateMax = false;
var creditMax = false;

$(document).ready(function()
{
    //Preventing the user from typing symbols/letters and more than 3 characters into the CVV
    $("#pyg form input[name='creditCVV']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var result = verifyCVV(number);
        (cvvMax || !result) ? event.preventDefault() : 0;
    });
    $("#pyg form input[name='creditCVV']").keyup(function(event)
    {
        var name = $("#pyg form input[name='creditCVV']").val();
        cvvMax = name.length >= 3 ? true : false;
        verifyCVV() ? resetMessages('creditCVV') : 0;
    });
    //Regulating the date input
    $("#pyg form input[name='creditDate']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var result = verifyExpDate(number);
        (dateMax || !result) ? event.preventDefault() : 0;
    });
    $("#pyg form input[name='creditDate']").keyup(function(event)
    {
        var name = $("#pyg form input[name='creditDate']").val();
        dateMax = name.length >= 5 ? true : false;
    });
    $("#pyg form input[name='creditDate']").focusout(function()
    {
        var userDate = $("#pyg form input[name='creditDate']").val();
        userDate.length > 4 ? formatDate() : 0;
        verifyExpDate() ? resetMessages('creditDate') : 0;
    });
    //Preventing the user from typing symbols/letters and more than 25 characters into the ccnumber
    $("#pyg form input[name='creditNumber']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        var result = verifyCard(number);
        (creditMax || !result) ? event.preventDefault() : 0;
    });
    $("#pyg form input[name='creditNumber']").keyup(function(event)
    {
        var name = $("#pyg form input[name='creditNumber']").val();
        creditMax = name.length >= 25 ? true : false;
        verifyCard() ? resetMessages('creditNumber') : 0;
    });
    //Preventing the user from typing symbols/letters into name field
    $("#pyg form input[name='creditName']").keypress(function(event)
    {
        var letter = String.fromCharCode(event.keyCode);
        var result = verifyName(letter);
        (!result) ? event.preventDefault() : 0;
    });
    $("#pyg form input[name='creditName']").keyup(function(event)
    {
        verifyName() ? resetMessages('creditName') : 0;
    });

    //When user presses the submit button
    $("#pyg form button").click(function(event)
    {
        event.preventDefault();
        var completedInputs = true;
        if (!verifyCard())
        {
            completedInputs = false;
            inputBad('creditNumber');
        }
        if (!verifyCVV())
        {
            completedInputs = false;
            inputBad('creditCVV');
        }
        if (!verifyExpDate())
        {
            completedInputs = false;
            inputBad('creditDate');
        }
        if (!verifyName())
        {
            completedInputs = false;
            inputBad('creditName');
        }
        console.log(completedInputs);
        if (completedInputs)
        {
            $("#pyg form").submit();
        }
        else
        {
            event.preventDefault();
            resetMessages();
            document.getElementById("pyg").scrollIntoView();
        }
    })
});


function verifyCard(number)
{
    let cardRegex = /[^0-9- ]/;
    let cardNum = $("#pyg form input[name='creditNumber']").val();
    if (number != null)
    {
        if (!cardRegex.test(number))
        {
            return true;
        }
        return false;
    }
    else
    {
        if (cardRegex.test(cardNum) == false && (cardNum.length <= 25 && cardNum.length > 15))
        {
            return true;
        }
        return false;
    }
    
}
function verifyCVV(number)
{
    let cvvRegex = /[^0-9]/;
    let cvvFormatRegex = /[0-9]{3}/;
    var CVV = $("#pyg form input[name='creditCVV']").val();

    if (number != null)
    {
        if (cvvRegex.test(number) == false)
        {
            return true;
        }
        return false;
    }
    else
    {
        if (cvvFormatRegex.test(CVV) == true)
        {
            return true;
        }
        return false;
    }

}
function verifyExpDate(number)
{
    //Verify expiration date
    let dateRegex = /[^0-9/]/;
    let dateFormatRegex = /[0-9]{2}\\[0-9]{2}/;
    var userExpDate = $("#pyg form input[name='creditDate']").val();
    //Prevent symbols (except for slash) and letters from being entered, no more than 4 characters
    if (number != null)
    {
        if (!dateRegex.test(number))
        {
            return true;
        }
        return false;
    }
    else
    {
        if ((!dateFormatRegex.test(userExpDate)) && userExpDate.length == 5)
        {
            return true;
        }
        return false;
    }
}
function verifyName()
{
    var name = $("#pyg form input[name='creditName']");
    if (name.length > 5)
    {
        return true;
    }
    return false;
}
function inputBad(name)
{
    resetMessages(name);

    $(`#pyg [name=${name}]`).addClass("signifyError");
    
    var duplicateMessage = $(`#pyg li[value='${name}']`).length;
    if (duplicateMessage == 0)
    {
        var node = document.createElement("li");
        node.setAttribute('value', `${name}`);
        node.setAttribute('class', 'text error');
        var errorNode = document.createTextNode(`${errorMessages[name]}`);
        node.appendChild(errorNode);
        document.getElementsByClassName("errorMessageContainer4")[0].appendChild(node);
    }
    
}
function resetMessages(name)
{
    if (name == null)
    {
        $(`#pyg .errorMessageContainer`).empty();
    }
    else
    {
        $(`#pyg li[value='${name}']`).remove();
        $(`#pyg [name=${name}]`).removeClass("signifyError");
    }
}
function formatDate()
{
    var userDate = $("#pyg form input[name='creditDate']").val();
    userDate = userDate.replaceAll("/", "");
    console.log(userDate);
    if (userDate.length < 4)
    {
        return;
    }
    var formattedUserDate = `${userDate[0]}${userDate[1]}/${userDate[2]}${userDate[3]}`;
    console.log(formattedUserDate);
    $("#pyg form input[name='creditDate']").val(`${formattedUserDate}`);
}
function verifyName(value)
{
    let nameRegex = /[^A-Z'-\s]/i;
    var name = $("#pyg form input[name='creditName']").val();
    if (value != null)
    {
        if (!nameRegex.test(value))
        {
            return true;
        }
        return false;
    }
    else
    {
        if (!nameRegex.test(name) && name.length > 3)
        {
            return true;
        }
        return false;
    }
}