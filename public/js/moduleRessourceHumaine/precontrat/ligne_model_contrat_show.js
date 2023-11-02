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
    $('#idModif').val('');


}


let count_mc = 0;


//edit
$(document).on('click', '#edit', function() {
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
$(document).on('click', '#delete', function() {
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

$(document).on('click', '#add_ligne_update', function(e) {
    e.preventDefault();

    const position = $('#position').val();
    //
    var type_id = $('#type_id').val();
    var input_type = $('#input_type').val();
    //
    var input_article = $('#input_article').val();
    var article_id = $('#article_id').val();
    //
    const editorData = editor.getData();
    const editorData2 = editor2.getData();
    //
    // const position = $('#position').val();
    // 
    var id = $('#ligne').val();

    if (id !== '') {


        $('input[data=position' + id + ']').val(position);
        $('span[id=position' + id + ']').html(position);

        // 
        $('input[data=type_id' + id + ']').val(type_id);
        $('span[id=type_id' + id + ']').html($('#input_type').val());

        $('input[data=article_id' + id + ']').val(article_id);
        $('span[id=article_id' + id + ']').html($('#input_article').val());

        $('input[data=editorData' + id + ']').val(editorData);
        $('span[id=editorData' + id + ']').html(editorData);

        $('input[data=editorData2' + id + ']').val(editorData2);
        $('span[id=editorData2' + id + ']').html(editorData2);
        // 
        viderChamps();

    } else {
        var t = $('.tableM').DataTable();
        var tab_designation = [
            '<span id="article_id' + i + '">' + d.article.titre_fr + '</span>' + '<input type="hidden" readonly="true" style="border:none; " value="' + d.article.id + '" name="tab_mc[' + i + '][article_id]" data="article_id' + i + '"/>',
            '<span id="position' + i + '">' + $('#position').val() + '</span>' + '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + $('#position').val() + '" name="tab_mc[' + i + '][position]" data="position' + i + '"/>',
            '<input type="hidden" readonly="true" style="border:none;" value="' + editorData + '" name="tab_mc[' + i + '][editorData]" data="editorData' + i + '"/>',
            '<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + editorData2 + '" name="tab_mc[' + i + '][editorData2]" data="editorData2' + i + '"/>',
            '<a href="#"><i class="fa fa-edit" id="edit"  data="' + i + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + i + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_designation)
        t.draw();
        viderChamps();
        count_mc++;
    }
});