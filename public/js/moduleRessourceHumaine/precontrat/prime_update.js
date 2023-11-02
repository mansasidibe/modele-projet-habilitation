// Add new row

var resultat = true
var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
var localeJquery = $('html').attr('lang');

function get_primes(datas) {
    var t = $('.tableP').DataTable();
    t.clear();

    $(datas).each(function(count, item) {
        console.log("item", item);
        // t.row.add(
        var tab1 = [

                // '<input type="hidden" class="cacher " style="border:none;" value="' + count + '"  data="id' + count + '"/>',
                '<input type="text" readonly="true"  style="border:none;" value="' + item.categorie.libelle_fr + '"  data="prime_libelle' + count + '"  /> <input type="text"  style="border:none; display:none;" value="' + item.categorie.id + '" name="tab[' + count + '][prime_id]" data="prime_id' + count + '"/>',
                '<input type="text" readonly="true"  style="border:none;" value="' + formatMoneyJs(item.montant) + '" name="tab[' + count + '][montant]" data="montant' + count + '" />',
                ' <a href="#" ><i class="fa fa-edit" id="edit_p" data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>'
            ]
            // );
        t.row.add(tab1);



    });
    t.draw(false);
    // t.draw(false);
    // $('tr td:first-child').hide();
    count++;
    count = datas.length;
}

let count = 0;
$(document).on('click', '#add-row', function(e) {
    e.preventDefault();
    if ($('.prime_id').val() === '' || $('#montant').val() === '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez renseigner les champs de la prime.' : 'Please complete the premium fields',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {

        var prime_id = $('.prime_id').val();
        var prime_libelle = $('#input_primes').val();
        var montant = $('#montant').val();
        var id = $('#idModif').val();

        if (id !== '') {

            $('input[data=prime_libelle' + id + ']').val($('input[id=input_primes]').val())
            $('input[data=montant' + id + ']').val($('input[id=montant]').val())

            EmptyChamp();

        } else {
            var t = $('.tableP').DataTable();
            var tab_designation = [
                '<input type="text" readonly="true"  style="border:none;" value="' + prime_libelle + '"  data="prime_libelle' + count + '"  /> <input type="text"  style="border:none; display:none;" value="' + prime_id + '" name="tab[' + count + '][prime_id]" data="prime_id' + count + '"/>',
                '<input type="text" readonly="true"  style="border:none;" value="' + formatMoneyJs(montant) + '" name="tab[' + count + '][montant]" data="montant' + count + '" />',
                '<a href="#"><i class="fa fa-edit" id="edit_p"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_designation)
            t.draw();
            EmptyChamp();
            count++;
        }

    }
});


//modification
$(document).on('click', '#edit_p', function() {
    let ligne = $(this).attr('data');
    $('input[id=idModif]').val(ligne);

    $('input[id=input_primes]').val($('input[data=prime_libelle' + ligne + ']').val());
    $('input[id=prime_id]').val($('input[data=prime_id' + ligne + ']').val());
    $('input[id=montant]').val($('input[data=montant' + ligne + ']').val());

    if ($('input[id=idModif]').val() >= 0) {
        localeJquery == "en" ? $('.btn_add').text('Edit prime') : $('.btn_add').text('Modifier prime');
    }


});

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
            var table = $('#examples').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

function checkDouble(prime_id) {

    for (let index = 0; index < count; index++) {

        if ($('input[data=prime_id' + index + ']').val() === prime_id && prime_id != prime_id) {
            return true;
        }

    }
    return false
}

function EmptyChamp() {
    $('input[id=idModif]').val('');
    $('input[id=prime_id]').val('');
    $('input[id=input_primes]').val('');
    $('input[id=montant]').val('');

}

/**
 *METHODE D'ENCODAGE
 * @param {*} str
 * @returns
 */
function encode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}