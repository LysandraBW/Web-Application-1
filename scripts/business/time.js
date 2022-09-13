$(document).ready(function()
{
    loadDays("drop");
    loadDays("get");
    loadMonths("drop");
    loadMonths("get");
    loadYear("drop");
    loadYear("get");
    loadHour("drop");
    loadHour("get");
    loadMinute("drop");
    loadMinute("get");
});

function loadDays(type)
{
    for(var x = 1; x < 32; x++) {
        if (x < 10) {
            $(`select.${type}Day`).append(`<option value="0${x}">0${x}</option>`);
        }
        else if (x > 9) {
            $(`select.${type}Day`).append(`<option value="${x}">${x}</option>`);
        }
    }
}

function loadMonths(type)
{
    for(var x = 1; x < 13; x++) {
        if (x < 10) {
            $(`select.${type}Month`).append(`<option value="0${x}">0${x}</option>`);
        }
        else if (x > 9) {
            $(`select.${type}Month`).append(`<option value="${x}">${x}</option>`);
        }
    }
}

function loadYear(type)
{
    for(var x = 2023; x > 2005; x--) {
        $(`select.${type}Year`).append(`<option value="${x}">${x}</option>`)
    }
}

function loadHour(type)
{
    for(var x = 1; x < 13; x++) {
    
        if (x < 10) {
            $(`select.${type}Hour`).append(`<option value="0${x}">0${x}</option>`)
        }
        else if (x > 9)
        {
            $(`select.${type}Hour`).append(`<option value="${x}">${x}</option>`)
        }
    }
}

function loadMinute(type)
{
    for(var x = 0; x < 60; x++) {
        if (x < 10) {
            $(`select.${type}Min`).append(`<option value="0${x}">0${x}</option>`)
        }
        else if (x > 9)
        {
            $(`select.${type}Min`).append(`<option value="${x}">${x}</option>`)
        }
        
    }
}