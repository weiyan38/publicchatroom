import { Authorize } from "./authorize.js";
import { auth } from "./firebase.js";
import { UiElement } from "./uielement.js";


// UI 
const logoutbtn = document.getElementById('logoutbtn');
const userinfodiv = document.getElementById('userinfo');

// Authorize instance
const authorize = Authorize();

// Uielement instance
const uiele = UiElement(userinfodiv);



// get info & rander
authorize.getUser((data) => {
    console.log(data);

    uiele.userinfoEle(data);
    
});


// logout 
logoutbtn.addEventListener('click', () => {
    const { logoutUser } = Authorize();
    logoutUser();

});



