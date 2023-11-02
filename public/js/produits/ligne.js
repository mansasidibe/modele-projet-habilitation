function viderChamps() {
    if ($('#branche').val() == 'DTT') {
        $('#boq_id').val('');
        $('#cout_boq').val('');
        $('#quantite_boq').val('');
        $('#cout_dev_boq').val('');
        $('#ligne').val('');
    }else if($('#branche').val() == 'DTI') {
        $('#designation').val('');
        $('#cout').val('');
        $('#quantite').val('');
        $('#cout_dev').val('');
        $('#ligne').val('');
    }
}

let count = 0;
//Ajouter produits dans la liste
$(document).on('click', '#add_ligne', function(e) {
    if ($('#branche').val() == 'DTI') {
        var designation = $('#designation').val();
        var montant = $('#cout').val();
        var quantite = $('#quantite').val();
        var cout_dev = $('#cout_dev').val();
    }else if($('#branche').val() == 'DTT') {
        var designation = $('#boq_id option:selected').text();
        var montant = $('#cout_boq').val();
        var quantite = $('#quantite_boq').val();
        var cout_dev = $('#cout_dev_boq').val();
    }

    e.preventDefault();
    if (designation == '' || montant =='' || quantite == '') {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez reseigner les champs de la ligne.' : 'Please fill in the fields of the line',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else {

        var id = $('#ligne').val();

        if (id !== '') {
            $('input[data=designation' + id + ']').val(designation);
            $('span[id=designation' + id + ']').html(designation);
            $('input[data=montant' + id + ']').val(montant);
            $('span[id=montant' + id + ']').html(formatMoneyJs(montant));
            $('input[data=quantite' + id + ']').val(quantite);
            $('span[id=quantite' + id + ']').html(quantite);
            $('input[data=cout_dev' + id + ']').val(cout_dev);
            $('span[id=cout_dev' + id + ']').html(formatMoneyJs(cout_dev));
            tCoutDev($('#marge').val());
            viderChamps();

        } else {
            var t = $('.tableL').DataTable();
            var tab_designation = [
                '<span id="designation' + count +'">' +designation+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + designation +'" name="tab[' + count +'][designation]" data="designation' + count +'"/>',
                '<span id="montant' + count +'">' +formatMoneyJs(montant)+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + montant +'" name="tab[' + count +'][montant]" data="montant' + count +'"/>',
                '<span id="quantite' + count +'">' +quantite+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + quantite +'" name="tab[' + count +'][quantite]" data="quantite' + count +'"/>',
                '<span id="cout_dev' + count +'">' +formatMoneyJs(cout_dev)+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + cout_dev +'" name="tab[' + count +'][cout_dev]" data="cout_dev' + count +'"/>',
                '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
            ]
            t.row.add(tab_designation)
            t.draw();
            viderChamps();
            tCoutDev($('#marge').val());
            count++;
        }

    }
});

async function missions() {
    var token = localStorage.getItem("token");
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    await this.axios
        .get(getBaseURL() + "api/v1/commercial/get_mission", config)
        .then((response) => {
            this.data = response.data.data;

            $.each(this.data, function (i, d) {
                var zone = d.boqs[0]?.zone.pays;
                if (langue == "en") {
                    $("#boq_id").append(
                        "<option value='" + d.id + "'>" + d.libelle_en + ', '+ zone?.libelle_en + "</option>"
                    );
                } else {
                    $("#boq_id").append(
                        "<option value='" + d.id + "'>" + d.libelle_fr + ', '+ zone?.libelle_fr + "</option>"
                    );
                }
            });

        })
        .catch((error) => {
            console.log(error);
            this.ville = [];
        });
}

function get_boq(id) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    axios.get(getBaseURL() + 'api/v1/commercial/get_mission/'+id, config)
        .then(function (response) {
            data = response.data.data;
            $('.cout_boq').val(data?.boqs[0].montant);
        })
        .catch(function (error) {
            console.log(error);
        });
}

$('#boq_id').change(function(){
    let boq_id = $(this).val();
    get_boq(boq_id);
});


