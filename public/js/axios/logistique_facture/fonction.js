
// alert('okkkkkkkkk');
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
        });
    } else {
        elt.querySelector("input").click();
    }
}
//on change
$(document).on('change', '#upfile', function () {

    if (document.getElementById("upfile") == "") {

        if ($('#existant').val() == true && $('#profil').val() == 18) {
            element.classList.remove("btn_envoyer");
        }

    } else {
        if ($('#existant').val() == "" && $('#profil').val() == 18) {
            $('#e').show();
        }

    }
});

//store file
const sub = async (elt) => {
    var fd = new FormData();
    var files = elt.files;
    var id = $('#id').val();
    document.getElementById('fichier_nom').innerHTML = files[0].name;

    if (files.length > 0) {
        fd.append('fichier', files[0]);
        fd.append('id', id);
    }
    //     try {
    //         const response = await axios.post(getBaseURL() + 'api/v1/logistique/imageStore',
    //             {
    //                 fichier: files[0],
    //                 id: id,
    //                 code: code
    //             },
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': 'Bearer ' + token,
    //                 }
    //             });
    //         // console.log(response);
    //         Swal.fire({
    //             text: text,
    //             icon: 'success',
    //             confirmButtonText: 'OK'
    //         }).then(() => {
    //             // $('#e').hide();
    //             //
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
}

const reponseBl = async () => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/logistique/factures/reponse', new FormData(document.getElementById("response_form")), {
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
}

// valider un bon de livraison
$(document).on('click', '#v', async function (e) {
    e.preventDefault();
    $('#reponse').val('valider');
    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous valider cette facture ?" : 'Do you want to validate the bill?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseBl().then(
                response => {
                    console.log(response);
                    if (response.data.statut == true) {
                        console.log(response);
                        Swal.fire({
                            text: langue == 'fr' ? "La facture lié à cette demande  a été validé avec succès" : "The bill linked to this request has been successfully validated.",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur

                            window.location
                                .href =
                                getBaseURL() +
                                "logistique/factures";
                        });
                    }
                }
            );
        }
    });
});

//certifié une facture
$(document).on('click', '#c', async function (e) {
    $('#reponse').val('certifier');

    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous certifier cette facture ?" : 'Do you want to certifiate the bill?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseBl().then(
                response => {
                    console.log(response);
                    if (response.data.statut == true) {
                        reponseBl().then(
                            response => {
                                console.log(response);
                                if (response.data.statut ==
                                    true) {
                                    Swal.fire({
                                        text: langue == 'fr' ? "« La facture liée à cette demande a été certifié avec succès" : "bill certifiated successfully.",
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    }).then(() => {
                                        // Rediriger l'utilisateur

                                        window.location
                                            .href =
                                            getBaseURL() +
                                            "logistique/factures";
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    });

});


//refuser la facture
$(document).on('click', '#refuser', async function (e) {
    var motifrejet = $("#motif").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('refuser');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous refuser la facture ?" :
                "Do you want to reject the bill ?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseBl().then(
                    response => {
                        // console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            reponseBl().then(
                                response => {
                                    console.log(response);
                                    if (response.data.statut ==
                                        true) {
                                        Swal.fire({
                                            text: langue == 'fr' ?
                                                "La facture liée à cette demande a été refuser avec succès" :
                                                "Purchase order reted successfully.",
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        }).then(() => {
                                            // Rediriger l'utilisateur

                                            window.location
                                                .href =
                                                getBaseURL() +
                                                "logistique/factures";
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }


});

// refuter un bon de livraison
$(document).on('click', '#refuter', async function (e) {
    var motifrejet = $("#motif").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('refuter');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous refuter la facture ?" :
                "Do you want to reject the bill ?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseBl().then(
                    response => {
                        // console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            reponseBl().then(
                                response => {
                                    console.log(response);
                                    if (response.data.statut ==
                                        true) {
                                        Swal.fire({
                                            text: langue == 'fr' ?
                                                "La facture a été refuser avec succès" :
                                                "Bill reted successfully.",
                                            icon: 'success',
                                            confirmButtonText: 'OK'
                                        }).then(() => {
                                            // Rediriger l'utilisateur

                                            window.location
                                                .href =
                                                getBaseURL() +
                                                "logistique/factures";
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }



});

// Récupérer les références aux éléments
var codereference = document.getElementById('reference');
var chargementdefichier = document.getElementById('chargementdefichier');
// Écouter l'événement de saisie sur le champ de texte
codereference.addEventListener('input', function () {
    // Vérifier si le champ de texte est rempli
    if (codereference.value !== '') {
        // Afficher l'élément si le champ de texte est rempli
        chargementdefichier.style.display = 'block'; // ou la valeur appropriée, comme 'inline', 'flex', etc.
    } else {
        // Cacher l'élément si le champ de texte est vide
        chargementdefichier.style.display = 'none';
    }
});
