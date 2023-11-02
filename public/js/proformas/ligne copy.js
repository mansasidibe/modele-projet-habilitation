let langue = 'fr';

$(".add-row").prop('disabled', true);
$(".btn_submit").prop('disabled', true);

// selection de client
$(document).on('change', '.selectClient', function(e) {
    e.preventDefault();
    $(".contact").prop('disabled', true);
    $(".delai_paiement").prop('disabled', true);
    $(".mode_paiement").prop('disabled', true);
    clt_data($(this).val()).then(
        response => {
            let interloct_id = '';
            $('.adresse_postale').val("");
            $('.fixe').val("");
            $('.contact').empty();

            if (langue == "en") {
                $(".contact").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $(".contact").append(
                    "<option value=''>Veuillez selectionnez</option>"
                );
            }

            $('.adresse_postale').val(response.data.adresse_postale);
            $('.fixe').val(response.data.faxe);

            $(".delai_paiement").prop('disabled', false);
            $(".mode_paiement").prop('disabled', false);
            mode_paiement().then(
                response => {
                    $(response).each(function(index, item) {
                        $(".mode_paiement").prop('disabled', false);
                        var option = $('<option value="' + item.id + '">' + item.libelle_fr + '</option>');
                        $('#mode_paiement').append(option);
                    });
                }
            );
            delai_paiement().then(
                response => {
                    $(response).each(function(index, item) {
                        $(".delai_paiement").prop('disabled', false);
                        var option = $('<option value="' + item.id + '">' + item.libelle_fr + '</option>');
                        $('#delai_paiement').append(option);
                    });
                }
            );

            $('.mode_paiement option[value="' + response.data.mode_paiement_id + '"]').prop('selected', true);
            $('.delai_paiement option[value="' + response.data.delai_paiement_id + '"]').prop('selected', true);


            $(response.data.contacts).each(function(index, item) {
                $(".contact").prop('disabled', false);
                var option = $('<option value="' + item.id + '">' + item.nom + ' ' + item.prenom + '</option>');
                $('#contact').append(option);
            });

        }
    );
});

// recuperation du produit depuis son ID
const get_uniq_product = async(param_id) => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/produits/' + param_id, {
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

// selection du produit
$(document).on('change', '.selectLtProduit', function(e) {
    e.preventDefault();
    get_uniq_product($(this).val()).then(
        response => {

            $('.id_rec').val(response.data.id);
            $('.ref_rec').val(response.data.code);
            $('.prod_rec').val(response.data.libelle);
            $('.prv_rec').val(response.data.prixvente);
            $('.taxe_rec').val(response.data.taxe);
            $(".add-row").prop('disabled', false);
        }
    );
});

const clt_data = async(param_id) => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/tiers/' + param_id, {
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

