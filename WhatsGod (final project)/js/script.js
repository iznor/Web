(window.onload = function () {
    var state="login"; //else = "register"
    var login= document.querySelector("#login .submit");
    var reg = document.querySelector("#reg-form");
    var button = document.querySelector("#new-user");
    var new_submit = document.querySelector("#reg-form .submit");
    var valid = false;
    button.addEventListener("click", function () {
        if (reg.style.visibility = "hidden") {
            reg.style.visibility = "visible";
        }
        else{
            reg.style.visibility = "hidden";
        }
    });
    login.addEventListener("click",function(){
        state="login";
        console.log(state);
    } );
    new_submit.addEventListener("click",function(){
        state="register";
        console.log(state);
    } );
})



