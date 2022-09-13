
$(document).ready(function() {
    $("button[name='createAcc']").click(function(event) {
        if (!verifyInputs()) {
            event.preventDefault();
        }

        
    });
});



function verifyPhone(number)
{
    let phoneFormatRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
    if (number.length == 12 && phoneFormatRegex.test(number) == true)
    {
        return true;
    }
    return false;
}
function verifyEmail()
{
    var email = $("input[type='email']")[0];
    if (email.checkValidity() == true)
    {
        return true;
    }
    return false;
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
function verifyInputs() {
    let valid = true;
    let phoneNumberValid = verifyPhone($("input[name='phoneNumber']").val());
    if (!phoneNumberValid) {
        valid = false;
        $("input[name='phoneNumber']").next().css("display", "block");
    }
    else {
        $("input[name='phoneNumber']").next().css("display", "none");
    }

    let emailValid = verifyEmail();
    if (!emailValid) {
        valid = false;
        $("input[name='email']").next().css("display", "block");
    }
    else {
        $("input[name='phoneNumber']").next().css("display", "none");
    }

    let firstNameValid = verifyName($("input[name='firstName']").val());
    if (!firstNameValid) {
        valid = false;
        $("input[name='firstName']").next().css("display", "block");
    }
    else {
        $("input[name='firstName']").next().css("display", "none");
    }
    
    let lastNameValid = verifyName($("input[name='lastName']").val());
    if (!lastNameValid) {
        valid = false;
        $("input[name='lastName']").next().css("display", "block");
    }
    else {
        $("input[name='lastName']").next().css("display", "none");
    }

    return valid;
}