// //Recuperation des données produits
const list_product = async() => {
        if (token) {
            try {
                const response = await axios.get(getBaseURL() + 'api/v1/produits_valides', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (response.status == 200) return response.data.data;
            } catch (error) {
                console.log(error);
            }
        } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
    }
    // appel des produits
list_product().then(
    response => {
        $(response).each(function(index, item) {
            var option = $('<option value="' + item.id + '">' + item.libelle + '</option>');
            $('#selectLtProduit').append(option);
        });
    }
);

// //Recuperation des données produits
const list_client = async() => {
        if (token) {
            try {
                const response = await axios.get(getBaseURL() + 'api/v1/tiers', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (response.status == 200) return response.data.data;
            } catch (error) {
                console.log(error);
            }
        } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
    }
    // appel des produits
list_client().then(
    response => {
        $(response).each(function(index, item) {
            var option = $('<option value="' + item.id + '">' + item.raison_sociale + '</option>');
            $('#selectClient').append(option);
        });
    }
);

function viderChamp() {
    $('.id_rec').val('');
    $('.ref_rec').val('');
    $('.prod_rec').val('');
    $('.prv_rec').val('');
    $('.taxe_rec').val('');
}

let count = 1;
//Ajouter produits dans la liste
$(document).on('click', '#add-row', function(e) {
    e.preventDefault();

    if ($('.id_rec').val() === '') {
        $(".add-row").prop('disabled', true);
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez selectionner un produit' : 'Please select one product',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {
        // Logique d'ajout des lignes
        var id_rec = $('.id_rec').val();
        var ref_rec = $('.ref_rec').val();
        var prod_rec = $('.prod_rec').val();
        var prv_rec = $('.prv_rec').val();
        var taxe_rec = $('.taxe_rec').val();

        if (checkDouble(id_rec) !== true) {

            var t = $('.tableL').DataTable();

            var tab_produit = [
                id_rec + '<input type="hidden" readonly="true" style="border:none; " class="id_recp" value="' + id_rec + '" name="tab[' + count + '][id_rec]" data="id_rec' + count + '"/>',
                // count+'<input type="hidden" readonly="true" style="border:none;" value="' + count +'"  data="id' + count +'"/>',
                ref_rec + '<input type="hidden" readonly="true" style="border:none; " value="' + ref_rec + '" name="tab[' + count + '][ref_rec]" data="ref_rec' + count + '"/>',
                prod_rec + '<input type="hidden" readonly="true" style="border:none;" value="' + prod_rec + '" name="tab[' + count + '][prod_rec]" data="prod_rec' + count + '" />',
                prv_rec + '<input type="hidden" readonly="true" style="border:none;" class="t_prv" value="' + prv_rec + '" name="tab[' + count + '][prv_rec]" data="prv_rec' + count + '" />',
                taxe_rec + '<input type="hidden" readonly="true" style="border:none;" class="t_taxe" value="' + taxe_rec + '" name="tab[' + count + '][taxe_rec]" data="taxe_rec' + count + '" />',
                '<a class="mx-2 d-flex justify-content-center" href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
            ]
            t.row.add(tab_produit)

            t.draw();
            //  Cacher le premier element du tableau
            //  $('.tableL tr td:first-child').hide();
            //calcul ht
            cal_tableau_fac($('input[class=val_ttva]').val(), $('input[class=st_ttva]').val());
            count++;
            counter_prod_table();
            viderChamp();
        } else {

            Swal.fire({
                title: langue = 'fr' ? 'Ce produit existe dans la liste' : 'This product exists',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    }
});

// recupéreration des lignes produits
function ligneExistante(data) {
    var t = $('.tableL').DataTable();
    let numero = 1;
    $(data).each(function(count, item) {
        var tab_produit = [
            numero + '<input type="hidden" readonly="true" style="border:none; " class="id_recp" value="' + item.id + '" name="tab[' + count + '][id_rec]" data="id_rec' + count + '"/>',
            // '<input type="hidden" readonly="true" style="border:none;" value="' + count +'"  data="id' + count +'"/>',
            item.code + '<input type="hidden" readonly="true" style="border:none; " value="' + item.code + '" name="tab[' + count + '][ref_rec]" data="ref_rec' + count + '"/>',
            item.libelle + '<input type="hidden" readonly="true" style="border:none;" value="' + item.libelle + '" name="tab[' + count + '][prod_rec]" data="prod_rec' + count + '" />',
            item.prixvente + '<input type="hidden" readonly="true" style="border:none;" class="t_prv" value="' + item.prixvente + '" name="tab[' + count + '][prv_rec]" data="prv_rec' + count + '" />',
            item.taxe + '<input type="hidden" readonly="true" style="border:none;" class="t_taxe" value="' + item.taxe + '" name="tab[' + count + '][taxe_rec]" data="taxe_rec' + count + '" />',
            '<a class="mx-2 d-flex justify-content-center" href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
        ]
        t.row.add(tab_produit),
            numero++;
    });
    t.draw();
}

// recupéreration des lignes produits
function ligneExistanteConsult(data) {
    var t = $('.tableL').DataTable();
    let numero = 1;
    $(data).each(function(count, item) {
        var tab_produit = [
            numero + '<input type="hidden" readonly="true" style="border:none; " class="id_recp" value="' + item.id + '" name="tab[' + count + '][id_rec]" data="id_rec' + count + '"/>',
            item.code + '<input type="hidden" readonly="true" style="border:none; " value="' + item.code + '" name="tab[' + count + '][ref_rec]" data="ref_rec' + count + '"/>',
            item.libelle + '<input type="hidden" readonly="true" style="border:none;" value="' + item.libelle + '" name="tab[' + count + '][prod_rec]" data="prod_rec' + count + '" />',
            item.prixvente + '<input type="hidden" readonly="true" style="border:none;" class="t_prv" value="' + item.prixvente + '" name="tab[' + count + '][prv_rec]" data="prv_rec' + count + '" />',
            item.taxe + '<input type="hidden" readonly="true" style="border:none;" class="t_taxe" value="' + item.taxe + '" name="tab[' + count + '][taxe_rec]" data="taxe_rec' + count + '" />',
        ]
        t.row.add(tab_produit),
            numero++;
    });
    t.draw();
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableau() {
    var t = $('.tableL').DataTable();
    var tailleTableau = t.rows().count();
    count = count + tailleTableau;
}


function checkDouble(id_produit_ck) {

    for (let index = 0; index < count; index++) {
        if ($('input[data=id_rec' + index + ']').val() === id_produit_ck) {
            return true;
        }
    }
    return false
}

//   //suppression
$(document).on('click', '#delete', function() {
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
            var table = $('#example').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
            cal_tableau_fac($('input[class=val_ttva]').val(), $('input[class=st_ttva]').val());
            counter_prod_table();
        }
    });
});

// TABLEAU DE CALCUL
function cal_tableau_fac(taux_tva, st_ttva) {
    var tprv = 0;
    var amount = 0;
    var montantTVA = 0;
    var montantTTC = 0;

    $('.t_prv').each(function(i, e) {
        if (isNaN(parseInt($(this).val().replaceAll(/\s/g, '')))) {
            tamount = 0;
        } else {
            amount = parseFloat(parseInt($(this).val().replaceAll(/\s/g, ''))) - 0;
            tprv += amount;
        }
    });

    $('span[data=val_ht]').text(formatMoneyJs(tprv)); // TEXT HT
    $('input[class=val_ht]').val(tprv); // Montant HT

    if (parseInt(st_ttva) == 0) st_ttva = false;
    if (parseInt(st_ttva) == 1) st_ttva = true;

    // Calcul des montants TVA et TTC
    if (st_ttva) {

        montantTVA = (parseInt(taux_tva) * tprv) / 100; //18%*HT
        montantTTC = tprv + ((parseInt(taux_tva) * tprv) / 100);

        $('span[data=val_tva]').text(formatMoneyJs(montantTVA.toFixed())); // TEXT TVA
        $('input[class=val_tva]').val(montantTVA.toFixed()); // Montant TVA

        $('span[data=val_ttc]').text(formatMoneyJs(montantTTC.toFixed())); // TEXT TTC
        $('input[class=val_ttc]').val(montantTTC.toFixed()); // Montant TTC

    } else {
        montantTVA = 0;
        montantTTC = tprv;
        $('span[data=val_tva]').text(formatMoneyJs(montantTVA.toFixed())); // TEXT TVA
        $('input[class=val_tva]').val(montantTVA.toFixed()); // Montant TVA

        $('span[data=val_ttc]').text(formatMoneyJs(montantTTC.toFixed())); // TEXT TTC
        $('input[class=val_ttc]').val(montantTTC.toFixed()); // Montant TTC
    }
}

// //application de la tva
$(document).on('click', ".ckb_tva", function(event) {

    var taux_tva = 0;
    var st_ttva = false;

    if ($(this).is(':checked')) {

        taux_tva = parseInt($('input[class=val_ttva]').val());
        st_ttva = true;
        $('input[class=st_ttva]').val(1);
        cal_tableau_fac(taux_tva, st_ttva);

    } else {
        st_ttva = false;
        $('input[class=st_ttva]').val(0);
        cal_tableau_fac(taux_tva, st_ttva);
    }

});

// //function de formattage des montants
function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// // Empechement de l'insertion en base
function counter_prod_table() {

    var num_ligne = $('#example').DataTable().row().count();

    //   if(num_ligne !==0){
    //     $(".btn_submit").prop('disabled', false);
    //   }else{
    //     $(".btn_submit").prop('disabled', true);
    //   }
}

// rendre obligatoire le 'validite de devis'
$('#selectVlDevis').change(function() {
    if ($('#selectVlDevis').val() !== '') {
        $(".btn_submit").prop('disabled', false);
    } else {
        $(".btn_submit").prop('disabled', true);
    }
})

// mode paiement
const mode_paiement = async() => {
        if (token) {
            try {
                const response = await axios.get(getBaseURL() + 'api/v1/mode_paiement', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (response.status == 200) return response.data.data;
            } catch (error) {
                console.log(error);
            }
        } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
    }
    // delai paiement
const delai_paiement = async() => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/delai_paiement', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

// recuperation du produit depuis son ID
const validite_devis = async() => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/delai_paiement', {
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

validite_devis().then(
    response => {
        $(response).each(function(index, item) {
            var option = $('<option value="' + item.id + '">' + item.libelle_fr + '</option>');
            $('#selectVlDevis').append(option);
        });
    }
);

// recuperation du produit depuis son ID
const tva = async() => {
    if (token) {
        try {
            const response = await axios.get(getBaseURL() + 'api/v1/tva', {
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    } else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

tva().then(
    response => {
        $('.val_ttva').val(response.libelle_fr);
        $('#val_ttva').html(response.libelle_fr);
    }
);