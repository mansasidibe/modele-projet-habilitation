// jQuery(document).ready(function($) {

//     var token = localStorage.getItem("token");
//     let langue = "{{app()->getLocale()}}";
//     const getBaseURL = () => {
//         return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
//     }
//     var token = localStorage.getItem("token");

//     // const get_precontrat_by_id = async(id) => {
//     //     console.log("id:", id);

//     //     const response = await axios.get(`${getBaseURL()}api/v1/ressourcehumaine/precontrats/${parseInt(id)}`, {
//     //         headers: {
//     //             accept: 'application/json',
//     //             'Authorization': 'Bearer ' + token,
//     //         },
//     //     });
//     //     try {
//     //         if (response.status == 200) return response.data.data
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     let get_id = parseInt(document.getElementById('id').value);
//     get_precontrat_by_id(get_id)
//         .then(data => {
//             console.log("data_precontrat:", data);
//             // $('#code').val(data[0].code);
//             // $('#tier_id').val(data[0].tiers.raison_sociale);
//             // $('#proforma_id').val(data[0].proforma.montant_ttc);
//             // $('#id_bdc').val(data[0].id);
//             // $('#motifrejet').val(data[0].motif_rejet);
//             // $('#statut').val(data[0].statut);
//             // data[0] ? .media.map(row => {
//             //     console.log(row.statut);
//             //     if (row.statut === 1) {
//             //         $('#fichier_nom').text(row.libelle);
//             //         $('#existant').val(true);
//             //         if ($('#statut').val() == 0 && $('#existant').val() == "true") {
//             //             $('#e').show();
//             //         }
//             //     } else {
//             //         $('#existant').val(false);
//             //     }
//             // });

//             // $('#fichier_nom').text(data[0].media == "" ? null : data.media[0].libelle);
//             // $('#id_bdc').val(data.media == "" ? null : data.media[0].libelle);
//             // $('#existant').val(data.media == "" ? false : true);
//         });


//     // if ($("#profil").val() == 15 && $('#statut').val() == 1) {
//     //     $('#v').show();
//     //     $('#r').show();
//     // } else {
//     //     $('#a').show();
//     // }

//     // if ($("#profil").val() == 13 && $('#statut').val() == 0) {
//     //     $('#a').show();
//     //     $("#idvisible").remove();
//     // }

//     // if ($("#profil").val() == 13 && $('#statut').val() == 1) {
//     //     $('#a').show();
//     //     $("#idvisible").remove();
//     // }
// });

// DESACTIF L'OPTION DE CHARGEMENT CHEZ LE SM-RH ET LE DG

if ($('#statut').val() == 1 || $('#statut').val() == 6 || $('#statut').val() == 2 || $('#statut').val() == 8) {
    $(".upfile").remove();
}

//store file
const sub = async(elt) => {
    let text, yes, no;
    langue == "en" ? text = "File imported successfully" : text = "Fichier importé avec succès";
    langue == "en" ? yes = 'Yes' : yes = 'Oui';
    langue == "en" ? no = 'No' : no = 'Non';

    var fd = new FormData();
    var files = elt.files;
    var id = $('#id').val();
    console.log('precontrat_id', id);
    document.getElementById('fichier_nom').innerHTML = files[0].name;

    if (files.length > 0) {
        fd.append('fichier', files[0]);
        fd.append('id', id);

        try {
            const response = await axios.post(getBaseURL() + 'api/v1/pj_precontrat', {
                fichier: files[0],
                id: id
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token,
                }
            });
            // console.log(response);
            Swal.fire({
                text: text,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                //
            });
        } catch (error) {
            console.log(error);
        }

    }
}

if ($('#statut').val() == 3 || $('#statut').val() == 1 || $('#statut').val() == 4 || $('#statut').val() == 2) {

} else {
    function importFile(elt, tel) {
        let text, yes, no;
        langue == "en" ? text = "Do you want to replace the file?" : text = "Voulez-vous remplacer le fichier?";
        langue == "en" ? yes = 'Yes' : yes = 'Oui';
        langue == "en" ? no = 'No' : no = 'Non';
        var existant = $('#existant').val()

        if (existant) {
            Swal.fire({
                // title: 'Are you sure ?',
                text: text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4D6194',
                cancelButtonColor: '#d33',
                confirmButtonText: yes,
                cancelButtonText: no,
                timer: 4000
            }).then((result) => {
                console.log(result.isConfirmed);
                if (result.value) {
                    elt.querySelector("input").click();
                }
                $('#e').show();
            });
        } else {
            elt.querySelector("input").click();
        }
    }
}



//on change
$(document).on('change', '#upfile', function() {

    if (document.getElementById("upfile") == "") {
        if ($('#existant').val() == true && $('#profil').val() == 15) {
            element.classList.remove("btn_envoyer");
        }
        if ($('#existant').val() == true && $('#profil').val() == 13) {
            element.classList.remove("btn_envoyer");
        }

    } else {
        if ($('#existant').val() == "" && $('#profil').val() == 13) {
            $('#e').show();
        }

    }
});

//envoyer un produit
$(document).on('click', '#e', async function(e) {
    e.preventDefault();
    $('#reponse').val('envoyer');


    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous envoyer le bon de commande ?" : 'Do you want to send the Purchase order?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseSm().then(
                response => {
                    console.log("envoyer js reponse:", response.data);
                    if (response.data.statut == true) {
                        Swal.fire({
                            text: langue == 'fr' ? "Le bon de commande a été envoyé avec succès" : "Purchase order sent successfully.",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            // window.location.href = "{{ URL::to('/commercial/bondecommandes') }}";
                            window.location.href = getBaseURL() + "commercial/bondecommandes";
                        });
                    }
                }
            );
        }
    });
});

// valider un produit
$(document).on('click', '#v', async function(e) {
    $('#reponse').val('valider');

    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous valider le bon de commande ?" : 'Do you want to validate the Purchase order?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseSm().then(
                response => {
                    console.log(response);
                    if (response.data.statut == true) {
                        Swal.fire({
                            text: langue == 'fr' ? "Le bon de commande a été validé avec succès" : "Purchase order validated successfully.",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href = getBaseURL() + "commercial/bondecommandes";
                        });
                    }
                }
            );
        }
    });
    //
});

// rejeter un produit
$(document).on('click', '#r', async function(e) {
    var motifrejet = $("#motifrejet").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('rejeter');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous rejeter le bon de commande ?" : "Do you want to reject the Purchase order ?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseSm().then(
                    response => {
                        console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ? "Le bon de commande a été rejeté avec succès" : "Purchase order rejected successfully.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href = getBaseURL() + "commercial/bondecommandes";
                            });
                        }
                    }
                );
            }
        });
    }
});
