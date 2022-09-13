//Used to change the contents of the card once the button is clicked
const cardView = {
    "serve": false,
    "appoint": false,
    "pay": false
}

$(document).ready(function()
{
    $("#hsth div button").click(function()
    {
        var cardValue = $(this).attr('value');
        var cardText = $(`#hsth div[value=${cardValue}] button ~ p`);
        var cardImage = $(`#hsth div[value=${cardValue}] img`);
        var cardButton = $(`#hsth div[value=${cardValue}] button`);
        if (!cardView[cardValue])
        {
            cardText.toggle();
            cardImage.css('display', 'none');
            cardButton.text("Back");
            cardView[cardValue] = true;
        }
        else
        {
            cardText.toggle();
            cardImage.css('display', 'initial');
            cardButton.text("Click to Learn More");
            cardView[cardValue] = false;
        }
    })
});