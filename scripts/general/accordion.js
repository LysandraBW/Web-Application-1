var expandedQuestion = false;

$(document).ready(function()
{
    $("#hlpt > div > div h2").click(function()
    {
        var questionClicked = $(this).next("p");
        var questionBeforeDisplay = questionClicked.css("display");
        var dropdownPlus = $(this).find("span");

        if (!expandedQuestion)
        {
            resetAccordion();

            questionClicked.slideToggle();
            dropdownPlus.toggleClass("signifyAccordion");
            
            expandedQuestion = true;
        }
        else
        {
            resetAccordion();

            if (questionBeforeDisplay == "none")
            {
                questionClicked.slideToggle();
                dropdownPlus.toggleClass("signifyAccordion");
            }
            expandedQuestion = false;
        }
    })
});

function resetAccordion()
{
    var allQuestions = $("#hlpt > div > div p");
    var alldropdownPluses = $("#hlpt > div > div h2 span");

    allQuestions.css("display", "none");
    alldropdownPluses.removeClass("signifyAccordion");
}