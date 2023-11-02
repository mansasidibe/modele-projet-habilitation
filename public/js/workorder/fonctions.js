//Recuperation des proformas validées
const getProformas = async () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    await axios.get(getBaseURL() + 'api/v1/proforma_workorder', config)
        .then(function (response) {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                $(".workorder_proforma").append("<option value='" + d.id + "'>" + d.reference + "</option>");
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

// Récuperation des données d'une proformas
const getProformasById = async (id) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    await axios.get(getBaseURL() + 'api/v1/proformas/'+id, config)
        .then(function (response) {
            $('.reference_proformas').val(response.data.data.reference);
            $('.nom_clt').val(response.data.data.client.raison_sociale);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function enleverEspaces(nombre) {
        if (typeof nombre !== 'string') {
          nombre = nombre.toString();
        }

        return nombre.replace(/\s/g, '');
      }


// Récuperation des BOQs
async function BOQ() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/boq", config)
        .then((response) => {
            $.each(response.data.data, function (i, d) {
                if (langue == "en") {
                    $("#selectBoq").append(
                        "<option value='" + d.id + "'>" + d.entreprise.slug + "</option>"
                    );
                } else {
                    $("#selectBoq").append(
                        "<option value='" + d.id + "'>" + d.entreprise.slug + "</option>"
                    );
                }
            });
        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
    }

// duree_ressource de mission_ressource = date de debut - date de fin
$(document).on('change', '#workorder_date_debut , #workorder_date_fin', function () {
        var date1 = new Date($('#workorder_date_debut').val());
        var date2 = new Date($('#workorder_date_fin').val());

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (date2 < date1) {
            Swal.fire({
                icon: 'error',
                text: langue == 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
            });

            $('#workorder_date_fin').val('');
            $('#workorder_duree_mission').val('');
        } else {
            $('#workorder_duree_mission').val(parseInt(diffDays) + 1);

            window.Var1 = parseInt(diffDays) + 1;
        }
    });

// duree_logistique de mission_ressource = date de debut - date de fin
$(document).on('change', '#date_debut_logistique , #date_fin_logistique', function () {
        var date1 = new Date($('#date_debut_logistique').val());
        var date2 = new Date($('#date_fin_logistique').val());

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (date2 < date1) {
            Swal.fire({
                icon: 'error',
                text: langue == 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
            });

            $('#date_debut_logistique').val('');
            $('#date_fin_logistique').val('');
        } else {
            $('#duree_logistique').val(parseInt(diffDays) + 1);

            window.duree_logistque = parseInt(diffDays) + 1;
            calculerMontant(window.duree_logistque, window.montant);        }
    });


// Récuperation des pays
function getVille(pays_id) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }
        axios.get(getBaseURL() + 'api/v1/get_ville_by_pays/' + pays_id, config)
            .then(function (response) {
                this.data = response.data.data.ville;
                let selectField = document.getElementById("selectVille");
                selectField.length = 0;
                $.each(this.data, function (i, d) {
                    $("#selectVille").append("<option value='" + d.id + "'>" + d.libelle + "</option>");
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

async function pays() {
        var token = localStorage.getItem("token");
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        await this.axios
            .get(getBaseURL() + "api/v1/pays", config)
            .then((response) => {
                this.data = response.data.data;
                $.each(this.data, function (i, d) {
                    if (langue == "en") {
                        $("#selectPays").append(
                            "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                        );
                    } else {
                        $("#selectPays").append(
                            "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                        );
                    }
                });

            })
            .catch((error) => {
                console.log(error);
                this.ville = [];
            });
    }

// fixation du nombre d'équipe
$(document).on('keyup', '.nombre_equipe', function (e) {
    e.preventDefault();

    equipe();
    var num_equip = parseInt($(this).val());
    var libelle = $('.lib_eqp_ressource').val();
    var libelle_id = $('.id_eqp_ressource').val();
    $('.equipe_ressource').empty();
    $(".equipe_ressource").append("<option value=''> Veuillez selectionner</option>");
    if (num_equip != 0 && num_equip != '') {

      for (let i = 0; i < num_equip; i++) {
        $('.equipe_ressource').append('<option data-nbre="' + (i + 1) + '" value="' + libelle_id + '" >' + libelle.concat(" ", i + 1) + '</option>');
      }
    }

  });

// fixation du nombre d'équipe
$(document).on('keyup', '.travel', function (e) {
    e.preventDefault();

    var duree_ressource = $('#duree_ressource').val();
    var travel = $('#travel').val();
    let pu_travel = duree_ressource * travel;
    $('.pu_travel').val(pu_travel);
});

$(document).on('keyup', '.nombre_equipe', function (e) {
    e.preventDefault();

    equipe();
    var num_equip = parseInt($(this).val());
    var libelle = $('.lib_eqp_logistique').val();
    var libelle_id = $('.id_eqp_logistique').val();
    $('.equipe_logistique').empty();
    $(".equipe_logistique").append("<option value=''> Veuillez selectionner</option>");
    if (num_equip != 0 && num_equip != '') {

      for (let i = 0; i < num_equip; i++) {
        $('.equipe_logistique').append('<option data-nbre="' + (i + 1) + '" value="' + libelle_id + '" >' + libelle.concat(" ", i + 1) + '</option>');
      }
    }

  });
$(document).on('keyup', '.nombre_equipe', function (e) {
    e.preventDefault();

    equipe();
    var num_equip = parseInt($(this).val());
    var libelle = $('.lib_eqp_ressource').val();
    var libelle_id = $('.id_eqp_ressource').val();
    $('.equipe_outils').empty();
    $(".equipe_outils").append("<option value=''> Veuillez selectionner</option>");
    if (num_equip != 0 && num_equip != '') {

      for (let i = 0; i < num_equip; i++) {
        $('.equipe_outils').append('<option data-nbre="' + (i + 1) + '" value="' + libelle_id + '" >' + libelle.concat(" ", i + 1) + '</option>');
      }
    }

  });

// changement du nombre d'équipe
$(document).on('change', '.equipe_ressource', function (e) {
e.preventDefault();
var v_equipe = $('.equipe_ressource option:selected').text();

var get_arr_eqp = v_equipe.split(" ");
$('.numuq_eqp_ressource').val(get_arr_eqp[1].trim());
});

$(document).on('change', '.equipe_logistique', function (e) {
e.preventDefault();
var v_equipe = $('.equipe_logistique option:selected').text();

var get_arr_eqp = v_equipe.split(" ");
$('.numuq_eqp_logistique').val(get_arr_eqp[1].trim());
});

$(document).on('change', '.equipe_outils', function (e) {
e.preventDefault();
var v_equipe = $('.equipe_outils option:selected').text();

var get_arr_eqp = v_equipe.split(" ");
$('.numuq_eqp_outils').val(get_arr_eqp[1].trim());
});

// recupération des mission
async function missions() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/pays", config)
        .then((response) => {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                if (langue == "en") {
                    $("#mission_ressource").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#mission_ressource").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });
        })
        .catch((error) => {
        });
    }

//FONCTION DE CALCUL DES TATAUX
function cal_tableau_total(){

    var t_cout_unit_res = 0;
    var cout_unit_res = 0;

    var t_cout_mission = 0;
    var cout_mission_r = 0;

    var t_frais_unit_mission=0;
    var frais_unit_mission =0;

    var t_frais_mission = 0;
    var frais_mission_r = 0;

    var t_recharge=0;
    var recharge_r=0;

    var t_travel=0;
    var travel=0;

    var t_frais_envoi=0;
    var frais_envoi_r=0;

    var t_total_charge =0;
    var total_charge_r=0;

    var t_total_produit_val =0;
    var total_produit_val=0;

    var t_montant_boq = 0;
    var montant_boq = 0;

    $('.t_montant_boq').each(function(i,e){
      montant_boq=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_montant_boq +=montant_boq;
    });
    $('.montant_boq').text(formatMoneyJs(t_montant_boq));

    $('.t_cout_unit_res').each(function(i,e){
      cout_unit_res=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_cout_unit_res +=cout_unit_res;
    });
    $('.cout_unit_res').text(formatMoneyJs(t_cout_unit_res));

    $('.t_cout_mission').each(function(i,e){
      cout_mission_r=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_cout_mission +=cout_mission_r;
    });
    $('.cout_mission_r').text(formatMoneyJs(t_cout_mission));

    $('.t_total_produit_val').each(function(i,e){
      total_produit_val=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
        t_total_produit_val +=total_produit_val;
    });
    $('.total_produit_r').text(formatMoneyJs(t_total_produit_val));

    $('.t_frais_unit_mission').each(function(i,e){
      frais_unit_mission =parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_frais_unit_mission +=frais_unit_mission ;
    });
    $('.frais_unit_mission').text(formatMoneyJs(t_frais_unit_mission));

    $('.t_frais_mission').each(function(i,e){
      frais_mission_r =parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_frais_mission  +=frais_mission_r ;
    });
    $('.frais_mission_r').text(formatMoneyJs(t_frais_mission) );

    $('.t_recharge').each(function(i,e){
      recharge_r=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_recharge +=recharge_r;
    });
    $('.recharge_r').text(formatMoneyJs(t_recharge));

    $('.t_travel').each(function(i,e){
      travel_r=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_travel +=travel_r;
    });
    $('.travel_r').text(formatMoneyJs(t_travel));

    $('.t_frais_envoi').each(function(i,e){
      frais_envoi_r=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_frais_envoi +=frais_envoi_r;
    });
    $('.frais_envoi_r').text(formatMoneyJs(t_frais_envoi));

    $('.t_total_charge').each(function(i,e){
      total_charge_r=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
      t_total_charge +=total_charge_r;
    });
    $('.total_charge_r').text(formatMoneyJs(t_total_charge));

  }

// Empechement de l'insertion en base
function counter_prod_table() {

    var num_ligne = $('#example').DataTable().row().count();

    if (num_ligne !== 0) {
      $(".btn_save").prop('disabled', false);
    } else {
      $(".btn_save").prop('disabled', true);
    }

  }

// pour vider les champs
function viderChamp() {
    $('#duree_ressource').val("");
    $('#date_debut_ressource').val("");
    $('#date_fin_ressource').val("");
    $('#cout_ressource').val("");
    $('#cout_mission_ressource').val("");
    $('#cout_frais_mission_ressource').val("");
    $('#frais_mission_ressource').val("");
    $('#frais_envoi_ressource').val("");
    $('#cout_recharge_ressource').val("");
    $('#total_charge_ressource').val("");
    $('#profil').val("");
    $('#selectUser').val("");
    $('#mission_ressource').val("");
    $('#departement').val("");
    $('#selectService').val("");
    $('#ville').val("");
    $('#selectCommune').val("");
    $('#selectQuartier').val("");
    $('#equipe_ressource').val("");
  }

function date_formatter(type, valeur) {

    if (type == 0) {
      var fmt_date = valeur.split("/");
      return valeur;
    } else {

      var fmt_date = valeur.split("-");
      var dd = '';
      var mm = '';
      var yyyy = fmt_date[0];
      dd = fmt_date[2];
      mm = fmt_date[1];
      if (dd == undefined) return '';
      else return dd + '/' + mm + '/' + yyyy;

    }
  }

async function ressource() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/users", config)
        .then((response) => {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                $("#selectUser").append(
                    "<option value='" + d.id + "'>" + d.nom + "   " +d.prenom+ "</option>"
                );
            });
        })
        .catch((error) => {

        });
    }

// affichage cout unitaire ressource et cout mission_ressource ressource (salaire/176.33)
$(document).on('change', '#selectUser', function () {
    var selectVal = $('#selectUser').val();

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/users/' + selectVal, config)
        .then(function (response) {
            console.log(response.data.contrat);
            if (response.data.contrat != null) {
                $("#add-ressource").prop('disabled', false);
                data = response.data.contrat;
                let duree =$('#duree_ressource').val();

                $('#cout_ressource').val(data.salaire_net);
                cout_mission_ressource = data.salaire_net * duree;
                $('#cout_mission_ressource').val(Math.round(cout_mission_ressource));

                var cout_frais_mission_ressource = Math.round(cout_mission_ressource * window.Var1);
                $('#cout_frais_mission_ressource').val(Math.round(cout_frais_mission_ressource));

                let frais_mission_ressource = cout_frais_mission_ressource * duree;
                $('#frais_mission_ressource').val(Math.round(frais_mission_ressource));
            }else {
                $("#add-ressource").prop('disabled', true);
                alert('Cet utilisateur n\'a pas de contrat valide.');
            }

        })
        .catch(function (error) {
            console.log(error);
        });
  });

  function differenceEnJours(dateDebut, dateFin) {
    var debut = new Date(dateDebut);
    var fin = new Date(dateFin);

    var differenceEnMillisecondes = fin - debut;

    var differenceEnJours = differenceEnMillisecondes / (1000 * 60 * 60 * 24);

    return Math.round(differenceEnJours);
}


// duree_ressource de mission_ressource = date de debut - date de fin
$(document).on('change', '#date_fin_ressource , #date_debut_ressource', function () {
    var date1 = new Date($('#date_debut_ressource').val() || 0);
    var date2 = new Date($('#date_fin_ressource').val());

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
      $('#date_fin_ressource').val('');
      $('#duree_ressource').val('');
    } else {
      $('#duree_ressource').val(isNaN(diffDays) ? '' : diffDays+1); // j'affiche le differentiel du jour s'il est different de NaN

      window.Var1 = parseInt(diffDays)+1;
    }
  });

// total charge = sommes des totaux
$('#frais_envoi_ressource, #frais_mission_ressource, #cout_recharge_ressource').keyup(function () {
    var frais_envoi_ressource = parseFloat($('#frais_envoi_ressource').val()) || 0;
    var duree_ressource = parseFloat($('#duree_ressource').val()) || 0;
    var cout_ressource = parseFloat($('#cout_ressource').val()) || 0;
    var cout_mission_ressource = parseFloat($('#cout_mission_ressource').val()) || 0;
    var cout_frais_mission_ressource = parseFloat($('#cout_frais_mission_ressource').val()) || 0;
    var cout_recharge_ressource = parseFloat($('#cout_recharge_ressource').val()) || 0;
    var frais_mission_ressource = parseFloat($('#frais_mission_ressource').val()) || 0;

    $('#total_charge_ressource').val(frais_envoi_ressource + cout_mission_ressource + cout_recharge_ressource + frais_mission_ressource);
  });

$('#cout_recharge_ressource').keyup(function () {
    var frais_mission_ressource = parseFloat($('#frais_mission_ressource').val()) || 0;
    var cout_recharge_ressource = parseFloat($('#cout_recharge_ressource').val()) || 0;
    let frais_envoi_ressource = (frais_mission_ressource + cout_recharge_ressource) * 0.023; // 0.023 => 2.3%

    $('#frais_envoi_ressource').val(frais_envoi_ressource);
  });

  let count_ressource = 1;
  //Ajouter produits dans la liste
  $(document).on('click', '#add-ressource', function (e) {
    e.preventDefault();

    var datePlusAnterieure= '';
    var dateMoinsAnterieure= '';

    if ($('.duree_ressource').val() === '' ||
        $('.mission_ressource').val() === '' ||
        $('#frais_mission_ressource').val() === '' ||
        $('#date_debut_ressource').val() === '' ||
        $('#date_fin_ressource').val() === '' ||
        $('#departement').val() === '' ||
        $('#selectService').val() === '' ||
        $('#selectUser').val() === '' ||
        $('#profil').val() === '' ||
        $('.ville').val() === '' ||
        $('#selectCommune').val() === '' ||
        $('#selectQuartier').val() === ''
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

      ///Logique d'ajout des lignes
      var nbreEquipe = $('#equipe_ressource option:selected').data("nbre");

      var departement = $('#departement').val();
      var service = $('#selectService').val();
      var user = $('#selectUser').val();
      var profil = $('#profil').val();
      var duree_ressource = $('#duree_ressource').val();
      var date_debut_ressource = $('#date_debut_ressource').val();
      var travel = $('#travel').val();
      var date_fin_ressource = $('#date_fin_ressource').val();
      var cout_ressource = $('#cout_ressource').val();
      var cout_mission_ressource = $('#cout_mission_ressource').val();
      var cout_frais_mission_ressource = $('#cout_frais_mission_ressource').val();
      var frais_mission_ressource = $('#frais_mission_ressource').val();
      var frais_envoi_ressource = $('#frais_envoi_ressource').val();
      var cout_recharge_ressource = $('#cout_recharge_ressource').val();
      var ville = $('#ville').val();
      var commune = $('#selectCommune').val();
      var s_quartier = $('#selectQuartier').val();
      var equipe_ressource = $('#equipe_ressource').val();
      var total_charge_ressource = $('#total_charge_ressource').val();

      var id_eqp_ressource = $('.id_eqp_ressource').val();
      var lib_eqp_ressource = $('.lib_eqp_ressource').val();
      var numuq_eqp_ressource = $('.numuq_eqp_ressource').val();

      var mission = $('#mission_ressource').val();
      var facturation = $('#mode_facturation').val();
      var split = mission.split('|',2);
      mission_ressource = split[0];
      cout_mission = cout_ressource * duree_ressource; // cout mission ressource = (cout unitaire) x (duree de mission)

      var id = $('input[id=ligne]').val();

      if (id !== '') {

        $('input[data=id' + id + ']').val($('input[id=ressource]').val());

         //equipe
         $('input[data="numuq_eqp_ressource' + id + '"]').val($('input[class=numuq_eqp_ressource]').val());
         numuq_eqp_ressource = $('input[class=numuq_eqp_ressource]').val();
         $('span[class="equipe_list_ressource' + id + ' mx-2"]').text(numuq_eqp_ressource);

        $('input[data=date_debut_ressource' + id + ']').val($('input[id=date_debut_ressource]').val());
        $('span[class="date_debut_ressource' + id + ' mx-2"]').text(date_formatter(1, $('#date_debut_ressource').val()));

        $('input[data=date_fin_ressource' + id + ']').val($('input[id=date_fin_ressource]').val());
        $('span[class="date_fin_ressource' + id + ' mx-2"]').text(date_formatter(1, $('#date_fin_ressource').val()));

        $('input[data=cout_ressource' + id + ']').val($('input[id=cout_ressource]').val());
        $('span[class="cout_ressource' + id + ' mx-2"]').text($('#cout_ressource').val());

        $('input[data=cout_mission_ressource' + id + ']').val($('input[id=cout_mission_ressource]').val());
        $('span[class="cout_mission_ressource_list' + id + ' mx-2"]').text($('#cout_mission_ressource').val());

        $('input[data=cout_frais_mission_ressource' + id + ']').val($('input[id=cout_frais_mission_ressource]').val());
        $('span[class="cout_frais_mission_ressource' + id + ' mx-2"]').text($('#cout_frais_mission_ressource').val());

        $('input[data=frais_mission_ressource' + id + ']').val($('input[id=frais_mission_ressource]').val());
        $('span[class="frais_mission_ressource' + id + ' mx-2"]').text($('#frais_mission_ressource').val());

        $('input[data=frais_envoi_ressource' + id + ']').val($('input[id=frais_envoi_ressource]').val());
        $('span[class="frais_envoi_ressource' + id + ' mx-2"]').text($('#frais_envoi_ressource').val());

        $('input[data=cout_recharge_ressource' + id + ']').val($('input[id=cout_recharge_ressource]').val());
        $('span[class="cout_recharge_ressource' + id + ' mx-2"]').text($('#cout_recharge_ressource').val());

        // $('input[data="equipe_ressource' + id + '"]').val($('input[class=numuq_eqp_ressource]').val());
        // $('input[data="equipe_ressource' + id + '"]').val($('#equipe_ressource option:selected').val());
        // $('span[class="equipe_ressource' + id + ' mx-2"]').text($('#equipe_ressource option:selected').text());

        $('input[data="mission_ressource' + id + '"]').val($('#mission_ressource option:selected').val());
        $('span[class="mission_ressource' + id + ' mx-2"]').text($('#mission_ressource option:selected').text());

        $('input[data="departement' + id + '"]').val($('#departement option:selected').val());
        $('span[class="departement' + id + ' mx-2"]').text($('#departement option:selected').text());

        $('input[data="selectService' + id + '"]').val($('#selectService option:selected').val());
        $('span[class="selectService' + id + ' mx-2"]').text($('#selectService option:selected').text());

        $('input[data="selectUser' + id + '"]').val($('#selectUser option:selected').val());
        $('span[class="selectUser' + id + ' mx-2"]').text($('#selectUser option:selected').text());

        $('input[data="ville' + id + '"]').val($('#ville option:selected').val());
        $('span[class="ville' + id + ' mx-2"]').text($('#ville option:selected').text());

        $('input[data="profil' + id + '"]').val($('#profil option:selected').val());
        $('span[class="profil_list' + id + ' mx-2"]').text($('#profil option:selected').text());

        $('#duree_ressource').val("");
        $('#date_debut_ressource').val("");
        $('#travel').val("");
        $('#date_fin_ressource').val("");
        $('#cout_ressource').val("");
        $('#cout_mission_ressource').val("");
        $('#cout_frais_mission_ressource').val("");
        $('#frais_mission_ressource').val("");
        $('#frais_envoi_ressource').val("");
        $('#cout_recharge_ressource').val("");
        $('#total_charge_ressource').val("");
        $('#profil').val("");
        $('#selectUser').val("");
        $('#mission_ressource').val("");
        $('#departement').val("");
        $('#selectService').val("");
        $('#ville').val("");
        $('#selectCommune').val("");
        $('#selectQuartier').val("");
        $('#equipe_ressource').val("");

      } else {

        // var pu_semaine = parseInt($('.montant_boq').text());
        // var total_produit_val = (pu_semaine + travel) * Math.round(duree_ressource/4);
        var total_produit_val = travel * Math.round(duree_ressource/4);

          var t = $('.tableR').DataTable();
          Window.superviseur = $('#selectUser option:selected').text();
          var tab_produit = [
            '<input type="hidden" class="cacher" style="display:none;" value="' +count_ressource +'"  data="id' + count_ressource + '"/>',

            lib_eqp_ressource.concat(" ", '<span class="equipe_list_ressource' + count_ressource + ' mx-2">' + nbreEquipe + '</span>') + '<input type="hidden" class="name_equipe_ressource" data-equipe="' + lib_eqp_ressource.concat("|", "<span class='equipe_list_ressource" + count_ressource + "'>" + nbreEquipe + "</span>") + '"  readonly="true"  style="border:none;" value="' + id_eqp_ressource + '" name="tab_ressource[' + count_ressource + '][id_eqp_ressource]" data="id_eqp_ressource' + count_ressource + '" /> <input type="hidden" readonly="true"  style="border:none;" value="' + nbreEquipe + '" name="tab_ressource[' + count_ressource + '][nbreEquipe]" data="nbreEquipe' + count_ressource + '" />',

            '<span class="tdhead mission_ressource' + count_ressource + ' mx-2">' + $('#mission_ressource option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + mission_ressource + '" name="tab_ressource[' + count_ressource + '][mission_ressource]" data="mission_ressource' + count_ressource + '" />',
            '<span class="departement' + count_ressource + ' mx-2">' + $('#departement option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + departement + '" name="tab_ressource[' + count_ressource + '][departement]" data="departement' + count_ressource + '" />',
            '<span class="selectService' + count_ressource + ' mx-2">' + $('#selectService option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + service + '" name="tab_ressource[' + count_ressource + '][service]" data="service' + count_ressource + '" />',
            '<span class="profil_list' + count_ressource + ' mx-2">' + $('#profil option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + profil + '" name="tab_ressource[' + count_ressource + '][profil]" data="profil' + count_ressource + '" />',
            '<span class="selectUser' + count_ressource + ' mx-2">' + $('#selectUser option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + user + '" name="tab_ressource[' + count_ressource + '][user]" data="user' + count_ressource + '" />',
            '<span class="date_debut_ressource' + count_ressource + ' mx-2">' + date_formatter(1, $('#date_debut_ressource').val()) + '<input type="hidden" readonly="true"  style="border:none;" value="' + date_debut_ressource + '" name="tab_ressource[' + count_ressource + '][date_debut_ressource]" data="date_debut_ressource' + count_ressource + '" />',
            '<span class="date_fin_ressource' + count_ressource + ' mx-2">' + date_formatter(1, $('#date_fin_ressource').val()) + '<input type="hidden" readonly="true"  style="border:none;" value="' + date_fin_ressource + '" name="tab_ressource[' + count_ressource + '][date_fin_ressource]" data="date_fin_ressource' + count_ressource + '" />',
            '<span class="duree_ressource' + count_ressource + ' mx-2">' + $('#duree_ressource').val() + '</span>'+ '<input type="hidden" readonly="true"  style="border:none;" value="' + duree_ressource + '" name="tab_ressource[' + count_ressource + '][duree_ressource]" data="duree_ressource' + count_ressource + '" />',
            '<span class="cout_ressource' + count_ressource + ' mx-2">' + $('#cout_ressource').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_cout_unit_res"  style="border:none;" value="' + cout_ressource + '" name="tab_ressource[' + count_ressource + '][cout_ressource]" data="cout_ressource' + count_ressource + '" />',
            '<span class="cout_mission_ressource_list' + count_ressource + ' mx-2">' + $('#cout_mission_ressource').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_cout_mission" style="border:none;" value="' + cout_mission_ressource + '" name="tab_ressource[' + count_ressource + '][cout_mission_ressource]" data="cout_mission_ressource' + count_ressource + '" />',
            '<span class="cout_frais_mission_ressource' + count_ressource + ' mx-2">' + $('#cout_frais_mission_ressource').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_frais_unit_mission" style="border:none;" value="' + cout_frais_mission_ressource + '" name="tab_ressource[' + count_ressource + '][cout_frais_mission_ressource]" data="cout_frais_mission_ressource' + count_ressource + '" />',
            '<span class="frais_mission_ressource' + count_ressource + ' mx-2">' + $('#frais_mission_ressource').val() + '</span>' + '<input type="hidden" readonly="true" class="t_frais_mission" style="border:none;" value="' + frais_mission_ressource + '" name="tab_ressource[' + count_ressource + '][frais_mission_ressource]" data="frais_mission_ressource' + count_ressource + '" />',
            '<span class="cout_recharge_ressource' + count_ressource + ' mx-2">' + $('#cout_recharge_ressource').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_recharge" style="border:none;" value="' + cout_recharge_ressource + '" name="tab_ressource[' + count_ressource + '][cout_recharge_ressource]" data="cout_recharge_ressource' + count_ressource + '" />',
            '<span class="frais_envoi_ressource' + count_ressource + ' mx-2">' + $('#frais_envoi_ressource').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_frais_envoi" style="border:none;" value="' + frais_envoi_ressource + '" name="tab_ressource[' + count_ressource + '][frais_envoi_ressource]" data="frais_envoi_ressource' + count_ressource + '" />',
            '<span class="travel' + count_ressource + ' mx-2">' + $('#travel').val() + '</span>'+ '<input type="hidden" readonly="true" class="t_travel" style="border:none;" value="' + travel + '" name="tab_ressource[' + count_ressource + '][travel]" data="travel' + count_ressource + '" />',
            '<span class="ville' + count_ressource + ' mx-2">' + $('#ville option:selected').text() + '</span>'+ '<input type="hidden" readonly="true"  style="border:none;" value="' + ville + '" name="tab_ressource[' + count_ressource + '][ville]" data="ville' + count_ressource + '" />',
            '<span class="selectCommune' + count_ressource + ' mx-2">' + $('.selectCommune option:selected').text() + '</span>' + $('#selectCommune option:selected').text() + '<input type="hidden" readonly="true"  style="border:none;" value="' + commune + '" name="tab_ressource[' + count_ressource + '][commune]" data="commune' + count_ressource + '" />',
            '<span class="selectQuartier' + count_ressource + ' mx-2">' + $('.selectQuartier option:selected').text() + '</span>' + $('#selectQuartier option:selected').text() + '<input type="hidden" readonly="true"  style="border:none;" value="' + s_quartier + '" name="tab_ressource[' + count_ressource + '][s_quartier]" data="s_quartier' + count_ressource + '" />',
            '<span class="mode_facturation' + count_ressource + ' mx-2">' + $('.mode_facturation option:selected').text() + '</span>' + $('#mode_facturation option:selected').text() + '<input type="hidden" readonly="true"  style="border:none;" value="' + facturation + '" name="tab_ressource[' + count_ressource + '][facturation]" data="mode_facturation' + count_ressource + '" />',
            '<span class="total_produit' + count_ressource + ' mx-2">' + total_produit_val + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" class="t_total_produit_val" value="' + total_produit_val + '" name="tab_ressource[' + count_ressource + '][total_produit]" data="total_produit' + count_ressource + '" />',
            '<span class="total_charge_ressource' + count_ressource + ' mx-2">' + $('#total_charge_ressource').val() + '<input type="hidden" readonly="true" class="t_total_charge" style="border:none;" value="' + total_charge_ressource + '" name="tab_ressource[' + count_ressource + '][total_charge_ressource]" data="total_charge_ressource' + count_ressource + '" />',
            '<span class="d-flex justify-content-center"> <a href="#" data="' + count_ressource + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete_ressource" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>',
            '<input type="hidden" readonly="true" class="t_montant_boq" style="border:none;" value="' + cout_mission + '" name="tab_ressource[' + count_ressource + '][cout_mission]" data="cout_mission' + count_ressource + '" />',
            // '<span class="d-flex justify-content-center"> <a href="#" data="' + count_ressource + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete_ressource" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>',

          ]
          t.row.add(tab_produit)
          t.draw();
          cal_tableau_total();
          $('.tableR tr td:first-child').hide();

          $('#duree_ressource').val("");
          $('#date_debut_ressource').val("");
          $('#date_fin_ressource').val("");
          $('#cout_ressource').val("");
          $('#cout_mission_ressource').val("");
          $('#cout_frais_mission_ressource').val("");
          $('#frais_mission_ressource').val("");
          $('#frais_envoi_ressource').val("");
          $('#travel').val("");
          $('#cout_recharge_ressource').val("");
          $('#total_charge_ressource').val("");
          $('#profil').val("");
          $('#selectUser').val("");
          $('#mission_ressource').val("");
          $('#departement').val("");
          $('#selectService').val("");
          $('#ville').val("");
          $('#selectCommune').val("");
          $('#selectQuartier').val("");
          $('#equipe_ressource').val("");

          // push data in a object array for Touré Abdoul Junior
          const obj = { id: user, nom: Window.superviseur };
          $('.superviseur').append('<option data-id="'+profil+'" data-profil="'+$('#profil option:selected').text()+'" value="' + obj.id + '" >' + obj.nom + '</option>');

          if (count_ressource == 1) {
            datePlusAnterieure = date_debut_ressource;
            dateMoinsAnterieure = date_fin_ressource;
          }

          if (date_debut_ressource > datePlusAnterieure) {
                datePlusAnterieure = date_debut_ressource;
          }
          if (date_fin_ressource > dateMoinsAnterieure) {
                dateMoinsAnterieure = date_fin_ressource;
          }

            console.log('count = '+count_ressource+' date+ = '+datePlusAnterieure+' date- = '+dateMoinsAnterieure);

        $('.debut_cout_revient_rh').text(date_debut_ressource);
        $('.debut_cout_revient_rh').val(date_debut_ressource);
        $('.Fin_cout_revient_rh').text(dateMoinsAnterieure);
        $('.Fin_cout_revient_rh').val(dateMoinsAnterieure);

        var difference = differenceEnJours(date_debut_ressource, dateMoinsAnterieure);

        $('.duree_cout_revient_rh').text(difference);
        $('.duree_cout_revient_rh').val(difference);
        count_ressource++;
        // }

      }
    }

    // synthèse
    var total_produit= $('.total_produit_r').text();
    var total_charge_r= $('.total_charge_r').text();
    var total_charge_l= $('.mtn_tcharg').text();
    var total_charge_o= $('#total_outil').text();

    $('.synthese_produit').text(formatMoneyJs(total_produit));
    $('.synthese_produit').val(enleverEspaces(total_produit));

    $('.cout_revient_ressouce_rh').text(formatMoneyJs(total_charge_r));
    $('.cout_revient_ressouce_rh').val(enleverEspaces(total_charge_r));
    $('.cout_revient_materiel').text(formatMoneyJs(total_charge_l));
    $('.cout_revient_materiel').val(enleverEspaces(total_charge_l));
    $('.travail_outils').text(formatMoneyJs(total_charge_o));
    $('.travail_outils').val(enleverEspaces(total_charge_o));

    // recuperation du total des produits
    var total_cout_revient =0;
    $('#example .som').each(function(){
        if($(this).html() != 0)
        total_cout_revient += +$(this).html().replace(/\s/g,'');
      })

    $('.total_cout_revient').text(formatMoneyJs(total_cout_revient));
    $('.synthese_charge').text(formatMoneyJs(total_cout_revient)); //charge
    $('.synthese_charge').val(enleverEspaces(total_cout_revient)); //charge

    var marge = parseInt(enleverEspaces(total_produit)) - parseInt(enleverEspaces(total_cout_revient));
    $('.synthese_marge').text(formatMoneyJs(marge)); //marge
    $('.synthese_marge').val(marge); //marge
    let pourcent = (marge/total_cout_revient) * 100;
    $('.synthese_marge_pourcent').text(Math.ceil(pourcent)); //marge %
    $('.synthese_marge_pourcent').val(Math.ceil(pourcent)); //marge %

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
        // suppression de la ressource dans la tab logistique
        $('.superviseur option[value=' + ligne + ']').remove();

        let table = $('.tableR').DataTable();
        table.row($(this).parents('tr'))
          .remove()
          .draw();

        // suppression de la ressource humaine
        cal_tableau_total();
      }
    });

    // vider les champs
      $('#duree_ressource').val("");
      $('#date_debut_ressource').val("");
      $('#date_fin_ressource').val("");
      $('#cout_ressource').val("");
      $('#cout_mission_ressource').val("");
      $('#cout_frais_mission_ressource').val("");
      $('#frais_mission_ressource').val("");
      $('#frais_envoi_ressource').val("");
      $('#cout_recharge_ressource').val("");
      $('#total_charge_ressource').val("");
      $('#profil').val("");
      $('#selectUser').val("");
      $('#mission_ressource').val("");
      $('#departement').val("");
      $('#selectService').val("");
      $('#ville').val("");
      $('#selectCommune').val("");
      $('#selectQuartier').val("");
      $('#equipe_ressource').val("");

  });

// modification
$(document).on('click', '#edit_r', function () {

    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $('input[id=duree_ressource]').val($('input[data=duree_ressource' + ligne + ']').val());
    $('input[id=date_debut_ressource]').val($('input[data=date_debut_ressource' + ligne + ']').val());
    $('input[id=date_fin_ressource]').val($('input[data=date_fin_ressource' + ligne + ']').val());
    $('input[id=cout_ressource]').val($('input[data=cout_ressource' + ligne + ']').val());
    $('input[id=cout_mission_ressource]').val($('input[data=cout_mission_ressource' + ligne + ']').val());
    $('input[id=cout_frais_mission_ressource]').val($('input[data=cout_frais_mission_ressource' + ligne + ']').val());
    $('input[id=frais_mission_ressource]').val($('input[data=frais_mission_ressource' + ligne + ']').val());
    $('input[id=frais_envoi_ressource]').val($('input[data=frais_envoi_ressource' + ligne + ']').val());
    $('input[id=cout_recharge_ressource]').val($('input[data=cout_recharge_ressource' + ligne + ']').val());
    $('input[id=total_charge_ressource]').val($('input[data=total_charge_ressource' + ligne + ']').val());

    $('#profil option[value="' + $('input[data=profil' + ligne + ']').val() + '"]').prop('selected', true);
    $('#selectUser option[value="' + $('input[data=user' + ligne + ']').val() + '"]').prop('selected', true);
    $('#mission_ressource option[value="' + $('input[data=mission_ressource' + ligne + ']').val() + '"]').prop('selected', true);
    $('#departement option[value="' + $('input[data=departement' + ligne + ']').val() + '"]').prop('selected', true);
    $('#selectService option[value="' + $('input[data=service' + ligne + ']').val() + '"]').prop('selected', true);
    $('#ville option[value="' + $('input[data=ville' + ligne + ']').val() + '"]').prop('selected', true);
    $('#selectCommune option[value="' + $('input[data=commune' + ligne + ']').val() + '"]').prop('selected', true);
    $('#selectQuartier option[value="' + $('input[data=s_quartier' + ligne + ']').val() + '"]').prop('selected', true);
    $('#equipe_ressource option[value="' + $('input[data=equipe_ressource' + ligne + ']').val() + '"]').prop('selected', true);

  });

// function de formattage des montants
function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
// libellé equipe
async function equipe() {
const config = {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}
await this.axios
    .get(getBaseURL() + "api/v1/commercial/get_equipe", config)
    .then((response) => {
        this.data = response.data.data;
       $('.id_eqp_ressource').val(this.data.id);
       $('.lib_eqp_ressource').val(this.data.libelle_fr);
       $('.id_eqp_logistique').val(this.data.id);
       $('.lib_eqp_logistique').val(this.data.libelle_fr);
       $('.id_eqp_outils').val(this.data.id);
       $('.lib_eqp_outils').val(this.data.libelle_fr);
    })
    .catch((error) => {
    });
}
async function missions() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/commercial/get_mission", config)
        .then((response) => {
            this.data = response.data.data;

            $.each(this.data, function (i, d) {
                if (langue == "en") {
                    $("#mission_ressource").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#mission_ressource").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
}
async function departement() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/commercial/departements", config)
        .then((response) => {
            data = response.data.data;

            $.each(data, function (i, d) {
                if (langue == "en") {
                    $("#departement").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#departement").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
}
// Récuperation des pays
function getService(organisation_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commercial/departements/' + organisation_id, config)
        .then(function (response) {
            data = response.data.departements.services;
            $.each(data, function (i, d) {
                if (langue == "en") {
                    $("#selectService").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#selectService").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des pays
function getProfil() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/profil/all', config)
        .then(function (response) {
            data = response.data.data;
            $("#profil").append("<option value=''> Veuillez selectionner</option>");
            $.each(data, function (i, d) {
                if (langue == "en") {
                    $("#profil").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#profil").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des pays
function getUser(service_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/show_by_profil/' + service_id, config)
        .then(function (response) {
            data = response.data.data;
            $("#profil").append("<option value=''> Veuillez selectionner</option>");
            $.each(data, function (i, d) {
                $("#profil").append(
                    "<option value='" + d.id + "'>" + d.nom + " " + d.prenom + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des pays
function getCommune(ville_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commune/' + ville_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#selectCommune").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des commune
function getCommune1(ville_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commune/' + ville_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#commune_trajet_depart1").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des commune
function getCommune2(ville_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commune/' + ville_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#commune_trajet_arrive1").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des commune
function getCommune3(ville_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commune/' + ville_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#commune_trajet_depart2").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des commune
function getCommune4(ville_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commune/' + ville_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#commune_trajet_arrive2").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Récuperation des quartiers
function getQuartier1(commune_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/quartier/' + commune_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#quartier_trajet_depart1").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getQuartier2(commune_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/quartier/' + commune_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#quartier_trajet_arrive1").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getQuartier3(commune_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/quartier/' + commune_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#quartier_trajet_depart2").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getQuartier4(commune_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/quartier/' + commune_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#quartier_trajet_arrive2").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Récuperation des villes
function ville() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/villes', config)
        .then(function (response) {
            data = response.data.data;
            $("#ville, #ville_trajet_depart1, #ville_trajet_arrive1, #ville_trajet_depart2, #ville_trajet_arrive2").append("<option value=''> Veuillez selectionner</option>");
            $.each(data, function (i, d) {
                $("#ville, #ville_trajet_depart1, #ville_trajet_arrive1, #ville_trajet_depart2, #ville_trajet_arrive2").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des commune
function getQuartier(commune_id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/quartier/' + commune_id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#selectQuartier").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des fournisseurs
function vehicules(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/vehicule/categorie/'+id, config)
        .then(function (response) {
            data = response.data;
            $.each(data, function (i, d) {
                $("#vehicule").append(
                    "<option value='" + d.id + "'>" + d.libelle + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des fournisseurs
function getTypeVehicules(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/vehicule/'+id, config)
        .then(function (response) {
            let kilometre = $('#kilometre').val();

            data = response.data.data;
            if(data.setting != null){
                $('#type_carburant').val(data.setting.libelle_fr);
                $('#montant_carburant').val(175 * kilometre); // data.setting.valeur
                $('#prix_unitaire').val(data.montant);
                calculerMontant(data.montant, window.duree_logistque);
                window.montant = data.montant;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
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
                $("#fournisseur").append(
                    "<option value='" + d.id + "'>" + d.raison_sociale + "</option>"
                );
            });
            $.each(data, function (i, d) {
                $("#IFO_outil").append(
                    "<option value='" + d.id + "'>" + d.raison_sociale + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des types vehicules
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
                $("#type_vehicule").append(
                    "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des outils
function outils(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/get_outils/'+id, config)
        .then(function (response) {
            data = response.data.data;
            // $('#outils').empty();
            if (langue == "en") {
                $("#mode_facturation").append("<option value=''>Please select</option>");
            } else {
                $("#mode_facturation").append("<option value=''>Veuillez selectionner</option>");
            }
            $.each(data, function (i, d) {
                $("#outils").append(
                    "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation du Prix untaire de l'outil
function outilsPu(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/outils/'+id, config)
        .then(function (response) {
            data = response.data.data;
            $('#MTN_outil').val(data.montant);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function get_entreprise_boq(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/boqs/'+id, config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#entreprise_id").append(
                    "<option value='" + d.id_entreprise + "'>" + d.sigle_entreprise + "</option>"
                );
            });
            $.each(data, function (i, d) {
                $("#zone_id").append(
                    "<option value='" + d.id_zone + "'>" + d.zone_lfr + "</option>"
                );
            });
            $('.montant_boq').text(data[0].montant);
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
    axios.get(getBaseURL() + 'api/v1/commercial/get_mode_facturation', config)
        .then(function (response) {
            data = response.data.data;
            if (langue == "en") {
                $("#mode_facturation").append("<option value=''>Please select</option>");
                $.each(data, function (i, d) {
                    $("#mode_facturation").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                });
            } else {
                $("#mode_facturation").append("<option value=''>Veuillez selectionner</option>");
                $.each(data, function (i, d) {
                    $("#mode_facturation").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Récuperation des fournisseurs
function type_outil() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commercial/type_outils', config)
        .then(function (response) {
            data = response.data.data;
            $.each(data, function (i, d) {
                $("#type_outil").append(
                    "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                );
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}
// total charge logistique
$('#frais_envoi, #peage').keyup(function () {
    var peage = parseFloat($('#peage').val()) || 0;
    var frais_envoi_logistqiue = parseFloat($('#frais_envoi').val()) || 0;
    var montant = parseFloat($('#montant').val()) || 0;
    var montant_carburant = parseFloat($('#montant_carburant').val()) || 0;

    $('#total_charge_logistique').val(peage + frais_envoi_logistqiue + montant_carburant + montant);
  });

$('#peage').keyup(function () {
    var peage = parseFloat($('#peage').val()) || 0;
    var montant_carburant = parseFloat($('#montant_carburant').val()) || 0;

    var frais_envoi= (peage + montant_carburant) * 0.023; // 0.023 => 2.3%

    $('#frais_envoi').val(frais_envoi);
  });

function calculerMontant(montantInitial, dureeLogistique) {
    var montant = parseInt(montantInitial) * dureeLogistique;
    $('#montant').val(montant);
}

  $(document).on('change', '#IUT_outil', function () {
    $('#IPO_outil').val($(this).data('profil'));
  });

  $(document).on('change', '#DDT_outil', function () {
    showDelay($('#DDT_outil').val(), $('#DFN_outil').val(), "#DMI_outil");
    calculMontantOutil();
  });

  $(document).on('change', '#DFN_outil', function () {
    showDelay($('#DDT_outil').val(), $('#DFN_outil').val(), "#DMI_outil");
    calculMontantOutil();
  });

  $(document).on('keyup', '#FEV_outil', function () {
    calculMontantOutil();
  });

  function calculMontantOutil() {
    var dmi_outil = parseInt($('#DMI_outil').val());
    var mtn_outil = parseInt($("#MTN_outil").val());
    var fev_outil = parseInt($("#FEV_outil").val());
    $("#TTL_outil").val((dmi_outil * mtn_outil) + fev_outil);
    $("#CMI_outil").val(dmi_outil * mtn_outil);
  }

  function showDelay(date_debut, date_fin, id_chp_duree) {
    var date1 = new Date(date_debut);
    var date2 = new Date(date_fin);

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (date2 < date1) {
      $(".add-row").prop('disabled', true);
      Swal.fire({
        title: langue = 'fr' ? 'Veuillez choisir des dates correctes.' : 'Please choose correct dates.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      $("#DMI_outil").val('');
    } else {
      $("#DMI_outil").val(diffDays);
    }
  }

  function viderChampOutil() {
    $('#EQP_outil').val("");
    $('#type_outil').val("");
    $('#outils').val("");
    $('#IFO_outil').val("");
    $('#DDT_outil').val("");
    $('#DFN_outil').val("");
    $('#DMI_outil').val("");
    $('#MTN_outil').val("");
    $('#CMI_outil').val("");
    $('#FEV_outil').val("");
    $('#IUT_outil').val("");
    $('#IPO_outil').val("");
    $('#TTL_outil').val("");
  }

  function viderChampLogistique() {
    $('#numuq_eqp_logistique').val("");
    $('#id_eqp_logistique').val("");
    $('#type_outil').val("");
    $('.type_vehicule').val("");
    $('.fournisseur').val("");
    $('.vehicule').val("");
    $('.date_debut_logistique').val("");
    $('.date_fin_logistique').val("");
    $('.durees').val("");
    $('.prix_unitaire').val("");
    $('.montant').val("");
    $('.superviseur').val("");
    $('.type_carburant').val("");
    $('.montant_carburant').val("");
    $('.kilometre').val("");
    $('.frais_envoi').val("");
    $('.peage').val("");
    $('.total_charge_logistique').val("");
  }

  var countOutil = 1;
  $(document).on('click', '#addRowOutil', function (e) {
    e.preventDefault();

    var datePlusAnterieure= '';
    var dateMoinsAnterieure= '';

    if ($('#DMI_outil').val() === '') {
      $(".addRowOutil").prop('disabled', true);
      Swal.fire({
        title: langue = 'fr' ? 'Veuillez selectionner une periode valide' : 'Please select a valid period',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } else {
      ///Logique d'ajout des lignes
      var equipeOutil = $('#EQP_outil option:selected').val();
      var textEquipeOutil = $('#EQP_outil option:selected').text();
      var nbreEquipeOutil = $('#EQP_outil option:selected').data("nbre");
      var typeOutil = $('#type_outil option:selected').text();
      var typeIdOutil = $('#type_outil option:selected').val();
      var outil = $('#outils option:selected').text();
      var outilId = $('#outils option:selected').val();
      var fournisseurOutil = $('#IFO_outil option:selected').text();
      var fournisseurIdOutil = $('#IFO_outil option:selected').val();
      var dateDebutOutil = $('#DDT_outil').val();
      var dateFinOutil = $('#DFN_outil').val();
      var dateMissionOutil = $('#DMI_outil').val();
      var montantOutil = $('#MTN_outil').val();
      var coutMissionOutil = $('#CMI_outil').val();
      var fraisOutil = $('#FEV_outil').val();
      var userOutil = $('#IUT_outil').val();
      var profilOutil = $('#IUT_outil').data("id");
      var totalCharge = $('#TTL_outil').val();

      var id = $('input[id=ligne]').val();

      if (id !== '') {
        $('input[data=id' + id + ']').val($('input[id=ressource]').val());
        $('input[data=EQP_outil' + id + ']').val(equipeOutil);
        $('input[data=NEQ_outil' + id + ']').val(nbreEquipeOutil);
        $('input[data=type_outil' + id + ']').val(typeIdOutil);
        $('input[data=outils' + id + ']').val(outilId);
        $('input[data=IFO_outil' + id + ']').val(fournisseurIdOutil);
        $('input[data=DDT_outil' + id + ']').val(dateDebutOutil);
        $('input[data=DFN_outil' + id + ']').val(dateFinOutil);
        $('input[data=DMI_outil' + id + ']').val(dateMissionOutil);
        $('input[data=MTN_outil' + id + ']').val(montantOutil);
        $('input[data=CMI_outil' + id + ']').val(coutMissionOutil);
        $('input[data=FEV_outil' + id + ']').val(fraisOutil);
        $('input[data=IUT_outil' + id + ']').val(userOutil);
        $('input[data=IPO_outil' + id + ']').val(profilOutil);
        $('input[data=TTL_outil' + id + ']').val(totalCharge);

        $('#EQP_outil' + id).text(textEquipeOutil);
        $('#type_outil' + id).text(typeOutil);
        $('#outils' + id).text(outil);
        $('#IFO_outil' + id).text(fournisseurOutil);
        $('#DDT_outil' + id).text(dateDebutOutil);
        $('#DFN_outil' + id).text(dateFinOutil);
        $('#DMI_outil' + id).text(dateMissionOutil);
        $('#MTN_outil' + id).text(montantOutil);
        $('#CMI_outil' + id).text(coutMissionOutil);
        $('#FEV_outil' + id).text(fraisOutil);
        $('#IUT_outil' + id).text(userOutil);
        $('#IPO_outil' + id).text(profilOutil);
        $('#TTL_outil' + id).text(totalCharge);

        sommeTotal();

        viderChampOutil()
        $('#addRowOutil').text(document.querySelector('input[class="cst_langue"]').value == "en" ? 'Add' : 'Ajouter');
      } else {
        var t = $('.tableOutil').DataTable();
        var tab_outil = [
        //   '<input type="hidden" class="cacher" style="border:none;" value="' + countOutil + '"  data="id' + countOutil + '"/>',
          '<span id="EQP_outil' + countOutil + '">' + textEquipeOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + nbreEquipeOutil + '" name="tab_outil[' + countOutil + '][NEQ_outil]" data="NEQ_outil' + countOutil + '" /><input type="hidden" readonly="true"  style="border:none;" value="' + equipeOutil + '" name="tab_outil[' + countOutil + '][EQP_outil]" data="EQP_outil' + countOutil + '" />',
          '<span id="type_outil' + countOutil + '">' + typeOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + typeIdOutil + '" name="tab_outil[' + countOutil + '][type_outil]" data="type_outil' + countOutil + '" />',
          '<span id="outils' + countOutil + '">' + outil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + outilId + '" name="tab_outil[' + countOutil + '][outils]" data="outils' + countOutil + '" />',
          '<span id="IFO_outil' + countOutil + '">' + fournisseurOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + fournisseurIdOutil + '" name="tab_outil[' + countOutil + '][IFO_outil]" data="IFO_outil' + countOutil + '" />',
          '<span id="DDT_outil' + countOutil + '">' + dateDebutOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + dateDebutOutil + '" name="tab_outil[' + countOutil + '][DDT_outil]" data="DDT_outil' + countOutil + '" />',
          '<span id="DFN_outil' + countOutil + '">' + dateFinOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + dateFinOutil + '" name="tab_outil[' + countOutil + '][DFN_outil]" data="DFN_outil' + countOutil + '" />',
          '<span class="DMI_outil" id="DMI_outil' + countOutil + '">' + dateMissionOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + dateMissionOutil + '" name="tab_outil[' + countOutil + '][DMI_outil]" data="DMI_outil' + countOutil + '" />',
          '<span class="MTN_outil" id="MTN_outil' + countOutil + '">' + montantOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + montantOutil + '" name="tab_outil[' + countOutil + '][MTN_outil]" data="MTN_outil' + countOutil + '" />',
          '<span class="CMI_outil" id="CMI_outil' + countOutil + '">' + coutMissionOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + coutMissionOutil + '" name="tab_outil[' + countOutil + '][CMI_outil]" data="CMI_outil' + countOutil + '" />',
          '<span class="FEV_outil" id="FEV_outil' + countOutil + '">' + fraisOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + fraisOutil + '" name="tab_outil[' + countOutil + '][FEV_outil]" data="FEV_outil' + countOutil + '" />',
          '<span id="IUT_outil' + countOutil + '">' + $('#IUT_outil option:selected').text() + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + userOutil + '" name="tab_outil[' + countOutil + '][IUT_outil]" data="IUT_outil' + countOutil + '" />',
        //   '<span id="IPO_outil' + countOutil + '">' + profilOutil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + profilOutil + '" name="tab_outil[' + countOutil + '][IPO_outil]" data="IPO_outil' + countOutil + '" />',
          '<span class="TTL_outil" id="TTL_outil' + countOutil + '">' + totalCharge + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + totalCharge + '" name="tab_outil[' + countOutil + '][TTL_outil]" data="TTL_outil' + countOutil + '" />',
          '<a href="#" data="' + countOutil + '"><i class="flaticon-delete" id="deleteOutil" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
        ]
        t.row.add(tab_outil);

        t.draw();
        viderChampOutil();

        if (countOutil == 1) {
          $('.tableOutil tfoot').html('<tr id="tfooter"><th class="thead colwhite">&nbsp;&nbsp;Total</th><td colspan="6"></td><td id="montant_outil">0</td><td id="outils">0</td><td id="frais_outil">0</td><td></td><td id="total_outil">0</td><td></td></tr>');
        }

        sommeTotal();

        //Section cout de revient
        if (countOutil == 1) {
            datePlusAnterieure = dateDebutOutil;
            dateMoinsAnterieure = dateFinOutil;
          }

          if (dateDebutOutil < datePlusAnterieure) {
              datePlusAnterieure = dateDebutOutil;
          }
          if (dateFinOutil > dateMoinsAnterieure) {
            dateMoinsAnterieure = dateFinOutil;
          }

        $('.debut_cout_revient_outil').text(dateDebutOutil);
        $('.debut_cout_revient_outil').val(dateDebutOutil);
        $('.Fin_cout_revient_outil').text(dateMoinsAnterieure);
        $('.Fin_cout_revient_outil').val(dateMoinsAnterieure);

        var difference = differenceEnJours(dateDebutOutil, dateMoinsAnterieure);
        $('.duree_cout_revient_outil').text(difference);
        $('.duree_cout_revient_outil').val(difference);

       // synthèse
        var total_produit= $('.total_produit_r').text();
        var total_charge_r= $('.total_charge_r').text();
        var total_charge_l= $('.mtn_tcharg').text();
        var total_charge_o= $('#total_outil').text();

        $('.synthese_produit').text(formatMoneyJs(total_produit));
        $('.synthese_produit').val(enleverEspaces(total_produit));

        $('.cout_revient_ressouce_rh').text(formatMoneyJs(total_charge_r));
        $('.cout_revient_materiel').text(formatMoneyJs(total_charge_l));
        $('.cout_revient_materiel').val(enleverEspaces(total_charge_l));
        $('.travail_outils').text(formatMoneyJs(total_charge_o));
        $('.travail_outils').val(enleverEspaces(total_charge_o));

        // recuperation du total des produits
        var total_cout_revient =0;
        $('#example .som').each(function(){
            if($(this).html() != 0)
            total_cout_revient += +$(this).html().replace(/\s/g,'');
        })

        $('.total_cout_revient').text(formatMoneyJs(total_cout_revient));
        $('.synthese_charge').text(formatMoneyJs(total_cout_revient)); //charge
        $('.synthese_charge').val(enleverEspaces(total_cout_revient)); //charge

        var marge = parseInt(enleverEspaces(total_produit)) - parseInt(enleverEspaces(total_cout_revient));
        $('.synthese_marge').text(formatMoneyJs(marge)); //marge
        $('.synthese_marge').val(marge); //marge
        let pourcent = (marge/total_cout_revient) * 100;
        $('.synthese_marge_pourcent').text(Math.ceil(pourcent)); //marge %
        $('.synthese_marge_pourcent').val(Math.ceil(pourcent)); //marge %

        countOutil++;
        $(".btn_submit").prop('disabled', false);

      }
    }
  });

  //modification
  $(document).on('click', '#editOutil', function () {

    $('#addRowOutil').text(document.querySelector('input[class="cst_langue"]').value == "en" ? 'Edit' : 'Modifier');

    let ligne = $(this).attr('data');

    $('input[id=ligne]').val(ligne);

    var info_equip = $('input[data=NEQ_outil' + ligne + ']').data('equipe');

    $('#EQP_outil option[data-nbre="' + $('input[data=NEQ_outil' + ligne + ']').val() + '"]').prop('selected', true)
    $('#type_outil option[value="' + $('input[data=type_outil' + ligne + ']').val() + '"]').prop('selected', true)
    $('#outils option[value="' + $('input[data=outils' + ligne + ']').val() + '"]').prop('selected', true)
    $('#IFO_outil option[value="' + $('input[data=IFO_outil' + ligne + ']').val() + '"]').prop('selected', true)
    $('#DDT_outil').val($('input[data=DDT_outil' + ligne + ']').val());
    $('#DFN_outil').val($('input[data=DFN_outil' + ligne + ']').val());
    $('#DMI_outil').val($('input[data=DMI_outil' + ligne + ']').val());
    $('#MTN_outil').val($('input[data=MTN_outil' + ligne + ']').val());
    $('#CMI_outil').val($('input[data=CMI_outil' + ligne + ']').val());
    $('#FEV_outil').val($('input[data=FEV_outil' + ligne + ']').val());
    $('#IUT_outil').val($('input[data=IUT_outil' + ligne + ']').val());
    $('#IPO_outil').val($('input[data=IPO_outil' + ligne + ']').val());
    $('#TTL_outil').val($('input[data=TTL_outil' + ligne + ']').val());
  });

  //suppression
  $(document).on('click', '#deleteOutil', function () {
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
        // $($(this).closest("tr")).remove().draw();
        var table = $('.tableOutil').DataTable();
        table.row($(this).parents('tr'))
          .remove()
          .draw();
        sommeTotal();
      }
    });

  });

  function sommeTotal() {
    var DMI_outil = 0;
    $('.tableOutil .DMI_outil').each(function () {
      DMI_outil += +$(this).text() || 0;
    });

    var CMI_outil = 0;
    $('.tableOutil .CMI_outil').each(function () {
      CMI_outil += +$(this).text() || 0;
    });

    var MTN_outil = 0;
    $('.tableOutil .MTN_outil').each(function () {
      MTN_outil += +$(this).text() || 0;
    });

    var FEV_outil = 0;
    $('.tableOutil .FEV_outil').each(function () {
      FEV_outil += +$(this).text() || 0;
    });

    var TTL_outil = 0;
    $('.tableOutil .TTL_outil').each(function () {
      TTL_outil += +$(this).text() || 0;
    });

    $('.tableOutil #montant_outil').text(MTN_outil);
    $('.tableOutil #outils').text(CMI_outil);
    $('.tableOutil #frais_outil').text(FEV_outil);
    $('.tableOutil #total_outil').text(TTL_outil);
  }

// Logistique
function date_formatter(type, valeur) {

    if (type == 0) {
      var fmt_date = valeur.split("/");
      return valeur;
    } else {

      var fmt_date = valeur.split("-");
      var dd = '';
      var mm = '';
      var yyyy = fmt_date[0];
      dd = fmt_date[2];
      mm = fmt_date[1];
      if (dd == undefined) return '';
      else return dd + '/' + mm + '/' + yyyy;

    }
  }

  function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  var count_lg = 1;

  $(document).on('change', '.equipe_logistique', function (e) {
    e.preventDefault();
    var v_equipe = $('#equipe_logistique option:selected').text();

    var get_arr_eqp = v_equipe.split(" ");
    $('.numuq_eqp_logistique').val(get_arr_eqp[1].trim());
  });




  //Ajouter produits dans la liste
  $(document).on('click', '#add-ligne', function (e) {
    e.preventDefault();

    var datePlusAnterieure= '';
    var dateMoinsAnterieure= '';

    var id_eqp = $('.id_eqp_logistique').val();
    var lib_eqp = $('.lib_eqp_logistique').val();
    var numuq_eqp = $('.numuq_eqp_logistique').val();
    var type_vehicule = $('.type_vehicule').val();
    var fournisseur = $('.fournisseur').val();
    var vehicule = $('.vehicule').val();
    var date_debut = $('.date_debut_logistique').val();
    var date_fin = $('.date_fin_logistique').val();
    var durees = $('.durees').val();
    var prix_unitaire = $('.prix_unitaire').val();
    var montant = $('.montant').val();
    var superviseur = $('.superviseur').val();
    var type_carburant = $('.type_carburant').val();
    var montant_carburant = $('.montant_carburant').val();
    var kilometre = $('.kilometre').val();
    var frais_envoi = $('.frais_envoi').val();
    var peage = $('.peage').val();
    var total_charge = $('.total_charge_logistique').val();

    var ville_1 = $('#ville_trajet_depart1').val();
    var commune1 = $('#commune_trajet_depart1').val();
    var quartier1 = $('#quartier_trajet_depart1').val();

    var ville_2 = $('#ville_trajet_arrive1').val();
    var commune2 = $('#commune_trajet_arrive1').val();
    var quartier2 = $('#quartier_trajet_arrive1').val();

    var ville_3 = $('#ville_trajet_depart2').val();
    var commune3 = $('#commune_trajet_depart2').val();
    var quartier3 = $('#quartier_trajet_depart2').val();

    var ville_4 = $('#ville_trajet_arrive2').val();
    var commune4 = $('#commune_trajet_arrive2').val();
    var quartier4 = $('#quartier_trajet_arrive2').val();


      var id = $('input[id=ligne]').val();

      if (id !== '') {

        $('input[data=id' + id + ']').val($('input[id=ressource]').val());

         //equipe
         $('input[data="numuq_eqp_ressource' + id + '"]').val($('input[class=numuq_eqp_ressource]').val());
         numuq_eqp_ressource = $('input[class=numuq_eqp_ressource]').val();
         $('span[class="equipe_list_ressource' + id + ' mx-2"]').text(numuq_eqp_ressource);

        $('input[data=date_debut_ressource' + id + ']').val($('input[id=date_debut_ressource]').val());
        $('span[class="date_debut_ressource' + id + ' mx-2"]').text(date_formatter(1, $('#date_debut_ressource').val()));

        $('input[data=date_fin_ressource' + id + ']').val($('input[id=date_fin_ressource]').val());
        $('span[class="date_fin_ressource' + id + ' mx-2"]').text(date_formatter(1, $('#date_fin_ressource').val()));

        $('input[data=cout_ressource' + id + ']').val($('input[id=cout_ressource]').val());
        $('span[class="cout_ressource' + id + ' mx-2"]').text($('#cout_ressource').val());

        $('input[data=cout_mission_ressource' + id + ']').val($('input[id=cout_mission_ressource]').val());
        $('span[class="cout_mission_ressource_list' + id + ' mx-2"]').text($('#cout_mission_ressource').val());

        $('input[data=cout_frais_mission_ressource' + id + ']').val($('input[id=cout_frais_mission_ressource]').val());
        $('span[class="cout_frais_mission_ressource' + id + ' mx-2"]').text($('#cout_frais_mission_ressource').val());

        $('input[data=frais_mission_ressource' + id + ']').val($('input[id=frais_mission_ressource]').val());
        $('span[class="frais_mission_ressource' + id + ' mx-2"]').text($('#frais_mission_ressource').val());

        $('input[data=frais_envoi_ressource' + id + ']').val($('input[id=frais_envoi_ressource]').val());
        $('span[class="frais_envoi_ressource' + id + ' mx-2"]').text($('#frais_envoi_ressource').val());

        $('input[data=cout_recharge_ressource' + id + ']').val($('input[id=cout_recharge_ressource]').val());
        $('span[class="cout_recharge_ressource' + id + ' mx-2"]').text($('#cout_recharge_ressource').val());

        // $('input[data="equipe_ressource' + id + '"]').val($('input[class=numuq_eqp_ressource]').val());
        // $('input[data="equipe_ressource' + id + '"]').val($('#equipe_ressource option:selected').val());
        // $('span[class="equipe_ressource' + id + ' mx-2"]').text($('#equipe_ressource option:selected').text());

        $('input[data="mission_ressource' + id + '"]').val($('#mission_ressource option:selected').val());
        $('span[class="mission_ressource' + id + ' mx-2"]').text($('#mission_ressource option:selected').text());

        $('input[data="departement' + id + '"]').val($('#departement option:selected').val());
        $('span[class="departement' + id + ' mx-2"]').text($('#departement option:selected').text());

        $('input[data="selectService' + id + '"]').val($('#selectService option:selected').val());
        $('span[class="selectService' + id + ' mx-2"]').text($('#selectService option:selected').text());

        $('input[data="selectUser' + id + '"]').val($('#selectUser option:selected').val());
        $('span[class="selectUser' + id + ' mx-2"]').text($('#selectUser option:selected').text());

        $('input[data="ville' + id + '"]').val($('#ville option:selected').val());
        $('span[class="ville' + id + ' mx-2"]').text($('#ville option:selected').text());

        $('input[data="profil' + id + '"]').val($('#profil option:selected').val());
        $('span[class="profil_list' + id + ' mx-2"]').text($('#profil option:selected').text());

        $('#duree_ressource').val("");
        $('#date_debut_ressource').val("");
        $('#date_fin_ressource').val("");
        $('#cout_ressource').val("");
        $('#cout_mission_ressource').val("");
        $('#cout_frais_mission_ressource').val("");
        $('#frais_mission_ressource').val("");
        $('#frais_envoi_ressource').val("");
        $('#cout_recharge_ressource').val("");
        $('#total_charge_ressource').val("");
        $('#profil').val("");
        $('#selectUser').val("");
        $('#mission_ressource').val("");
        $('#departement').val("");
        $('#selectService').val("");
        $('#ville').val("");
        $('#selectCommune').val("");
        $('#selectQuartier').val("");
        $('#equipe_ressource').val("");

      } else {

        var t = $('.tableLogistique').DataTable();
        var tab_logistique = [
        // '<input type="hidden" class="cacher" style="border:none;" value="' + count_lg + '"  data="id' + count_lg + '"/>',
        lib_eqp.concat(" ", '<span style="white-space:nowrap" class="equipe_list' + count_lg + ' mx-2">' + numuq_eqp + '</span>') + '<input type="hidden" class="name_equipe" data-equipe="' + lib_eqp.concat("|", "<span class='equipe_list" + count_lg + "'>" + numuq_eqp + "</span>") + '"  readonly="true"  style="border:none;" value="' + id_eqp + '" name="tab_logistique[' + count_lg + '][id_eqp]" data="id_eqp' + count_lg + '" /> <input type="hidden" readonly="true"  style="border:none;" value="' + numuq_eqp + '" name="tab_logistique[' + count_lg + '][numuq_eqp]" data="numuq_eqp' + count_lg + '" />',
        '<span style="white-space:nowrap" class="type_vehicule_list' + count_lg + ' mx-2">' + $('.type_vehicule option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + type_vehicule + '" name="tab_logistique[' + count_lg + '][type_vehicule]" data="type_vehicule' + count_lg + '" />',
        '<span style="white-space:nowrap" class="fournisseur_list' + count_lg + ' mx-2">' + $('.fournisseur option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + fournisseur + '" name="tab_logistique[' + count_lg + '][fournisseur]" data="fournisseur' + count_lg + '" />',
        '<span style="white-space:nowrap" class="vehicule_list' + count_lg + ' mx-2">' + $('.vehicule option:selected').text() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + vehicule + '" name="tab_logistique[' + count_lg + '][vehicule]" data="vehicule' + count_lg + '" />',
        '<span style="white-space:nowrap" class="date_debut_list' + count_lg + ' mx-3 ">' + $('.date_debut_logistique').val() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + date_debut + '" name="tab_logistique[' + count_lg + '][date_debut]" data="date_debut' + count_lg + '" />  ',
        '<span style="white-space:nowrap" class="date_fin_list' + count_lg + ' mx-2">' +  $('.date_fin_logistique').val() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + date_fin + '" name="tab_logistique[' + count_lg + '][date_fin]" data="date_fin' + count_lg + '" />',
        '<span style="white-space:nowrap" class="durees_list' + count_lg + ' mx-3">' + $('.durees').val() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + durees + '" name="tab_logistique[' + count_lg + '][durees]" data="durees' + count_lg + '" />',
        '<span style="white-space:nowrap" class="prix_unitaire_list' + count_lg + '">' + $('.prix_unitaire').val() + '</span>' + '<input type="hidden" class="t_pu_lg" readonly="true"  style="border:none;" value="' + prix_unitaire + '" name="tab_logistique[' + count_lg + '][prix_unitaire]" data="prix_unitaire' + count_lg + '" />',
        '<span style="white-space:nowrap" class="montant_list' + count_lg + ' mx-2">' + $('.montant').val() + '</span>' + '<input type="hidden" readonly="true" class="t_mtn_lg"  style="border:none;" value="' + montant + '" name="tab_logistique[' + count_lg + '][montant]" data="montant' + count_lg + '" />',
        '<span style="white-space:nowrap" class="superviseur_list' + count_lg + ' mx-2">' + $('#superviseur option:selected').text() + '</span>' + '<input type="hidden" readonly="hidden"  style="border:none;" value="' + superviseur + '" name="tab_logistique[' + count_lg + '][superviseur]" data="superviseur' + count_lg + '" />',
        '<span style="white-space:nowrap" class="type_carburant_list' + count_lg + ' mx-2">' + $('.type_carburant').val() + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + type_carburant + '" name="tab_logistique[' + count_lg + '][type_carburant]" data="type_carburant' + count_lg + '" />',
        '<span style="white-space:nowrap" class="montant_carburant_list' + count_lg + ' mx-2">' + $('.montant_carburant').val() + '</span>' + '<input type="hidden"  readonly="true" class="t_carb"  style="border:none;" value="' + montant_carburant + '" name="tab_logistique[' + count_lg + '][montant_carburant]" data="montant_carburant' + count_lg + '" />',
        '<span style="white-space:nowrap" class="kilometre_list' + count_lg + ' mx-2">' + $('.kilometre').val() + '</span>' + '<input type="hidden" readonly="true" class="kilo" style="border:none;" value="' + kilometre + '" name="tab_logistique[' + count_lg + '][kilometre]" data="kilometre' + count_lg + '" />',
        '<span style="white-space:nowrap" class="frais_envoi_list' + count_lg + ' mx-2">' + $('.frais_envoi').val() + '</span>' + '<input type="hidden" readonly="true" class="t_frais_env"  style="border:none;" value="' + frais_envoi + '" name="tab_logistique[' + count_lg + '][frais_envoi]" data="frais_envoi' + count_lg + '" />',
        '<span style="white-space:nowrap" class="peage_list' + count_lg + ' mx-2">' + $('.peage').val() + '</span>' + '<input type="hidden" readonly="true" class="t_mpeage"  style="border:none;" value="' + peage + '" name="tab_logistique[' + count_lg + '][peage]" data="peage' + count_lg + '" />',
        // '<span style="white-space:nowrap" class="ville_1_list' + count_lg + ' mx-2">' + $('.ville_trajet_depart1 option:selected').text() + "/" + $('.commune_trajet_depart1 option:selected').text() + "/" + $('.quartier_trajet_depart1 option:selected').text() + '</span>' + '<input type="hidden" readonly="true"   data-aldep="' + $('.ville_trajet_depart1 option:selected').val().concat("|", $('.commune_trajet_depart1 option:selected').val()).concat("|", $('.quartier_trajet_depart1 option:selected').val()) + '"    style="border:none;" value="' + ($('.quartier_trajet_depart1 option:selected').val()) + '" name="tab_logistique[' + count_lg + '][ville_trajet_depart1]" data="ville_trajet_depart1' + count_lg + '" />',
        // '<span style="white-space:nowrap" class="ville_2_list' + count_lg + ' mx-2">' + $('.ville_trajet_arrive1 option:selected').text() + "/" + $('.commune_trajet_arrive1 option:selected').text() + "/" + $('.quartier_trajet_arrive1 option:selected').text() + '</span>' + '<input type="hidden" readonly="true"   data-alarriv="' + $('.ville_trajet_arrive1 option:selected').val().concat("|", $('.commune_trajet_arrive1 option:selected').val()).concat("|", $('.quartier_trajet_arrive1 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_arrive1 option:selected').val()) + '" name="tab_logistique[' + count_lg + '][ville_trajet_arrive1]" data="ville_trajet_arrive1' + count_lg + '" />',
        // '<span style="white-space:nowrap" class="ville_3_list' + count_lg + ' mx-2">' + $('.ville_trajet_depart2 option:selected').text() + "/" + $('.commune_trajet_depart1 option:selected').text() + "/" + $('.quartier_trajet_depart1 option:selected').text() + '</span>' + '<input type="hidden"   data-retdep="' + $('.ville_trajet_depart2 option:selected').val().concat("|", $('.commune_trajet_depart2 option:selected').val()).concat("|", $('.quartier_trajet_depart2 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_depart2 option:selected').val()) + '" name="tab_logistique[' + count_lg + '][ville_trajet_depart2]" data="ville_trajet_depart2' + count_lg + '" />',
        // '<span style="white-space:nowrap" class="ville_4_list' + count_lg + ' mx-2">' + $('.ville_trajet_arrive2 option:selected').text() + "/" + $('.commune_trajet_arrive2 option:selected').text() + "/" + $('.quartier_trajet_arrive2 option:selected').text() + '</span>' + '<input type="hidden" readonly="true"   data-retarriv="' + $('.ville_trajet_arrive2 option:selected').val().concat("|", $('.commune_trajet_arrive2 option:selected').val()).concat("|", $('.quartier_trajet_arrive2 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_arrive2 option:selected').val()) + '" name="tab_logistique[' + count_lg + '][ville_trajet_arrive2]" data="ville_trajet_arrive2' + count_lg + '" />',
        '<span style="white-space:nowrap" class="total_charge_list' + count_lg + ' mx-2">' + $('.total_charge_logistique').val() + '</span>' + '<input type="hidden" readonly="true" class="t_mcharge"  style="border:none;" value="' + total_charge + '" name="tab_logistique[' + count_lg + '][total_charge]" data="total_charge' + count_lg + '" />',
        '<span class="d-flex justify-content-center"> <a href="#" data="' + count_lg + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>'
        ]
        t.row.add(tab_logistique);
        t.draw();
        cal_tableau_logistique();
        //Cacher le premier element du tableau
        //Vider les champs
        viderChampLogistique();

        //Section cout de revient
        if (count_lg == 1) {
            datePlusAnterieure = date_debut;
            dateMoinsAnterieure = date_fin;
          }

          if (date_debut < datePlusAnterieure) {
              datePlusAnterieure = date_debut;
          }
          if (date_fin > dateMoinsAnterieure) {
            dateMoinsAnterieure = date_fin;
          }

        $('.debut_cout_revient_mat').text(date_debut);
        $('.debut_cout_revient_mat').val(date_debut);
        $('.Fin_cout_revient_mat').text(dateMoinsAnterieure);
        $('.Fin_cout_revient_mat').val(dateMoinsAnterieure);

        var difference = differenceEnJours(date_debut, dateMoinsAnterieure);
        $('.duree_cout_revient_mat').text(difference);
        $('.duree_cout_revient_mat').val(difference);

        let kilometreSynt = $('.t_kilometre').text();
        $('.km_cout_revient_mat').text(kilometreSynt);
        $('.km_cout_revient_mat').val(kilometreSynt);

        let mont_carb = $('.mtn_carb').text();
        $('.cout_revient_carburant').text(mont_carb);

        // synthèse
        var total_produit= $('.total_produit_r').text();
        var total_charge_r= $('.total_charge_r').text();
        var total_charge_l= $('.mtn_tcharg').text();
        var total_charge_o= $('#total_outil').text();

        $('.synthese_produit').text(formatMoneyJs(total_produit));
        $('.synthese_produit').val(enleverEspaces(total_produit));

        $('.cout_revient_ressouce_rh').text(formatMoneyJs(total_charge_r));
        $('.cout_revient_materiel').text(formatMoneyJs(total_charge_l));
        $('.cout_revient_materiel').val(enleverEspaces(total_charge_l));
        $('.travail_outils').text(formatMoneyJs(total_charge_o));
        $('.travail_outils').val(enleverEspaces(total_charge_o));

        // recuperation du total des produits
        var total_cout_revient =0;
        $('#example .som').each(function(){
            if($(this).html() != 0)
            total_cout_revient += +$(this).html().replace(/\s/g,'');
        })

        $('.total_cout_revient').text(formatMoneyJs(total_cout_revient));
        $('.synthese_charge').text(formatMoneyJs(total_cout_revient)); //charge
        $('.synthese_charge').val(enleverEspaces(total_cout_revient)); //charge

        var marge = parseInt(enleverEspaces(total_produit)) - parseInt(enleverEspaces(total_cout_revient));
        $('.synthese_marge').text(formatMoneyJs(marge)); //marge
        $('.synthese_marge').val(marge); //marge
        let pourcent = (marge/total_cout_revient) * 100;
        $('.synthese_marge_pourcent').text(Math.ceil(pourcent)); //marge %
        $('.synthese_marge_pourcent').val(Math.ceil(pourcent)); //marge %

        count_lg++;

    }
  });

  //suppression
  $(document).on('click', '#delete', function () {
    Swal.fire({
      // title: 'Are you sure?',
      text: langue == "en" ? "Do you want to delete this line ?" : "Voulez-vous supprimer cette ligne ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#4D6194',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        let ligne = $(this).attr('data');
        // $($(this).closest("tr")).remove().draw();
        var table = $('.tableLogistique').DataTable();
        table.row($(this).parents('tr'))
          .remove()
          .draw();
          cal_tableau_logistique();
      }
    });

  });


  //modification
  $(document).on('click', '#edit', function () {

    $('#add-ligne').text(document.querySelector('input[class="cst_langue"]').value == "en" ? 'Edit' : 'Modifier');
    let ligne = $(this).attr('data');

    $('input[id=ligne]').val(ligne);
    //equipe
    var info_equip = $('input[data=id_eqp' + ligne + ']').data('equipe');
    var tab_equipe = info_equip.split("|");

    //  alert($('input[class=numuq_eqp]').val());
    $('input[class=lib_eqp]').val(tab_equipe[0]);
    $('input[class=numuq_eqp]').val($('input[class=numuq_eqp]').val());
    $("#equipe_logistique option").filter(function () {
      return this.text == tab_equipe[0] + ' ' + $('input[class=numuq_eqp]').val();
    }).prop('selected', true);
    $('#type_vehicule option[value="' + $('input[data=type_vehicule' + ligne + ']').val() + '"]').prop('selected', true);
    //type vehicule && fournisseur && vehicule
    var type_vehicule = $('input[data=type_vehicule' + ligne + ']').val();
    var fourn_id = $('input[data=fournisseur' + ligne + ']').val();
    var vehicule_id = $('input[data=vehicule' + ligne + ']').val();
    //appel des fournisseurs en fonction du type de véhicule
    // appel des vehicules en fonction des fournisseurs
    get_fournisseurs(type_vehicule, fourn_id, vehicule_id);

    //les champs normaux

    $('input[id=date_debut]').val(date_formatter(0, $('input[data=date_debut' + ligne + ']').val()));
    $('input[id=date_fin]').val(date_formatter(0, $('input[data=date_fin' + ligne + ']').val()));
    $('input[id=durees]').val($('input[data=durees' + ligne + ']').val());
    $('input[id=prix_unitaire]').val($('input[data=prix_unitaire' + ligne + ']').val());
    $('input[id=montant]').val($('input[data=montant' + ligne + ']').val());
    $('input[id=kilometre]').val($('input[data=kilometre' + ligne + ']').val());
    $('input[id=frais_envoi]').val($('input[data=frais_envoi' + ligne + ']').val());
    $('input[id=peage]').val($('input[data=peage' + ligne + ']').val());
    $('input[id=total_charge]').val($('input[data=total_charge' + ligne + ']').val());
    $('input[id=type_carburant]').val($('input[data=type_carburant' + ligne + ']').val());
    $('input[id=montant_carburant]').val($('input[data=montant_carburant' + ligne + ']').val());
    $('#superviseur option[value="' + $('input[data=superviseur' + ligne + ']').val() + '"]').prop('selected', true);
    //
    //traitement trajet-aller-depart
    var info_aldep1 = $('input[data=ville_1' + ligne + ']').data('aldep');
    var tab_aldep1 = info_aldep1.split("|");
    $('#ville_trajet1 option[value="' + tab_aldep1[0] + '"]').prop('selected', true);
    get_commune(tab_aldep1[0], tab_aldep1[1], 1);
    get_quartier(tab_aldep1[1], tab_aldep1[2], 1);
    //
    //traitement trajet-aller-arrive
    var info_alarriv2 = $('input[data=ville_2' + ligne + ']').data('alarriv');
    var tab_alarriv2 = info_alarriv2.split("|");
    $('#ville_trajet2 option[value="' + tab_alarriv2[0] + '"]').prop('selected', true);
    get_commune(tab_alarriv2[0], tab_alarriv2[1], 2);
    get_quartier(tab_alarriv2[1], tab_alarriv2[2], 2);
    //
    //traitement trajet-retour-depart
    var info_retdep3 = $('input[data=ville_3' + ligne + ']').data('retdep');
    var tab_retdep3 = info_retdep3.split("|");
    $('#ville_trajet3 option[value="' + tab_retdep3[0] + '"]').prop('selected', true);
    get_commune(tab_retdep3[0], tab_retdep3[1], 3);
    get_quartier(tab_retdep3[1], tab_retdep3[2], 3);
    //
    //traitement trajet-retour-arrive
    var info_retarriv4 = $('input[data=ville_4' + ligne + ']').data('retarriv');
    var tab_retarriv4 = info_retarriv4.split("|");
    $('#ville_trajet4 option[value="' + tab_retarriv4[0] + '"]').prop('selected', true);
    get_commune(tab_retarriv4[0], tab_retarriv4[1], 4);
    get_quartier(tab_retarriv4[1], tab_retarriv4[2], 4);

  });


  function viderChamp() {
    $('input[id=durees]').val(0);
    $('input[id=prix_unitaire]').val(0);
    $('input[id=montant]').val(0);
    $('input[id=kilometre]').val(0);
    $('input[id=frais_envoi]').val(0);
    $('input[id=peage]').val(0);
    $('input[id=total_charge]').val(0);
    $('input[id=date_debut]').val('');
    $('input[id=date_fin]').val('');
    $('input[id=total_charge]').val(0);
    $('input[id=type_carburant]').val('');
    $('input[id=montant_carburant]').val(0);
    $('#ligne').val('');
    $('#add-ligne').text(document.querySelector('input[class="cst_langue"]').value == "en" ? 'Add' : 'Ajouter');
  }

  function checkDoubleSup(superviseur) {
    // alert(count_lg);
    for (let index = 0; index <= count_lg; index++) {
      if(index  != parseInt($('#ligne').val() )){
        if ($('input[data=superviseur' + index + ']').val() === superviseur) {
              return true;
        }
      }
    }
  }


//FONCTION DE CALCUL DES MONTANTS
function cal_tableau_logistique(){

var t_pu = 0;
var pu_amount = 0;

var t_kilo = 0;
var t_amount_kilo = 0;

var t_mtn = 0;
var _amount = 0;

var t_carburant=0;
var t_amount_carb=0;

var t_frs_env=0;
var t_amount_frs=0;

var t_m_peage=0;
var t_amount_peage=0;

var t_m_charge=0;
var t_amount_charge=0;


$('.t_pu_lg').each(function(i,e){
    pu_amount=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_pu +=pu_amount;
});
$('.kilo').each(function(i,e){
    t_amount_kilo=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_kilo +=t_amount_kilo;
});
$('.t_kilometre').text(t_kilo);

$('.t_mtn_lg').each(function(i,e){
    _amount=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_mtn +=_amount;
});
$('.mtn_t').text(t_mtn);

$('.t_carb').each(function(i,e){
    t_amount_carb=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_carburant +=t_amount_carb;
});
$('.mtn_carb').text(t_carburant);

$('.t_frais_env').each(function(i,e){
    t_amount_frs=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_frs_env +=t_amount_frs;
});
$('.mtn_fenv').text(t_frs_env);

$('.t_mpeage').each(function(i,e){
    t_amount_peage=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_m_peage +=t_amount_peage;
});
$('.mtn_peage').text(t_m_peage);

$('.t_mcharge').each(function(i,e){
    t_amount_charge=parseFloat(parseInt($(this).val().replaceAll(/\s/g,'')))-0;
    t_m_charge +=t_amount_charge;
});
$('.mtn_tcharg').text(t_m_charge);
}


///CALCUL DE TOTAL CHARGE
function cal_logistique_total_charge(f_duree,f_pu,f_montant,f_mont_carb,f_frais_envoi,f_peage,f_total_charge){
    if(isNaN(f_duree))f_duree=0;
    if(isNaN(f_pu)) f_pu=0;
    if(isNaN(f_montant)) f_montant=0;
    if(isNaN(f_mont_carb)) f_mont_carb=0;
    if(isNaN(f_frais_envoi)) f_frais_envoi=0;
    if(isNaN(f_peage)) f_peage=0;
    if(isNaN(f_total_charge)) f_total_charge=0;

    f_montant= parseInt(f_duree)*parseInt(f_pu);
    f_total_charge= parseInt(f_montant)+parseInt(f_mont_carb)+parseInt(f_frais_envoi)+parseInt(f_peage);
    return {
        duree:f_duree,
        montant:f_montant,
        total_montant:f_total_charge
    }
}

// recupéreration des lignes
function ligneExistanteR(data){
    var t = $('.tableR').DataTable();
let numero = 1;
    $(data).each( function(count, item) {
        var tab_workorder = [
            '<span class="equipe_list_ressource' + count + ' mx-2">' + item.equipe.libelle_fr +' '+item.numero+ '</span>' + '<input type="hidden" class="name_equipe_ressource" data-equipe="' + item.equipe.id + '"  readonly="true"  style="border:none;" value="' + item.equipe.id + '" name="tab_ressource[' + count + '][id_eqp_ressource]" data="id_eqp_ressource' + count + '" /> <input type="hidden" readonly="true"  style="border:none;" value="' + item.numero + '" name="tab_ressource[' + count + '][nbreEquipe]" data="nbreEquipe' + count + '" />',
            '<span class="tdhead mission_ressource' + count + ' mx-2">' + item.mission.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.mission.id + '" name="tab_ressource[' + count + '][mission_ressource]" data="mission_ressource' + count + '" />',
            '<span class="departement' + count + ' mx-2">' + item.departement.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.departement_id + '" name="tab_ressource[' + count + '][departement]" data="departement' + count + '" />',
            '<span class="selectService' + count + ' mx-2">' + item.service.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.service_id + '" name="tab_ressource[' + count + '][service]" data="service' + count + '" />',
            '<span class="profil_list' + count + ' mx-2">' + item.profil.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.profil.id + '" name="tab_ressource[' + count + '][profil]" data="profil' + count + '" />',
            '<span class="selectUser' + count + ' mx-2">' +item.ressource.nom+' ' +item.ressource.prenom+ '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.ressource_id + '" name="tab_ressource[' + count + '][user]" data="user' + count + '" />',
            '<span class="date_debut_ressource' + count + ' mx-2">' + item.date_debut + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.date_debut + '" name="tab_ressource[' + count + '][date_debut_ressource]" data="date_debut_ressource' + count + '" />',
            '<span class="date_fin_ressource' + count + ' mx-2">' + item.date_fin + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.date_fin + '" name="tab_ressource[' + count + '][date_fin_ressource]" data="date_fin_ressource' + count + '" />',
            '<span class="duree_ressource' + count + ' mx-2">' + item.duree + '</span>'+ '<input type="hidden" readonly="true"  style="border:none;" value="' + item.duree + '" name="tab_ressource[' + count + '][duree_ressource]" data="duree_ressource' + count + '" />',
            '<span class="cout_ressource' + count + ' mx-2">' + item.cout_unitaire + '</span>'+ '<input type="hidden" readonly="true" class="t_cout_unit_res"  style="border:none;" value="' + item.cout_unitaire + '" name="tab_ressource[' + count + '][cout_ressource]" data="cout_ressource' + count + '" />',
            '<span class="cout_mission_ressource_list' + count + ' mx-2">' + item.cout_mission + '</span>'+ '<input type="hidden" readonly="true" class="t_cout_mission" style="border:none;" value="' + item.cout_mission + '" name="tab_ressource[' + count + '][cout_mission_ressource]" data="cout_mission_ressource' + count + '" />',
            '<span class="cout_frais_mission_ressource' + count + ' mx-2">' + item.prix_unitairefraismissionressource + '</span>'+ '<input type="hidden" readonly="true" class="t_frais_unit_mission" style="border:none;" value="' + item.prix_unitairefraismissionressource + '" name="tab_ressource[' + count + '][cout_frais_mission_ressource]" data="cout_frais_mission_ressource' + count + '" />',
            '<span class="frais_mission_ressource' + count + ' mx-2">' + item.frais + '</span>' + '<input type="hidden" readonly="true" class="t_frais_mission" style="border:none;" value="' + item.frais + '" name="tab_ressource[' + count + '][frais_mission_ressource]" data="frais_mission_ressource' + count + '" />',
            '<span class="cout_recharge_ressource' + count + ' mx-2">' + item.recharge + '</span>'+ '<input type="hidden" readonly="true" class="t_recharge" style="border:none;" value="' + item.recharge + '" name="tab_ressource[' + count + '][cout_recharge_ressource]" data="cout_recharge_ressource' + count + '" />',
            '<span class="frais_envoi_ressource' + count + ' mx-2">' + item.frais_envois + '</span>'+ '<input type="hidden" readonly="true" class="t_frais_envoi" style="border:none;" value="' + item.frais_envois + '" name="tab_ressource[' + count + '][frais_envoi_ressource]" data="frais_envoi_ressource' + count + '" />',
            '<span class="travel' + count + ' mx-2">' + item.prix_travel + '</span>'+ '<input type="hidden" readonly="true" class="t_travel" style="border:none;" value="' + item.prix_travel + '" name="tab_ressource[' + count + '][travel]" data="travel' + count + '" />',
            '<span class="ville' + count + ' mx-2">' + item.ville.libelle + '</span>'+ '<input type="hidden" readonly="true"  style="border:none;" value="' + item.ville_id + '" name="tab_ressource[' + count + '][ville]" data="ville' + count + '" />',
            '<span class="selectCommune' + count + ' mx-2">' + item.commune.libelle + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.commune_id + '" name="tab_ressource[' + count + '][commune]" data="commune' + count + '" />',
            '<span class="selectQuartier' + count + ' mx-2">' + item.s_quartier.libelle + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.s_quartier_id + '" name="tab_ressource[' + count + '][s_quartier]" data="s_quartier' + count + '" />',
            '<span class="mode_facturation' + count + ' mx-2">' + item.facturation.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.facturation_id + '" name="tab_ressource[' + count + '][facturation]" data="mode_facturation' + count + '" />',
            '<span class="total_produit' + count + ' mx-2">' + item.total_produit + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" class="t_total_produit_val" value="' + item.total_produit + '" name="tab_ressource[' + count + '][total_produit]" data="total_produit' + count + '" />',
            '<span class="total_charge_ressource' + count + ' mx-2">' + item.total_charge + '<input type="hidden" readonly="true" class="t_total_charge" style="border:none;" value="' + item.total_charge + '" name="tab_ressource[' + count + '][total_charge_ressource]" data="total_charge_ressource' + count + '" />',
            '<span class="d-flex justify-content-center"><a href="#" data="' + count + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete_ressource" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>',
            '<input type="hidden" readonly="true" class="t_montant_boq" style="border:none;" value="' + item.cout_mission + '" name="tab_ressource[' + count + '][cout_mission]" data="cout_mission' + count + '" />',
        ]
        t.row.add(tab_workorder),
        numero++;
    });
    t.draw();
    cal_tableau_total();
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableauR() {
    var t = $('.tableR').DataTable();
    var tailleTableau = t.rows().count();
    count_ressource = count_ressource + tailleTableau;
}

// recupéreration des lignes produits
function ligneExistanteL(data){
    var t = $('.tableLogistique').DataTable();
let numero = 1;
    $(data).each( function(count, item) {
        var tab_workorder = [
            '<span style="white-space:nowrap" class="equipe_list' + count + ' mx-2">' +item.equipe.libelle_fr +' '+ item.numero + '</span>' + '<input type="hidden" class="name_equipe" data-equipe="' + item.equipe.id + '"  readonly="true"  style="border:none;" value="' + item.equipe.id + '" name="tab_logistique[' + count + '][id_eqp]" data="id_eqp' + count + '" /> <input type="hidden" readonly="true"  style="border:none;" value="' + item.numero + '" name="tab_logistique[' + count + '][numuq_eqp]" data="numuq_eqp' + count + '" />',
            '<span style="white-space:nowrap" class="type_vehicule_list' + count + ' mx-2">' + item.type_vehicule.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.type_vehicule.id + '" name="tab_logistique[' + count + '][type_vehicule]" data="type_vehicule' + count + '" />',
            '<span style="white-space:nowrap" class="fournisseur_list' + count + ' mx-2">' + item.fournisseur.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.fournisseur_id + '" name="tab_logistique[' + count + '][fournisseur]" data="fournisseur' + count + '" />',
            '<span style="white-space:nowrap" class="vehicule_list' + count + ' mx-2">' + item.vehicule.libelle_fr + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.vehicule_id + '" name="tab_logistique[' + count + '][vehicule]" data="vehicule' + count + '" />',
            '<span style="white-space:nowrap" class="date_debut_list' + count + ' mx-3 ">' + item.date_debut + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.date_debut + '" name="tab_logistique[' + count + '][date_debut]" data="date_debut' + count + '" />  ',
            '<span style="white-space:nowrap" class="date_fin_list' + count + ' mx-2">' +  item.date_fin + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.date_fin + '" name="tab_logistique[' + count + '][date_fin]" data="date_fin' + count + '" />',
            '<span style="white-space:nowrap" class="durees_list' + count + ' mx-3">' + item.duree + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.duree + '" name="tab_logistique[' + count + '][durees]" data="durees' + count + '" />',
            '<span style="white-space:nowrap" class="prix_unitaire_list' + count + '">' + item.cout_unitaire + '</span>' + '<input type="hidden" class="t_pu_lg" readonly="true"  style="border:none;" value="' + item.cout_unitaire + '" name="tab_logistique[' + count + '][prix_unitaire]" data="prix_unitaire' + count + '" />',
            '<span style="white-space:nowrap" class="montant_list' + count + ' mx-2">' + item.montant_mat_roulant + '</span>' + '<input type="hidden" readonly="true" class="t_mtn_lg"  style="border:none;" value="' + item.montant_mat_roulant + '" name="tab_logistique[' + count + '][montant]" data="montant' + count + '" />',
            '<span style="white-space:nowrap" class="superviseur_list' + count + ' mx-2">' + item.user.nom +' ' +item.user.nom+ '</span>' + '<input type="hidden" readonly="hidden"  style="border:none;" value="' + item.user_id + '" name="tab_logistique[' + count + '][superviseur]" data="superviseur' + count + '" />',
            '<span style="white-space:nowrap" class="type_carburant_list' + count + ' mx-2">' + item.type_carburant + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" value="' + item.type_carburant + '" name="tab_logistique[' + count + '][type_carburant]" data="type_carburant' + count + '" />',
            '<span style="white-space:nowrap" class="montant_carburant_list' + count + ' mx-2">' + item.montant_carburant + '</span>' + '<input type="hidden"  readonly="true" class="t_carb"  style="border:none;" value="' + item.montant_carburant + '" name="tab_logistique[' + count + '][montant_carburant]" data="montant_carburant' + count + '" />',
            '<span style="white-space:nowrap" class="kilometre_list' + count + ' mx-2">' + item.kilometre + '</span>' + '<input type="hidden" readonly="true"  style="border:none;" class="kilo" value="' + item.kilometre + '" name="tab_logistique[' + count + '][kilometre]" data="kilometre' + count + '" />',
            '<span style="white-space:nowrap" class="frais_envoi_list' + count + ' mx-2">' + item.frais_envois + '</span>' + '<input type="hidden" readonly="true" class="t_frais_env"  style="border:none;" value="' + item.frais_envois + '" name="tab_logistique[' + count + '][frais_envoi]" data="frais_envoi' + count + '" />',
            '<span style="white-space:nowrap" class="peage_list' + count + ' mx-2">' + item.peage + '</span>' + '<input type="hidden" readonly="true" class="t_mpeage"  style="border:none;" value="' + item.peage + '" name="tab_logistique[' + count + '][peage]" data="peage' + count + '" />',
            // '<span style="white-space:nowrap" class="ville_1_list' + count + ' mx-2">' + item.lieu_departaller + "/" + item.lieu_departaller + "/" + item.lieu_departaller + '</span>' + '<input type="hidden" readonly="true"   data-aldep="' + $('.ville_trajet_depart1 option:selected').val().concat("|", $('.commune_trajet_depart1 option:selected').val()).concat("|", $('.quartier_trajet_depart1 option:selected').val()) + '"    style="border:none;" value="' + ($('.quartier_trajet_depart1 option:selected').val()) + '" name="tab_logistique[' + count + '][ville_trajet_depart1]" data="ville_trajet_depart1' + count + '" />',
            // '<span style="white-space:nowrap" class="ville_2_list' + count + ' mx-2">' + item.lieu_departretour + "/" + item.lieu_departretour + "/" + item.lieu_departretour + '</span>' + '<input type="hidden" readonly="true"   data-alarriv="' + $('.ville_trajet_arrive1 option:selected').val().concat("|", $('.commune_trajet_arrive1 option:selected').val()).concat("|", $('.quartier_trajet_arrive1 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_arrive1 option:selected').val()) + '" name="tab_logistique[' + count + '][ville_trajet_arrive1]" data="ville_trajet_arrive1' + count + '" />',
            // '<span style="white-space:nowrap" class="ville_3_list' + count + ' mx-2">' + item.lieu_arriveraller + "/" + item.lieu_arriveraller + "/" + item.lieu_arriveraller + '</span>' + '<input type="hidden"   data-retdep="' + $('.ville_trajet_depart2 option:selected').val().concat("|", $('.commune_trajet_depart2 option:selected').val()).concat("|", $('.quartier_trajet_depart2 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_depart2 option:selected').val()) + '" name="tab_logistique[' + count + '][ville_trajet_depart2]" data="ville_trajet_depart2' + count + '" />',
            // '<span style="white-space:nowrap" class="ville_4_list' + count + ' mx-2">' + item.lieu_arriverretour + "/" + item.lieu_departretour + "/" + item.lieu_departretour + '</span>' + '<input type="hidden" readonly="true"   data-retarriv="' + $('.ville_trajet_arrive2 option:selected').val().concat("|", $('.commune_trajet_arrive2 option:selected').val()).concat("|", $('.quartier_trajet_arrive2 option:selected').val()) + '"  style="border:none;" value="' + ($('.quartier_trajet_arrive2 option:selected').val()) + '" name="tab_logistique[' + count + '][ville_trajet_arrive2]" data="ville_trajet_arrive2' + count + '" />',
            '<span style="white-space:nowrap" class="total_charge_list' + count + ' mx-2">' + item.total_charge + '</span>' + '<input type="hidden" readonly="true" class="t_mcharge"  style="border:none;" value="' + item.total_charge + '" name="tab_logistique[' + count + '][total_charge]" data="total_charge' + count + '" />',
            '<span class="d-flex justify-content-center"> <a href="#" data="' + count + '" class="my-1 mx-1"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a> <span>'
        ]
        t.row.add(tab_workorder),
        numero++;
    });
    t.draw();
    cal_tableau_logistique();
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableauL() {
    var t = $('.tableLogistique').DataTable();
    var tailleTableau = t.rows().count();
    count_lg = count_lg + tailleTableau;
}

// recupéreration des lignes produits
function ligneExistanteO(data){
    var t = $('.tableOutil').DataTable();
let numero = 1;
    $(data).each( function(count, item) {

        var tab_workorder = [
            '<span id="EQP_outil' + count + '">' + item.equipe.libelle_fr +' '+ item.numero + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.numero + '" name="tab_outil[' + count + '][NEQ_outil]" data="NEQ_outil' + count + '" /><input type="hidden" readonly="true"  style="border:none;" value="' + item.equipe.id + '" name="tab_outil[' + count + '][EQP_outil]" data="EQP_outil' + count + '" />',
            '<span id="type_outil' + count + '">' + item.type_outil.libelle_fr + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.type_outil.id + '" name="tab_outil[' + count + '][type_outil]" data="type_outil' + count + '" />',
            '<span id="outils' + count + '">' + item.outil.libelle_fr + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.outil_id + '" name="tab_outil[' + count + '][outils]" data="outils' + count + '" />',
            '<span id="IFO_outil' + count + '">' + item.fournisseur_outil.libelle_fr + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.fournisseur_outil.id + '" name="tab_outil[' + count + '][IFO_outil]" data="IFO_outil' + count + '" />',
            '<span id="DDT_outil' + count + '">' + item.date_debut + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.date_debut + '" name="tab_outil[' + count + '][DDT_outil]" data="DDT_outil' + count + '" />',
            '<span id="DFN_outil' + count + '">' + item.date_fin + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.date_fin + '" name="tab_outil[' + count + '][DFN_outil]" data="DFN_outil' + count + '" />',
            '<span class="DMI_outil" id="DMI_outil' + count + '">' + item.duree + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.duree + '" name="tab_outil[' + count + '][DMI_outil]" data="DMI_outil' + count + '" />',
            '<span class="MTN_outil" id="MTN_outil' + count + '">' + item.cout_unitaire + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.cout_unitaire + '" name="tab_outil[' + count + '][MTN_outil]" data="MTN_outil' + count + '" />',
            '<span class="CMI_outil" id="CMI_outil' + count + '">' + item.cout_mission + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.cout_mission + '" name="tab_outil[' + count + '][CMI_outil]" data="CMI_outil' + count + '" />',
            '<span class="FEV_outil" id="FEV_outil' + count + '">' + item.frais_envois + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.frais_envois + '" name="tab_outil[' + count + '][FEV_outil]" data="FEV_outil' + count + '" />',
            '<span id="IUT_outil' + count + '">' + item.user.nom +' '+ item.user.prenom + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.user_id + '" name="tab_outil[' + count + '][IUT_outil]" data="IUT_outil' + count + '" />',
          //   '<span id="IPO_outil' + count + '">' + item.profil + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.profil + '" name="tab_outil[' + count + '][IPO_outil]" data="IPO_outil' + count + '" />',
            '<span class="TTL_outil" id="TTL_outil' + count + '">' + item.total_charge + '</span><input type="hidden" readonly="true"  style="border:none;" value="' + item.total_charge + '" name="tab_outil[' + count + '][TTL_outil]" data="TTL_outil' + count + '" />',
            '<a href="#" data="' + count + '"><i class="flaticon-delete" id="deleteOutil" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
        ]
        t.row.add(tab_workorder),
        numero++;
    });
    t.draw();

    $('.tableOutil tfoot').html('<tr id="tfooter"><th class="thead colwhite">&nbsp;&nbsp;Total</th><td colspan="6"></td><td id="montant_outil">0</td><td id="outils">0</td><td id="frais_outil">0</td><td></td><td id="total_outil">0</td><td></td></tr>');

    sommeTotal();
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableauO() {
    var t = $('.tableOutil').DataTable();
    var tailleTableau = t.rows().count();
    countOutil = countOutil + tailleTableau;
}

