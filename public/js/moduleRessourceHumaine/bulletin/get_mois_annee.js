const moisNoms = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

function remplirChampMois() {
    const selectAnnee = document.getElementById('select-annee');
    const selectMois = document.getElementById('select-mois');

    selectMois.innerHTML = '';

    const date = new Date();
    const anneeActuelle = date.getFullYear();
    const moisActuel = date.getMonth() + 1; // Ajouter 1 car les mois commencent à partir de 0

    const anneeSelectionnee = parseInt(selectAnnee.value);

    for (let i = 0; i < moisNoms.length; i++) {
        if (anneeSelectionnee === anneeActuelle && (i + 1) > moisActuel) {
            break;
        }

        const option = document.createElement('option');
        option.value = i + 1;
        option.text = moisNoms[i];
        selectMois.appendChild(option);
    }

    // Sélectionner par défaut le dernier mois
    selectMois.value = moisActuel;
    var mois_actuel = selectMois.value;
    $('#mois_actuel').val(mois_actuel);
    // console.log("mois_actuel :", mois_actuel);
}

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
    // console.log("annee_actuelle :", annee_actuelle);
}

// Remplir les champs année et mois au chargement de la page
remplirChampAnnee();
remplirChampMois();

// Écouter le chargement complet de la page
window.addEventListener('load', function() {
    const selectAnnee = document.getElementById('select-annee');
    const selectMois = document.getElementById('select-mois');

    // Ajouter une option de placeholder pour le champ select année
    const placeholderAnnee = document.createElement('option');
    placeholderAnnee.value = '';
    placeholderAnnee.text = 'Année';
    placeholderAnnee.disabled = true;
    placeholderAnnee.selected = true;
    selectAnnee.insertBefore(placeholderAnnee, selectAnnee.firstChild);

    // Ajouter une option de placeholder pour le champ select mois
    const placeholderMois = document.createElement('option');
    placeholderMois.value = '';
    placeholderMois.text = 'Mois';
    placeholderMois.disabled = true;
    placeholderMois.selected = true;
    selectMois.insertBefore(placeholderMois, selectMois.firstChild);
});

// Écouter le changement de l'année sélectionnée
const selectAnnee = document.getElementById('select-annee');
selectAnnee.addEventListener('change', function() {
    remplirChampMois();
    const anneeSelectionnee = selectAnnee.value;
    $('#anneeSelectionnee').val(anneeSelectionnee);
    console.log("Année sélectionnée :", anneeSelectionnee);
});

// Écouter le changement du mois sélectionné
const selectMois = document.getElementById('select-mois');
selectMois.addEventListener('change', function() {
    const moisSelectionne = selectMois.value;
    const nomMoisSelectionne = moisNoms[moisSelectionne - 1];
    $('#moisSelectionne').val(moisSelectionne);
    console.log("Mois sélectionné :", nomMoisSelectionne);
});