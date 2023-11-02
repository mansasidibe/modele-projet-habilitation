var gain = $('#nombre').val() * $('#base').val();

function calculateGain() {
    // Récupérer la valeur du champ de saisie
    var nombre = document.getElementById("nombre").value;
    var base = document.getElementById("base").value;
    // Effectuer le calcul souhaité
    var gain = parseInt(nombre) * parseInt(base); // Exemple : doubler la valeur entrée
    // Afficher le résultat dans un élément <p>
    document.getElementById("gain").value = gain;
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    document.getElementById("salaire_brut_imposable").value = document.getElementById("gain").value;
    document.getElementById("total_cotisation").value = document.getElementById("retenue").value;
    document.getElementById("total_non_imposable").value = parseInt(document.getElementById("gain").value) + parseInt(document.getElementById("retenue").value);
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableau() {
    var t = $('.tableInfo').DataTable();
    var tailleTableau = t.rows().count();
    compteur = compteur + tailleTableau;
}
// function de formattage des montants
function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function empty_yield() {
    $('#rubrique_id').val('');
    $('#input_rubrique').val('');
    $('#code').val('');
    $('#nombre').val('');
    $('#base').val('');
    $('#taux_salarial').val('');
    $('#gain').val('');
    $('#retenue').val('');
    $('#taux_patronal').val('');
    $('#montant_patronal').val('');
    $('#salaire_brut_imposable').val('');
    $('#total_cotisation').val('');
    $('#total_non_imposable').val('');
    $('#input_imposable').val('');
    $('#imposable_id').val('');

}

// function all_yield() {
//     $('#rubrique_id').val('');
//     $('#input_rubrique').val('');
//     $('#code').val('');
//     $('#nombre').val('2000');
//     $('#base').val('3000');
//     $('#taux_salarial').val('20');
//     // $('#gain').val('');
//     $('#retenue').val('15000');
//     $('#taux_patronal').val('10');
//     // $('#montant_patronal').val('');
//     // $('#salaire_brut_imposable').val('');
//     // $('#total_cotisation').val('');
//     // $('#total_non_imposable').val('');
// }

// all_yield();
let compteur = 1;
//Ajouter produits dans la liste
$(document).on('click', '#add-ligne-row', function (e) {
    e.preventDefault();
    if ($('#rubrique_id').val() === '' ||
        $('#code').val() === '' ||
        $('#nombre').val() === '' ||
        $('#base').val() === '' ||
        $('#taux_salarial').val() === '' ||
        $('#gain').val() === '' ||
        $('#retenue').val() === '' ||
        $('#taux_patronal').val() === '' ||
        $('#montant_patronal').val() === ''
        // $('#salaire_brut_imposable').val() === '' ||
        // $('#total_cotisation').val() === '' ||
        // $('#total_non_imposable').val() === ''
    ) {
        $(".add-ressource").prop('disabled', true);
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez remplir les champs obligatoires.' : 'Please fill all the mendatory fields.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {

        var rubrique_id = $('#rubrique_id').val();
        var input_rubrique = $('#input_rubrique').val();
        //
        var code = $('#code').val();
        var nombre = $('#nombre').val();
        var base = $('#base').val();
        var taux_salarial = $('#taux_salarial').val();
        var gain = $('#gain').val();
        var retenue = $('#retenue').val();
        var taux_patronal = $('#taux_patronal').val();
        var montant_patronal = $('#montant_patronal').val();
        var salaire_brut_imposable = $('#salaire_brut_imposable').val();
        var total_cotisation = $('#total_cotisation').val();
        var total_non_imposable = $('#total_non_imposable').val();

        // console.log("salaire_brut_imposable:", salaire_brut_imposable);
        // console.log("total_cotisation", total_cotisation);
        // console.log("total_non_imposable", total_non_imposable);

        var id = $('input[id=ligne]').val();

        if (id !== '') {

            // $('input[data=id' + id + ']').val($('input[id=input_imposable]').val());
            $('span[class="code' + id + ' mx-2"]').text($('input[id=code]').val());
            $('input[data="code' + id + '"]').val($('input[id=code]').val());
            $('input[data="rubriques' + id + '"]').val($('input[id=input_rubrique]').val());
            $('span[class="rubrique' + id + ' mx-2"]').text($('input[id=input_rubrique]').val());
            $('input[data="rubriques' + id + '"]').val($('input[id=input_rubrique]').val());
            $('span[class="rubrique' + id + ' mx-2"]').text($('input[id=input_rubrique]').val());
            $('span[class="nombre' + id + ' mx-2"]').text($('input[id=nombre]').val());
            $('input[data="nombre' + id + '"]').val($('input[id=nombre]').val());
            $('span[class="base' + id + ' mx-2"]').text($('input[id=base]').val());
            $('input[data="base' + id + '"]').val($('input[id=base]').val());
            $('span[class="taux_salarial' + id + ' mx-2"]').text($('input[id=taux_salarial]').val());
            $('input[data="taux_salarial' + id + '"]').val($('input[id=taux_salarial]').val());
            $('span[class="gain' + id + ' mx-2"]').text($('input[id=gain]').val());
            $('input[data="gain' + id + '"]').val($('input[id=gain]').val());
            $('span[class="retenue' + id + ' mx-2"]').text($('input[id=retenue]').val());
            $('input[data="retenue' + id + '"]').val($('input[id=retenue]').val());
            $('span[class="taux_patronal' + id + ' mx-2"]').text($('input[id=taux_patronal]').val());
            $('input[data="taux_patronal' + id + '"]').val($('input[id=taux_patronal]').val());
            $('span[class="montant_patronal' + id + ' mx-2"]').text($('input[id=montant_patronal]').val());
            $('input[data="montant_patronal' + id + '"]').val($('input[id=montant_patronal]').val());

            empty_yield();


        } else {

            var t = $('.tableInfo').DataTable();
            var tab_paie = [

                '<span>' + $('#input_imposable').val() + '</span>',
                '<span class="code' + compteur + ' mx-2">' + $('#code').val() + '</span>' + '<input type="hidden" readonly="true" class="code" style="border:none;" value="' + code + '" name="tab_ressource[' + compteur + '][code]" data="code' + compteur + '" />',
                '<span class="rubrique' + compteur + ' mx-2">' + $('#input_rubrique').val() + '</span>' + '<input type="hidden" value="' + $('#input_rubrique').val() + '" name="tab_ressource[' + compteur + '][rubriques]" data="rubriques' + compteur + '"/>',
                '<span class="nombre' + compteur + ' mx-2">' + $('#nombre').val() + '</span>' + '<input type="hidden" readonly="true" class="nombre" style="border:none;" value="' + nombre + '" name="tab_ressource[' + compteur + '][nombre]" data="nombre' + compteur + '" />',
                '<span class="base' + compteur + ' mx-2">' + $('#base').val() + '</span>' + '<input type="hidden" readonly="true" class="base" style="border:none;" value="' + base + '" name="tab_ressource[' + compteur + '][base]" data="base' + compteur + '" />',
                '<span class="taux_salarial' + compteur + ' mx-2">' + $('#taux_salarial').val() + '</span>' + '<input type="hidden" readonly="true" class="taux_salarial" style="border:none;" value="' + taux_salarial + '" name="tab_ressource[' + compteur + '][taux_salarial]" data="taux_salarial' + compteur + '" />',
                '<span class="gain' + compteur + ' mx-2">' + $('#gain').val() + '</span>' + '<input type="hidden" readonly="true" class="taux_salarial" style="border:none;" value="' + gain + '" name="tab_ressource[' + compteur + '][gain]" data="gain' + compteur + '" />',
                '<span class="retenue' + compteur + ' mx-2">' + $('#retenue').val() + '</span>' + '<input type="hidden" readonly="true" class="retenue" style="border:none;" value="' + retenue + '" name="tab_ressource[' + compteur + '][retenue]" data="retenue' + compteur + '" />',
                '<span class="taux_patronal' + compteur + ' mx-2">' + $('#taux_patronal').val() + '</span>' + '<input type="hidden" readonly="true" class="taux_patronal" style="border:none;" value="' + taux_patronal + '" name="tab_ressource[' + compteur + '][taux_patronal]" data="taux_patronal' + compteur + '" />',
                '<span class="montant_patronal' + compteur + ' mx-2">' + $('#montant_patronal').val() + '</span>' + '<input type="hidden" readonly="true" class="montant_patronal" style="border:none;" value="' + montant_patronal + '" name="tab_ressource[' + compteur + '][montant_patronal]" data="montant_patronal' + compteur + '" />',
                '<span class="d-flex justify-content-center"> <a href="#" data="' + compteur + '"><i class="fa fa-edit" id="edit_r"  data="' + compteur + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + compteur + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete_ressource" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>',

            ]
            t.row.add(tab_paie)
            t.draw();
            // $('.tableInfo tr td:first-child').hide();
            empty_yield();
            //cal_tableau_total();
            compteur++;
        }
    }
});

//suppression
$(document).on('click', '#delete_ressource', function () {
    Swal.fire({
        // title: 'Are you sure?',
        text: "Voulez-vous supprimer cette ligne ?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            let ligne = $(this).attr('data');

            let table = $('.tableInfo').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();

            //suppression
            empty_yield();
        }
    });

    // vider les champs


});

// modification
$(document).on('click', '#edit_r', function () {

    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $('input[id=code]').val($('input[data=code' + ligne + ']').val());
    $('input[id=nombre]').val($('input[data=nombre' + ligne + ']').val());
    $('input[id=base]').val($('input[data=base' + ligne + ']').val());
    $('input[id=taux_salarial]').val($('input[data=taux_salarial' + ligne + ']').val());
    $('input[id=gain]').val($('input[data=gain' + ligne + ']').val());
    $('input[id=retenue]').val($('input[data=retenue' + ligne + ']').val());
    $('input[id=taux_patronal]').val($('input[data=taux_patronal' + ligne + ']').val());
    $('input[id=montant_patronal]').val($('input[data=montant_patronal' + ligne + ']').val());
    // $($('#input_imposable')).val($('input[data=id' + ligne + ']').val());
    $($('#input_rubrique')).val($('input[data=rubriques' + ligne + ']').val());
    $($('#rubrique_id')).val($('input[data=code' + ligne + ']').val());

});


//FONCTION DE CALCUL DES TATAUX
function cal_tableau_total() {

    var t_cout_unit_res = 0;
    var cout_unit_res = 0;

    var t_cout_mission = 0;
    var cout_mission_r = 0;

    var t_frais_unit_mission = 0;
    var frais_unit_mission = 0;

    var t_frais_mission = 0;
    var frais_mission_r = 0;

    var t_recharge = 0;
    var recharge_r = 0;

    var t_travel = 0;
    var travel = 0;

    var t_frais_envoi = 0;
    var frais_envoi_r = 0;

    var t_total_charge = 0;
    var total_charge_r = 0;

    var t_montant_boq = 0;
    var montant_boq = 0;

    $('.t_montant_boq').each(function (i, e) {
        montant_boq = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_montant_boq += montant_boq;
    });
    $('.montant_boq').text(t_montant_boq);

    $('.t_cout_unit_res').each(function (i, e) {
        cout_unit_res = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_cout_unit_res += cout_unit_res;
    });
    $('.cout_unit_res').text(t_cout_unit_res);

    $('.t_cout_mission').each(function (i, e) {
        cout_mission_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_cout_mission += cout_mission_r;
    });
    $('.cout_mission_r').text(t_cout_mission);

    $('.t_frais_unit_mission').each(function (i, e) {
        frais_unit_mission = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_frais_unit_mission += frais_unit_mission;
    });
    $('.frais_unit_mission').text(t_frais_unit_mission);

    $('.t_frais_mission').each(function (i, e) {
        frais_mission_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_frais_mission += frais_mission_r;
    });
    $('.frais_mission_r').text(t_frais_mission);

    $('.t_recharge').each(function (i, e) {
        recharge_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_recharge += recharge_r;
    });
    $('.recharge_r').text(t_recharge);

    $('.t_travel').each(function (i, e) {
        travel_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_travel += travel_r;
    });
    $('.travel_r').text(t_travel);

    $('.t_frais_envoi').each(function (i, e) {
        frais_envoi_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_frais_envoi += frais_envoi_r;
    });
    $('.frais_envoi_r').text(t_frais_envoi);

    $('.t_total_charge').each(function (i, e) {
        total_charge_r = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
        t_total_charge += total_charge_r;
    });
    $('.total_charge_r').text(t_total_charge);

}