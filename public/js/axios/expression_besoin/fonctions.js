
const reponseEXB = async () => {
    if (token) {
        try {

            const response = await axios.post(getBaseURL() +
                'api/v1/logistique/expression_besoins/reponse', new FormData(document
                    .getElementById("reponse-form")), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token,
                    }
                });

            if (response.status == 200) return response.data;
        } catch (error) {
            console.log('error ',error);
        }
    }
}

// LES ACTIONS

//transmettre une expression de besoin
$(document).on('click', '#btn_transmettre', async function(e) {
    e.preventDefault();
    $('#reponse').val('transmettre');

    Swal.fire({
        text: langue == 'fr' ?
        "Voulez-vous transmettre ces Proforma au Manager du département contrôle de gestion ?" :
        'Do you want to forward these Proforma to the Manager of the Management Control Department ?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseEXB().then(
                response => {
                    if (response.data.statut == true) {
                        Swal.fire({
                            text: langue == 'fr' ?
                                "L'expresssion de besoin été transmis avec succès" :
                                "The expression of need sent successfully.",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur

                            window.location.href = getBaseURL() +
                                "logistique/expression_besoins";
                        });
                    }
                }
            );
        }
    });
});

//certifié une expression de besoin
$(document).on('click', '#c', async function(e) {
    $('#reponse').val('certifier');
    Swal.fire({
    text: langue == 'fr' ? "Voulez-vous certifier l'expression de besoin ?" :
    'Do you want to certifiate the Purchase order?',
     icon: 'question',
     showCancelButton: true,
     confirmButtonColor: '#4D6194',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Oui',
     cancelButtonText: 'Non'
  }).then((result) => {
  if (result.value) {
    reponseEXB().then(
        response => {

            if (response.data.statut == true) {
                Swal.fire({
                    text: langue == 'fr' ?
                        'L’expression des besoins liée à la demande  ' + response.data.reference + ' a été certifiée avec succès .' :
                                    'The expression of needs linked to demand ' + response.data.reference +
                                    ' has been successfully certifiated.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Rediriger l'utilisateur
                    window.location.href = getBaseURL() +
                        "logistique/expression_besoins";
                });
            }
        }
    );
 }
  });
});

// refuter une expression de besoin
$(document).on('click', '#refuter', async function(e) {
 var motifrejet = $("#motif").val();

 if (motifrejet == "") {
  document.getElementById("parsleyarea").style.visibility = "visible";
  } else {
  $('#reponse').val('refuter');
  Swal.fire({
    text: langue == 'fr' ?'L’expression des besoins liée à la demande  ' + response.data.data.reference + ' a été refutée .':
    'The expression of needs linked to demand ' + response.data.data.reference + ' has been refuted.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4D6194',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non'
   }).then((result) => {
    if (result.value) {
        reponseExpression().then(
            response => {
                console.log("retour mail+notif:", response);
                if (response.data.statut == true) {
                    Swal.fire({
                        text: langue == 'fr' ?
                        'L’expression des besoins liée à la demande  ' + response.data.data.reference + ' a été refutée .':
                        'The expression of needs linked to demand ' + response.data.data.reference + ' has been refuted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Rediriger l'utilisateur
                        window.location.href = getBaseURL() +
                            "logistique/expression_besoins";
                    });
                }
            }
        );
    }
  });
  }
});

//approuvé une expression de besoin
$(document).on('click', '#a', async function(e) {
$('#reponse').val('approuver');

  Swal.fire({
    text: langue == 'fr' ? "Voulez-vous approuver l'expression de besoin ?" :
        'Do you want to approve the expression of needs?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4D6194',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non'
  }).then((result) => {
    if (result.value) {
        reponseEXB().then(
            response => {
                if (response.data.statut == true) {
                    Swal.fire({
                        text: langue == 'fr' ?
                        'L’expression des besoins liée à la demande  ' + response.data.data.reference + ' a été approuvée avec succès .' :
                                    'The expression of needs linked to demand ' + response.data.data.reference +
                                    ' has been successfully approved.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Rediriger l'utilisateur
                        window.location.href = getBaseURL() +
                            "logistique/expression_besoins";
                    });
                }
            }
        );
     }
  });
});

// rejeter une expression de besoin
$(document).on('click', '#rejeter', async function(e) {
    var motifrejet = $("#motifrejet").val();

    if (motifrejet == "") {
        document.getElementById("parsleyarea").style.visibility = "visible";
    } else {
        $('#reponse').val('rejeter');
        Swal.fire({
            text: langue == 'fr' ? "Voulez-vous rejeter l'expression de besoins ?" :
                "Do you want to reject the expression of needs ?",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        }).then((result) => {
            if (result.value) {
                reponseEXB.then(
                    response => {
                        if (response.data.statut == true) {
                            Swal.fire({
                                text: langue == 'fr' ?
                                'L’expression des besoins liée à la demande  ' + response.data.data.reference + ' a été rejetée .':
                                'The expression of needs linked to demand ' + response.data.data.reference + ' has been rejected.',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                // Rediriger l'utilisateur
                                window.location.href =
                                    "{{ URL::to('/logistique/expression_besoins') }}";
                            });
                        }
                    }
                );
            }
        });
    }
});

// valider une expression de besoin
$(document).on('click', '#v', async function(e) {
    $('#reponse').val('valider');
    Swal.fire({
        text: langue == 'fr' ? "Voulez-vous valider cette expression de besoin?" :
            "Do you want to validate the expression of needs?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            reponseEXB().then(
                response => {
                    console.log(response);
                    if (response.data.statut == true) {
                        Swal.fire({
                            text: langue == 'fr' ?
                            'L’expression de besoin liée à la demande ' + response.data.data.reference + ' a été validée avec succès .' :
                            'The expression of need linked to demand' + response.data.data.reference + 'has been successfully validated.' ,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href =
                                "{{ URL::to('/logistique/expression_besoins') }}";
                        });
                    }
                }
            );
        }
    });
    //
});

// refuser une expression de besoin
$(document).on('click', '#refuser', async function(e) {
var motifrejet = $("#motif").val();

  if (motifrejet == "") {
  document.getElementById("parsleyarea").style.visibility = "visible";
} else {
  $('#reponse').val('refuser');
    Swal.fire({
    text: langue == 'fr' ? "Voulez-vous refuser l'expression de besoins ?" :
        "Do you want to reject the Purchase order ?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4D6194',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non'
  }).then((result) => {
    if (result.value) {
        reponseEXB().then(
            response => {
                console.log("retour mail+notif:", response);
                if (response.data.statut == true) {
                    Swal.fire({
                        text: langue == 'fr' ?
                        'L’expression des besoins liée à la demande  ' + response.data.data.reference + ' a été refusée .':
                        'The expression of needs linked to demand ' + response.data.data.reference + ' has been refused.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Rediriger l'utilisateur
                        window.location.href = getBaseURL() +
                            "logistique/expression_besoins";
                    });
                }
            }
        );
    }
  });
 }
});
