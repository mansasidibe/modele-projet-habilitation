
let editor;
let editor2;

ClassicEditor
    .create(document.querySelector('#editor'))
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

ClassicEditor
    .create(document.querySelector('#editor2'))
    .then(newEditor => {
        editor2 = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

// const editorData = editor.getData();
// const editorData2 = editor2.getData();
// console.log(editorData);
// console.log(editorData2);
// editor2.setData("");
// editor.setData("");


function viderChamps() {
    $('#reference').val('');
    $('#type_id').val('');
    $('#input_type').val('');
    $('#titre_fr').val('');
    $('#titre_en').val('');
    editor2.setData("");
    editor.setData("");
    $('#ligne').val('');
}



let count = 0;
//Ajouter produits dans la liste
$(document).on('click', '#add_ligne', function (e) {
    e.preventDefault();
    
    if ($('#reference').val() === '' || $('#input_type').val() === '' || $('#titre_fr').val() === '' || $('#titre_en').val() === '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez renseigner tous les champs obligatoires.' : 'Please fill in the fields of the line',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

    } else {
        $('#btn_submit').removeAttr('disabled');

        var reference = $('#reference').val();
        var type_id = $('#type_id').val();
        var titre_fr = $('#titre_fr').val();
        var titre_en = $('#titre_en').val();
        const editorData = editor.getData();
        const editorData2 = editor2.getData();
        var id = $('#ligne').val();

        if (id !== '') {
            $('input[data=reference' + id + ']').val(reference);
            $('span[id=reference' + id + ']').html(reference);
            //
            $('input[data=type_id' + id + ']').val(type_id);
            $('span[id=type_id' + id + ']').html($('#input_type').val());
            //
            $('input[data=titre_fr' + id + ']').val(titre_fr);
            $('span[id=titre_fr' + id + ']').html(titre_fr);
            //
            $('input[data=titre_en' + id + ']').val(titre_en);
            $('span[id=titre_en' + id + ']').html(titre_en);
            //
            $('input[data=editorData' + id + ']').val(editorData);
            $('span[id=editorData' + id + ']').html(editorData);
            //
            $('input[data=editorData2' + id + ']').val(editorData2);
            $('span[id=editorData2' + id + ']').html(editorData2);
            viderChamps();

        } else {
            var t = $('.tableL').DataTable();
            var tab_designation = [
                '<span id="reference' + count + '">' + reference + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + reference + '" name="tab[' + count + '][reference]" data="reference' + count + '"/>',
                '<span id="type_id' + count + '">' + $('#input_type').val() + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + type_id + '" name="tab[' + count + '][type_id]" data="type_id' + count + '"/>',
                '<span id="titre_fr' + count + '">' + titre_fr + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + titre_fr + '" name="tab[' + count + '][titre_fr]" data="titre_fr' + count + '"/>',
                '<span id="titre_en' + count + '">' + titre_en + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + titre_en + '" name="tab[' + count + '][titre_en]" data="titre_en' + count + '"/>',
                '<span id="editorData' + count + '">' + editorData + '</span>' + '<input type="hidden" readonly="true" style="border:none;" value="' + editorData + '" name="tab[' + count + '][editorData]" data="editorData' + count + '"/>',
                '<span id="editorData2' + count + '">' + editorData2 + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + editorData2 + '" name="tab[' + count + '][editorData2]" data="editorData2' + count + '"/>',
                '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_designation)
            t.draw();
            viderChamps();
            count++;
        }

    }
});


// // recupéreration des lignes produits
// function ligneExistante(data) {
//     var t = $('.tableL').DataTable();

//     $(data).each(function (count, item) {
//         var tab_designation = [
//             '<span id="designation' + count + '">' + item.libelle + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + item.libelle + '" name="tab[' + count + '][designation]" data="designation' + count + '"/>',
//             '<span id="montant' + count + '">' + item.montant + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + item.montant + '" name="tab[' + count + '][montant]" data="montant' + count + '"/>',
//             '<span id="quantite' + count + '">' + item.quantite + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + item.quantite + '" name="tab[' + count + '][quantite]" data="quantite' + count + '"/>',
//             '<span id="cout_dev' + count + '">' + item.montant * item.quantite + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + item.montant * item.quantite + '" name="tab[' + count + '][cout_dev]" data="cout_dev' + count + '"/>',
//             '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
//         ]
//         t.row.add(tab_designation);
//     });
//     t.draw();
// }


// Fonction externe pour obtenir la taille du tableau
// function obtenirTailleTableau() {
//     var t = $('.tableL').DataTable();
//     var tailleTableau = t.rows().count();
//     count = count + tailleTableau;
// }


//modification
$(document).on('click', '#edit', function () {

    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#reference')).val($('input[data=reference' + ligne + ']').val());
    $($('#type_id')).val($('input[data=type_id' + ligne + ']').val());
    $($('#input_type')).val($('#type_id' + ligne).text());
    $($('#titre_fr')).val($('input[data=titre_fr' + ligne + ']').val());
    $($('#titre_en')).val($('input[data=titre_en' + ligne + ']').val());
    editor.setData($('input[data=editorData' + ligne + ']').val());
    editor2.setData($('input[data=editorData2' + ligne + ']').val());
});

//suppression
$(document).on('click', '#delete', function () {
    Swal.fire({
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
            var table = $('#example').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();

            tCoutDev($('#marge').val());
        }
    });
});



//Ajouter produits dans la liste
$(document).on('click', '#add_ligne_update', function (e) {
    e.preventDefault();
    $( ".btn_valider" ).remove();

    const editorData = editor.getData();
    const editorData2 = editor2.getData();
    //
    $('#btn_submit').removeAttr('disabled');
    //
    var t = $('.tableL').DataTable();
    var tab_designation = [
        '<span id="editorData' + count + '">' + editorData + '</span>' + '<input type="hidden" readonly="true" style="border:none;" value="' + editorData + '" name="tab[' + count + '][editorData]" data="editorData' + count + '"/>',
        '<span id="editorData2' + count + '">' + editorData2 + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + editorData2 + '" name="tab[' + count + '][editorData2]" data="editorData2' + count + '"/>',
    ]
    t.row.add(tab_designation)
    t.draw();

});

