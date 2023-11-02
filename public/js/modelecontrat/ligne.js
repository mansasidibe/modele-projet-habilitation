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
    $('#type_id').val('');
    $('#input_type').val('');
    //
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
// //Ajouter produits dans la liste
$(document).on('click', '#add_ligne', function (e) {
    e.preventDefault();
    if ($('#type_id').val() === '' || $('#article_id').val() === ''  || $('#position').val() === '') {
        Swal.fire({
            title: 'Veuillez renseigner tous les champs obligatoires.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

    } else {
        $('#btn_submit').removeAttr('disabled');
        var type_id = $('#type_id').val();
        var input_type = $('#input_type').val();
        //
        var input_article = $('#input_article').val();
        var article_id = $('#article_id').val();
        //
        const editorData = editor.getData();
        const editorData2 = editor2.getData();
        //
        const position = $('#position').val();
        //
        var id = $('#ligne').val();

        if (id !== '') {

            $('input[data=type_id' + id + ']').val(type_id);
            $('span[id=type_id' + id + ']').html($('#input_type').val());
            //
            $('input[data=article_id' + id + ']').val(article_id);
            $('span[id=article_id' + id + ']').html($('#input_article').val());
            //
            $('input[data=position' + id + ']').val(position);
            $('span[id=position' + id + ']').html(position);
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
                '<span id="type_id' + count + '">' + $('#input_type').val() + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + type_id + '" name="tab[' + count + '][type_id]" data="type_id' + count + '"/>',
                '<span id="article_id' + count + '">' + $('#input_article').val() + '</span>' + '<input type="hidden" name="tab[' + count + '][code]" data="code' + count + '" value="' + $('#input_type').val() + '" /><input type="hidden" readonly="true" style="border:none; " value="' + article_id + '" name="tab[' + count + '][article_id]" data="article_id' + count + '"/>',
                '<span id="position' + count + '">' + $('#position').val() + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + position + '" name="tab[' + count + '][position]" data="position' + count + '"/>',
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

// //modification
$(document).on('click', '#edit', function () {
    //
    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);
    $($('#type_id')).val($('input[data=type_id' + ligne + ']').val());
    $($('#input_type')).val($('#type_id' + ligne).text());
    //
    $($('#article_id')).val($('input[data=article_id' + ligne + ']').val());
    $($('#input_article')).val($('#article_id' + ligne).text());
    //
    $($('#position')).val($('input[data=position' + ligne + ']').val());
    //
    editor.setData($('input[data=editorData' + ligne + ']').val());
    editor2.setData($('input[data=editorData2' + ligne + ']').val());
});

// //suppression
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

//
// METHODE DE RECUPERATION DES VILLE PAR PAYS (VALABLE)
$(document).on('keyup', '#input_type', function () {
    var type_id = $('#type_id').val();
    var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
    var localeJquery = $('html').attr('lang');
    // console.log("pays_id",pays_id);

    $.ajax({
        async: true,
        url: '/api/v1/get_article_by_type_contrat/' + type_id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        type: "GET",
        dataType: 'json',
        success: function (data) {
            // console.log("data:", data);
            $('#datalist-article').empty();
            if (localeJquery == "en") {
                $("#datalist-article").append(
                    "<option value=''>Please select</option>"
                );
            } else {
                $("#datalist-article").append(
                    "<option value=''>Veuillez selectionner</option>"
                );
            }

            $.each(data.data, function (i, d) {
                $('#datalist-article').append('<option data-id="' + d.id + '" value="' + d.titre_fr + '">');
            });

            $(document).on("change", "#input_article", function () {
                var val = $("#input_article").val();
                var id = $("#datalist-article" + ' option').filter(function () {
                    return this.value == val;
                }).data('id');

                $("#article_id").val(id);
                //////show article
                $.ajax({
                    async: true,
                    url: '/api/v1/articles/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    type: "GET",
                    dataType: 'json',
                    success: function (data) {
                        console.log("data:", data.data.description_en);
                        const editorData = editor.getData();
                        const editorData2 = editor2.getData();

                        $('#datalist-article').empty();
                        // if (localeJquery == "en") {
                        // editor.setData("francais");
                        editor.setData(data.data.description_fr);
                        // console.log("description_fr:",data.data.description_fr);
                        // } else {
                        editor2.setData(data.data.description_en);
                        // console.log("description_fr:",data.data.description_fr);
                        // }
                    },
                    error: function (error) {
                        console.log(error);
                    },

                });
            });
        },
        error: function (error) {
            console.log(error);
        },

    });

});

