// Récuperation des fournisseurs
function fournisseurs() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/fournisseurs', config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#fournisseur_mat_roullant").append(
                    "<option value='" + d.id + "'>" + d.raison_sociale + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Récuperation des fournisseurs
function type_vehicule() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/type_vehicule', config)
        .then(function (response) {
            data = response.data;
            $.each(data, function (i, d) {
                $("#vehicule_mat_roullant").append(
                    "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function get_mode_facturation() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/get_mode_paiement', config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#mode_paiement_mat_roullant, #mode_paiement_allocation_ressource, #mode_paiement_carburant").append(
                    "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

$('#debit_allocation_ressource, #credit_allocation_ressource').keyup(function () {
    var debit_allocation_ressource = parseFloat($('#debit_allocation_ressource').val()) || 0;
    var credit_allocation_ressource = parseFloat($('#credit_allocation_ressource').val()) || 0;
    var solde = debit_allocation_ressource - credit_allocation_ressource;
    $('#solde_financement_ressource').val(solde);
    $('#pourcentage_ressource').val(credit_allocation_ressource/solde);
});


$(document).on('change', '#date_fin_allocation_ressource , #date_debut_allocation_ressource', function () {
var date1 = new Date($('#date_debut_allocation_ressource').val() || 0);
var date2 = new Date($('#date_fin_allocation_ressource').val());

const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if (date2 < date1) {
    Swal.fire({
    title: langue == 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
    $('#date_fin_allocation_ressource').val('');
    $('#duree_allocation_ressource').val('');
} else {
    $('#duree_allocation_ressource').val(isNaN(diffDays) ? '' : diffDays+1); // j'affiche le differentiel du jour s'il est different de NaN
}
});


$(document).on('change', '#date_fin_carburant , #date_debut_carburant', function () {
var date1 = new Date($('#date_debut_carburant').val() || 0);
var date2 = new Date($('#date_fin_carburant').val());

const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if (date2 < date1) {
    Swal.fire({
    title: langue == 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
    $('#date_fin_carburant').val('');
    $('#duree_carburant').val('');
} else {
    $('#duree_carburant').val(isNaN(diffDays) ? '' : diffDays+1); // j'affiche le differentiel du jour s'il est different de NaN
}
});


$(document).on('change', '#date_fin_allocation_mat_roullant , #date_debut_allocation_mat_roullant', function () {
var date1 = new Date($('#date_debut_allocation_mat_roullant').val() || 0);
var date2 = new Date($('#date_fin_allocation_mat_roullant').val());

const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if (date2 < date1) {
    Swal.fire({
    title: langue == 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
    });
    $('#date_fin_allocation_mat_roullant').val('');
    $('#duree_allocation_mat_roullant').val('');
} else {
    $('#duree_allocation_mat_roullant').val(isNaN(diffDays) ? '' : diffDays+1); // j'affiche le differentiel du jour s'il est different de NaN
}
});


//Ajouter
  let countMat = 0;
  let countRes = 0;
  let countCar = 0;
  let count = 0;

$(document).on('click', '#add-allocation-ressource', function (e) {
e.preventDefault();
var date_debut = $('#date_debut_allocation_ressource').val();
var date_fin = $('#date_fin_allocation_ressource').val();
var duree = $('#duree_allocation_ressource').val();
var date_decaissement = $('#date_decaissement_ressource').val();
var nom_prenom = $('#nom_prenom').val();
var cout_frais_mission = $('#cout_frais_mission_allocation').val();
var frais_mission = $('#frais_mission_allocation').val();
var cout_recharge = $('#cout_recharge_allocation').val();
var frais = $('#frais_allocation_ressource').val();
var frais_envoi = $('#frais_envoi_allocation_ressource').val();
var total_charge = $('#total_charge_allocation_ressource').val();
var prevision = $('#prevision_allocation_ressource').val();
var cumul = $('#cumul_allocation_ressource').val();
var solde = $('#solde_allocation_ressource').val();
var statut = $('#statut_ressource').val();
var mode_paiement = $('#mode_paiement_allocation_ressource').val();
var id = $('#ligne').val();

    if(date_debut == "" || date_fin == "" || duree == "" || date_decaissement == "" || nom_prenom == "" || cout_frais_mission == "" || frais_mission == "" ||
        cout_recharge == "" || frais == "" || frais_envoi == "" || prevision == "" || cumul == "" || solde == ""){
            Swal.fire({
                title: langue = 'fr' ? 'Veuillez reseigner les champs obligatoire.' : 'Please fill in the mandatory fields.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
    }else{
        if (id !== '') {
            $('input[data=date_debut' + id + ']').val(date_debut);
            $('span[id=date_debut' + id + ']').html(date_debut);
            $('input[data=date_fin' + id + ']').val(date_fin);
            $('span[id=date_fin' + id + ']').html(date_fin);
            $('input[data=duree' + id + ']').val(duree);
            $('span[id=duree' + id + ']').html(duree);
            $('input[data=date_decaissement' + id + ']').val(date_decaissement);
            $('span[id=date_decaissement' + id + ']').html(date_decaissement);
            $('input[data=nom_prenom' + id + ']').val(nom_prenom);
            $('span[id=nom_prenom' + id + ']').html(nom_prenom);
            $('input[data=cout_frais_mission' + id + ']').val(cout_frais_mission);
            $('span[id=cout_frais_mission' + id + ']').html(cout_frais_mission);
            $('input[data=frais_mission' + id + ']').val(frais_mission);
            $('span[id=frais_mission' + id + ']').html(frais_mission);
            $('input[data=cout_recharge' + id + ']').val(cout_recharge);
            $('span[id=cout_recharge' + id + ']').html(cout_recharge);
            $('input[data=frais' + id + ']').val(frais);
            $('span[id=frais' + id + ']').html(frais);
            $('input[data=frais_envoi' + id + ']').val(frais_envoi);
            $('span[id=frais_envoi' + id + ']').html(frais_envoi);
            $('input[data=total_charge' + id + ']').val(total_charge);
            $('span[id=total_charge' + id + ']').html(total_charge);
            $('input[data=prevision' + id + ']').val(prevision);
            $('span[id=prevision' + id + ']').html(prevision);
            $('input[data=cumul' + id + ']').val(cumul);
            $('span[id=cumul' + id + ']').html(cumul);
            $('input[data=solde' + id + ']').val(solde);
            $('span[id=solde' + id + ']').html(solde);
            $('input[data=statut' + id + ']').val(statut);
            $('span[id=statut' + id + ']').html(statut);
            $('input[data=mode_paiement' + id + ']').val(mode_paiement);
            $('span[id=mode_paiement' + id + ']').html(mode_paiement);
            viderChampsRessorce();

        } else {
            var t = $('.tableAllocationRessource').DataTable();
            var tab_allocation_ressource = [
            '<span id="date_debut' + countRes +'">' +date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_debut +'" name="tab_ressource[' + countRes +'][date_debut]" data="date_debut' + countRes +'"/>',
            '<span id="date_fin' + countRes +'">' +date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_fin +'" name="tab_ressource[' + countRes +'][date_fin]" data="date_fin' + countRes +'"/>',
            '<span id="duree' + countRes +'">' +duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + duree +'" name="tab_ressource[' + countRes +'][duree]" data="duree' + countRes +'"/>',
            '<span id="date_decaissement' + countRes +'">' +date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_decaissement +'" name="tab_ressource[' + countRes +'][date_decaissement]" data="date_decaissement' + countRes +'"/>',
            '<span id="nom_prenom' + countRes +'">' +nom_prenom+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + nom_prenom +'" name="tab_ressource[' + countRes +'][nom_prenom]" data="nom_prenom' + countRes +'"/>',
            '<span id="cout_frais_mission' + countRes +'">' +cout_frais_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="cout_frais_mission_ress" value="' + cout_frais_mission +'" name="tab_ressource[' + countRes +'][cout_frais_mission]" data="cout_frais_mission' + countRes +'"/>',
            '<span id="frais_mission' + countRes +'">' +frais_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + frais_mission +'" name="tab_ressource[' + countRes +'][frais_mission]" data="frais_mission' + countRes +'"/>',
            '<span id="cout_recharge' + countRes +'">' +cout_recharge+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + cout_recharge +'" name="tab_ressource[' + countRes +'][cout_recharge]" data="cout_recharge' + countRes +'"/>',
            '<span id="frais' + countRes +'">' +frais+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + frais +'" name="tab_ressource[' + countRes +'][frais]" data="frais' + countRes +'"/>',
            '<span id="frais_envoi' + countRes +'">' +frais_envoi+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + frais_envoi +'" name="tab_ressource[' + countRes +'][frais_envoi]" data="frais_envoi' + countRes +'"/>',
            '<span id="total_charge' + countRes +'">' +total_charge+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + total_charge +'" name="tab_ressource[' + countRes +'][total_charge]" data="total_charge' + countRes +'"/>',
            '<span id="prevision' + countRes +'">' +prevision+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + prevision +'" name="tab_ressource[' + countRes +'][prevision]" data="prevision' + countRes +'"/>',
            '<span id="cumul' + countRes +'">' +cumul+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + cumul +'" name="tab_ressource[' + countRes +'][cumul]" data="cumul' + countRes +'"/>',
            '<span id="solde' + countRes +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + solde +'" name="tab_ressource[' + countRes +'][solde]" data="solde' + countRes +'"/>',
            '<span id="statut' + countRes +'">' +statut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + statut +'" name="tab_ressource[' + countRes +'][statut]" data="statut' + countRes +'"/>',
            '<span id="mode_paiement' + countRes +'">' +$('#mode_paiement_allocation_ressource').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + mode_paiement +'" name="tab_ressource[' + countRes +'][mode_paiement]" data="mode_paiement' + countRes +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit-r0"  data="' + countRes + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + countRes + '"><i class="flaticon-delete" id="delete-r0" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_allocation_ressource)
        t.draw();
        viderChampsRessorce();
        cal_tableau_ressource();
        countRes++;
        }
    }

});

// total charge = sommes des totaux
$('#cout_frais_mission_allocation, #frais_mission_allocation, #cout_recharge_allocation,#frais_allocation_ressource, #frais_envoi_allocation_ressource, #prevision_allocation_ressource, #cumul_allocation_ressource, #solde_allocation_ressource').keyup(function () {
    var frais_mission_allocation = parseFloat($('#frais_mission_allocation').val()) || 0;
    var cout_recharge_allocation = parseFloat($('#cout_recharge_allocation').val()) || 0;
    var frais_allocation_ressource = parseFloat($('#frais_allocation_ressource').val()) || 0;
    var frais_envoi_allocation_ressource = parseFloat($('#frais_envoi_allocation_ressource').val()) || 0;
    var prevision_allocation_ressource = parseFloat($('#prevision_allocation_ressource').val()) || 0;
    var cumul_allocation_ressource = parseFloat($('#cumul_allocation_ressource').val()) || 0;
    var solde_allocation_ressource = parseFloat($('#solde_allocation_ressource').val()) || 0;
    var cout_frais_mission_allocation = parseFloat($('#cout_frais_mission_allocation').val()) || 0;

    $('#total_charge_allocation_ressource').val(cout_frais_mission_allocation + frais_mission_allocation + cout_recharge_allocation + frais_allocation_ressource + frais_envoi_allocation_ressource + prevision_allocation_ressource + cumul_allocation_ressource+solde_allocation_ressource);
  });

$(document).on('click', '#edit-r0', function() {
    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#date_debut_allocation_ressource')).val($('input[data=date_debut' + ligne + ']').val());
    $($('#date_fin_allocation_ressource')).val($('input[data=date_fin' + ligne + ']').val());
    $($('#duree_allocation_ressource')).val($('input[data=duree' + ligne + ']').val());
    $($('#date_decaissement_ressource')).val($('input[data=date_decaissement' + ligne + ']').val());
    $($('#nom_prenom')).val($('input[data=nom_prenom' + ligne + ']').val());
    $($('#cout_frais_mission_allocation')).val($('input[data=cout_frais_mission' + ligne + ']').val());
    $($('#frais_mission_allocation')).val($('input[data=frais_mission' + ligne + ']').val());
    $($('#cout_recharge_allocation')).val($('input[data=cout_recharge' + ligne + ']').val());
    $($('#frais_allocation_ressource')).val($('input[data=frais' + ligne + ']').val());
    $($('#frais_envoi_allocation_ressource')).val($('input[data=frais_envoi' + ligne + ']').val());
    $($('#total_charge_allocation_ressource')).val($('input[data=total_charge' + ligne + ']').val());
    $($('#prevision_allocation_ressource')).val($('input[data=prevision' + ligne + ']').val());
    $($('#cumul_allocation_ressource')).val($('input[data=cumul' + ligne + ']').val());
    $($('#solde_allocation_ressource')).val($('input[data=solde' + ligne + ']').val());
    $($('#statut_ressource')).val($('input[data=statut' + ligne + ']').val());
    $($('#mode_paiement_allocation_ressource')).val($('input[data=mode_paiement' + ligne + ']').val());
});

function viderChampsRessorce() {
    $('#date_debut_allocation_ressource').val('');
    $('#date_fin_allocation_ressource').val('');
    $('#duree_allocation_ressource').val('');
    $('#date_decaissement_ressource').val('');
    $('#nom_prenom').val('');
    $('#frais_envoi_allocation_ressource').val('');
    $('#cout_frais_mission_allocation').val('');
    $('#frais_mission_allocation').val('');
    $('#cout_recharge_allocation').val('');
    $('#frais_allocation_ressource').val('');
    $('#total_charge_allocation_ressource').val('');
    $('#prevision_allocation_ressource').val('');
    $('#cumul_allocation_ressource').val('');
    $('#solde_allocation_ressource').val('');
    $('#statut_ressource').val('');
    $('#mode_paiement_allocation_ressource').val('');
}

function viderChampsR() {
$('#date_financement_ressource').val('');
$('#credit_allocation_ressource').val('');
$('#solde_financement_ressource').val('');
$('#pourcentage_ressource').val('');
$('#budget_restant_ressource').val('');
$('#ligne').val('');
}

function viderChampsMatFinance() {
$('#date_financement_mat_roullant').val('');
$('#debit_allocation_mat_roullant').val('');
$('#credit_allocation_mat_roullant').val('');
$('#solde_financement_mat_roullant').val('');
$('#pourcentage_mat_roullant').val('');
$('#budget_restant_mat_roullant').val('');
$('#ligne').val('');
}

function viderChampsCarburantFinance() {
$('#date_financement_carburant').val('');
$('#debit_allocation_carburant').val('');
$('#credit_allocation_carburant').val('');
$('#solde_financement_carburant').val('');
$('#pourcentage_carburant').val('');
$('#budget_restant_carburant').val('');
$('#ligne').val('');
}

function viderChampsMat() {
$('#date_debut_allocation_mat_roullant').val('');
$('#date_fin_allocation_mat_roullant').val('');
$('#duree_allocation_mat_roullant').val('');
$('#date_decaissement_mat_roullant').val('');
$('#fournisseur_mat_roullant').val('');
$('#vehicule_mat_roullant').val('');
$('#immatriculation_mat_roullant').val('');
$('#peage_mat_roullant').val('');
$('#frais_envoi_mat_roullant').val('');
$('#prevision_mat_roullant').val('');
$('#cumul_mat_roullant').val('');
$('#solde_mat_roullant').val('');
$('#statut_mat_roullant').val('');
$('#total_charge_mat_roullant').val('');
$('#mode_paiement_mat_roullant').val('');
$('#ligne').val('');
}

function viderChampsCarburant() {
$('#date_debut_allocation_mat_roullant').val('');

$('#ligne').val('');
}

$(document).on('click', '#add-ressource-finance', function (e) {
e.preventDefault();

var date = $('#date_financement_ressource').val();
var debit = $('#debit_allocation_ressource').val();
var credit = $('#credit_allocation_ressource').val();
var solde = $('#solde_financement_ressource').val();
var pourcent = $('#pourcentage_ressource').val();
var budget = $('#budget_restant_ressource').val();
var id = $('#ligne').val();

    if (date == '' || debit == '' || credit == '' || solde == '' || budget == '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez reseigner les champs obligatoire.' : 'Please fill in the mandatory fields.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }else{
        if (id !== '') {
            $('input[data=date_financement_ressource' + id + ']').val(date);
            $('span[id=debit_allocation_ressource' + id + ']').html(debit);
            $('input[data=credit_allocation_ressource' + id + ']').val(credit);
            $('span[id=solde_financement_ressource' + id + ']').html(solde);
            $('input[data=pourcentage_ressource' + id + ']').val(pourcent);
            $('span[id=budget_restant_ressource' + id + ']').html(budget);
            viderChampsR();

        } else {

            var t = $('.tableRessourceFinance').DataTable();
            var tab_allocation_ressource = [
                '<span id="date_financement_ressource' + count +'">' +date+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date +'" name="tab_ressource_finance[' + count +'][date_financement_ressource]" data="date_financement_ressource' + count +'"/>',
                '<span id="debit_allocation_ressource' + count +'">' +debit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + debit +'" name="tab_ressource_finance[' + count +'][debit_allocation_ressource]" data="debit_allocation_ressource' + count +'"/>',
                '<span id="credit_allocation_ressource' + count +'">' +credit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + credit +'" name="tab_ressource_finance[' + count +'][credit_allocation_ressource]" data="credit_allocation_ressource' + count +'"/>',
                '<span id="solde_financement_ressource' + count +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + solde +'" name="tab_ressource_finance[' + count +'][solde_financement_ressource]" data="solde_financement_ressource' + count +'"/>',
                '<span id="pourcentage_ressource' + count +'">' +pourcent+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + pourcent +'" name="tab_ressource_finance[' + count +'][pourcentage_ressource]" data="pourcentage_ressource' + count +'"/>',
                '<span id="budget_restant_ressource' + count +'">' +budget+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + budget +'" name="tab_ressource_finance[' + count +'][budget_restant_ressource]" data="budget_restant_ressource' + count +'"/>',
                '<a href="#"><i class="fa fa-edit" id="edit-ressource"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-ressource" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_allocation_ressource)
            t.draw();
            viderChampsR();
            count++;
        }
    }
});

$(document).on('click', '#edit-ressource', function() {

    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#date_financement_ressource')).val($('input[data=date_financement_ressource' + ligne + ']').val());
    $($('#debit_allocation_ressource')).val($('input[data=debit_allocation_ressource' + ligne + ']').val());
    $($('#credit_allocation_ressource')).val($('input[data=credit_allocation_ressource' + ligne + ']').val());
    $($('#solde_financement_ressource')).val($('input[data=solde_financement_ressource' + ligne + ']').val());
    $($('#pourcentage_ressource')).val($('input[data=pourcentage_ressource' + ligne + ']').val());
    $($('#budget_restant_ressource')).val($('input[data=budget_restant_ressource' + ligne + ']').val());
});

//suppression
$(document).on('click', '#delete-ressource', function() {
    Swal.fire({
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
            var table = $('.tableRessourceFinance').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

//suppression
$(document).on('click', '#delete-r0', function() {
    Swal.fire({
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
            var table = $('.tableAllocationRessource').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

// Allocation Matériel Roullant

$(document).on('click', '#add-ligne-mat-roullant', function (e) {
    e.preventDefault();
    var date_debut = $('#date_debut_allocation_mat_roullant').val();
    var date_fin = $('#date_fin_allocation_mat_roullant').val();
    var duree = $('#duree_allocation_mat_roullant').val();
    var date_decaissement = $('#date_decaissement_mat_roullant').val();
    var fournisseur = $('#fournisseur_mat_roullant').val();
    var vehicule = $('#vehicule_mat_roullant').val();
    var immatriculation = $('#immatriculation_mat_roullant').val();
    var peage = $('#peage_mat_roullant').val();
    var frais_envoi = $('#frais_envoi_mat_roullant').val();
    var prevision = $('#prevision_mat_roullant').val();
    var cumul = $('#cumul_mat_roullant').val();
    var solde = $('#solde_mat_roullant').val();
    var statut = $('#statut_mat_roullant').val();
    var total_charge = $('#total_charge_mat_roullant').val();
    var mode_paiement = $('#mode_paiement_mat_roullant').val();
    var id = $('#ligne').val();

    if (date_debut == '' || date_fin == '' || duree =='' || date_decaissement == '' || fournisseur == '' || vehicule =='' ||
    immatriculation== '' || peage=='' || frais_envoi=='' || prevision=='' || cumul=='' || solde =='' || mode_paiement=='') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez reseigner les champs obligatoire.' : 'Please fill in the mandatory fields.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }else{
        if (id !== '') {
            $('input[data=date_debut' + id + ']').val(date_debut);
            $('span[id=date_debut' + id + ']').html(date_debut);
            $('input[data=date_fin' + id + ']').val(date_fin);
            $('span[id=date_fin' + id + ']').html(date_fin);
            $('input[data=duree' + id + ']').val(duree);
            $('span[id=duree' + id + ']').html(duree);
            $('input[data=date_decaissement' + id + ']').val(date_decaissement);
            $('span[id=date_decaissement' + id + ']').html(date_decaissement);
            $('input[data=fournisseur' + id + ']').val(fournisseur);
            $('span[id=fournisseur' + id + ']').html(fournisseur);
            $('input[data=vehicule' + id + ']').val(vehicule);
            $('span[id=vehicule' + id + ']').html(vehicule);
            $('input[data=immatriculation' + id + ']').val(immatriculation);
            $('span[id=immatriculation' + id + ']').html(immatriculation);
            $('input[data=peage' + id + ']').val(peage);
            $('span[id=peage' + id + ']').html(peage);
            $('input[data=frais_envoi' + id + ']').val(frais_envoi);
            $('span[id=frais_envoi' + id + ']').html(frais_envoi);
            $('input[data=total_charge' + id + ']').val(total_charge);
            $('span[id=total_charge' + id + ']').html(total_charge);
            $('input[data=prevision' + id + ']').val(prevision);
            $('span[id=prevision' + id + ']').html(prevision);
            $('input[data=cumul' + id + ']').val(cumul);
            $('span[id=cumul' + id + ']').html(cumul);
            $('input[data=solde' + id + ']').val(solde);
            $('span[id=solde' + id + ']').html(solde);
            $('input[data=statut' + id + ']').val(statut);
            $('span[id=statut' + id + ']').html(statut);
            $('input[data=mode_paiement' + id + ']').val(mode_paiement);
            $('span[id=mode_paiement' + id + ']').html(mode_paiement);
            viderChampsMat();

        } else {
            var t = $('.tableAllocationMat').DataTable();
            var tab_allocationmat_roullant0 = [
            '<span id="date_debut' + countMat +'">' +date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_debut +'" name="tab_mat_roullant[' + countMat +'][date_debut]" data="date_debut' + countMat +'"/>',
            '<span id="date_fin' + countMat +'">' +date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_fin +'" name="tab_mat_roullant[' + countMat +'][date_fin]" data="date_fin' + countMat +'"/>',
            '<span id="duree' + countMat +'">' +duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + duree +'" name="tab_mat_roullant[' + countMat +'][duree]" data="duree' + countMat +'"/>',
            '<span id="date_decaissement' + countMat +'">' +date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_decaissement +'" name="tab_mat_roullant[' + countMat +'][date_decaissement]" data="date_decaissement' + countMat +'"/>',
            '<span id="fournisseur' + countMat +'">' +$('#fournisseur_mat_roullant').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + fournisseur +'" name="tab_mat_roullant[' + countMat +'][fournisseur]" data="fournisseur' + countMat +'"/>',
            '<span id="vehicule' + countMat +'">' +$('#vehicule_mat_roullant').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + vehicule +'" name="tab_mat_roullant[' + countMat +'][vehicule]" data="vehicule' + countMat +'"/>',
            '<span id="immatriculation' + countMat +'">' +immatriculation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + immatriculation +'" name="tab_mat_roullant[' + countMat +'][immatriculation]" data="immatriculation' + countMat +'"/>',
            '<span id="peage' + countMat +'">' +peage+ '</span>' +'<input type="hidden" readonly="true" class="peage_mat" style="border:none; " value="' + peage +'" name="tab_mat_roullant[' + countMat +'][peage]" data="peage' + countMat +'"/>',
            '<span id="frais_envoi' + countMat +'">' +frais_envoi+ '</span>' +'<input type="hidden" class="frais_envoi_mat" readonly="true" style="border:none; " value="' + frais_envoi +'" name="tab_mat_roullant[' + countMat +'][frais_envoi]" data="frais_envoi' + countMat +'"/>',
            '<span id="total_charge' + countMat +'">' +total_charge+ '</span>' +'<input type="hidden" class="total_charge_mat" readonly="true" style="border:none; " value="' + total_charge +'" name="tab_mat_roullant[' + countMat +'][total_charge]" data="total_charge' + countMat +'"/>',
            '<span id="prevision' + countMat +'">' +prevision+ '</span>' +'<input type="hidden" readonly="true" class="prevision_mat" style="border:none; " value="' + prevision +'" name="tab_mat_roullant[' + countMat +'][prevision]" data="prevision' + countMat +'"/>',
            '<span id="cumul' + countMat +'">' +cumul+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="cumul_mat" value="' + cumul +'" name="tab_mat_roullant[' + countMat +'][cumul]" data="cumul' + countMat +'"/>',
            '<span id="solde' + countMat +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="solde_mat" value="' + solde +'" name="tab_mat_roullant[' + countMat +'][solde]" data="solde' + countMat +'"/>',
            '<span id="statut' + countMat +'">' +statut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + statut +'" name="tab_mat_roullant[' + countMat +'][statut]" data="statut' + countMat +'"/>',
            '<span id="mode_paiement' + countMat +'">' +$('#mode_paiement_mat_roullant').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + mode_paiement +'" name="tab_mat_roullant[' + countMat +'][mode_paiement]" data="mode_paiement' + countMat +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit-r0"  data="' + countMat + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + countMat + '"><i class="flaticon-delete" id="delete-r0" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_allocationmat_roullant0)
        t.draw();
        viderChampsMat();
        cal_tableau_materiel();
        countMat++;
        }
    }
  });

//
$('#debit_allocation_mat_roullant, #credit_allocation_mat_roullant').keyup(function () {
    var debit_allocation_mat_roullant = parseFloat($('#debit_allocation_mat_roullant').val()) || 0;
    var credit_allocation_mat_roullant = parseFloat($('#credit_allocation_mat_roullant').val()) || 0;
    var solde = debit_allocation_mat_roullant - credit_allocation_mat_roullant;
    $('#solde_financement_mat_roullant').val(solde);
    let pourcent = Math.ceil(credit_allocation_mat_roullant/solde);
    $('#pourcentage_mat_roullant').val(pourcent);
});

$(document).on('click', '#add-allocation-mat-roullant-finance', function (e) {
    e.preventDefault();

    var date = $('#date_financement_mat_roullant').val();
    var debit = $('#debit_allocation_mat_roullant').val();
    var credit = $('#credit_allocation_mat_roullant').val();
    var solde = $('#solde_financement_mat_roullant').val();
    var pourcent = $('#pourcentage_mat_roullant').val();
    var budget = $('#budget_restant_mat_roullant').val();
    var id = $('#ligne').val();

    if (id !== '') {
        $('input[data=date_financement_mat_roullant' + id + ']').val(date);
        $('span[id=date_financement_mat_roullant' + id + ']').html(date);
        $('span[id=debit_allocation_mat_roullant' + id + ']').html(debit);
        $('input[data=debit_allocation_mat_roullant' + id + ']').val(debit);
        $('input[data=credit_allocation_mat_roullant' + id + ']').val(credit);
        $('span[id=credit_allocation_mat_roullant' + id + ']').html(credit);
        $('span[id=solde_financement_mat_roullant' + id + ']').html(solde);
        $('input[data=solde_financement_mat_roullant' + id + ']').val(solde);
        $('input[data=pourcentage_mat_roullant' + id + ']').val(pourcent);
        $('span[id=pourcentage_mat_roullant' + id + ']').html(pourcent);
        $('span[id=budget_restant_mat_roullant' + id + ']').html(budget);
        $('input[data=budget_restant_mat_roullant' + id + ']').val(budget);
        viderChampsMatFinance();

    } else {

        var t = $('.tableMatFinance').DataTable();
        var tab_allocation_mat_roullant = [
            '<span id="date_financement_mat_roullant' + count +'">' +date+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date +'" name="tab_mat_roullant_finance[' + count +'][date_financement_mat_roullant]" data="date_financement_mat_roullant' + count +'"/>',
            '<span id="debit_allocation_mat_roullant' + count +'">' +debit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + debit +'" name="tab_mat_roullant_finance[' + count +'][debit_allocation_mat_roullant]" data="debit_allocation_mat_roullant' + count +'"/>',
            '<span id="credit_allocation_mat_roullant' + count +'">' +credit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + credit +'" name="tab_mat_roullant_finance[' + count +'][credit_allocation_mat_roullant]" data="credit_allocation_mat_roullant' + count +'"/>',
            '<span id="solde_financement_mat_roullant' + count +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + solde +'" name="tab_mat_roullant_finance[' + count +'][solde_financement_mat_roullant]" data="solde_financement_mat_roullant' + count +'"/>',
            '<span id="pourcentage_mat_roullant' + count +'">' +pourcent+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + pourcent +'" name="tab_mat_roullant_finance[' + count +'][pourcentage_mat_roullant]" data="pourcentage_mat_roullant' + count +'"/>',
            '<span id="budget_restant_mat_roullant' + count +'">' +budget+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + budget +'" name="tab_mat_roullant_finance[' + count +'][budget_restant_mat_roullant]" data="budget_restant_mat_roullant' + count +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit-mat-roullant"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-mat-roullant" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_allocation_mat_roullant)
        t.draw();
        viderChampsMatFinance();
        count++;
    }
});

$(document).on('click', '#edit-mat-roullant', function() {
    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#date_financement_mat_roullant')).val($('input[data=date_financement_mat_roullant' + ligne + ']').val());
    $($('#debit_allocation_mat_roullant')).val($('input[data=debit_allocation_mat_roullant' + ligne + ']').val());
    $($('#credit_allocation_mat_roullant')).val($('input[data=credit_allocation_mat_roullant' + ligne + ']').val());
    $($('#solde_financement_mat_roullant')).val($('input[data=solde_financement_mat_roullant' + ligne + ']').val());
    $($('#pourcentage_mat_roullant')).val($('input[data=pourcentage_mat_roullant' + ligne + ']').val());
    $($('#budget_restant_mat_roullant')).val($('input[data=budget_restant_mat_roullant' + ligne + ']').val());
});

//suppression
$(document).on('click', '#delete-mat-roullant', function() {
    Swal.fire({
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
            var table = $('.tableMatFinance').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

//  Carburant
$(document).on('click', '#add-ligne-carburant', function (e) {
    e.preventDefault();
    var date_debut = $('#date_debut_carburant').val();
    var date_fin = $('#date_fin_carburant').val();
    var duree = $('#duree_carburant').val();
    var date_decaissement = $('#date_decaissement_carburant').val();
    var type_carburant = $('#type_carburant').val();
    var montant_carburant = $('#montant_carburant').val();
    var frais_carburant = $('#frais_carburant').val();
    var frais_envoi = $('#frais_envoi_carburant').val();
    var cumul = $('#cumul_carburant').val();
    var solde = $('#solde_carburant').val();
    var prevision = $('#prevision_carburant').val();
    var statut = $('#statut_carburant').val();
    var total_charge = $('#total_charge_allocation_carburant').val();
    var mode_paiement = $('#mode_paiement_carburant').val();
    var id = $('#ligne').val();

    if (date_debut =='' || date_fin =='' || duree =='' || date_decaissement =='' || type_carburant =='' ||
        montant_carburant =='' || frais_carburant =='' || frais_envoi =='' || cumul =='' || prevision =='') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez reseigner les champs obligatoire.' : 'Please fill in the mandatory fields.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }else{
        if (id !== '') {
            $('input[data=date_debut' + id + ']').val(date_debut);
            $('span[id=date_debut' + id + ']').html(date_debut);
            $('input[data=date_fin' + id + ']').val(date_fin);
            $('span[id=date_fin' + id + ']').html(date_fin);
            $('input[data=duree' + id + ']').val(duree);
            $('span[id=duree' + id + ']').html(duree);
            $('input[data=date_decaissement' + id + ']').val(date_decaissement);
            $('span[id=date_decaissement' + id + ']').html(date_decaissement);
            $('input[data=type_carburant' + id + ']').val(type_carburant);
            $('span[id=type_carburant' + id + ']').html(type_carburant);
            $('input[data=montant_carburant' + id + ']').val(montant_carburant);
            $('span[id=montant_carburant' + id + ']').html(montant_carburant);
            $('input[data=frais_carburant' + id + ']').val(frais_carburant);
            $('span[id=frais_carburant' + id + ']').html(frais_carburant);
            $('input[data=frais_envoi' + id + ']').val(frais_envoi);
            $('span[id=frais_envoi' + id + ']').html(frais_envoi);
            $('input[data=total_charge' + id + ']').val(total_charge);
            $('span[id=total_charge' + id + ']').html(total_charge);
            $('input[data=prevision' + id + ']').val(prevision);
            $('span[id=prevision' + id + ']').html(prevision);
            $('input[data=cumul' + id + ']').val(cumul);
            $('span[id=cumul' + id + ']').html(cumul);
            $('input[data=solde' + id + ']').val(solde);
            $('span[id=solde' + id + ']').html(solde);
            $('input[data=statut' + id + ']').val(statut);
            $('span[id=statut' + id + ']').html(statut);
            $('input[data=mode_paiement' + id + ']').val(mode_paiement);
            $('span[id=mode_paiement' + id + ']').html(mode_paiement);
            viderChampsCarburant();

        } else {
            var t = $('.tableCarburant').DataTable();
            var tab_carburant = [
            '<span id="date_debut' + countCar +'">' +date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_debut +'" name="tab_carburant[' + countCar +'][date_debut]" data="date_debut' + countCar +'"/>',
            '<span id="date_fin' + countCar +'">' +date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_fin +'" name="tab_carburant[' + countCar +'][date_fin]" data="date_fin' + countCar +'"/>',
            '<span id="duree' + countCar +'">' +duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + duree +'" name="tab_carburant[' + countCar +'][duree]" data="duree' + countCar +'"/>',
            '<span id="date_decaissement' + countCar +'">' +date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_decaissement +'" name="tab_carburant[' + countCar +'][date_decaissement]" data="date_decaissement' + countCar +'"/>',
            '<span id="type_carburant' + countCar +'">' +type_carburant+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + type_carburant +'" name="tab_carburant[' + countCar +'][type_carburant]" data="type_carburant' + countCar +'"/>',
            '<span id="montant_carburant' + countCar +'">' +montant_carburant+ '</span>' +'<input type="hidden" readonly="true" class="montant" style="border:none; " value="' + montant_carburant +'" name="tab_carburant[' + countCar +'][montant_carburant]" data="montant_carburant' + countCar +'"/>',
            '<span id="frais_envoi' + countCar +'">' +frais_envoi+ '</span>' +'<input type="hidden" readonly="true" class="frais_envoi_car" style="border:none; " value="' + frais_envoi +'" name="tab_carburant[' + countCar +'][frais_envoi]" data="frais_envoi' + countCar +'"/>',
            '<span id="frais_carburant' + countCar +'">' +frais_carburant+ '</span>' +'<input type="hidden" readonly="true" class="frais_car" style="border:none; " value="' + frais_carburant +'" name="tab_carburant[' + countCar +'][frais_carburant]" data="frais_carburant' + countCar +'"/>',
            '<span id="cumul' + countCar +'">' +cumul+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="cumul_car" value="' + cumul +'" name="tab_carburant[' + countCar +'][cumul]" data="cumul' + countCar +'"/>',
            '<span id="solde' + countCar +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="solde_car" value="' + solde +'" name="tab_carburant[' + countCar +'][solde]" data="solde' + countCar +'"/>',
            '<span id="prevision' + countCar +'">' +prevision+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="prevision_c" value="' + prevision +'" name="tab_carburant[' + countCar +'][prevision]" data="prevision' + countCar +'"/>',
            '<span id="statut' + countCar +'">' +statut+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" value="' + statut +'" name="tab_carburant[' + countCar +'][statut]" data="statut' + countCar +'"/>',
            '<span id="total_charge' + countCar +'">' +total_charge+ '</span>' +'<input type="hidden" readonly="true" class="total_charge_c" style="border:none; " value="' + total_charge +'" name="tab_carburant[' + countCar +'][total_charge]" data="total_charge' + countCar +'"/>',
            '<span id="mode_paiement' + countCar +'">' +$('#mode_paiement_carburant').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + mode_paiement +'" name="tab_carburant[' + countCar +'][mode_paiement]" data="mode_paiement' + countCar +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit-r0"  data="' + countCar + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + countCar + '"><i class="flaticon-delete" id="delete-r0" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_carburant)
        t.draw();
        viderChampsCarburant();
        cal_tableau_carburant();
        countCar++;
        $(".btn_submit").prop('disabled', false);
        }
    }
  });

//
$(document).on('click', '#add-allocation-carburant-finance', function (e) {
    e.preventDefault();

    var date = $('#date_financement_carburant').val();
    var debit = $('#debit_allocation_carburant').val();
    var credit = $('#credit_allocation_carburant').val();
    var solde = $('#solde_financement_carburant').val();
    var pourcent = $('#pourcentage_carburant').val();
    var budget = $('#budget_restant_carburant').val();
    var id = $('#ligne').val();

    if (id !== '') {
        $('input[data=date_financement_carburant' + id + ']').val(date);
        $('span[id=date_financement_carburant' + id + ']').html(date);
        $('span[id=debit_allocation_carburant' + id + ']').html(debit);
        $('input[data=debit_allocation_carburant' + id + ']').val(debit);
        $('input[data=credit_allocation_carburant' + id + ']').val(credit);
        $('span[id=credit_allocation_carburant' + id + ']').html(credit);
        $('span[id=solde_financement_carburant' + id + ']').html(solde);
        $('input[data=solde_financement_carburant' + id + ']').val(solde);
        $('input[data=pourcentage_carburant' + id + ']').val(pourcent);
        $('span[id=pourcentage_carburant' + id + ']').html(pourcent);
        $('span[id=budget_restant_carburant' + id + ']').html(budget);
        $('input[data=budget_restant_carburant' + id + ']').val(budget);
        viderChampsCarburantFinance();

    } else {

        var t = $('.tableCarFinance').DataTable();
        var tab_allocation_carburant = [
            '<span id="date_financement_carburant' + count +'">' +date+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date +'" name="tab_carburant_finance[' + count +'][date_financement_carburant]" data="date_financement_carburant' + count +'"/>',
            '<span id="debit_allocation_carburant' + count +'">' +debit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + debit +'" name="tab_carburant_finance[' + count +'][debit_allocation_carburant]" data="debit_allocation_carburant' + count +'"/>',
            '<span id="credit_allocation_carburant' + count +'">' +credit+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + credit +'" name="tab_carburant_finance[' + count +'][credit_allocation_carburant]" data="credit_allocation_carburant' + count +'"/>',
            '<span id="solde_financement_carburant' + count +'">' +solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + solde +'" name="tab_carburant_finance[' + count +'][solde_financement_carburant]" data="solde_financement_carburant' + count +'"/>',
            '<span id="pourcentage_carburant' + count +'">' +pourcent+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + pourcent +'" name="tab_carburant_finance[' + count +'][pourcentage_carburant]" data="pourcentage_carburant' + count +'"/>',
            '<span id="budget_restant_carburant' + count +'">' +budget+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + budget +'" name="tab_carburant_finance[' + count +'][budget_restant_carburant]" data="budget_restant_carburant' + count +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit-carburant-finance"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-carburant-finance" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_allocation_carburant)
        t.draw();
        viderChampsCarburantFinance();
        count++;
    }
});

//
$(document).on('click', '#edit-carburant-finance', function() {
    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#date_financement_carburant')).val($('input[data=date_financement_carburant' + ligne + ']').val());
    $($('#debit_allocation_carburant')).val($('input[data=debit_allocation_carburant' + ligne + ']').val());
    $($('#credit_allocation_carburant')).val($('input[data=credit_allocation_carburant' + ligne + ']').val());
    $($('#solde_financement_carburant')).val($('input[data=solde_financement_carburant' + ligne + ']').val());
    $($('#pourcentage_carburant')).val($('input[data=pourcentage_carburant' + ligne + ']').val());
    $($('#budget_restant_carburant')).val($('input[data=budget_restant_carburant' + ligne + ']').val());
});

//
$('#debit_allocation_carburant, #credit_allocation_carburant').keyup(function () {
    var debit_allocation_carburant = parseFloat($('#debit_allocation_carburant').val()) || 0;
    var credit_allocation_carburant = parseFloat($('#credit_allocation_carburant').val()) || 0;
    var solde = debit_allocation_carburant - credit_allocation_carburant;
    $('#solde_financement_carburant').val(solde);
    $('#pourcentage_carburant').val(credit_allocation_carburant/solde);
});

//suppression
$(document).on('click', '#delete-carburant-finance', function() {
    Swal.fire({
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
            var table = $('.tableCarFinance').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

function cal_tableau_carburant() {
    var t_montant = 0;
    var montant = 0;

    var t_frais_envoi_carburant = 0;
    var frais_envoi_carburant = 0;

    var t_frais_car = 0;
    var frais_car = 0;

    var t_cumul_car = 0;
    var cumul_car = 0;

    var t_solde = 0;
    var solde = 0;

    var t_total_charge_carburant = 0;
    var total_charge_carburant = 0;

    var t_prevision_c = 0;
    var prevision_c = 0;

    $('.montant').each(function(i,e){
        montant=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_montant += montant;
    });
    $('.montant_carburant').text(t_montant);

    $('.frais_envoi_car').each(function(i,e){
        frais_envoi_carburant=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_frais_envoi_carburant += frais_envoi_carburant;
    });
    $('.frais_envoi_carburant').text(t_frais_envoi_carburant);

    $('.frais_car').each(function(i,e){
        frais_car=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_frais_car += frais_car;
    });
    $('.frais_carburant').text(t_frais_car);

    $('.cumul_car').each(function(i,e){
        cumul_car = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_cumul_car += cumul_car;
    });
    $('.cumul_carburant').text(t_cumul_car);

    $('.solde_car').each(function(i,e){
        solde = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_solde += solde;
    });
    $('.solde_c').text(t_solde);

    $('.total_charge_c').each(function(i,e){
        total_charge_carburant = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_total_charge_carburant += total_charge_carburant;
    });
    $('.total_charge_carburant').text(t_total_charge_carburant);

    $('.prevision_c').each(function(i,e){
        prevision_c = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_prevision_c += prevision_c;
    });
    $('.prevision_carburant').text(t_prevision_c);

}

// total charge carburant
$('#montant_carburant, #frais_carburant, #frais_envoi_carburant,#cumul_carburant, #solde_carburant, #prevision_carburant').keyup(function () {
    var frais_carburant = parseFloat($('#frais_carburant').val()) || 0;
    var frais_envoi_carburant = parseFloat($('#frais_envoi_carburant').val()) || 0;
    var cumul_carburant = parseFloat($('#cumul_carburant').val()) || 0;
    var solde_carburant = parseFloat($('#solde_carburant').val()) || 0;
    var prevision_carburant = parseFloat($('#prevision_carburant').val()) || 0;
    var montant_carburant = parseFloat($('#montant_carburant').val()) || 0;

    $('#total_charge_allocation_carburant').val(montant_carburant + frais_carburant + frais_envoi_carburant + cumul_carburant + solde_carburant + prevision_carburant);
  });

// total charge materiel roullant
$('#peage_mat_roullant, #frais_envoi_mat_roullant, #prevision_mat_roullant,#cumul_mat_roullant, #solde_mat_roullant').keyup(function () {
    var frais_envoi_mat_roullant = parseFloat($('#frais_envoi_mat_roullant').val()) || 0;
    var prevision_mat_roullant = parseFloat($('#prevision_mat_roullant').val()) || 0;
    var cumul_mat_roullant = parseFloat($('#cumul_mat_roullant').val()) || 0;
    var solde_mat_roullant = parseFloat($('#solde_mat_roullant').val()) || 0;
    var peage_mat_roullant = parseFloat($('#peage_mat_roullant').val()) || 0;

    $('#total_charge_mat_roullant').val(peage_mat_roullant + frais_envoi_mat_roullant + prevision_mat_roullant + cumul_mat_roullant + solde_mat_roullant);
  });

function cal_tableau_materiel() {
    var t_peage = 0;
    var peage = 0;

    var t_frais_envoi_mat = 0;
    var frais_envoi_mat = 0;

    var t_total_charge_mat = 0;
    var total_charge_mat = 0;

    var t_prevision_mat = 0;
    var prevision_mat = 0;

    var t_solde = 0;
    var solde = 0;

    var t_total_charge_carburant = 0;
    var total_charge_carburant = 0;

    $('.peage_mat').each(function(i,e){
        peage=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_peage += peage;
    });
    $('.peage_mat_roullant').text(t_peage);

    $('.frais_envoi_mat').each(function(i,e){
        frais_envoi_mat=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_frais_envoi_mat += frais_envoi_mat;
    });
    $('.frais_mat_roullant').text(t_frais_envoi_mat);

    $('.total_charge_mat').each(function(i,e){
        total_charge_mat=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_total_charge_mat += total_charge_mat;
    });
    $('.total_charge_mat_roullant').text(t_total_charge_mat);

    $('.prevision_mat').each(function(i,e){
        prevision_mat = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_prevision_mat += prevision_mat;
    });
    $('.prevision_mat_roullant').text(t_prevision_mat);

    $('.solde_mat').each(function(i,e){
        solde = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_solde += solde;
    });
    $('.solde_mat_roullant').text(t_solde);

    $('.total_charge_mat').each(function(i,e){
        total_charge_carburant = parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_total_charge_carburant += total_charge_carburant;
    });
    $('.total_charge_carburant').text(t_total_charge_carburant);
}

function cal_tableau_ressource() {
    var t_cout_frais_mission_allocation = 0;
    var cout_frais_mission_allocation = 0;


    $('.cout_frais_mission_ress').each(function(i,e){
        cout_frais_mission_allocation=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_cout_frais_mission_allocation += cout_frais_mission_allocation;
    });
    $('.cout_frais_mission').text(t_cout_frais_mission_allocation);

}


// synthèse
function ligneExistanteRessource(data){
    var t = $('.tableAllocationRessource').DataTable();
let numero = 1;
    $(data).each( function(count, item) {
        var tab_allocation_ressource = [
            '<span id="date_debut' + count +'">' +item.date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_debut +'" name="tab_ressource[' + count +'][date_debut]" data="date_debut' + count +'"/>',
            '<span id="date_fin' + count +'">' +item.date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_fin +'" name="tab_ressource[' + count +'][date_fin]" data="date_fin' + count +'"/>',
            '<span id="duree' + count +'">' +item.duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.duree +'" name="tab_ressource[' + count +'][duree]" data="duree' + count +'"/>',
            '<span id="date_decaissement' + count +'">' +item.date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_decaissement +'" name="tab_ressource[' + count +'][date_decaissement]" data="date_decaissement' + count +'"/>',
            '<span id="nom_prenom' + count +'">' +item.ressource+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.ressource +'" name="tab_ressource[' + count +'][nom_prenom]" data="nom_prenom' + count +'"/>',
            '<span id="cout_frais_mission' + count +'">' +item.prix_unitaire_frais_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="cout_frais_mission_ress" value="' + item.prix_unitaire_frais_mission +'" name="tab_ressource[' + count +'][cout_frais_mission]" data="cout_frais_mission' + count +'"/>',
            '<span id="frais_mission' + count +'">' +item.frais_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.frais_mission +'" name="tab_ressource[' + count +'][frais_mission]" data="frais_mission' + count +'"/>',
            '<span id="cout_recharge' + count +'">' +item.recharge+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.recharge +'" name="tab_ressource[' + count +'][cout_recharge]" data="cout_recharge' + count +'"/>',
            '<span id="frais' + count +'">' +item.frais+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.frais +'" name="tab_ressource[' + count +'][frais]" data="frais' + count +'"/>',
            '<span id="frais_envoi' + count +'">' +item.frais_envoi+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.frais_envoi +'" name="tab_ressource[' + count +'][frais_envoi]" data="frais_envoi' + count +'"/>',
            '<span id="total_charge' + count +'">' +item.total_charges+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.total_charges +'" name="tab_ressource[' + count +'][total_charge]" data="total_charge' + count +'"/>',
            '<span id="prevision' + count +'">' +item.prevision+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.prevision +'" name="tab_ressource[' + count +'][prevision]" data="prevision' + count +'"/>',
            '<span id="cumul' + count +'">' +item.cumulation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.cumulation +'" name="tab_ressource[' + count +'][cumul]" data="cumul' + count +'"/>',
            '<span id="solde' + count +'">' +item.solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.solde +'" name="tab_ressource[' + count +'][solde]" data="solde' + count +'"/>',
            '<span id="mode_paiement' + count +'">' +item.mode_paiement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.mode_paiement +'" name="tab_ressource[' + count +'][mode_paiement]" data="mode_paiement' + count +'"/>',
        ]
        t.row.add(tab_allocation_ressource)
        numero++;
    });
    t.draw();
    cal_tableau_ressource();
}

function ligneExistanteMateriel(data){
    var t = $('.tableAllocationMat').DataTable();
let numero = 1;
    $(data).each( function(count, item) {
        var tab_allocationmat_roullant0 = [
            '<span id="date_debut' + count +'">' +item.date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_debut +'" name="tab_mat_roullant[' + count +'][date_debut]" data="date_debut' + count +'"/>',
            '<span id="date_fin' + count +'">' +item.date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_fin +'" name="tab_mat_roullant[' + count +'][date_fin]" data="date_fin' + count +'"/>',
            '<span id="duree' + count +'">' +item.duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.duree +'" name="tab_mat_roullant[' + count +'][duree]" data="duree' + count +'"/>',
            '<span id="date_decaissement' + count +'">' +item.date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_decaissement +'" name="tab_mat_roullant[' + count +'][date_decaissement]" data="date_decaissement' + count +'"/>',
            '<span id="fournisseur' + count +'">' +item.fournisseur_id+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.fournisseur_id +'" name="tab_mat_roullant[' + count +'][fournisseur]" data="fournisseur' + count +'"/>',
            '<span id="vehicule' + count +'">' +item.type_id+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.type_id +'" name="tab_mat_roullant[' + count +'][vehicule]" data="vehicule' + count +'"/>',
            '<span id="immatriculation' + count +'">' +item.immatriculation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.immatriculation +'" name="tab_mat_roullant[' + count +'][immatriculation]" data="immatriculation' + count +'"/>',
            '<span id="peage' + count +'">' +item.peage+ '</span>' +'<input type="hidden" readonly="true" class="peage_mat" style="border:none; " value="' + item.peage +'" name="tab_mat_roullant[' + count +'][peage]" data="peage' + count +'"/>',
            '<span id="frais_envoi' + count +'">' +item.frais_envoi+ '</span>' +'<input type="hidden" class="frais_envoi_mat" readonly="true" style="border:none; " value="' + item.frais_envoi +'" name="tab_mat_roullant[' + count +'][frais_envoi]" data="frais_envoi' + count +'"/>',
            '<span id="total_charge' + count +'">' +item.total_charges+ '</span>' +'<input type="hidden" class="total_charge_mat" readonly="true" style="border:none; " value="' + item.total_charges +'" name="tab_mat_roullant[' + count +'][total_charge]" data="total_charge' + count +'"/>',
            '<span id="prevision' + count +'">' +item.prevision+ '</span>' +'<input type="hidden" readonly="true" class="prevision_mat" style="border:none; " value="' + item.prevision +'" name="tab_mat_roullant[' + count +'][prevision]" data="prevision' + count +'"/>',
            '<span id="cumul' + count +'">' +item.cumulation+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="cumul_mat" value="' + item.cumulation +'" name="tab_mat_roullant[' + count +'][cumul]" data="cumul' + count +'"/>',
            '<span id="solde' + count +'">' +item.solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="solde_mat" value="' + item.solde +'" name="tab_mat_roullant[' + count +'][solde]" data="solde' + count +'"/>',
            '<span id="statut' + count +'">' +item.statut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.statut +'" name="tab_mat_roullant[' + count +'][statut]" data="statut' + count +'"/>',
            '<span id="mode_paiement' + count +'">' +item.mode_paiement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.mode_paiement +'" name="tab_mat_roullant[' + count +'][mode_paiement]" data="mode_paiement' + count +'"/>',
        ]
        t.row.add(tab_allocationmat_roullant0)
        numero++;
    });
    t.draw();
    cal_tableau_materiel();
}

function ligneExistanteCarburant(data){
    var t = $('.tableCarburant').DataTable();
let numero = 1;
    $(data).each( function(count, item) {
        var tab_carburant = [
            '<span id="date_debut' + count +'">' +item.date_debut+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_debut +'" name="tab_carburant[' + count +'][date_debut]" data="date_debut' + count +'"/>',
            '<span id="date_fin' + count +'">' +item.date_fin+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_fin +'" name="tab_carburant[' + count +'][date_fin]" data="date_fin' + count +'"/>',
            '<span id="duree' + count +'">' +item.duree+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.duree +'" name="tab_carburant[' + count +'][duree]" data="duree' + count +'"/>',
            '<span id="date_decaissement' + count +'">' +item.date_decaissement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_decaissement +'" name="tab_carburant[' + count +'][date_decaissement]" data="date_decaissement' + count +'"/>',
            '<span id="type_carburant' + count +'">' +item.type_carburant+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.type_carburant +'" name="tab_carburant[' + count +'][type_carburant]" data="type_carburant' + count +'"/>',
            '<span id="montant_carburant' + count +'">' +item.montant_carburant+ '</span>' +'<input type="hidden" readonly="true" class="montant" style="border:none; " value="' + item.montant_carburant +'" name="tab_carburant[' + count +'][montant_carburant]" data="montant_carburant' + count +'"/>',
            '<span id="frais_envoi' + count +'">' +item.frais_envoi+ '</span>' +'<input type="hidden" readonly="true" class="frais_envoi_car" style="border:none; " value="' + item.frais_envoi +'" name="tab_carburant[' + count +'][frais_envoi]" data="frais_envoi' + count +'"/>',
            '<span id="frais_carburant' + count +'">' +item.frais+ '</span>' +'<input type="hidden" readonly="true" class="frais_car" style="border:none; " value="' + item.frais +'" name="tab_carburant[' + count +'][frais_carburant]" data="frais_carburant' + count +'"/>',
            '<span id="cumul' + count +'">' +item.cumulation+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="cumul_car" value="' + item.cumulation +'" name="tab_carburant[' + count +'][cumul]" data="cumul' + count +'"/>',
            '<span id="solde' + count +'">' +item.solde+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="solde_car" value="' + item.solde +'" name="tab_carburant[' + count +'][solde]" data="solde' + count +'"/>',
            '<span id="prevision' + count +'">' +item.prevision+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" class="prevision_c" value="' + item.prevision +'" name="tab_carburant[' + count +'][prevision]" data="prevision' + count +'"/>',
            '<span id="statut' + count +'">' +item.statut+ '</span>' +'<input type="hidden" readonly="true" style="border:none;" value="' + item.statut +'" name="tab_carburant[' + count +'][statut]" data="statut' + count +'"/>',
            '<span id="total_charge' + count +'">' +item.total_charges+ '</span>' +'<input type="hidden" readonly="true" class="total_charge_c" style="border:none; " value="' + item.total_charge +'" name="tab_carburant[' + count +'][total_charge]" data="total_charge' + count +'"/>',
            '<span id="mode_paiement' + count +'">' +item.mode_paiement+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.mode_paiement +'" name="tab_carburant[' + count +'][mode_paiement]" data="mode_paiement' + count +'"/>',
        ]
        t.row.add(tab_carburant)
        numero++;
    });
    t.draw();
    cal_tableau_carburant();
}
