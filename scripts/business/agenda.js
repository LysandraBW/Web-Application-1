$(document).ready(function() {
    var currentTime = new Date()
    $("#miniCalendar input[name='month']").val(currentTime.getMonth() + 1)
    $("#miniCalendar input[name='day']").val(currentTime.getDate())
    $("#miniCalendar input[name='year']").val(currentTime.getFullYear())

    //MONTH FOR CALENDAR: Change text, toggle select, change input
    $("#miniCalendar span[name='chooseMonth']").click(function() {
        $("#miniCalendar ul[name='selectMonth']").slideToggle();
    });
    $("#miniCalendar ul[name='selectMonth'] > li").click(function() {
        let month = $(this).attr('name');
        $("#miniCalendar ul[name='selectMonth']").slideToggle();
        $("#miniCalendar span[name='chooseMonth']").html(`${month}`);
        $("#miniCalendar input[name='month']").val(`${month}`);
    });
    //YEAR FOR CALENDAR: Change text, toggle select, change input
    $("#miniCalendar span[name='chooseYear']").click(function() {
        $("#miniCalendar ul[name='selectYear']").slideToggle();
    });
    $("#miniCalendar ul[name='selectYear'] > li").click(function() {
        let year = $(this).attr('name');
        $("#miniCalendar ul[name='selectYear']").slideToggle();
        $("#miniCalendar span[name='chooseYear']").html(`${year}`);
        $("#miniCalendar input[name='year']").val(`${year}`);
    });
    //DAY FOR CALENDAR: Stick hover effect
    $("#calendar > span.day").not(".nameDay").click(function() {
        $("#calendar > span.day").removeClass("clickedDayEffect")
        $(this).addClass("clickedDayEffect");
        let day = $(this)[0].getAttribute("name");
        console.log(day)
        $("#miniCalendar input[name='day']").val(`${day}`);
    });
    //SEARCH DAY
    let monthsArr =  ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"];
    $("#miniCalendar > div.searchAppt").click(function() {
        
        let month = $("#miniCalendar input[name='month']").val();
        let monthValidity = (monthsArr.indexOf(`${month}`) >= 0 || (month > 0 && month <= 12)) ? true : false

        let day = parseInt($("#miniCalendar input[name='day']").val());
        let dayValidity = ((typeof day == "number") && (day > 0 && day < 32));

        let year = parseInt($("#miniCalendar input[name='year']").val());
        let yearValidity = ((typeof year == "number") && (year > 2000));
        
        console.log(monthsArr.indexOf(`${month}`))
        if (monthValidity && dayValidity && yearValidity) {
            
            $("form#miniCalendar").submit();
        }
    });
    //POPUP: Show popup to create meeting
    let deletePopup = false;
    let createPopup = false;
    $("#createMeeting > span:nth-child(2)").click(function() {
        if (!deletePopup) {
            createPopup = (createPopup) ? false : true;
            $("form#popupCreate").slideToggle();
        }
    });
    //POPUP: Cancel or create button clicked
        //FIXME: Prevent page from being reloaded when cancel button clicked
    $("form#popupCreate button[name='cancelCreate']").click(function(event) {
        createPopup = (createPopup) ? false : true;
        event.preventDefault();
        $("form#popupCreate").slideToggle();
    });
    //DELETE: Show popup when button clicked
        //FIXME: SEND APPOINTMENT ID
    $("#displayMeet button.deleteAppt").click(function() {
        if (!createPopup && !deletePopup) {
            deletePopup = (deletePopup) ? false : true;
            $("form#deleteMeeting").toggle();

            let idMeeting = $(this).parent().attr('name');
            let meetingCategory = $(this).siblings(".categoryLabel")[0].getAttribute("name");
            
            $("form#deleteMeeting input[name='idMeeting']").val(`${idMeeting}`);
            $("form#deleteMeeting input[name='categoryMeeting']").val(`${meetingCategory}`);
        }   
            
    });
    $("form#deleteMeeting button[name='cancelDelete']").click(function(event) {
        deletePopup = (deletePopup) ? false : true;
        event.preventDefault();
        $("form#deleteMeeting").toggle();
    });
    //FORM SUBMISSION VALIDATION: Create
    $("form#popupCreate button[name='createAppt']").click(function(event) {
        let name = $("input[name='meetingName']").val();
        let validName = checkName(name, "meetingName");
        let date = $("input[name='meetingDate']").val();
        let validDate = checkDate(date, "meetingDate");
        let time = $("input[name='meetingTime']").val();
        let validTime = checkTime(time, "meetingTime");
        console.log(validName + " " + validDate + " " +validTime)
        if (validName && validDate && validTime) {
            console.log("Hello")
            $("form#popupCreate").submit();
        }
        else {
            event.preventDefault();
        }
    });
})

function checkName(name, nameofInput) {
    let nameRegex = /[^A-Za-z0-9\s\-\']/gi;
    if (nameRegex.test(name) || name.length < 3) {
        $(`input[name='${nameofInput}']`).addClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "inline");
        return false;
    }
    else {
        $(`input[name='${nameofInput}']`).removeClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "none");
        return true
    }
}

function checkDate(date, nameofInput) {
    let dateRegex = /\d{2}[\/]\d{2}[\/]\d{4}/;
    if (!dateRegex.test(date)) {
        $(`input[name='${nameofInput}']`).addClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "inline");
        return false;
    }
    else {
        $(`input[name='${nameofInput}']`).removeClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "none");
        return true
    }
}

function checkTime(time, nameofInput) {
    let timeRegex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
    if (!timeRegex.test(time)) {
        $(`input[name='${nameofInput}']`).addClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "inline");
        return false;
    }
    else {
        console.log("hey heyhye iits fat albert")
        $(`input[name='${nameofInput}']`).removeClass("badInputEffect");
        $(`input[name='${nameofInput}']`).next().css("display", "none");
        return true
    }
}