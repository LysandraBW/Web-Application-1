$(document).ready(function() {
    $("#content .dashboardButtons span.specificAppt").click(function(event) {
        event.preventDefault();
        var action = $(this).attr('name');
        $("input[name='action']").val(`${action}`);

        if (action == "delete") {
            $("form#specific").attr("action", "/delete/appointment")
        }
        submit();
    });
})

function submit() {
    $("#specific").submit();
}