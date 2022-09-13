var showingPassword = true;
$(document).ready(function() {
    $("svg.bi-sunglasses").click(function() {
        if (showingPassword) {
            let passwordInput = $("input[name='passwordPas']").val();

            $("input[name='passwordPas']").css("display", "none");
            $("input[name='passwordTex']").css("display", "block").val(`${passwordInput}`);

            showingPassword = false;
        }
        else {
            let passwordInput = $("input[name='passwordTex']").css("display", "block").val();

            $("input[name='passwordPas']").css("display", "block").val(`${passwordInput}`);
            $("input[name='passwordTex']").css("display", "none");

            showingPassword = true;
        }
    }) ;
    $(".loginButton").click(function() {
        //IF username or password empty
            //Display error message
        //ELSE 
            //Submit
    });

    $("input[name='passwordTex']").change(function() {
        let temp = $("input[name='passwordTex']").val();
        $("input[name='passwordPas']").val(temp);
    });
    $("input[name='passwordPas']").change(function() {
        let temp = $("input[name='passwordPas']").val();
        $("input[name='passwordTex']").val(temp);
    });
        
    
})