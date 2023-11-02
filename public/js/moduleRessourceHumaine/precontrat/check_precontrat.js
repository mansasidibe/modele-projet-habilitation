// VERIFICATION DU REGISTRE DE COMMERCE (DEBUT)
const get_numero_piece = async(numero_piece) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_numero_piece_precontrat`, { numero_piece: numero_piece }, {
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

$("#numero_piece").on("keyup", function() {
    var numero_piece = document.querySelector("#numero_piece").value;

    get_numero_piece(numero_piece).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".add_precontrat").prop('disabled', true);
                localeJquery == "en" ? $('#numero_piece_message').text('This trade part number already exists.').css('color', 'red') : $('#numero_piece_message').text('Ce numero de pièce commerce existe déjà.').css('color', 'red');
            } else {
                $(".add_precontrat").prop('disabled', false);
                $('#numero_piece_message').text('');
            }
        }
    );
});

// VERIFICATION DU REGISTRE DE COMMERCE (FIN)// VERIFICATION DU CONTACT (DEBUT)
const get_contact_check = async(contact) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_contact_precontrat`, { contact: contact }, {
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


function checkSalaryInput(event) {
    var inputField = event.target;
    var inputValue = inputField.value;

    // Vérifier si la valeur saisie contient uniquement des chiffres
    var isNumeric = /^\d+$/.test(inputValue);

    var errorMessageElement = document.getElementById("error-message-salaire-net");

    if (!isNumeric) {
        // errorMessageElement.textContent = "Veuillez saisir uniquement des valeurs numériques.";
        $(".btn_submit").prop('disabled', true);
        localeJquery == "en" ? $('#error-message-salaire-net').text('Please enter only numeric values.').css('color', 'red') : $('#error-message-salaire-net').text('Veuillez saisir uniquement des valeurs numériques.').css('color', 'red');
    } else {
        // errorMessageElement.textContent = ""; // Effacer le message d'erreur s'il est affiché
        $(".btn_submit").prop('disabled', false);
        $('#error-message-salaire-net').text('');
    }
}


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