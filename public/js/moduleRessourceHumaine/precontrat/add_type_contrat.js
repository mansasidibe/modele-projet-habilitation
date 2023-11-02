function addContratDureeContratStageEcole() {
    $('#diplome_id').val() === '' || $('#filiere_id').val() === '' || $('#stage_ecole_entreprise_id').val() === '' || $('#stage_ecole_assurance').val() === '' ||
        $('#stage_ecole_niveau_id').val() === '' || $('#stage_ecole_date_debut_contrat').val() === '' || $('#stage_ecole_date_fin_contrat').val() === '' ||
        $('#stage_ecole_duree_contrat').val() === ''
}

function addContratProfessionnelQualification() {
    $('#domaine').val() === '' || $('#entreprise_id').val() === '' || $('#assurance').val() === '' || $('#niveau_id').val() === '' ||
        $('#date_debut_contrat').val() === '' || $('#date_fin_contrat').val() === '' || $('#duree_contrat').val() === ''
}

function addContratDureeIndetermineeAvecEssai() {
    $('#entreprise_id').val() === '' || $('#assurance').val() === '' || $('#date_debut_essai').val() === '' || $('#date_fin_essai').val() === '' ||
        $('#duree_essai').val() === '' || $('#avantage').val() === ''
}

function addContratDureeIndeterminee() {
    if ($('#contrat_duree_indterminee_entreprise_id').val() === '' || $('#contrat_duree_indterminee_assurance').val() === '' || $('#contrat_duree_indterminee_avantage').val() === '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez renseigner les champs obligatoire CDI.' : 'Please fill in the mandatory fields CDI.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

}

// RECUPERATION DES TYPE CONTRATS
async function addByTypeContrat() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/type_contrats", config)
        .then((response) => {
            this.type_contrat_id = response.data.data;
            // console.log("dataTypeContrat", type_contrat_id);

            $.each(this.type_contrat_id, function(i, d) {
                // console.log("dataTypeContrat", d.code);
                if (d.code == "STE") {
                    addContratDureeContratStageEcole();
                }

                if (d.code == "STP") {
                    addContratProfessionnelQualification();
                }

                if (d.code == "CDDE") {

                }

                if (d.code == "CDDP") {

                }

                if (d.code == "CDD") {

                }

                if (d.code == "CDIE") {
                    addContratDureeIndetermineeAvecEssai();
                }

                if (d.code == "CDI") {
                    addContratDureeIndeterminee();
                }

                if (d.code == "CI") {

                }

                if (d.code == "CE") {

                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.type_contrat_id = [];
        });
}

addByTypeContrat();