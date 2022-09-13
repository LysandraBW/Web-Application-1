$(document).ready(function()
{
    $("#pyg form input[name='creditNumber']").keyup(function()
    {
        var CCN = $("#pyg form input[name='creditNumber']").val().replaceAll(" ", "").replaceAll("-", "");
        decodeCard(CCN) == "AMEX" ? showCard(4) : 0;
        decodeCard(CCN) == "VISA" ? showCard(0) : 0;
        decodeCard(CCN) == "MASTERCARD" ? showCard(1) : 0;
        decodeCard(CCN) == "DISCOVER" ? showCard(5) : 0;
        decodeCard(CCN) == null ? showCard(2) : 0;
    });
});

function decodeCard(CCN)
{
    if (CCN.length == 15 && CCN[0] == "3")
    {
        return "AMEX";
    }
    else if ((CCN.length == 16 || CCN.length == 19) && CCN[0] == "4")
    {
        return "VISA";
    }
    else if (CCN.length == 16 && (CCN[0] == "2" || CCN[0] == "5"))
    {
        return "MASTERCARD";
    }
    else if (CCN.length == 16 && CCN[0] == "6")
    {
        return "DISCOVER";
    }
    else
    {
        return null;
    }
}

function showCard(num)
{
    document.getElementById('cardLogo').src = `../static/images/paying/card${num}.png`;
}