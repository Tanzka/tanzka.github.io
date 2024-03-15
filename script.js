const registrationForm = document.getElementById("registrationForm");
const errorMessages = document.getElementById("errorMessages");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const username = document.getElementById("userid").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwd").value;
    const realname = document.getElementById("name").value;
    const zipcode = document.getElementById("zip").value;
    const address = document.getElementById("addr").value;
    const genderButtons = document.querySelector( 'input[name="gender"]:checked'); 
    const langButtons = document.querySelector( 'input[name="lang"]:checked');
    const countrySelector = document.querySelector('select[name="country"]');

    errorMessages.innerHTML = "";

    if (!username.trim() || username.length < 5) {
        displayError("ID:n täytyy olla vähintään 6 merkkiä pitkä.");
        document.getElementById("userid").focus();
        return;
    }

    if (!password.trim() || !isStrongPassword(password)) {
        displayError("Salasanan pituus täytyy olla vähintään 6 merkkiä, ja sisältää yhden numeron, ison kirjaimen ja erikoismerkin.");
        document.getElementById("passwd").focus();
        return;
    }

    if (!realname.trim()) {
        displayError("Syötä nimi.");
        document.getElementById("name").focus();
        return;
    }

    if (!address.trim()) {
        displayError("Osoite on pakollinen.");
        document.getElementById("addr").focus();
        return;
    }

    if (countrySelector.value == "Default") {
        displayError("Maata ei ole valittu.");
        return;
    }

    if (!zipcode.trim() || !checkPostal(zipcode)) {
        displayError("Postinumeron tulee olla viisinumeroinen.");
        document.getElementById("zip").focus();
        return;
    }

    if (!email.trim() || !isValidEmail(email)) {
        displayError("Syötä sähköpostiosoite.");
        document.getElementById("email").focus();
        return;
    }

    if (genderButtons == null) {
        displayError("Valitse sukupuoli.");
        return;
    }

    if (langButtons == null) {
        displayError("Valitse kielesi.");
        return;
    }

    alert("Rekisteröityminen onnistui!"); //Technically alert isn't supposed to be used for this assignment but hopefully it's acceptable just for this part!
    registrationForm.reset();
});

function displayError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "error";
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    errorMessages.appendChild(errorMessage);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    let tester = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
    return tester.test(password);
}

function checkPostal(zipcode) {
    let ziptest = /^\d{5}$/;
    return ziptest.test(zipcode);
}