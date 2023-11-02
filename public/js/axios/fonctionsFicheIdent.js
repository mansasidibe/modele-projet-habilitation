const get_matricule = async(matricule)=>{
    const response=await axios.post(`${getBaseURL()}api/v1/check_matricule`,{matricule: matricule}, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }});
    try{
        if(response.status==200) return response.data;
    }catch(error){
        console.log(error);
    }
}

$("#matricule").on( "keyup", function() {
var mat = document.querySelector("#matricule").value;

    get_matricule(mat).then(
        retour =>{
            console.log(retour);
           if(retour.statut == true){
            $(".btn_submit").prop('disabled', true);
            $('#matricule_message').text('Ce matricule existe déjà.');
           }else{
            $(".btn_submit").prop('disabled', false);
            $('#matricule_message').text('');
           }
        }
    );
  } );



function datalistCivilite(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    // if(item.slug == "OUT"){
                    //  console.log("civilite:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);
                    // }
                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistMatrimoniale(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    // if(item.slug == "OUT"){
                    // console.log("situationmatrimoniale:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);
                    // }
                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistArticle(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle != null){

                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle+'"></option>');
                $(id_datalist).append(option);
                    // }
                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistTypepiece(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    // if(item.slug == "OUT"){
                    // console.log("typepiece:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);
                    // }
                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistNationalite(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    // console.log("nationalite:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}


function datalistPays(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    // console.log("pays:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}


function datalistVille(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle != null){
                    // console.log("ville:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle+'"></option>');
                $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}


function datalistCommune(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle != null){
                    // console.log("commune:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle+'"></option>');
                $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistCodepays(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.alpha != null){
                    // console.log("commune:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.alpha+'"></option>');
                $(id_datalist).append(option);

                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}

function datalistFiliation(url, id_datalist, id_input_datalist, id_data) {

    const get_data = async ()=>{
        try {
            const response = await axios.get(getBaseURL() + url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
        }
    }
    get_data().then(
        // mapping et affichage
        response => {

            $(response.data.data).each( function(index, item) {
                if (item.libelle_fr != null){
                    if(item.slug == "FLT"){
                    // console.log("categorie:", response);
                var option = $('<option data-id="'+ item.id+'" value="'+ item.libelle_fr+'"></option>');
                $(id_datalist).append(option);
                    }
                }
            });
            // recupération de l'id
            $(document).on("change",id_input_datalist,function(){
                var val = $(id_input_datalist).val();

                var id = $(id_datalist+' option').filter(function() {
                    return this.value == val;
                  }).data('id');

                  $(id_data).val(id);

            });
        }
    );
}



function importFile1(elt, tel) {
    let text, yes, no;
    langue == "en" ? text = "Do you want to replace the file?" : text = "Voulez-vous remplacer le fichier?";
    langue == "en" ? yes = 'Yes' : yes = 'Oui';
    langue == "en" ? no = 'No' : no = 'Non';
    var existant = $('#existant').val()

    if (existant) {
        Swal.fire({
            // title: 'Are you sure ?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: yes,
            cancelButtonText: no,
            timer: 4000
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.value) {
                elt.querySelector("input").click();
            }
        });
    } else {
        elt.querySelector("input").click();
    }
}


function importFile2(elt, tel) {
    let text, yes, no;
    langue == "en" ? text = "Do you want to replace the file?" : text = "Voulez-vous remplacer le fichier?";
    langue == "en" ? yes = 'Yes' : yes = 'Oui';
    langue == "en" ? no = 'No' : no = 'Non';
    var existant = $('#existant').val()

    if (existant) {
        Swal.fire({
            // title: 'Are you sure ?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: yes,
            cancelButtonText: no,
            timer: 4000
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.value) {
                elt.querySelector("input").click();
            }
        });
    } else {
        elt.querySelector("input").click();
    }
}

//on change
$(document).on('change', '#upfile', function () {

    if (document.getElementById("upfile") == "") {
        if ($('#existant').val() == true && $('#profil').val() == 15) {
            element.classList.remove("btn_envoyer");
        }
        if ($('#existant').val() == true && $('#profil').val() == 13) {
            element.classList.remove("btn_envoyer");
        }

    } else {
        if ($('#existant').val() == "" && $('#profil').val() == 13) {
            $('#e').show();
        }

    }
});

//store file
const sub = async (elt) => {

    var fd = new FormData();
    var files = elt.files;
    var id = $('#id').val();
    document.getElementById('fichier_nom1').innerHTML = files[0].name;

    if (files.length > 0) {
        fd.append('fichier', files[0]);
        fd.append('id', id);


    }
}

const subs = async (elt) => {

    var fd = new FormData();
    var files = elt.files;
    var id = $('#id').val();
    document.getElementById('fichier_nom2').innerHTML = files[0].name;

    if (files.length > 0) {
        fd.append('secondFichier', files[0]);
        fd.append('id', id);

        // try {
        //     const response = await axios.post(getBaseURL() + 'api/v1/secondimageStore',
        //         {
        //             secondFichier: files[0],
        //             id: id
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 'Authorization': 'Bearer ' + token,
        //             }
        //         });
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }

    }
}


// document.getElementById('banque').onchange = function() {
//     var banque = document.getElementById('banque').value;
//     var guichet = document.getElementById('guichet').value;
//     var compte = document.getElementById('compte').value;
//     var cle = document.getElementById('cle').value;

//     var RIB = banque + ' ' + guichet + ' ' + compte + ' ' + cle;
//     console.log(RIB);
//   };

$(document).on('keyup', '#numero_banque, #guichet, #compte, #cle', function () {
    let compte= $('#compte').val();
    let guichet= $('#guichet').val();
    let banque= $('#numero_banque').val();
    let cle= $('#cle').val();

    let rib= banque +' '+ guichet +' '+  compte +' '+ cle;
    $('#rib').html(rib);
  });

  $(document).on('keyup', '#input_codepays,#cle_controle, #numero_banque, #compte, #cle', function () {
    let compte= $('#compte').val();
    let guichet= $('#guichet').val();
    let banque= $('#numero_banque').val();
    let cle= $('#cle').val();
    let codepays= $('#input_codepays').val();
    let clecontrole= $('#cle_controle').val();
// alert(codepays);
    let iban= codepays +' '+ clecontrole +' '+ banque +' '+ guichet +' '+  compte +' '+ cle;
    $('#iban').html(iban);
  });


  document.addEventListener("DOMContentLoaded", function() {
    var naissance_at = document.getElementById("naissance_at");
//   console.log(dateInput);
naissance_at.addEventListener("change", function() {
      var dateValue = naissance_at.value;
      var formattedDate = formatDate(dateValue);
      naissance_at.value = formattedDate;
    });
  });

  function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  }


  function formatContact(input) {
    var value = input.value;
    value = value.replace(/\s/g, ''); // Supprimer les espaces existants
    var formattedValue = '';
    for (var i = 0; i < value.length; i++) {
      formattedValue += value[i];
      if ((i + 1) % 2 === 0 && i !== value.length - 1) {
        formattedValue += ' ';
      }
    }
    input.value = formattedValue;
  }














