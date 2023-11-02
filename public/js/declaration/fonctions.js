function remplirChampAnnee() {
    const selectAnnee = document.getElementById('select-annee');
    selectAnnee.innerHTML = '';

    const date = new Date();
    const anneeActuelle = date.getFullYear();

    for (let annee = anneeActuelle; annee >= anneeActuelle - 10; annee--) {
        const option = document.createElement('option');
        option.value = annee;
        option.text = annee;
        selectAnnee.appendChild(option);
    }

    // Sélectionner par défaut la dernière année
    selectAnnee.value = anneeActuelle;
    var annee_actuelle = selectAnnee.value;
    $('#annee_actuelle').val(annee_actuelle);
}

// Remplir les champs année et mois au chargement de la page
remplirChampAnnee();

// Écouter le chargement complet de la page
window.addEventListener('load', function () {
    const selectAnnee = document.getElementById('select-annee');

    // Ajouter une option de placeholder pour le champ select année
    const placeholderAnnee = document.createElement('option');
    placeholderAnnee.value = '';
    placeholderAnnee.text = 'Année';
    placeholderAnnee.disabled = true;
    placeholderAnnee.selected = true;
    selectAnnee.insertBefore(placeholderAnnee, selectAnnee.firstChild);
});

// Écouter le changement de l'année sélectionnée
const selectAnnee = document.getElementById('select-annee');
selectAnnee.addEventListener('change', function () {
    remplirChampAnnee();
    const anneeSelectionnee = selectAnnee.value;
    $('#annee_declaration').val(anneeSelectionnee);
});

var token = localStorage.getItem("token");
var localeJquery = $('html').attr('lang');
let langue = "{{ app()->getLocale() }}";

function datalist(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async () => {
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
            $(response.data.data).each(function (index, item) {
                var option = $('<option data-id="' + item.id + '" value="' + item.libelle_fr + '"></option>');
                $(id_datalist).append(option);
                $("#test").val(item.libelle_fr);
            });
            // recupération de l'id
            $(document).on("change", id_input_datalist, function () {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function () {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}