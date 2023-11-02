//  alert('erty');

let store_telephone = "";
let store_email = "";

intlInput("#portable", "ci", null);

function intlInput(portable, alpha, numero) {

    // console.log(alpha);
    // console.log(numero);
    var phoneInputID = portable;
    var input = document.querySelector(phoneInputID);

    var iti = window.intlTelInput(input, {
        // allowDropdown: false,
        autoHideDialCode: false,
        // autoPlaceholder: "off",
        // dropdownContainer: document.body,
        // excludeCountries: ["us"],
        formatOnDisplay: false,
        // geoIpLookup: function(callback) {
        //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
        //     var countryCode = (resp && resp.country) ? resp.country : "";
        //     callback(countryCode);
        //   });
        // },
        hiddenInput: "full_number",
        // initialCountry: "auto",
        localizedCountries: { 'fr': 'French' },
        nationalMode: false,
        // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        // placeholderNumberType: "MOBILE",
        preferredCountries: [alpha],
        separateDialCode: false,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
    });


    $(phoneInputID).on("countrychange", function(event) {

        // Get the selected country data to know which country is selected.
        var selectedCountryData = iti.getSelectedCountryData();
        console.log("countrychange :", selectedCountryData.iso2);
        $('.indicator').val(selectedCountryData.iso2);
        // Get an example number for the selected country to use as placeholder.
        // newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
        newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.E164),

            // Reset the phone number input.
            iti.setNumber("");
        input.value = "";
        if (selectedCountryData.iso2 === "ci")
            newPlaceholder = newPlaceholder + " 48";
        // Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
        // mask = newPlaceholder.replace(/[1-9]/g, "0");
        mask = newPlaceholder.replace(/[1-9]/g, "0");
        console.log(mask);
        // Apply the new mask for the input
        $(this).mask(mask);
        if (numero !== null) {
            input.value = numero;

        }
    });


    // When the plugin loads for the first time, we have to trigger the "countrychange" event manually,
    // but after making sure that the plugin is fully loaded by associating handler to the promise of the
    // plugin instance.

    iti.promise.then(function() {
        $(phoneInputID).trigger("countrychange");
    });

}

// Add new row

var resultat = true
    // let cst_langue = document.querySelector('input[class="cst_langue"]');
    // langue = cst_langue.value;

var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
var localeJquery = $('html').attr('lang');

function get_contact(datas) {
    var t = $('.table').DataTable();
    t.clear();

    console.log("datas", datas.length);

    $(datas).each(function(count, item) {

        let r_checked = "";
        if (item.interlocuteur == 1) r_checked = "checked";



        // t.row.add(
        var tab1 = [

                // setting a timeoutM.Mlle.Mme.
                // '<input type="text" class="cacher" style="border:none;" value="' + item.id + '"  data="id' + item.id + '"/>',
                '<input type="hidden" class="cacher " style="border:none;" value="' + count + '"  data="id' + count + '"/>',
                // item.civilite == 1 ? ('M.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '"  name="civilite" data="civilite" />') : (item.civilite == 2 ? ('Mlle.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '" name="civilite" data="civilite" />') : ('Mme.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '" name="civilite" data="civilite" />')),
                // item.civilite == 1 ? ('M.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '" name="tab[' + count + '][civilite]" data="civilite' + count + '" />') : (item.civilite == 2 ? ('Mlle.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '" name="tab[' + count + '][civilite]" data="civilite' + count + '" />') : ('Mme.<input type="text"  style="border:none; display:none;" value="' + item.civilite + '" name="tab[' + count + '][civilite]" data="civilite' + count + '" />')),
                item.civilite.libelle_fr + '<input type="hidden" class="cacher " readonly="true"  style="border:none;" value="' + item.civilite.id + '" name="tab[' + count + '][civilite]" data="civilite' + count + '" />',

                // '<input type="text" readonly="true" style="border:none;" value="' + data.nom + '" name="nom" data="nom" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.nom + '" name="tab[' + count + '][nom]" data="nom' + count + '" />',

                // '<input type="text" readonly="true" style="border:none;" value="' + data.prenom + '" name="prenom" data="prenom"  />',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.prenom + '" name="tab[' + count + '][prenom]" data="prenom' + count + '" />',

                // '<input type="text" readonly="true" style="border:none;" value="' + data.fonction + '" name="fonction" data="fonction" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.fonction + '" name="tab[' + count + '][fonction]" data="fonction' + count + '" />',

                // '<input type="text" readonly="true" style="border:none;" value="' + data.portable + '" name="portable" data="portable" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.portable + '" name="tab[' + count + '][portable]" data="portable' + count + '" />',


                // '<input class="indicator" type="text" readonly="true" style="border:none;" value="' + item.afa_pays + '" name="indicator" data="indicator" />',
                '<input type="text"  readonly="true"  style="border:none;" value="' + item.pays.alpha + '" name="tab[' + count + '][indicator]" data="indicator' + count + '" />',


                // '<input type="text" readonly="true" style="border:none;" value="' + data.email + '" name="email" data="email" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.email + '" name="tab[' + count + '][email]" data="email' + count + '" />',

                '<input type="hidden"   name="tab[' + count + '][interlocuteur]" checked="checked" data="interlocuteur' + count + '" value="' + item.interlocuteur + '" /><input type="radio" id="interlocuteur" name="interlocuteur" onclick="changeInterlocuteurbd(' + count + ')" style="border:none;" data="rinterlocuteur' + count + '" value="' + item.interlocuteur + '" ' + r_checked + ' / > ',

                ' <a href="#" ><i class="fa fa-edit" id="edit" data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
            ]
            // );
        t.row.add(tab1);



    });
    t.draw(false);
    t.draw(false);
    $('tr td:first-child').hide();
    count++;
    count = datas.length;
}

