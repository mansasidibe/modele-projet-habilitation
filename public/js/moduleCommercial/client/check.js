// VERIFICATION DU REGISTRE DE COMMERCE (DEBUT)
const get_registre_commerce = async(registre_commerce) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_registre_commerce`, { registre_commerce: registre_commerce }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#registre_commerce").on("keyup", function() {
    var mat = document.querySelector("#registre_commerce").value;

    get_registre_commerce(mat).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#registre_commerce_message').text('This trade register number already exists.').css('color', 'red') : $('#registre_commerce_message').text('Ce numero de registre commerce existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#registre_commerce_message').text('');
            }
        }
    );
});

// VERIFICATION DU REGISTRE DE COMMERCE (FIN)

// VERIFICATION DU NCC (DEBUT)
const get_ncc = async(ncc) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_ncc`, { ncc: ncc }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#ncc").on("keyup", function() {
    var ncc = document.querySelector("#ncc").value;

    get_ncc(ncc).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#ncc_message').text('This ncc number already exists.').css('color', 'red') : $('#ncc_message').text('Ce numero ncc existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#ncc_message').text('');
            }
        }
    );
});

// VERIFICATION DU NCC (FIN)


// VERIFICATION DU MAIL (DEBUT)
const get_email = async(email_tiers) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_email`, { email_tiers: email_tiers }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#email_tiers").on("keyup", function() {
    var email_tiers = document.querySelector("#email_tiers").value;

    get_email(email_tiers).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#email_tiers_message').text('This email already exists.').css('color', 'red') : $('#email_tiers_message').text('Ce email existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#email_tiers_message').text('');
            }
        }
    );
});

// VERIFICATION DU MAIL (FIN)


// VERIFICATION DU CONTACT (DEBUT)
const get_contact_check = async(contact) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_contact`, { contact: contact }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#contact").on("keyup", function() {
    var contact = document.querySelector("#contact").value;

    get_contact_check(contact).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#contact_message').text('This contact already exists.').css('color', 'red') : $('#contact_message').text('Ce contact existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#contact_message').text('');
            }
        }
    );
});

// VERIFICATION DU CONTACT (FIN)


// VERIFICATION DU FAXE (DEBUT)
const get_faxe = async(faxe) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_faxe`, { faxe: faxe }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#faxe").on("keyup", function() {
    var faxe = document.querySelector("#faxe").value;

    get_faxe(faxe).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#faxe_message').text('This fixe already exists.').css('color', 'red') : $('#faxe_message').text('Ce fixe existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#faxe_message').text('');
            }
        }
    );
});

// VERIFICATION DU FAXE (FIN)


// VERIFICATION DU SITE WEB (DEBUT)
const get_site_web = async(site_web) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_site_web`, { site_web: site_web }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#site_web").on("keyup", function() {
    var site_web = document.querySelector("#site_web").value;

    get_site_web(site_web).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                localeJquery == "en" ? $('#site_web_message').text('This website already exists.').css('color', 'red') : $('#site_web_message').text('Ce site web existe déjà.').css('color', 'red');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#site_web_message').text('');
            }
        }
    );
});

// VERIFICATION DU SITE WEB (FIN) 


