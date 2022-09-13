//Once the images are finished, this is used to loop the images
var imgCount = 0;
$(document).ready(function()
{
    setTimeout(loop, 1);
    setInterval(loop, 10000);
    function loop()
    {
        $("#imageLoop").animate({opacity: '1'}, 500);
        
        document.getElementById('imageLoop').src = `../static/images/home/car${imgCount}.png`;
        imgCount++;
        if (imgCount == 6)
        {
            imgCount = 0;
        }
        setTimeout(disappearImage = () => $("#imageLoop").animate({opacity: '0'}, 500), 9000);  
    }
});

