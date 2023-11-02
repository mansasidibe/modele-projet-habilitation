$(".btn_submit").prop('disabled', true);

//periode
$('input[name="echeancier"]').daterangepicker({
    opens: 'left',
    locale: {
        format: 'YYYY-MM-DD',
        separator: ' au ',
        applyLabel: 'Appliquer',
        cancelLabel: 'Annuler',
        weekLabel: 'S',
        daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        monthNames: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        firstDay: 1
    }
}, function(start, end) {

    const differenceInMs = end - start;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    $('#duree').val(Math.ceil(differenceInDays)+1);
});

async function type_budget() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/categorie_slug/TBU", config)
        .then((response) => {
            this.data = response.data.data;
            $.each(this.data, function (i, d) {
                if (langue == "en") {
                    $("#budget").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + "</option>"
                    );
                } else {
                    $("#budget").append(
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

$('#input_domaineactivite, #echeancier, #duree, #ressource, #unite_oeuvre, #quantite, #prix_unitaire, #montant, #repeter_mois, #note').keyup(function () {
    if ($('#input_domaineactivite').val() != '' && $('#echeancier').val() != ""
        && $('#duree').val() != "" && $('#ressource').val() != "" && $('#unite_oeuvre').val() != ""
        && $('#quantite').val() != "" && $('#prix_unitaire') && $('#montant').val() != "" && $('#repeter_mois').val() != ""
        && $('#note').val() != "") {
        $(".btn_submit").prop('disabled', false);
    }
  });
