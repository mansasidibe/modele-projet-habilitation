
// // récuperation des constantes
// const token = localStorage.getItem("token");
// const getBaseURL = () => {
//     return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
// }

function datalist(url, id_datalist, id_input_datalist, id_data, retour = null) {

    const get_data = async () => {
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {
            $(response.data.data).each(function (index, item) {
                if (retour === null)
                    var option = $('<option data-id="' + item.id + '" value="' + item.libelle_fr + '"></option>');
                else
                    var option = $('<option data-id="' + item.id + '" value="' + item[retour] + '"></option>');

                $(id_datalist).append(option);
            });
            // recupération de l'id
            $(document).on("change", id_input_datalist, function () {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function () {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}

// calcul cout dev
$('#cout, #quantite').keyup(function () {
    var value1 = parseFloat($('#cout').val()) || 0;
    var value2 = parseFloat($('#quantite').val()) || 0;
    $('#cout_dev').val(value1 * value2);
});

$('#quantite_boq').keyup(function () {
    var value1 = parseFloat($('#cout_boq').val()) || 0;
    var value2 = parseFloat($('#quantite_boq').val()) || 0;
    $('#cout_dev_boq').val(value1 * value2);
});

// validation de la marge
$("#err-marge").hide();
let erreur = true;
$("#marge").keyup(function () {
    validerMarge();
});

function validerMarge() {
    let marge = $("#marge").val();
    if (marge == "") {
        $("#err-marge").hide();
        document.getElementById("btn_submit").disabled = true;
        erreur = false;
        return false;
    } else if (marge < 0 || marge > 100) {
        $("#err-marge").show();
        $("#err-marge").html(langue == 'fr' ? "**La marge doit être comprise entre 0 et 100" : "The margin must be between 0 and 100");
        erreur = false;
        // desactiver les bouton
        document.getElementById("btn_submit").disabled = true;
        return false;
    } else {
        document.getElementById("btn_submit").disabled = false;
        $("#err-marge").hide();
    }
}
// fin de validation de marge
