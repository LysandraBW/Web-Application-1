// Used to toggle the navigation bar
$(document).ready(function()
{
    $("nav ul ~ ul ~ ul").click(function()
    {
        $(".jqnm").slideToggle();
        $("nav ul ~ ul ~ ul").toggleClass("rotate")
    })
})