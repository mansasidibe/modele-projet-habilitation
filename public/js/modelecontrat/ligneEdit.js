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


function viderChamps() {
    // $('#type_id').val('');
    // $('#input_type').val('');
    // //
    $('#input_article').val('');
    $('#article_id').val('');
    //
    editor2.setData("");
    editor.setData("");
    //
    $('#position').val('');
    $('#ligne').val('');
}


let count = 0;

// METHODE DE RECUPERATION DES VILLE PAR PAYS (VALABLE)
// $(document).on('keyup', '#input_type', function () {
//     var type_id = $('#type_id').val();
//     var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
//     var localeJquery = $('html').attr('lang');
//     // console.log("pays_id",pays_id);

//     $.ajax({
//         async: true,
//         url: '/api/v1/get_article_by_type_contrat/' + type_id,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//         },
//         type: "GET",
//         dataType: 'json',
//         success: function (data) {
//             // console.log("data:", data);
//             $('#datalist-article').empty();
//             if (localeJquery == "en") {
//                 $("#datalist-article").append(
//                     "<option value=''>Please select</option>"
//                 );
//             } else {
//                 $("#datalist-article").append(
//                     "<option value=''>Veuillez selectionner</option>"
//                 );
//             }

//             $.each(data.data, function (i, d) {
//                 $('#datalist-article').append('<option data-id="' + d.id + '" value="' + d.titre_fr + '">');
//             });

//             $(document).on("change", "#input_article", function () {
//                 var val = $("#input_article").val();
//                 var id = $("#datalist-article" + ' option').filter(function () {
//                     return this.value == val;
//                 }).data('id');

//                 $("#article_id").val(id);
//                 //////show article
//                 $.ajax({
//                     async: true,
//                     url: '/api/v1/articles/' + id,
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer ' + token,
//                     },
//                     type: "GET",
//                     dataType: 'json',
//                     success: function (data) {
//                         console.log("data:", data.data.description_en);
//                         const editorData = editor.getData();
//                         const editorData2 = editor2.getData();

//                         $('#datalist-article').empty();
//                         // if (localeJquery == "en") {
//                         // editor.setData("francais");
//                         editor.setData(data.data.description_fr);
//                         // console.log("description_fr:",data.data.description_fr);
//                         // } else {
//                         editor2.setData(data.data.description_en);
//                         // console.log("description_fr:",data.data.description_fr);
//                         // }
//                     },
//                     error: function (error) {
//                         console.log(error);
//                     },

//                 });
//             });
//         },
//         error: function (error) {
//             console.log(error);
//         },

//     });

// });

//edit
$(document).on('click', '#edit', function () {
    //
    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    // $($('#type_id')).val($('input[data=type_id' + ligne + ']').val());
    // $($('#input_type')).val($('#type_id' + ligne).text());
    //
    $($('#article_id')).val($('input[data=article_id' + ligne + ']').val());
    $($('#input_article')).val($('#article_id' + ligne).text());
    //
    $($('#position')).val($('input[data=position' + ligne + ']').val());
    //
    editor.setData($('input[data=editorData' + ligne + ']').val());
    editor2.setData($('input[data=editorData2' + ligne + ']').val());
});

//delete
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
        }
    });
});

$(document).on('click', '#add_ligne_update', function (e) {
    e.preventDefault();

    const position = $('#position').val();
    //
    var id = $('#ligne').val();

    if (id !== '') {


        $('input[data=position' + id + ']').val(position);
        $('span[id=position' + id + ']').html(position);
        viderChamps();

    } else {
        var t = $('.tableL').DataTable();
        var tab_designation = [
            '<span id="article_id' + i + '">' + d.article.titre_fr + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + d.article.id + '" name="tab[' + i + '][article_id]" data="article_id' + i + '"/>',
            '<span id="position' + i + '">' + $('#position').val() + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + $('#position').val() + '" name="tab[' + i + '][position]" data="position' + i + '"/><input type="hidden" readonly="true" style="border:none;" value="' + d.article.description_fr + '" name="tab[' + i + '][editorData]" data="editorData' + i + '"/><input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + d.article.description_en + '" name="tab[' + i + '][editorData2]" data="editorData2' + i + '"/>',
            '<a href="#"><i class="fa fa-edit" id="edit"  data="' + i + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + i + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_designation)
        t.draw();
        viderChamps();
        count++;
    }
});