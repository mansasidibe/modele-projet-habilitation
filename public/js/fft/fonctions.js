// $(".add-equipe").prop('disabled', true);
// $(".btn_submit").prop('disabled', true);

// soumission du formulaire
const createFft = async () =>{
    if(token) {
        try {
            const response = await axios.post(getBaseURL() + 'api/v1/commercial/fiche-fin-travaux', new FormData(document.getElementById("add-form")), {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});
        if (response.status == 200) return response;
        }catch (error) {
            console.log(error);
        }
    }
}

const update_fft = async (id) =>{
    if(token) {
        try {
            const response = await axios.put(getBaseURL() + 'api/v1/commercial/fiche-fin-travaux/'+id, new FormData(document.getElementById("add-form")), {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});
        if (response.status == 200) return response;
        }catch (error) {
            console.log(error);
        }
    }
}

// synthese
$('#phase').keyup(function () {
    var phase_synthese = $('#phase').val();
    $('#phase_synthese').val(phase_synthese);
  });

$('#date_debut').on('change', function(){
    let date_debut = $('#date_debut').val();
    $('#date_debut_synthese').val(date_debut);
});
$('#date_fin').on('change', function(){
    let date_fin = $('#date_fin').val();
    $('#date_fin_synthese').val(date_fin);
});

$('#nb_site_realises, #nb_site_a_realiser').keyup(function () {
    var nb_site_a_realiser = $('#nb_site_a_realiser').val() || 0;
    var nb_site_realises = $('#nb_site_realises').val() || 0;
    var nb_site_restant = nb_site_a_realiser - nb_site_realises;
    $('#nb_site_restant').val(nb_site_restant);
  });

$('input[name="periode"]').daterangepicker({
    opens: 'left',
    locale: {
        format: 'YYYY-MM-DD',
        separator: ' au ',
        applyLabel: 'Appliquer',
        cancelLabel: 'Annuler',
        weekLabel: 'S',
        daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        monthNames: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        firstDay: 1
    }
}, function(start, end) {
    $('#periode_synthese').val(start.format('YYYY-MM-DD') + ' au ' + end.format('YYYY-MM-DD'));
    console.log(start.format('YYYY-MM-DD') + ' au ' + end.format('YYYY-MM-DD'));
});

// Recuperation des données client
const list_client = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/tiers',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des client
list_client().then(
    response => {
        $(response).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.raison_sociale+'</option>');
            $('#client').append(option);
        });
    }
);

// Recuperation des données works orders validés
const list_workorders = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/commercial/workorders-valide',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des works orders validés
list_workorders().then(
    response => {
        $(response.data).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.nom_projet+'</option>');
            $('#projet').append(option);
        });
    }
);

const get_workorder = async (id) => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/commercial/workorders-valide/'+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

$('#projet').on('change', function(){
    let id = $('#projet').val();
    let projet_synthese = $('#projet option:selected').text();
    $('#projet_synthese').val(projet_synthese);
    get_workorder(id).then(
        response => {
            $('#num_workorder').val(response.data.reference);
            $('#client').val(response.data.proforma.client.raison_sociale);
            $('#client_synthese').val(response.data.proforma.client.raison_sociale);
        }
    );
});

// Recuperation des données ressource
const list_ressource = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/users',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des ressource
list_ressource().then(
    response => {
        $(response).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.nom+' '+item.prenom+'</option>');
            $('#chef_equipe, #selectUser').append(option);
        });
    }
);

// Recuperation des données ressource
const profil = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/categorie_slug/TZN',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des ressource
profil().then(
    response => {
        $(response).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.libelle_fr+'</option>');
            $('#profil').append(option);
        });
    }
);

// Recuperation des données ressource
const zone = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/categorie_slug/TZN',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des ressource
zone().then(
    response => {
        $(response).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.niveau+'</option>');
            $('#zone').append(option);
        });
    }
);

