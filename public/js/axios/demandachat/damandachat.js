
const reponseSmd = async () => {
    if (token) {
        try {
           // var repose = $('#reponse').val();
            const response = await axios.post(getBaseURL() +
                'api/v1/logistique/demandachat/reponse', new FormData(document
                    .getElementById("reponse-form")), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    }
                });
            if (response.status == 200) return response;
        } catch (error) {
            console.log('error ',error);
        }
    }
}


            //LES ACTIONS
        //envoyer une demande d'achat
        $(document).on('click', '#e', async function(e) {
            e.preventDefault();
            $('#reponse').val('envoyer');


            Swal.fire({
                text: langue == 'fr' ? "Voulez-vous envoyer la demande d'achat ?" :
                    'Do you want to send the Purchase order?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#4D6194',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui',
                cancelButtonText: 'Non'
            }).then((result) => {
                if (result.value) {
                    reponseSmd().then(
                        response => {
                            if (response.data.statut == true) {
                                Swal.fire({
                                    text: langue == 'fr' ?
                                        "La demande d'achat été envoyé avec succès" :
                                        "Purchase order sent successfully.",
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then(() => {
                                    // Rediriger l'utilisateur

                                    window.location.href = getBaseURL() +
                                        "logistique/demandachats";
                                });
                            }
                        }
                    );
                }
            });
        });

    //approuvé une demande d'achat
    $(document).on('click', '#a', async function(e) {
        $('#reponse').val('approuver');

        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous approuver la demande d'achat ?" :
                'Do you want to approve the Purchase order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseSmd().then(
                    response => {
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ?
                                    "La demande d'achat a été approuvé avec succès" :
                                    "Purchase order approved successfully.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href = getBaseURL() +
                                    "logistique/demandachats";
                            });
                        }
                    }
                );
            }
        });
        //
    });

    //valider une demande d'achat
        $(document).on('click', '#v', async function(e) {
            $('#reponse').val('valider');
            Swal.fire({
                text: langue == 'fr' ? "Voulez-vous valider la demande d'achat ?" :
                    'Do you want to validate the Purchase order?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#4D6194',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui',
                cancelButtonText: 'Non'
            }).then((result) => {
                if (result.value) {
                    reponseSmd().then(
                        response => {
                            if (response.data.statut == true) {
                                Swal.fire({
                                    text: langue == 'fr' ?
                                        'La demande d\'achat ' + response.data.data
                                            .reference + ' a été validé avec succès .' :
                                            'The Purchase order ' + response.data.data.reference +
                                            ' has been successfully validated.',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then(() => {
                                    // Rediriger l'utilisateur
                                    window.location.href = getBaseURL() +
                                        "logistique/demandachats";
                                });
                            }
                        }
                    );
                }
            });
            //
        });

   //transmettre une demande d'achat
   $(document).on('click', '#transmis', async function(e) {
    $('#reponse').val('transmettre');
    Swal.fire({
        text: langue == 'fr' ?
             'Voulez-vous transmettre la demande d’achat au Manager du Département Achat ?' :
            'Do you want to send the Purchase order to the Manager of the Purchasing Department?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseSmd().then(
                response => {
                    console.log(response);
                    if (response.data.statut == true) {

                        console.log(response.data.statut);
                        Swal.fire({
                            text: langue == 'fr' ?
                                'La demande d\'achat' + response.data.data.reference + ' a été transmise avec succès au Manager du Département Achat' :
                                'Purchase order' + response.data.data.reference + ' was successfully transmitted to the Purchasing Department Manager',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href = getBaseURL() +
                                "logistique/demandachats";
                        });
                    }
                }
            );
        }
    });
});


//certifié une demande d'achat
$(document).on('click', '#c', async function(e) {
    $('#reponse').val('certifier');

    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous certifier la demande d'achat ?" :
            'Do you want to certifiate the Purchase order?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseSmd().then(
                response => {
                    if (response.data.statut == true) {
                        Swal.fire({
                            text: langue == 'fr' ?
                                'La demande d\'achat ' + response.data.data.reference + ' a été certifiée avec succès .' :
                                            'The Purchase order ' + response.data.data.reference +
                                            ' has been successfully certifiated.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href = getBaseURL() +
                                "logistique/demandachats";
                        });
                    }
                }
            );
        }
    });
    //
});


// rejeter une demande d'achat
$(document).on('click', '#rejeter', async function(e) {
    var motifrejet = $("#motif_refus").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('rejeter');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous rejeter la demande d'achat ?" :
                "Do you want to reject the Purchase order ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseSmd().then(
                    response => {
                        console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ?
                                    "La demande d'achat a été rejeté avec succès" :
                                    "Purchase order rejected successfully.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href = getBaseURL() +
                                    "logistique/demandachats";
                            });
                        }
                    }
                );
            }
        });
    }
});
// refuser une demande d'achat
$(document).on('click', '#refuser', async function(e) {
    var motifrejet = $("#motif").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('refuser');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous refuser la demande d'achat ?" :
                "Do you want to reject the Purchase order ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseSmd().then(
                    response => {
                        console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ?
                                    "La demande d'achat a été refuser avec succès" :
                                    "Purchase order reted successfully.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href = getBaseURL() +
                                    "logistique/demandachats";
                            });
                        }
                    }
                );
            }
        });
    }

});

// refuter une demande d'achat
$(document).on('click', '#refuter', async function(e) {
    var motifrejet = $("#motif").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('refuter');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous refuser la demande d'achat ?" :
                "Do you want to reject the Purchase order ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseSmd().then(
                    response => {
                        console.log("retour mail+notif:", response);
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ?
                                    "La demande d'achat a été refuter avec succès" :
                                    "Purchase order reted successfully.",
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href = getBaseURL() +
                                    "logistique/demandachats";
                            });
                        }
                    }
                );
            }
        });
    }

});
