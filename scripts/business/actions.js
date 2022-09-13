var masterChecked = false;
var submit = false;

$(document).ready(function() {

    //When master check box is clicked, all check boxes are checked
        //When unchecked, all boxes are unchecked
    $("#content .titleAppointment > input[name='masterCheckbox']").click(function() {
        masterChecked = (masterChecked) ? false : true;
    
        (masterChecked) ? toggleCheckboxes(true) : toggleCheckboxes(false);
        (masterChecked) ? toggleID("all") : toggleID("none");
    });


    //When appointment checked, add ID to an input form
    $("#content .singleAppointments > input[type='checkbox']").click(function() {
        var appointmentID = $(this).val();
        var ifChecked = $(this)[0].checked;
        (ifChecked) ? toggleID(` ${appointmentID} `, "add") : toggleID(` ${appointmentID} `, "remove");
    });

    //When a button is clicked, send action to an input form and submit
    $("#content .searchBarButtonContainer .dashboardButtons span").click(function(event) {
        console.log("B")
        var action = $(this).attr('name');
        changeInputAction(action);
    });


    //When searching for an appointment
        //Set action to search
        //Set other to value inside of box
    $("#content #dashboardContainer .searchBar > svg").click(function(event) {
        changeInputAction("search");
        var searchInput = $("#content #dashboardContainer .searchBarButtonContainer input[name='searchAppointments']").val();
        $("#dashboardActions input[name='other']").val(`${searchInput}`);
        //NOTE TO LYSANDRA: Make sure to enter input value into 'other' input value
    });


    //When an appointment is clicked, clear all IDs, enter corresponding ID and submit
    $("#content #dashboardContainer .literalDashboard > .singleAppointments").click(function(event) {
        
        submit = true
        changeInputAction("specific");
        var appointmentID = $(this).find("input").val();
        toggleID(` ${appointmentID} `, "specific");
        if (submit) {
            $("#dashboardActions").submit();
        }
        
        
    });

    //Preventing form submission when checkbox is clicked
    $("#content .singleAppointments > input[type='checkbox']").click(function(event) {
        $("#dashboardActions").submit(function(event) {
            event.preventDefault();
        })
    })

});










function changeInputAction(action) {
    $("#dashboardActions input[name='action']").val(`${action}`);
}

function toggleCheckboxes(action) {
    var allCheckboxes = $("#content .appointmentStyle > input[type='checkbox']");
    for (var x = 0; x < allCheckboxes.length; x++) {
        allCheckboxes[x].checked = action;
    }
}

function toggleID(id, action) {

    if (id == "all") {
        var allIDs = $("#content .singleAppointments > input[type='checkbox']");
        var stringIDs = " ";
        for (var x = 0; x < allIDs.length; x++) {
            stringIDs += ` ${allIDs[x].value} `;
        }
        $("#dashboardActions input[name='IDs']").val(`${stringIDs}`);
        return;
    }
    else if (id == "none") {
        $("#dashboardActions input[name='IDs']").val("000");
        return;
    }
    else if (action == "specific") {
        $("#dashboardActions input[name='IDs']").val(`${id}`);
        return;
    }
    else {
        var previousValue = $("#dashboardActions input[name='IDs']").val();
        
        var addedValue = previousValue + id;
        var removedValue = previousValue.replace(`${id}`, "");

        if (action == "add") {
            console.log(true);
            $("#dashboardActions input[name='IDs']").val(`${addedValue}`);
        }
        else {
            $("#dashboardActions input[name='IDs']").val(`${removedValue}`);
        }
    }
    

    
}