// Recuperation des données ressource
const fournisseur = async () => {
    if(token) {
        try {
        const response = await axios.get(getBaseURL() + 'api/v1/fournisseurs',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}
// appel des ressource
fournisseur().then(
    response => {
        $(response).each( function(index, item) {
            var option = $('<option value="'+ item.id+'">'+item.raison_sociale+'</option>');
            $('#fournisseur').append(option);
        });
    }
);


// ligne
function viderChamps(){
    $('#profil').val('');
    $('#selectUser').val('');
    $('#zone').val('');
    $('#fournisseur').val('');
    $('#date_depart_fft').val('');
    $('#date_fin_fft').val('');
    $('#date_mission').val('');
    $('#immatriculation').val('');
    $('#contact').val('');
    $('#chauffeur').val('');
    $('#distance').val('');
}

let count = 0;
let count_control = 0;
//Ajouter produits dans la liste
$(document).on('click','#add-equipe',function(e){
    e.preventDefault();

    if($('#profil').val() =='' && $('#zone').val() == ''){
        $(".add-equipe").prop('disabled', true);
        Swal.fire({
            title: langue='fr' ? 'Veuillez remplir les champs obligatoires':'Please select one product',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
    }else{
        $(".add-equipe").prop('disabled', false);
        ///Logique d'ajout des lignes
         var profil=$('#profil').val();
         var user=$('#selectUser').val();
         var zone=$('#zone').val();
         var fournisseur=$('#fournisseur').val();
         var date_depart_fft=$('#date_depart_fft').val();
         var date_fin_fft=$('#date_fin_fft').val();
         var date_mission=$('#date_mission').val();
         var immatriculation=$('#immatriculation').val();
         var contact=$('#contact').val();
         var chauffeur=$('#chauffeur').val();
         var distance=$('#distance').val();
         var id = $('#ligne').val();

         if (id !== '') {
            $('input[data=profil' + id + ']').val(profil);
            $('span[id=profil' + id + ']').html(profil);
            $('input[data=user' + id + ']').val(user);
            $('span[id=user' + id + ']').html(user);
            $('input[data=zone' + id + ']').val(zone);
            $('span[id=zone' + id + ']').html(zone);
            $('input[data=fournisseur' + id + ']').val(fournisseur);
            $('span[id=fournisseur' + id + ']').html(fournisseur);
            $('input[data=date_depart_fft' + id + ']').val(date_depart_fft);
            $('span[id=date_depart_fft' + id + ']').html(date_depart_fft);
            $('input[data=date_fin_fft' + id + ']').val(date_fin_fft);
            $('span[id=date_fin_fft' + id + ']').html(date_fin_fft);
            $('input[data=date_mission' + id + ']').val(date_mission);
            $('span[id=date_mission' + id + ']').html(date_mission);
            $('input[data=immatriculation' + id + ']').val(immatriculation);
            $('span[id=immatriculation' + id + ']').html(immatriculation);
            $('input[data=contact' + id + ']').val(contact);
            $('span[id=contact' + id + ']').html(contact);
            $('input[data=chauffeur' + id + ']').val(chauffeur);
            $('span[id=chauffeur' + id + ']').html(chauffeur);
            $('input[data=distance' + id + ']').val(distance);
            $('span[id=distance' + id + ']').html(distance);
            viderChamps();

        } else {
            // ressource
            var t = $('.tableE').DataTable();
            var tab_equipe = [
                '<span id="profil' + count +'">' +$('#profil').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + profil +'" name="tab_equipe[' + count +'][profil]" data="profil' + count +'"/>',
                '<span id="profil' + count +'">' +$('#selectUser').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + user +'" name="tab_equipe[' + count +'][user]" data="user' + count +'"/>',
                '<span id="profil' + count +'">' +zone+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + zone +'" name="tab_equipe[' + count +'][zone]" data="zone' + count +'"/>',
                '<span id="profil' + count +'">' +date_depart_fft+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_depart_fft +'" name="tab_equipe[' + count +'][date_depart_fft]" data="date_depart_fft' + count +'"/>',
                '<span id="profil' + count +'">' +date_fin_fft+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_fin_fft +'" name="tab_equipe[' + count +'][date_fin_fft]" data="date_fin_fft' + count +'"/>',
                '<span id="profil' + count +'">' +date_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + date_mission +'" name="tab_equipe[' + count +'][date_mission]" data="date_mission' + count +'"/>',

                '<span id="profil' + count +'">' +$('#fournisseur').find(":selected").text()+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + fournisseur +'" name="tab_equipe[' + count +'][fournisseur]" data="fournisseur' + count +'"/>',
                '<span id="profil' + count +'">' +immatriculation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + immatriculation +'" name="tab_equipe[' + count +'][immatriculation]" data="immatriculation' + count +'"/>',
                '<span id="profil' + count +'">' +contact+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + contact +'" name="tab_equipe[' + count +'][contact]" data="contact' + count +'"/>',
                '<span id="profil' + count +'">' +chauffeur+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + chauffeur +'" name="tab_equipe[' + count +'][chauffeur]" data="chauffeur' + count +'"/>',
                '<span id="profil' + count +'">' +distance+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + distance +'" name="tab_equipe[' + count +'][distance]" data="distance' + count +'"/>',
                '<a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-equipe" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_equipe).draw();

            viderChamps();
            count++;

            $('#nb_equipes_synthese').val(t.rows().count());
            $('#nb_superviseurs_synthese').val(t.rows().count());
            $('#nb_vehicules_synthese').val(t.rows().count());
            $('#nb_riggers_synthese').val(t.rows().count());
        }

    }
});

//suppression equipe
$(document).on('click', '#delete-equipe', function() {
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
            var table = $('.tableE').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});


$(document).on('click','#add-controle',function(e){
    e.preventDefault();

    if($('#site').val() =='' && $('#valide_sans_reserve').val() == ''){
        $(".add-controle").prop('disabled', true);
        Swal.fire({
            title: langue='fr' ? 'Veuillez remplir les champs obligatoires':'Please select one product',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
    }else{
        $(".add-controle").prop('disabled', false);
        ///Logique d'ajout des lignes
         var site=$('#site').val();
         var valide_sans_reserve=$('#valide_sans_reserve').val();
         var accepte_avec_reserve=$('#accepte_avec_reserve').val();
         var refuse=$('#refuse').val();
         var date_depart_fft=$('#date_depart_fft').val();
         var id = $('#ligne').val();

         if (id !== '') {
            $('input[data=site' + id + ']').val(site);
            $('span[id=site' + id + ']').html(site);
            $('input[data=valide_sans_reserve' + id + ']').val(valide_sans_reserve);
            $('span[id=valide_sans_reserve' + id + ']').html(valide_sans_reserve);
            $('input[data=accepte_avec_reserve' + id + ']').val(accepte_avec_reserve);
            $('span[id=accepte_avec_reserve' + id + ']').html(accepte_avec_reserve);
            $('input[data=refuse' + id + ']').val(refuse);
            $('span[id=refuse' + id + ']').html(refuse);
            $('input[data=date_depart_fft' + id + ']').val(date_depart_fft);
            $('span[id=date_depart_fft' + id + ']').html(date_depart_fft);
            viderChamps();

        } else {
            // ressource
            var t = $('.tableC').DataTable();
            var tab_controle = [
                '<span id="site' + count_control +'">' +site+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + site +'" name="tab_controle[' + count_control +'][site]" data="site' + count_control +'"/>',
                '<span id="profil' + count_control +'">' +valide_sans_reserve+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + valide_sans_reserve +'" name="tab_controle[' + count_control +'][valide_sans_reserve]" data="valide_sans_reserve' + count_control +'"/>',
                '<span id="profil' + count_control +'">' +accepte_avec_reserve+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + accepte_avec_reserve +'" name="tab_controle[' + count_control +'][accepte_avec_reserve]" data="accepte_avec_reserve' + count_control +'"/>',
                '<span id="profil' + count_control +'">' +refuse+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + refuse +'" name="tab_controle[' + count_control +'][refuse]" data="refuse' + count_control +'"/>',
                '<a href="#" data="' + count_control + '"><i class="flaticon-delete" id="delete-controle" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_controle).draw();
            viderChamps();
            count_control++;

            $('#nb_site_valide_sans_reserve_synthese').val(t.rows().count());
            $('#nb_site_accepte_avec_reserve_synthese').val(t.rows().count());
            $('#nb_site_refuse_synthese').val(t.rows().count());
        }

    }
});

//suppression equipe
$(document).on('click', '#delete-controle', function() {
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
            var table = $('.tableC').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

// recupéreration des lignes
function ligneExistanteEq(data){
    var t = $('.tableE').DataTable();
    $(data).each( function(count, item) {
        var tab_equipe = [
            '<span id="profil' + count +'">' +item.profil_id+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.profil_id +'" name="tab_equipe[' + count +'][profil]" data="profil' + count +'"/>',
            '<span id="profil' + count +'">' +item.user_id+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.user_id +'" name="tab_equipe[' + count +'][user]" data="user' + count +'"/>',
            '<span id="profil' + count +'">' +item.zone+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.zone +'" name="tab_equipe[' + count +'][zone]" data="zone' + count +'"/>',
            '<span id="profil' + count +'">' +item.date_depart+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_depart +'" name="tab_equipe[' + count +'][date_depart_fft]" data="date_depart_fft' + count +'"/>',
            '<span id="profil' + count +'">' +item.date_retour+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_retour +'" name="tab_equipe[' + count +'][date_fin_fft]" data="date_fin_fft' + count +'"/>',
            '<span id="profil' + count +'">' +item.date_mission+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.date_mission +'" name="tab_equipe[' + count +'][date_mission]" data="date_mission' + count +'"/>',

            '<span id="profil' + count +'">' +item.fournisseur_id+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.fournisseur_id +'" name="tab_equipe[' + count +'][fournisseur]" data="fournisseur' + count +'"/>',
            '<span id="profil' + count +'">' +item.immatriculation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.immatriculation +'" name="tab_equipe[' + count +'][immatriculation]" data="immatriculation' + count +'"/>',
            '<span id="profil' + count +'">' +item.contact+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.contact +'" name="tab_equipe[' + count +'][contact]" data="contact' + count +'"/>',
            '<span id="profil' + count +'">' +item.chauffeur+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.chauffeur +'" name="tab_equipe[' + count +'][chauffeur]" data="chauffeur' + count +'"/>',
            '<span id="profil' + count +'">' +item.distance+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.distance +'" name="tab_equipe[' + count +'][distance]" data="distance' + count +'"/>',
            '<a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-equipe" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_equipe);

        $('#nb_equipes_synthese').val(t.rows().count());
        $('#nb_superviseurs_synthese').val(t.rows().count());
        $('#nb_vehicules_synthese').val(t.rows().count());
        $('#nb_riggers_synthese').val(t.rows().count());
    });
    t.draw();
}

// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableauEq() {
    var t = $('.tableE').DataTable();
    var tailleTableau = t.rows().count();
    count = count + tailleTableau;
}

// recupéreration des lignes
function ligneExistanteCo(data){
    var t = $('.tableC').DataTable();
    $(data).each( function(count, item) {
        var tab_controle = [
            '<span id="site' + count +'">' +item.site+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.site +'" name="tab_controle[' + count +'][site]" data="site' + count +'"/>',
            '<span id="profil' + count +'">' +item.valide_sans_reserve+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.valide_sans_reserve +'" name="tab_controle[' + count +'][valide_sans_reserve]" data="valide_sans_reserve' + count +'"/>',
            '<span id="profil' + count +'">' +item.valide_reserve+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.valide_reserve +'" name="tab_controle[' + count +'][accepte_avec_reserve]" data="accepte_avec_reserve' + count +'"/>',
            '<span id="profil' + count +'">' +item.refuse+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.refuse +'" name="tab_controle[' + count +'][refuse]" data="refuse' + count +'"/>',
            '<a href="#" data="' + count + '"><i class="flaticon-delete" id="delete-controle" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_controle);
        $('#nb_site_valide_sans_reserve_synthese').val(t.rows().count());
        $('#nb_site_accepte_avec_reserve_synthese').val(t.rows().count());
        $('#nb_site_refuse_synthese').val(t.rows().count());
    });
    t.draw();
}
function obtenirTailleTableauCo() {
    var t = $('.tableC').DataTable();
    var tailleTableau = t.rows().count();
    count_control = count + tailleTableau;
}
