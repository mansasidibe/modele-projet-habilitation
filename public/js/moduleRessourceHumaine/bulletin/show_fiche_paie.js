let count = 0;
let count2 = 0;
let numero = 1;
let libelle_type_contrat
var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
var localeJquery = $('html').attr('lang');



$('#creer').prop('disabled', true);

// // REQUETE DE VERFICATION DU MOIS ET ANNEE EN BASE
const get_mois_annee = async(mois, annee) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_mois_annee`, { mois: mois, annee: annee }, {
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

// GESTION DE L'AFFICHAGE DES BOUTON SELON L'EXISTANCE DU MOIS ET DE L'ANNEE
$("#select-annee, #select-mois").change(function() {

    var moisSelectionne = $('#moisSelectionne').val();
    var anneeSelectionnee = $('#anneeSelectionnee').val();

    get_mois_annee(moisSelectionne, anneeSelectionnee).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $('#creer').hide();
                $('#valider').hide();
            } else {

                $('#creer').show();
                $('#creer').prop('disabled', false);
                //  supprimer le tableau
                if (t && $.fn.DataTable.isDataTable('.tableB')) {
                    t.destroy();
                }

            }
        }
    );

});





function get_fiche_paie(retour) {
    t = $('.tableB').DataTable();
    t.clear();

    var lib_etat_stt = '';
    var lib_prospect = '';
    var lib_fix = '';
    var lib_email = '';
    var lib_type_contrat = '';
    var bg_stt = '';
    var style_stt = '';
    var v_link = '';
    var v_opacity = '';
    var du_link = '';
    var du_opacity = '';
    var e_link = '';
    var e_opacity = '';
    var de_link = '';
    var de_opacity = '';
    var disabChck = '';
    var checkst = '';
    var btn_sup_pop = '';
    var t_opacity = '';
    var t_link = '';
    var c_hbtn = '';
    var s_hbtn = '';
    var t_hbtn = '';
    var sw_hbtn = '';
    var f_opacity = '';

    if (retour && retour.data && Array.isArray(retour.data.bulletin)) {
        $(retour.data.bulletin).each(function(count, data) {
            $(data.user.contrat).each(function(count2, contrat) {



                if (data.statut == 0) {
                    $('#valider').show();
                    $('#creer').hide();
                }

                if (data.statut == 1) {
                    $('#valider').hide();
                }

                // GESTION DU BOUTON SWICTH
                if (data.switch == 1) {
                    checkst = 'checked'
                }

                if (data.btnDup == undefined) {
                    v_link = "/ressourcehumaine/lignebulletin/" + data.id;
                }

                if (data.btnDup == undefined) {
                    e_link = "/ressourcehumaine/lignebulletin/" + data.id + "/edit";
                }

                // if (t_link == undefined) {
                //     var lien_pdf = '/api/v1/pdfcontrat/' + data.id;
                //     t_link = " href='" + lien_pdf + "'";
                // }

                if (data.btnDup == undefined) {
                    var lien_pdf = '/api/v1/pdfbulletin/' + data.id;
                    t_link = " href='" + lien_pdf + "'";
                } else {
                    t_link = "javascript:void(0);";
                    t_opacity = "opacity:0.5;cursor: not-allowed;";
                }


                switch (data.statut) {
                    case 0:
                        localeJquery == "fr" ? lib_etat_stt = "brouillon" : lib_etat_stt = "draft";
                        break;
                    case 1:
                        bg_stt = "light";
                        localeJquery == "fr" ? lib_etat_stt = "attente" : lib_etat_stt = "waiting";
                        e_link = "javascript:void(0);";
                        e_opacity = "opacity:0.5;cursor: not-allowed;";
                        de_link = "javascript:void(0);";
                        de_opacity = "opacity:0.5;cursor: not-allowed;";
                        btn_sup_pop = "";
                        break;

                    default:
                        bg_stt = "color: #203A79CC;opacity: 1;";
                        break;
                }

                var tab1 = [
                    "<span class='form-check'>" +
                    // "<input class='form-check-input' type='checkbox' value='' id='check' class='' onclick='enableBtnImp(this)'>" +
                    // "<label class='form-check-label' for='flexCheckDefault'></label>" +
                    // "</span>",
                    "<span style='color: #203A79CC;'>" + (numero++) + "</span>",
                    "<span style='color: #203A79CC;'>" + data.user.matricule + "</span>",
                    "<span style='color: #203A79CC;'>" + data.user.nom + "</span>",
                    "<span style='color: #203A79CC;'>" + data.user.prenom + "</span>",
                    "<span style='color: #203A79CC;'>" + contrat.type_contrat.libelle_fr + "</span>",
                    "<span style='color: #203A79CC;'>" + contrat.salaire_net + "</span>",
                    "<span style='color: #203A79CC;' class='label label-sm label-rounded label-" + bg_stt + " pxb-4'>" + lib_etat_stt + "</span>",
                    "<div class='d-flex justify-content-center' >" +
                    "<div class='d-flex justify-content-center' >" +
                    "<a href='" + e_link + "' style='margin-left: 7px;' >" +
                    "<i title='modifier' class='fa fa-edit' style='color: #4D6194; font-size: 15px; margin-top: 7px; " + e_opacity + "'></i>" +
                    "</a>" +
                    "<a href='" + v_link + "' class='mt-1'>" +
                    "<i title='voir' class='flaticon-eye' style='margin-rigth: 7px; color:#4D6194; font-size: 20px; " + v_opacity + "'></i>" +
                    "</a> " +
                    "<a " + t_link + " target='_blank'  style='margin-left: 7px; " + t_hbtn + "' >" +
                    "<i title='télécharger' class='fa-solid fa-cloud-arrow-down' style='color: #4D6194; font-size: 15px; margin-top: 7px; " + t_opacity + "'></i>" +
                    "</a>" +
                    "<a href='javascript:void(0);' style='" + sw_hbtn + "' > " +
                    "<span class='switch switch-sm switch-outline switch-icon switch-success' style='margin-left: 7px;'>" +
                    // "<label><input type='checkbox' " + disabChck + "  " + checkst + "  class='changer_switch' /><span></span></label>" +
                    "<label><input type='checkbox' " + disabChck + "  " + checkst + " onchange='changeChck(" + data.id + ",this)' /><span></span></label>" +
                    "</span>" +
                    "</a>" +
                    "</div>",

                ]

                t.row.add(tab1);



            });
        });
        t.draw();
        // t.draw(false);
        // $('tr td:first-child').hide();
        count++;
        count = retour.length;

    } else {
        console.log("retour.data.bulletin n'est pas un tableau ou est indéfini.");
    }
    // Suppression du tableau
    t.destroy();
}


//FONCTION PERMETTANT D'ACTIVE ET DESACTIVE LE SWITCH
function changeChck(id, cb) {
    // alert(cb.checked);
    axios.post(getBaseURL() + 'api/v1/change_swicth_bulletins', {
            id: id,
            cb: cb.checked
        }, {
            headers: {
                accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
        .then(function(response) {
            // rien du tout
            // if (cb.checked = true) {
            //     alert('rtyu');

            // }
            // location.reload();
        });
}