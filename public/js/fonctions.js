function isNotEmpty(champs, element = $('.btn_submit')) {
    let result = false;
    if (Array.isArray(champs)) {
        for (var champ of champs) {
            if ($(champ).val() == null || $(champ).val() === '') {
                result = true;
                loading(element, false);
                Swal.fire({
                    text: langue == 'fr' ?
                        "Veuillez renseigner tous les champs obligatoires. " + champ :
                        "Please fill in all required fields.",
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                return false;
            }
        }
        if (!result) {
            return true;
        }
    }
}

function emptyField(champs) {
    let result = false;
    if (Array.isArray(champs)) {
        for (var champ of champs) {
            $(champ).val('');
        }
        return true;
    }
}

function loading(element, isloading = true) {
    if (isloading) {
        localStorage.setItem("mybutton", element.text());
        $(element).html(langue == 'fr' ? 'Chargement...' : 'Loading...');
        $(element).attr('disabled', true);
    } else {
        $(element).html(localStorage.getItem("mybutton"));
        $(element).removeAttr('disabled');
    }
}

function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function checkExist(champ, count = 0) {
    for (let index = 0; index <= count; index++) {
        if ($('input[data=' + champ + index + ']').val() === $('input[name=' + champ + ']').val()) {
            return true;
        }
    }
}

function prorata_temporis(currentDate) {
    const currentYear = currentDate.getFullYear();
    const endDate = new Date(currentYear, 11,31); // 11 corresponds à décembre (les mois sont indexés à partir de 0)
    const timeDifference = endDate - currentDate;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
}

function coefficient(duree){
    console.log(duree);
    if (duree < 4) {
        $coef = 2;
    } else if (duree < 6) {
        $coef = 2.5;
    } else {
        $coef = 3;
    }
    return $coef;
}

function importFile(elt, inputfile) {
    let text, yes, no;
    langue == "en" ? text = "Do you want to replace the file?" : text = "Voulez-vous remplacer le fichier?";
    langue == "en" ? yes = 'Yes' : yes = 'Oui';
    langue == "en" ? no = 'No' : no = 'Non';
    var existant = $('#'+inputfile).val();
    if (existant) {
        Swal.fire({
            // title: 'Are you sure ?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: yes,
            cancelButtonText: no
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.value) {
                $('#'+inputfile).val('');
                elt.querySelector("input").click();
            }
        });
    } else {
        elt.querySelector("input").click();
    }
}

function sub(obj, titre) {
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById(titre).innerHTML = fileName[fileName.length - 1];
    event.preventDefault();
}
