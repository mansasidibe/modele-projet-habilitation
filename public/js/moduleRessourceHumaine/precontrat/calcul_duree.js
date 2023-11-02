// VERFICATION DE LA DATE DE NAISSANCE
function checkDateNaissance() {
    var date_naissance = $('#date_naissance').val();
    console.log("date_naissance", date_naissance);

    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    console.log("currentDate", formattedDate);

    if (date_naissance <= formattedDate) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de naissance doit est inférieure à la date du jour.' : 'Date of birth must be less than today\s date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
}



// CALCUL DE LA DUREE DE CONTRAT (STAGE ECOLE)
function getDureeContratStageEcole() {
    var stage_ecole_date_debut_contrat = $('#stage_ecole_date_debut_contrat').val();
    var stage_ecole_date_fin_contrat = $('#stage_ecole_date_fin_contrat').val();
    var stage_ecole_duree_contrat = 0;

    if (stage_ecole_date_fin_contrat < stage_ecole_date_debut_contrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    var stage_ecole_date_debut_contrat = new Date(stage_ecole_date_debut_contrat);
    var stage_ecole_date_fin_contrat = new Date(stage_ecole_date_fin_contrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (stage_ecole_date_fin_contrat.getFullYear() - stage_ecole_date_debut_contrat.getFullYear()) * 12;
    differenceEnMois += stage_ecole_date_fin_contrat.getMonth() - stage_ecole_date_debut_contrat.getMonth();

    stage_ecole_duree_contrat = differenceEnMois;

    $('#stage_ecole_duree_contrat').val(stage_ecole_duree_contrat);
}


// CALCUL DE LA DUREE DE CONTRAT (STAGE STAGE PROFESSIONNEL OU QUALIFICATION)
function getDureeContratStageProfessionnelQualification() {
    var dateDebutContrat = $('#stage_professionnelQualification_date_debut_contrat').val();
    var dateFinContrat = $('#stage_professionnelQualification_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeContrat = differenceEnMois;

    $('#stage_professionnelQualification_duree_contrat').val(dureeContrat);
}


// CALCUL DE LA DUREE D'ESSAI DE CONTRAT  (DUREE DETERMINIEE AVEC ESSAI)
function getDureeEssaiDureeDeterminieAvecEssai() {
    var dateDebutEssai = $('#contrat_duree_determinee_avec_essai_date_debut_essai').val();
    var dateFinEssai = $('#contrat_duree_determinee_avec_essai_date_fin_essai').val();
    var dureeEssai = 0;

    if (dateFinEssai < dateDebutEssai) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutEssai);
    var dateFin = new Date(dateFinEssai);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeEssai = differenceEnMois;

    $('#contrat_duree_determinee_avec_essai_duree_essai').val(dureeEssai);
}


// CALCUL DE LA DUREE DE CONTRAT  (DUREE DETERMINIEE AVEC ESSAI)
function getDureeContratDureeDeterminieAvecEssai() {
    var dateDebutContrat = $('#contrat_duree_determinee_avec_essai_date_debut_contrat').val();
    var dateFinContrat = $('#contrat_duree_determinee_avec_essai_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeContrat = differenceEnMois;

    $('#contrat_duree_determinee_avec_essai_duree_contrat').val(dureeContrat);
}


// CALCUL DE LA DUREE DE CONTRAT  (DUREE A DETERMINIEE AVEC ESSAI)
function getDureeContratDureeDeterminieLieAuProjet() {
    var dateDebutContrat = $('#contrat_duree_determinee_lie_projet_date_debut_contrat').val();
    var dateFinContrat = $('#contrat_duree_determinee_lie_projet_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeContrat = differenceEnMois;

    $('#contrat_duree_determinee_lie_projet_duree_contrat').val(dureeContrat);
}


// CALCUL DE LA DUREE DE CONTRAT  (DUREE A DETERMINIEE)
function getDureeContratDureeDeterminee() {
    var dateDebutContrat = $('#contrat_duree_determinee_date_debut_contrat').val();
    var dateFinContrat = $('#contrat_duree_determinee_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeContrat = differenceEnMois;

    $('#contrat_duree_determinee_duree_contrat').val(dureeContrat);
}



// CALCUL DE LA DUREE DE CONTRAT  (DUREE A INDETERMINIEE AVEC ESSAI)
function getDureeEssaiContratDureeIndetermineeAvecEssai() {
    var dateDebutEssai = $('#contrat_duree_indeterminee_essai_date_debut_essai').val();
    var dateFinEssai = $('#contrat_duree_indeterminee_essai_date_fin_essai').val();
    var dureeEssai = 0;

    if (dateFinEssai < dateDebutEssai) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutEssai);
    var dateFin = new Date(dateFinEssai);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeEssai = differenceEnMois;

    $('#contrat_duree_indeterminee_essai_duree_essai').val(dureeEssai);
}


// CALCUL DE LA DUREE DE CONTRAT  (CONSULTANT INTERNE)
function getDureeContratConsultantInterne() {
    var dateDebutContrat = $('#contrat_consultant_interne_date_debut_contrat').val();
    var dateFinContrat = $('#contrat_consultant_interne_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12;
    differenceEnMois += dateFin.getMonth() - dateDebut.getMonth();

    dureeContrat = differenceEnMois;

    $('#contrat_consultant_interne_duree_contrat').val(dureeContrat);
}


// CALCUL DE LA DUREE DE CONTRAT  (CONSULTANT EXTERNE)
function getDureeContratConsultantExterne() {
    var dateDebutContrat = $('#contrat_consultant_externe_date_debut_contrat').val();
    var dateFinContrat = $('#contrat_consultant_externe_date_fin_contrat').val();
    var dureeContrat = 0;

    if (dateFinContrat < dateDebutContrat) {
        Swal.fire({
            title: langue = 'fr' ? 'La date de fin est inférieure à la date de début.' : 'The end date is less than the start date.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return; // Arrête l'exécution si la date de fin est inférieure à la date de début.
    }

    var dateDebut = new Date(dateDebutContrat);
    var dateFin = new Date(dateFinContrat);

    // Extraction des composantes des dates
    var jourDebut = dateDebut.getDate();
    var moisDebut = dateDebut.getMonth();
    var anneeDebut = dateDebut.getFullYear();

    var jourFin = dateFin.getDate();
    var moisFin = dateFin.getMonth();
    var anneeFin = dateFin.getFullYear();

    // Calcul de la différence en jours
    var differenceEnJours = jourFin - jourDebut;

    // Calcul de la différence en mois en prenant en compte les années
    var differenceEnMois = (anneeFin - anneeDebut) * 12 + moisFin - moisDebut;

    dureeContrat = differenceEnMois;

    $('#contrat_consultant_externe_duree_contrat').val(dureeContrat);
}