$(document).on('change', '#branche', function() {
    if ($('#branche').val() == 'DTI') {
        $(".partie_dtt").hide();
        $(".partie_dti").show();
    }else if($('#branche').val() == 'DTT') {
        $(".partie_dti").hide();
        $(".partie_dtt").show();
    }
  });


// recupéreration des lignes produits
function ligneExistante(data){
    var t = $('.tableL').DataTable();

    $(data).each( function(count, item) {
        var tab_designation = [
            '<span id="designation' + count +'">' +item.libelle+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.libelle +'" name="tab[' + count +'][designation]" data="designation' + count +'"/>',
            '<span id="montant' + count +'">' +formatMoneyJs(item.montant)+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.montant +'" name="tab[' + count +'][montant]" data="montant' + count +'"/>',
            '<span id="quantite' + count +'">' +item.quantite+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " value="' + item.quantite +'" name="tab[' + count +'][quantite]" data="quantite' + count +'"/>',
            '<span id="cout_dev' + count +'">' +formatMoneyJs(item.montant * item.quantite)+ '</span>' +'<input type="hidden" readonly="true" style="border:none; " class="CoutDev" value="' + item.montant * item.quantite +'" name="tab[' + count +'][cout_dev]" data="cout_dev' + count +'"/>',
            '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count + '"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',
        ]
        t.row.add(tab_designation);
    });
    t.draw();
}


// Fonction externe pour obtenir la taille du tableau
function obtenirTailleTableau() {
    var t = $('.tableL').DataTable();
    var tailleTableau = t.rows().count();
    count = count + tailleTableau;
}


//modification
$(document).on('click', '#edit', function() {

    let ligne = $(this).attr('data');
    $('input[id=ligne]').val(ligne);

    if ($('#branche').val() == 'DTI') {
        $($('#designation')).val($('input[data=designation' + ligne + ']').val());
        $($('#cout')).val($('input[data=montant' + ligne + ']').val());
        $($('#quantite')).val($('input[data=quantite' + ligne + ']').val());
        $($('#cout_dev')).val($('input[data=cout_dev' + ligne + ']').val());
    }else if($('#branche').val() == 'DTT') {
        $($('#boq_id')).val($('input[data=designation' + ligne + ']').val());
        $($('#cout_boq')).val($('input[data=montant' + ligne + ']').val());
        $($('#quantite_boq')).val($('input[data=quantite' + ligne + ']').val());
        $($('#cout_dev_boq')).val($('input[data=cout_dev' + ligne + ']').val());
    }
});

//suppression
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
            // $($(this).closest("tr")).remove()
            var table = $('#example').DataTable();
            table.row($(this).parents('tr'))
                .remove()
                .draw();

            tCoutDev($('#marge').val());
        }
    });
});

function tCoutDev(marge_val){
    document.querySelector('#ppr').innerText ='0' + 'XOF';
    document.querySelector('#ppv').innerText ='0 ' + 'XOF';

    var prix_revient = 0;
    var tcout_dev = 0;
    var marge = marge_val;
    var amount = 0;

    $('.CoutDev').each(function(i,e){
      if (isNaN(parseInt($(this).val()))) {
        tamount=0;
      }else{
        amount=parseInt($(this).val())-0;
        tcout_dev +=amount;
      }
    });

    prix_revient = parseInt(prix_revient) + parseInt(tcout_dev);

    if (isNaN(parseInt(marge))) {
         marge=0;
      }else{
        marge=parseInt(marge);
     }
    prix_vente = parseInt(prix_revient) + parseInt(prix_revient) * (marge / 100)

    document.querySelector('#ppr').innerText = formatMoneyJs(prix_revient.toString()) + ' ' + 'XOF';
    document.querySelector('#ppv').innerText = formatMoneyJs(prix_vente.toFixed().toString()) + ' ' + 'XOF';

    $("input[name='prixvente']").val(prix_vente);
    $("input[name='prixrevient']").val(prix_revient);
}

// au changement de la valeur de la marge
$(document).on('keyup','.marge',function(){
tCoutDev($(this).val());
});

function formatMoneyJs(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
