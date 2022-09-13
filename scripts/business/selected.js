var servicesObj = {};




$(document).ready(function()
{

    userData = $("input[name='LOAD_DATA']").attr('value');
    userData = JSON.parse(userData);

    for (var x = 22; x < userData.length; x++) {
        servicesObj[`${userData[x]}`] = "on";
    }
    
    $("#editForm select[name='services']").change(function()
    {
        var valueName = document.getElementsByName("services")[0].value;
        detectServices(valueName) ? 0 : addServices(valueName); 
    });

    $(document).on('click', '#editForm ul.servicesList > li > span', function() 
    {  
        var valueName = $(this).parent()[0].innerText;
        $(this).parent().remove();   
        servicesObj[`${valueName}`] = "off";
    });

    $("#editForm input[name='additionalCharge']").focusout(function(){
        var valueName = $(this).val().trim();
        (valueName != "") ? addServices(valueName) : 0;
    });
    
    $("#editForm button[name='save']").click(function()
    {
        var objectDisplay = JSON.stringify(servicesObj);
        $("#editForm input[name='saveServices']").attr('value', objectDisplay);
    });

});

function addServices(name) {
    $("ul.servicesList").append(`<li class="text" value='${name}'><i>${name}</i><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></span></li>`);
    servicesObj[`${name}`] = "on";
};

function detectServices(name) {
    var servicesLength = $("ul.servicesList").children().length;
    var currentService = "";
    for(var x = 0; x < servicesLength; x++) {
        currentService = $("ul.servicesList").find("i")[x].innerText;
        if (currentService.toUpperCase() == name.toUpperCase()) {
            console.log(name + " matched with " + currentService);
            return true;
        }
    }
    return false;
}