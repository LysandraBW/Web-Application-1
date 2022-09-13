var standardPrice = 0.0;

$(document).ready(function()
{
    //Making sure to take note of the user's original price
    standardPrice = parseFloat($("#pyg input[name='userPrice']").val());

    //Regulating what the user can place into the input text
    $("#pyg input[name='tip']").keypress(function(event)
    {
        var number = String.fromCharCode(event.keyCode);
        verifyTip(number) ? 0 : event.preventDefault();
    });
    $("#pyg input[name='tip']").focusout(function()
    {
        formatTip();
        calculatePrice();
    });
});

function calculatePrice()
{
    //Add tip percentage to price and update the price
    var userTipNum = $("#pyg input[name='tip']").val().replaceAll('%', '') * 0.01;
    var userPrice = standardPrice;
    var tipPercent = userTipNum * userPrice;
    var total = tipPercent + userPrice;
    total = userTipNum == 0 ? standardPrice : total;
    total = total.toFixed(2);
    $("#pyg > div:nth-child(1) h3.priceVar span:nth-child(2)").html(`$${total}`);
    $("#pyg > div:nth-child(1) p.priceVar span:nth-child(2)").html(`$${total}`);
    $("#pyg form button.priceVar span").html(`$${total}`);
    $("#pyg input[name='userTip']").val(`${tipPercent}`);
}
function verifyTip(tip)
{
    let tipRegex = /[^0-9%]/;
    let tipFormatRegex = /[0-9]{0,3}%{0,1}/;

    var userTip = (tip != null) ? tip : $("#pyg input[name='tip']").val();
    var userTipNum = $("#pyg input[name='tip']").val().replace('%', '');

    if (tip != null)
    {
        if (tipRegex.test(userTip) == false)
        {
            return true;
        }
        return false;
    }
    else
    {
        if (tipFormatRegex.test(userTip) == true && userTipNum <= 100)
        {
            return true;
        }
        return false;
    }
}
function formatTip()
{
    var userTipNum = $("#pyg input[name='tip']").val().replaceAll('%', '');
    var value = (userTipNum > 100) ? 100 : userTipNum;
    $("#pyg input[name='tip']").val(`${value}%`);
}


