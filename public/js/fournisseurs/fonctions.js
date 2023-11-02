async function pays() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/pays", config)
        .then((response) => {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                if (langue == "en") {
                    $("#pays").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#pays").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
}

async function mode_reglement() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/categorie_slug/MPE", config)
        .then((response) => {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                if (langue == "en") {
                    $("#mode_reglement").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#mode_reglement").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + "</option>"
                    );
                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
}