$('#add-row').click(function(event) {
    event.preventDefault()
    resultat = true


    if ($('.civilite').val() == '') {
        if (localeJquery = 'en') {
            $('#helpCivilite').text('Please fill in the title').css('color', 'red');
        }
        $('#helpCivilite').text('Veuillez renseigner la civilite').css('color', 'red');
        resultat = false
        return resultat
    } else {
        $('#helpCivilite').text('')
        var civiliteVal = $('.civilite').val();

        var civiliteText = $('.civilite option[value="' + civiliteVal + '"]').text();


        console.log(civiliteText, ' - ', civiliteVal);
        resultat = true
    }

    if ($('#nom').val() == '') {
        if (localeJquery = 'en') {
            $('#helpNom').text('Please fill in the name').css('color', 'red');
        }
        $('#helpNom').text(encode_utf8('Veuillez renseigner le nom')).css('color', 'red');
        resultat = false
        return resultat
    } else {
        $('#helpNom').text('')
        var nom = $('#nom').val();
        resultat = true
    }

    if ($('#prenom').val() == '') {
        if (localeJquery = 'en') {
            $('#helpPrenom').text('Please fill in the first name').css('color', 'red');
        }
        $('#helpPrenom').text(encode_utf8('Veuillez renseigner le prenom')).css('color', 'red');
        resultat = false
        return resultat
    } else {
        $('#helpPrenom').text('')
        var prenom = $('#prenom').val();
        resultat = true
    }

    if ($('#fonction').val() == '') {
        if (localeJquery = 'en') {
            $('#helpFonction').text('Please fill in the function').css('color', 'red');
        }
        $('#helpFonction').text(encode_utf8('Veuillez renseigner la fonction')).css('color', 'red');
        resultat = false
        return resultat
    } else {
        $('#helpFonction').text('')
        var fonction = $('#fonction').val();
        resultat = true
    }

    if ($('#portable').val() == '') {
        if (localeJquery = 'en') {
            $('#helpPortable').text('Please fill in the mobile').css('color', 'red');
        }
        $('#helpPortable').text(encode_utf8('Veuillez renseigner le portable')).css('color', 'red');
        resultat = false
        return resultat
    }

    // else if(!$.isNumeric($('#portable').val())){
    //   if(localeJquery='en'){
    //     $('#helpPortable').text('only the number is allowed').css('color', 'red');
    //   }
    //   $('#helpPortable').text(encode_utf8('seul le nombre est autorisé')).css('color', 'red');
    //   resultat = false
    //   return resultat

    // }

    // else if($('#portable').val().length != 8){
    //   if (localeJquery ='en') {
    //     $('#helpPortable').text('Mobile number must be 10 digits').css('color', 'red');
    //   }
    //   $('#helpPortable').text(encode_utf8('Le numero de portable doit etre de 10 chiffres')).css('color', 'red');
    //   resultat = false
    //   return resultat
    // }
    else {
        $('#helpPortable').text('')
        var portable = $('#portable').val();
        resultat = true
    }

    var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if ($('#email').val() == '') {
        if (localeJquery = 'en') {
            $('#helpEmail').text('Please fill in the email').css('color', 'red');
        }
        $('#helpEmail').text(encode_utf8('Veuillez renseigner le email')).css('color', 'red');
        resultat = false;
        return resultat;
    } else if (!pattern1.test($('#email').val())) {
        if (localeJquery = 'en') {
            $('#helpEmail').text(encode_utf8('Please enter a valid email')).css('color', 'red');
        }
        $('#helpEmail').text(encode_utf8('Veuillez renseigner un mail valide')).css('color', 'red');
        resultat = false;
        return resultat;
    } else {
        $('#helpEmail').text('');
        var email = $('#email').val();
        resultat = true;
    }

    var indicator = $('.indicator').val();

    let ligne = $(this).attr('data')

    $('.table tbody').find('tr .dataTables_empty').remove(); //remove empty element

    $('.table').each(function() {
        var tr = $(this).find('tr')

        var id = tr.find('input[data=id' + $('input[id=idModif]').val() + ']').val();



        if (id !== undefined) {
            //Modifier contact
            if (checkDouble($('input[id=portable]').val(), $('input[id=email]').val())) {
                Swal.fire({
                    title: "Le num\u00e9ro de t\u00e9l\u00e9phone ou l'E-mail existe ",
                    icon: 'warning',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            } else {


                $('input[data=id' + id + ']').val($('input[id=idModif]').val())
                $('input[data=civilite' + id + ']').val($('.civilite').val())
                $('input[data=civiliteText' + id + ']').val($('.civilite option[value="' + civiliteVal + '"]').text())
                $('input[data=nom' + id + ']').val($('input[id=nom]').val())
                $('input[data=prenom' + id + ']').val($('input[id=prenom]').val())
                $('input[data=fonction' + id + ']').val($('input[id=fonction]').val())
                $('input[data=portable' + id + ']').val($('input[id=portable]').val())
                $('input[data=indicator' + id + ']').val($('input[id=indicator]').val())
                $('input[data=email' + id + ']').val($('input[id=email]').val())


                EmptyChamp();
                store_email = "";
                store_telephone = "";
            }

        } else {

            //Ajouter contact
            if (checkDouble($('input[id=portable]').val(), $('input[id=email]').val())) {

                // alert("Le num\u00e9ro de t\u00e9l\u00e9phone ou l'E-mail existe ");
                Swal.fire({
                    title: "Le num\u00e9ro de t\u00e9l\u00e9phone ou l'E-mail existe ",
                    icon: 'warning',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

            } else {


                //Table
                var t = $('.tableL').DataTable();

                var tab1 = [
                    '<input type="hidden" class="cacher" style="border:none;" value="' + count + '"  data="id' + count + '"/>',
                    '<input type="text" readonly="true"  style="border:none; " value="' + civiliteText + '"  data="civiliteText' + count + '"  /> <input type="text"  style="border:none; display:none;" value="' + civiliteVal + '" name="tab[' + count + '][civilite]" data="civilite' + count + '"/>',
                    '<input type="text" readonly="true"  style="border:none;" value="' + nom + '" name="tab[' + count + '][nom]" data="nom' + count + '" />',
                    '<input type="text" readonly="true"  style="border:none;" value="' + prenom + '" name="tab[' + count + '][prenom]" data="prenom' + count + '" />',
                    '<input type="text" readonly="true"  style="border:none;" value="' + fonction + '" name="tab[' + count + '][fonction]" data="fonction' + count + '" />',
                    '<input type="text" readonly="true"  style="border:none;" value="' + portable + '"    name="tab[' + count + '][portable]" data="portable' + count + '" />',
                    '<input type="text"   style="border:none;" value="' + indicator + '"    name="tab[' + count + '][indicator]" data="indicator' + count + '" />',
                    '<input type="text" readonly="true"   style="border:none;" value="' + email + '" name="tab[' + count + '][email]" data="email' + count + '" />',
                    '<input type="hidden"   name="tab[' + count + '][interlocuteur]" data="interlocuteur' + count + '" /><input type="radio" id="interlocuteur" onclick="changeInterlocuteurbd(' + count + ')"  data="rinterlocuteur' + count + '"  style="border:none;" value="0" name="interlocuteur" data="' + count + '" />',
                    '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
                ];
                t.row.add(tab1);
                t.draw(false);
                count++;
                //Cacher le premier element du tableau
                $('tr td:first-child').hide();
                //Vider les champs
                EmptyChamp();
            }
        }
    })





})



//modification
$(document).on('click', '#edit', function() {

    let ligne = $(this).attr('data');
    // alert(ligne);
    $('input[id=ligne]').val(ligne);
    $('input[id=idModif]').val($('input[data=id' + ligne + ']').val());
    // $('input[data=civilite]').val(civiliteText);
    $('.civilite option').removeAttr('selected');
    $('.civilite option[value = "' + $('input[data=civilite' + ligne + ']').val() + '"]').attr('selected', true);
    // $('.civilite option').filter(function() { return $(this).html() == $('input[data=civilite' + ligne + ']').val(); }).prop('selected ', true);
    // $('.civilite option').filter(function() { return $(this).html() == $('input[data=civilite' + ligne + ']').val(); }).prop('selected ', true);
    console.log($('.civilite option[value = "' + $('input[data=civilite' + ligne + ']').val() + '"]').html());
    $('input[id=nom]').val($('input[data=nom' + ligne + ']').val());
    $('input[id=prenom]').val($('input[data=prenom' + ligne + ']').val());
    $('input[id=fonction]').val($('input[data=fonction' + ligne + ']').val());
    $('input[id=portable]').val($('input[data=portable' + ligne + ']').val());
    $('input[id=indicator]').val($('input[data=indicator' + ligne + ']').val());

    // alert($('input[data=indicator'+ligne+']').val());

    // intlInput($('input[data=portable'+ligne+']').val(), $('input[data=indicator'+ligne+']').val());

    // intlInput("#portable", $('input[data=indicator'+ligne+']').val());
    intlInput("#portable", $('input[data=indicator' + ligne + ']').val(), $('input[data=portable' + ligne + ']').val());

    $('input[id=email]').val($('input[data=email' + ligne + ']').val());


    store_telephone = $('input[data=portable' + ligne + ']').val();
    store_email = $('input[data=email' + ligne + ']').val();

    if ($('input[id=idModif]').val($('input[data=id' + ligne + ']').val())) {
        $('.btn_add').text('Editer')
    }


});

//suppression
$(document).on('click', '#delete', function() {
    Swal.fire({
        // title: 'Are you sure?',
        text: "Voulez-vous supprimer cette ligne ?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        if (result.value) {
            let ligne = $(this).attr('data');
            // $($(this).closest("tr")).remove()
            var table = $('#example').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});


//interlocuteur
$(document).on('click', '#interlocuteur', function() {

    let ligne = $(this).attr('data');
    // alert(ligne);
    $('input[data=interlocuteur' + ligne + ']').val($('input[data=rinterlocuteur' + ligne + ']').val());
});

function changeInterlocuteur(counter) {
    $('input[data=interlocuteur' + counter + ']').val(1);
    for (let index = 0; index < count; index++) {
        if (index != counter) {
            $('input[data=interlocuteur' + index + ']').val(0);
        }

    }
}

function checkDouble(portable, email) {

    for (let index = 0; index < count; index++) {

        if ($('input[data=portable' + index + ']').val() === portable && portable != store_telephone) {
            return true;
        }
        if ($('input[data=email' + index + ']').val() === email && email != store_email) {
            return true;
        }
        if (($('input[data=portable' + index + ']').val() === portable && $('input[data=email' + index + ']').val() === email) && (portable != store_telephone && email != store_email)) {
            return true;
        }
    }
    return false
}

function EmptyChamp() {
    $('input[id=idModif]').val('');
    $('input[id=civilite]').val('');
    $('input[id=nom]').val('');
    $('input[id=prenom]').val('');
    $('input[id=fonction]').val('');
    $('input[id=portable]').val('');
    // $('input[id=indicator]').val('');
    $('input[id=email]').val('');
}

// console.log("radio", $('input[type=radio]'));
///changer interlocuteur
function changeInterlocuteurbd(id_interlocuteur) {



    for (let index = 0; index <= (count - 1); index++) {

        if (index == parseInt(id_interlocuteur)) {

            $('input[data = "rinterlocuteur' + index + '"]').attr('checked', true);
            $('input[data = "rinterlocuteur' + index + '"]').val(1);
            $('input[data = "interlocuteur' + index + '"]').val(1);

        } else {
            $('input[data = "rinterlocuteur' + index + '"]').removeAttr('checked');
            $('input[data = "rinterlocuteur' + index + '"]').val(0);
            $('input[data = "interlocuteur' + index + '"]').val(0);

        }
    }

}

/**
 *METHODE D'ENCODAGE
 * @param {*} str
 * @returns
 */
function encode_utf8(s) {
    return decodeURIComponent(escape(s));
}
