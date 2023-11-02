// alert('nooooo');

$(document).on("change", "#item", function() {
    var val = $('#item').val();
    console.log("val = ", val);
    $('.get_val').val(val);
    var id = $('#items option').filter(function() {
        return this.value == val;
    }).data('id');
    var msg = id ? 'id=' + id : 'No Match';
    console.log("msg = ", msg);

    $('.get_id').val(id);

});
let count = 0;
//Ajouter produits dans la liste
$(document).on('click', '#add_responsable', function(e) {
    // if (count == 0)
    //     count = $('#ligne').data('id');
    e.preventDefault();
    // alert(count);
    console.log($('#ligne').data('id'));
    if ($('.res').val() === '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez selectionner' : 'Please select',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {

        // var count = $('.get_id').val();
        var get_id = $('.get_id').val();
        var responsable = $('.get_val').val();
        var date_debut = $('#date_debut').val();
        var date_fin = $('#date_fin').val();

        var id = $('#ligne').val();

        // alert(count);

        // console.log($('#items option:selected').val());

        // $('input[id=get_id]').val($('input[name="get_id"]').val($('#id-' + id).text()));
        // $('input[id=item]').val($('#responsable-' + id).text());
        // $('input[id=date_debut]').val($('#date_debut-' + id).text());
        // $('input[id=date_fin]').val($('#date_fin-' + id).text());



        if (id !== '') {
            // alert($('input[name=get_id]').val() == '' ? 0 : $('input[name=get_id]').val());
            // $('input[data=responsable' + id + ']').val(responsable);
            $('input[data=responsable' + id + ']').attr('value', $('input[name=get_id]').val() == '' ? 0 : $('input[name=get_id]').val());
            $('input[data=date_debut' + id + ']').val(date_debut);
            $('input[data=date_fin' + id + ']').val(date_fin);
            $('span[id=resp' + id + ']').text($('input[name=responsable]').val());



        } else {
            // alert($('#res').val());
            // let idRes = $('#res').val();
            // if (idRes == "") {



            var t = $('.tableR').DataTable();
            var tab_responsable = [
                // '<input type="text" class="cacher" style="border:none;" value="' + count + '"  data="id' + count + '"/>',
                '<input type="text" readonly="true"  style="border:none;" value="0" name="tab[' + count + '][get_id]" data="get_id' + count + '" />',
                '<span id="resp' + count + '">' + responsable + '</span> <input type="text" hidden readonly="true"  style="border:none;" value="' + responsable + '" name="tab[' + count + '][username]" data="username' + count + '" /><input type="text" hidden readonly="true"  style="border:none;" value="' + get_id + '" name="tab[' + count + '][responsable]" data="responsable' + count + '" />',
                // '<input type="text" readonly="true"  style="border:none;" value="' + get_id + '" name="tab[' + count + '][get_id]" data="get_id' + count + '" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + date_debut + '" name="tab[' + count + '][date_debut]" data="date_debut' + count + '" />',
                '<input type="text" readonly="true"  style="border:none;" value="' + date_fin + '" name="tab[' + count + '][date_fin]" data="date_fin' + count + '" />',
                '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_responsable)

            t.draw();
            count++;
            console.log(count);
            //Cacher le premier element du tableau
            $('.tableR tr td:first-child').hide();
            // viderChamp();

            $('#item').val('');
            $('#date_debut').val('');
            $('#date_fin').val('');
            $('.get_id').val('');

            // } else {
            //     // Ajout en base de la modification

            //     var responsable = $('.get_val').val();
            //     var date_debut = $('#date_debut').val();
            //     var date_fin = $('#date_fin').val();

            //     $.ajaxSetup({
            //         headers: {
            //             'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            //         }
            //     });
            //     // $.ajax({
            //     //     type: 'PUT',
            //     //     url: '/responsable/' + idRes,
            //     //     data: {
            //     //         responsable: responsable,
            //     //         date_debut: date_debut,
            //     //         date_fin: date_fin,
            //     //     },
            //     //     success: function(response) {
            //     //         if (response == 1) {
            //     //             window.reload();
            //     //         }
            //     //     }
            //     // });

            //     // $.ajax({
            //     //     type: "PUT",
            //     //     url: "/responsable/" + idRes,
            //     //     data: {
            //     //         // "id": idRes,
            //     //         "responsable": responsable,
            //     //         "date_debut": date_debut,
            //     //         "date_fin": date_fin,
            //     //     },
            //     //     contentType: "application/json; charset=utf-8",
            //     //     dataType: "json",
            //     //     success: function(data) {
            //     //         console.log(data);
            //     //     },
            //     //     error: function(data) {
            //     //         alert("fail");
            //     //     }
            //     // });
            // }
        }

    }

});

//modification
$(document).on('click', '#edit', function() {

    let ligne = $(this).attr('data');
    // alert(ligne);
    $('input[id=ligne]').val(ligne);
    $('input[name=get_id]').val($('input[data=responsable' + ligne + ']').val());
    $('input[name=responsable]').val($('#resp' + ligne).text());
    $('#date_debut').val($('input[data="date_debut' + ligne + '"]').val());
    $('#date_fin').val($('input[data="date_fin' + ligne + '"]').val());

    if ($('input[name="get_id"]').val($('#id-' + id).text())) {
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

function date_formatter(type, valeur) {

    if (type == 0) {
        var fmt_date = valeur.split("/");
        return valeur;
    } else {

        var fmt_date = valeur.split("-");
        var dd = '';
        var mm = '';
        var yyyy = fmt_date[0];
        dd = fmt_date[2];
        mm = fmt_date[1];
        if (dd == undefined) return '';
        else return dd + '/' + mm + '/' + yyyy;

    }
}

// modification des responsables
// $(document).on('click', '#edit_res', function() {

//     let id = $(this).attr('data');
//     // alert($('#id-' + id).text());
//     $('#item').val($('#responsable-' + id).text());
//     $('#date_debut').val($('#date_debut-' + id).text());
//     $('#date_fin').val($('#date_fin-' + id).text());
//     $('input[name="get_id"]').val($('#id-' + id).text());
//     $('input[name="res"]').val($('#id-' + id).text());
//     $('#ligne').val(id);



//     if ($('input[name="get_id"]').val($('#id-' + id).text())) {
//         $('.btn_add').text('Editer')

//         // $('input[id=get_id]').val($('input[name="get_id"]').val($('#id-' + id).text()));
//         // $('input[id=item]').val($('#responsable-' + id).text());
//         // $('input[id=date_debut]').val($('#date_debut-' + id).text());
//         // $('input[id=date_fin]').val($('#date_fin-' + id).text());
//     }



//     // $.ajaxSetup({
//     //     headers: {
//     //         'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
//     //     }
//     // });
//     // $.ajax({
//     //     type: 'GET',
//     //     url: 'ligneproduits/' + id + '/edit',
//     //     success: function(response) {
//     //         alert(response);
//     //     }
//     // });
// });

console.log(date_formatter(0, '12/12/2022'));