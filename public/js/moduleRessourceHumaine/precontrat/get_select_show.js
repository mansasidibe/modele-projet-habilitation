let langue = "{{ app()->getLocale() }}";
var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
var localeJquery = $('html').attr('lang');


function datalistPays(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async() => {
        try {
            const response = await axios.get(getBaseURL() + url, {
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
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each(function(index, item) {
                if (item.libelle_fr != null) {
                    // console.log("pays:", response);
                    var option = $('<option data-id="' + item.id + '" value="' + item.libelle_fr + '"></option>');
                    $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change", id_input_datalist, function() {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function() {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}


function datalistVille(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async() => {
        try {
            const response = await axios.get(getBaseURL() + url, {
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
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each(function(index, item) {
                if (item.libelle != null) {
                    // console.log("ville:", response);
                    var option = $('<option data-id="' + item.id + '" value="' + item.libelle + '"></option>');
                    $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change", id_input_datalist, function() {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function() {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}


function datalistCommune(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async() => {
        try {
            const response = await axios.get(getBaseURL() + url, {
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
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each(function(index, item) {
                if (item.libelle != null) {
                    // console.log("commune:", response);
                    var option = $('<option data-id="' + item.id + '" value="' + item.libelle + '"></option>');
                    $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change", id_input_datalist, function() {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function() {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}

// afffiche les services en fonction du departement choisi
function getServices(e) {
    console.log(e.options[e.selectedIndex].value);
    var selectVal = e.options[e.selectedIndex].value;
    $.ajax({
        async: true,
        url: '/api/v1/get_service_by_departement/' + selectVal,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            console.log(data);

            $('#service_id').empty();
            if (localeJquery == "en") {
                $("#service_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#service_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }

            $.each(data.data.service, function(i, d) {
                localeJquery == 'fr' ? $("#service_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#service_id").append("<option value='" + d.id + "'>" + d.libelle_en + "</option>");
            });

        },
        error: function(error) {
            console.log(error);
        },

    });
}

// RECUPERATION DE LA LISTE DES TYPES DE CONTRAT
async function getTypeContrats() {
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
            if (localeJquery == "en") {
                $("#type_contrat_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#type_contrat_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.type_contrat_id, function(i, d) {
                // console.log("dataTypeContrat", d.id);
                localeJquery == 'fr' ? $("#type_contrat_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#type_contrat_id").append("<option value='" + d.id + "'>" + d.libelle_en + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.type_contrat_id = [];
        });
}

// RECUPERATION DE LA LISTE DES DIPLOME
async function getDiplome() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_diplome", config)
        .then((response) => {
            this.diplome_id = response.data.data;

            if (localeJquery == "en") {
                $("#diplome_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#diplome_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.diplome_id, function(i, d) {
                localeJquery == 'fr' ? $("#diplome_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#diplome_id").append("<option value='" + d.id + "'>" + d.libelle_en + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.diplome_id = [];
        });
}

// RECUPERATION DE LA LISTE DES ENTREPRISES
async function getEntreprisesStageEcole() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.stage_ecole_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#stage_ecole_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#stage_ecole_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.stage_ecole_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#stage_ecole_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#stage_ecole_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.stage_ecole_entreprise_id = [];
        });
}

async function getEntreprisesStageProfessionnelQualification() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.stage_professionnelQualification_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#stage_professionnelQualification_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#stage_professionnelQualification_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.stage_professionnelQualification_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#stage_professionnelQualification_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#stage_professionnelQualification_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.stage_professionnelQualification_entreprise_id = [];
        });
}

async function getEntreprisesContratDureeIndetermineeEssai() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_duree_indeterminee_essai_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_duree_indeterminee_essai_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_duree_indeterminee_essai_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_duree_indeterminee_essai_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_duree_indeterminee_essai_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_duree_indeterminee_essai_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_duree_indeterminee_essai_entreprise_id = [];
        });
}

async function getEntreprisesContratDureeIndeterminee() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_duree_indterminee_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_duree_indterminee_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_duree_indterminee_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_duree_indterminee_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_duree_indterminee_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_duree_indterminee_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_duree_indterminee_entreprise_id = [];
        });
}

async function getEntreprisesContratDureeDetermineelieProjet() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_duree_determinee_lie_projet_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_duree_determinee_lie_projet_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_duree_determinee_lie_projet_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_duree_determinee_lie_projet_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_duree_determinee_lie_projet_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_duree_determinee_lie_projet_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_duree_determinee_lie_projet_entreprise_id = [];
        });
}

async function getEntreprisesContratDureeDetermineeAvecEssai() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_duree_determinee_avec_essai_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_duree_determinee_avec_essai_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_duree_determinee_avec_essai_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_duree_determinee_avec_essai_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_duree_determinee_avec_essai_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_duree_determinee_avec_essai_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_duree_determinee_avec_essai_entreprise_id = [];
        });
}

async function getEntreprisesContratDureeDeterminee() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_duree_determinee_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_duree_determinee_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_duree_determinee_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_duree_determinee_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_duree_determinee_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_duree_determinee_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_duree_determinee_entreprise_id = [];
        });
}

async function getEntreprisesContratConsultantInterne() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_consultant_interne_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_consultant_interne_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_consultant_interne_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_consultant_interne_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_consultant_interne_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_consultant_interne_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_consultant_interne_entreprise_id = [];
        });
}

async function getEntreprisesContratConsultantExterne() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/entreprises", config)
        .then((response) => {
            this.contrat_consultant_externe_entreprise_id = response.data.data;

            if (localeJquery == "en") {
                $("#contrat_consultant_externe_entreprise_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#contrat_consultant_externe_entreprise_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.contrat_consultant_externe_entreprise_id, function(i, d) {
                localeJquery == 'fr' ? $("#contrat_consultant_externe_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>") : $("#contrat_consultant_externe_entreprise_id").append("<option value='" + d.id + "'>" + d.sigle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.contrat_consultant_externe_entreprise_id = [];
        });
}

// RECUPERATION DE LA LISTE DES NIVEAUX
async function getNiveauxStageEcole() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_niveau", config)
        .then((response) => {
            this.stage_ecole_niveau_id = response.data.data;

            if (localeJquery == "en") {
                $("#stage_ecole_niveau_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#stage_ecole_niveau_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.stage_ecole_niveau_id, function(i, d) {
                localeJquery == 'fr' ? $("#stage_ecole_niveau_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#stage_ecole_niveau_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.stage_ecole_niveau_id = [];
        });
}

async function getNiveauxStageProfessionnelQualification() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_niveau", config)
        .then((response) => {
            this.stage_professionnelQualification_niveau_id = response.data.data;

            if (localeJquery == "en") {
                $("#stage_professionnelQualification_niveau_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#stage_professionnelQualification_niveau_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.stage_professionnelQualification_niveau_id, function(i, d) {
                localeJquery == 'fr' ? $("#stage_professionnelQualification_niveau_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#stage_professionnelQualification_niveau_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.stage_professionnelQualification_niveau_id = [];
        });
}

// RECUPERATION DE LA LISTE DES DEPARTEMENT
async function getDepartement() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_all_departement_action", config)
        .then((response) => {
            this.typeContrats = response.data.data;
            if (localeJquery == "en") {
                $("#organisation_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#organisation_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.typeContrats, function(i, d) {
                localeJquery == 'fr' ? $("#organisation_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#organisation_id").append("<option value='" + d.id + "'>" + d.libelle_en + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.organisation_id = [];
        });
}

// RECUPERATION DE LA LISTE DES POSTES
async function getPostes() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/profil/all", config)
        .then((response) => {
            this.poste_id = response.data.data;

            if (localeJquery == "en") {
                $("#poste_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#poste_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.poste_id, function(i, d) {
                localeJquery == 'fr' ? $("#poste_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>") : $("#poste_id").append("<option value='" + d.id + "'>" + d.libelle_fr + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.poste_id = [];
        });
}

// RECUPERATION DE LA LISTE DES GRADES (GRADES)
async function getGrades() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/grade", config)
        .then((response) => {
            this.grade_id = response.data.data;
            if (localeJquery == "en") {
                $("#grade_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#grade_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.grade_id, function(i, d) {
                localeJquery == 'fr' ? $("#grade_id").append("<option value='" + d.id + "'>" + d.libelle + "</option>") : $("#grade_id").append("<option value='" + d.id + "'>" + d.libelle + "</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.grade_id = [];
        });
}

// RECUPERATION DE LA LISTE DES RESSOURCES (RESSOURCES)
async function getRessouces() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/users", config)
        .then((response) => {
            this.ressources = response.data.data;
            if (localeJquery == "en") {
                $("#ressources").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#ressources").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.ressources, function(i, d) {
                localeJquery == 'fr' ? $("#ressources").append("<option value='" + d.id + "'>" + d.nom + " " + d.prenom + "</option>") : $("#ressources").append("<option value='" + d.id + "'>" + +d.nom + " " + d.prenom + +"</option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.ressources = [];
        });
}

// RECUPERATION DE LA LISTE DES CIVILITE (CIVILITE)
async function getCivilites() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/civilite", config)
        .then((response) => {
            this.civilite_id = response.data.data;
            if (localeJquery == "en") {
                $("#civilite_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#civilite_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.civilite_id, function(i, d) {
                localeJquery == 'fr' ? $("#civilite_id").append("<option value='" + d.id + "'>" + d.libelle_fr + " </option>") : $("#civilite_id").append("<option value='" + d.id + "'>" + d.libelle_en + " </option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.civilite_id = [];
        });
}

// RECUPERATION DE LA LISTE DES TYPES DE PIECES (TYPES DE PIECES)
async function getTypesPieces() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/type_piece", config)
        .then((response) => {
            this.type_piece_id = response.data.data;
            if (localeJquery == "en") {
                $("#type_piece_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#type_piece_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.type_piece_id, function(i, d) {
                localeJquery == 'fr' ? $("#type_piece_id").append("<option value='" + d.id + "'>" + d.libelle_fr + " </option>") : $("#type_piece_id").append("<option value='" + d.id + "'>" + d.libelle_en + " </option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.type_piece_id = [];
        });
}

// RECUPERATION DE LA LISTE DES PROFILS (PROFILS)
async function getProfils() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_profils", config)
        .then((response) => {
            this.profil_id = response.data.data;
            if (localeJquery == "en") {
                $("#profil_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#profil_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.profil_id, function(i, d) {
                localeJquery == 'fr' ? $("#profil_id").append("<option value='" + d.id + "'>" + d.libelle_fr + " </option>") : $("#profil_id").append("<option value='" + d.id + "'>" + d.libelle_en + " </option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.profil_id = [];
        });
}

// RECUPERATION DE LA LISTE DES FILIERES (FILIERES)
async function getFilieres() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/get_filieres", config)
        .then((response) => {
            this.filiere_id = response.data.data;
            if (localeJquery == "en") {
                $("#filiere_id").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#filiere_id").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }
            $.each(this.filiere_id, function(i, d) {
                localeJquery == 'fr' ? $("#filiere_id").append("<option value='" + d.id + "'>" + d.libelle_fr + " </option>") : $("#filiere_id").append("<option value='" + d.id + "'>" + d.libelle_en + " </option>");
            });

        })
        .catch((error) => {
            console.log(error);
            this.filiere_id = [];
        });
}

// EXECUTION DES METHODES DE RECUPERATION
getTypeContrats();
getDiplome();
getEntreprisesStageEcole();
getEntreprisesStageProfessionnelQualification();
getEntreprisesContratDureeIndetermineeEssai();
getEntreprisesContratDureeIndeterminee();
getEntreprisesContratDureeDetermineelieProjet();
getEntreprisesContratDureeDetermineeAvecEssai();
getEntreprisesContratDureeDeterminee();
getEntreprisesContratConsultantInterne();
getEntreprisesContratConsultantExterne();
getNiveauxStageEcole();
getNiveauxStageProfessionnelQualification();
getDepartement();
getPostes();
getGrades();
getRessouces();
getCivilites();
getTypesPieces();
getProfils();
getFilieres();