var token = localStorage.getItem("token");
var localeJquery = $('html').attr('lang');
let langue = "{{ app()->getLocale() }}";

function get_fiche_declaration(response) {
    t = $('.tableL').DataTable();
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


    $(response.data.data).each(function(index, item) {

        const months = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        const monthName = months[item.t_mois - 1];

        var bg_stt = "";
        // v_link = "/ressourcehumaine/declaration/" + item.id + "";

        if (item.btnView == undefined) {
            v_link = "/commercial/declarationFiscale/" + item.t_id + "";
        } else {
            v_link = "javascript:void(0);";
            v_opacity = "opacity:0.5;cursor: not-allowed;"
        }

        if (item.btnView == undefined) {
            t_link = "/commercial/declarationFiscale/generate_pdf_declaration/" + item.t_id + "";
        } else {
            t_link = "javascript:void(0);";
            v_opacity = "opacity:0.5;cursor: not-allowed;"
        }

        switch (item.t_statut) {
            case 0:
                localeJquery == "fr" ? lib_etat_stt = "Brouillon" : lib_etat_stt = "Draft";
                break;
            case 1:
                bg_stt = "light";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                e_link = "javascript:void(0);";
                e_opacity = "opacity:0.5;cursor: not-allowed;";
                de_link = "javascript:void(0);";
                de_opacity = "opacity:0.5;cursor: not-allowed;";
                btn_sup_pop = "";
                break;
            case 2:
                bg_stt = "danger";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                e_link = "javascript:void(0);";
                e_opacity = "opacity:0.5;cursor: not-allowed;";
                de_link = "javascript:void(0);";
                de_opacity = "opacity:0.5;cursor: not-allowed;";
                btn_sup_pop = "";
                break;
            case 3:
                bg_stt = "success";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                break;
            case 4:
                bg_stt = "success";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                e_link = "javascript:void(0);";
                e_opacity = "opacity:0.5;cursor: not-allowed;";
                de_link = "javascript:void(0);";
                de_opacity = "opacity:0.5;cursor: not-allowed;";
                btn_sup_pop = "";
                break;
            case 5:
                bg_stt = "success";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                break;
            case 6:
                bg_stt = "success";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
                e_link = "javascript:void(0);";
                e_opacity = "opacity:0.5;cursor: not-allowed;";
                de_link = "javascript:void(0);";
                de_opacity = "opacity:0.5;cursor: not-allowed;";
                btn_sup_pop = "";
                break;
            case 8:
                bg_stt = "danger";
                localeJquery == "fr" ? lib_etat_stt = item.t_etat_fr : lib_etat_stt = item.t_etat_en;
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

        t.row.add([
            `<span style='color: #203A79CC;'>${item.t_reference}</span>`,
            `<span style='color: #203A79CC;'>${item.t_libelle_impot}</span>`,
            `<span style='color: #203A79CC;'>${monthName}</span>`,
            `<span style='color: #203A79CC;'>${item.t_montant_brut}</span>`,
            "<span style='color: #203A79CC;' class='label label-sm label-rounded label-" + bg_stt + " pxb-4'>" + lib_etat_stt + "</span>",
            `<span style='color: #203A79CC;'>
                    <a href="${v_link}"><i class="flaticon-eye" id="voir" data="${''}" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a> 
                    <a href="${t_link}"><i class="fa-solid fa-cloud-arrow-down" id="telecharger" data="${''}" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a> 
                </span>`
        ]);
        t.draw();
    });
    t.draw();
    // t.draw(false);
    // $('tr td:first-child').hide();
    count++;

    // Suppression du tableau
    t.destroy();
}