// VERIFICATION DES CARACTERE MAJUSCULE SUR LES CHAMPS SITE WEB ET EMAIL (DEBUT)
function checkUpperCase(event, fieldId) {
    var inputChar = event.key;
    if (inputChar === inputChar.toUpperCase() && inputChar !== inputChar.toLowerCase()) {
        var fieldName = document.querySelector('[data-field="' + fieldId + '"]').getAttribute('data-field-name');
        var localeJquery = 'fr';
        var message = localeJquery === 'fr' ? `Veuillez saisir ${fieldName} en minuscule.` : `Please enter the ${fieldName} in lowercase.`;

        Swal.fire({
            title: message,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
}

// VERIFICATION DES CARACTERE MAJUSCULE SUR LES CHAMPS SITE WEB ET EMAIL (FIN)

// VERIFICATION DU FORMAT DU MAIL A LA SAISI (DEBUT)
var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
$("#email_tiers").on("keyup", function() {
    if (!pattern1.test($('#email_tiers').val())) {
        $(".btn_submit").prop('disabled', true);
        localeJquery == "en" ? $('.check_mail_valid').text('Please enter a valid email.').css('color', 'red') : $('.check_mail_valid').text('Veuillez renseigner un mail valide.').css('color', 'red');
    } else {
        $(".btn_submit").prop('disabled', false);
        $('.check_mail_valid').text('');
    }
});
// VERIFICATION DU FORMAT DU MAIL A LA SAISI (FIN)


// VERIFICATION DU FORMAT DU LIEN SITE WEB A LA SAISI (DEBUT)

function isLink(input) {
    // Vérifie si l'entrée est une chaîne vide.
    if (input === '') {
        return false;
    }

    // Vérifie si l'entrée commence par http:// ou https://.
    // if (!input.startsWith('http://') && !input.startsWith('https://')) {
    //     return false;
    // }

    // Vérifie si l'entrée contient un nom de domaine valide.
    const regex = /^(www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;
    if (!regex.test(input)) {
        return false;
    }

    // L'entrée est un lien de site Web valide.
    return true;
}

// Vérifie si le contenu du champ est un lien de site Web lors de la saisie.
const input = document.getElementById('site_web');
input.addEventListener('keyup', () => {
    // Vérifie si l'entrée est un lien de site Web.
    if (isLink(input.value)) {
        // L'entrée est un lien de site Web valide.
        // Affiche le message "Lien valide".
        // $(".btn_submit").prop('disabled', false);
        // $('.message_site_web').text('');

        document.getElementById('message_site_web').innerHTML = '';
        // document.getElementById('message_site_web').style.color = 'red';
    } else {
        // L'entrée n'est pas un lien de site Web valide.
        // Affiche le message "Lien non valide" et ajoute la classe "error" au message.
        // $(".btn_submit").prop('disabled', true);
        // localeJquery == "en" ? $('#message_site_web').text('Please enter a valid site link.').css('color', 'red') : $('#message_site_web').text('Veuillez renseigner un lien de site valide.').css('color', 'red');
        if (localeJquery == "en") {
            document.getElementById('message_site_web').innerHTML = 'Please enter a valid site link.';
            document.getElementById('message_site_web').classList.add('error');
            document.getElementById('message_site_web').style.color = 'red';
        } else if (localeJquery == "fr") {
            document.getElementById('message_site_web').innerHTML = 'Veuillez renseigner un lien de site valide.';
            document.getElementById('message_site_web').classList.add('error');
            document.getElementById('message_site_web').style.color = 'red';
        }
    }
});

// Supprime le message d'erreur si la saisie est correcte.
document.getElementById('site_web').addEventListener('blur', () => {
    if (isLink(input.value)) {
        document.getElementById('message_site_web').innerHTML = '';
        // $('.message_site_web').text('');
    }
});

// VERIFICATION DU FORMAT DU LIEN SITE WEB A LA SAISI (FIN)

// DEBUT VERIFICATION DE LA REMISE
$("#err-remise").hide();
// let erreur = true;
$("#remise").keyup(function() {
    validerRemise();
});

function validerRemise() {
    let remise = $("#remise").val();
    if (remise == "") {
        $("#err-remise").hide();
        // document.getElementById("btn_submit").disabled = true;
        $(".btn_submit").prop('disabled', true);
        // erreur = false;
        return false;
    } else if (remise < 0 || remise > 100) {
        $("#err-remise").show();
        $("#err-remise").html(localeJquery == 'fr' ? "La remise doit être comprise entre 0 et 100" : "The discount must be between 0 and 100");
        // erreur = false;
        // desactiver les bouton
        // document.getElementById("btn_submit").disabled = true;
        $(".btn_submit").prop('disabled', true);
        return false;
    } else {
        // document.getElementById("btn_submit").disabled = false;
        $(".btn_submit").prop('disabled', false);
        $("#err-remise").hide();
    }
}
// FIN VERIFICATION DE LA REMISE

// DEBUT VERIFICATION DE LA TAUX
$("#err-taux").hide();
// let erreur = true;
$("#taux").keyup(function() {
    validerRemise();
});

function validerRemise() {
    let taux = $("#taux").val();
    if (taux == "") {
        $("#err-taux").hide();
        // document.getElementById("btn_submit").disabled = true;
        $(".btn_submit").prop('disabled', true);
        // erreur = false;
        return false;
    } else if (taux < 0 || taux > 100) {
        $("#err-taux").show();
        $("#err-taux").html(localeJquery == 'fr' ? "La taux doit être comprise entre 0 et 100" : "The rate must be between 0 and 100");
        // erreur = false;
        // desactiver les bouton
        // document.getElementById("btn_submit").disabled = true;
        $(".btn_submit").prop('disabled', true);
        return false;
    } else {
        // document.getElementById("btn_submit").disabled = false;
        $(".btn_submit").prop('disabled', false);
        $("#err-taux").hide();
    }
}
// FIN VERIFICATION DE LA TAUX

// DEBUT VERIFICATION DU FORMAT DES CONTACTS

function formatContact(input) {
    var value = input.value;
    value = value.replace(/\s/g, ''); // Supprimer les espaces existants
    var formattedValue = '';
    for (var i = 0; i < value.length; i++) {
        formattedValue += value[i];
        if ((i + 1) % 2 === 0 && i !== value.length - 1) {
            formattedValue += ' ';
        }
    }
    input.value = formattedValue;
}

// FIN VERIFICATION DU FORMAT DES CONTACTS