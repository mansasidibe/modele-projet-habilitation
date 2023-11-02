let store_telephone="";
let store_email="";


intlInput ("#portable", "ci", null);
function intlInput (portable, alpha, numero){

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
    console.log("countrychange :",selectedCountryData.iso2);
    $('.indicator').val(selectedCountryData.iso2);
		// Get an example number for the selected country to use as placeholder.
		// newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),
		newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.E164),

		// Reset the phone number input.
		iti.setNumber("");
    input.value = "";
    if(selectedCountryData.iso2 === "ci")
      newPlaceholder = newPlaceholder +" 48";
		// Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
		// mask = newPlaceholder.replace(/[1-9]/g, "0");
		mask = newPlaceholder.replace(/[1-9]/g, "0");
    console.log(mask);
		// Apply the new mask for the input
		$(this).mask(mask);
    if(numero !== null){
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
count = 0
var resultat = true 
let cst_langue = document.querySelector('input[class="cst_langue"]');
langue = cst_langue.value;

$('#add-row').click(function (event) {
  event.preventDefault();

  ///////////////////////////////////////////////////parsley
  if ($('.civilite').val() == '') {
    if(langue ='en'){
      $('#helpCivilite').text('Please fill in the title').css('color', 'red');
    }
    $('#helpCivilite').text('Veuillez renseigner la civilite').css('color', 'red');
    resultat = false
    return resultat
  } else {
    $('#helpCivilite').text('');
    
    var civiliteVal = $('.civilite').val();
    var civiliteText = $('.civilite option[value="'+civiliteVal+'"]').text();
    // alert(civiliteVal);
    console.log(civiliteText,' - ',civiliteVal);
    resultat = true
    
  }

  if($('#nom').val() == "") {
    if(langue="fr"){
      $('#helpNom').text('Veuillez renseigner le nom').css('color', 'red');
    }else{
      $('#helpNom').text('Please fill in the name').css('color', 'red');
    }
    resultat = false
    return resultat
  } else {
    $('#helpNom').text('')
    var nom = $('#nom').val();
    resultat = true
  }

  if ($('#prenom').val() == "") {
    if(langue="fr"){
      $('#helpPrenom').text('Veuillez renseigner le prenom').css('color', 'red');
    }else{
      $('#helpPrenom').text('Please fill in the first name').css('color', 'red');
    }
    
    resultat = false
    return resultat
  } else {
    $('#helpPrenom').text('')
    var prenom = $('#prenom').val();
    resultat = true
  }

  if ($('#fonction').val() == "") {
    if(langue="fr"){
      $('#helpFonction').text('Veuillez renseigner la fonction').css('color', 'red');
    }else{
      $('#helpFonction').text('Please fill in the function').css('color', 'red');
    }
    resultat = false
    return resultat
  } else {
    $('#helpFonction').text('')
    var fonction = $('#fonction').val();
    resultat = true
  }


  if ($('#portable').val() == "") {
    if(langue="fr"){
      $('#helpPortable').text('Veuillez renseigner le portable').css('color', 'red'); 
    }else{
      $('#helpPortable').text('Please fill in the mobile').css('color', 'red');
    }
    resultat = false
    return resultat
  } 
  // else if(!$.isNumeric($('#portable').val())){
  //   if(langue="fr"){
  //     $('#helpPortable').text('seul le nombre est autorisé').css('color', 'red');
  //   }else{
  //     $('#helpPortable').text('only the number is allowed').css('color', 'red');
  //   }
  //   resultat = false
  //   return resultat
  // }
  // else if($('#portable').val().length != 10){
  //   if (langue ="fr") {
  //     $('#helpPortable').text('Le numero de portable doit etre de 10 chiffres').css('color', 'red');
  //   }else{
  //     $('#helpPortable').text('Mobile number must be 10 digits').css('color', 'red');
  //   }
  // }
  else{
    $('#helpPortable').text('')
    var portable = $('#portable').val();
    resultat = true
  }


  var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
  if ($('#email').val() == ''){
    if(langue="fr"){
      $('#helpEmail').text('Veuillez renseigner le email').css('color', 'red');
    }else{
       $('#helpEmail').text('Please fill in the email').css('color', 'red');
    }
    resultat = false;
    return resultat;
  } else if(!pattern1.test($('#email').val())){
    if(langue="fr"){
      $('#helpEmail').text('Veuillez renseigner un mail valide').css('color', 'red');
    }else{
      $('#helpEmail').text('Please enter a valid email').css('color', 'red');
    }
    resultat = false;
    return resultat;
  }else{
    $('#helpEmail').text('');
    var email = $('#email').val();
    resultat = true;
  }
  var indicator = $('.indicator').val();
  ////////////////////////////////////////////////////
  let ligne = $(this).attr('data')
 
  $('.table tbody').find('tr .dataTables_empty').remove(); //remove empty element
  
  $('.table').each(function () {
    var tr = $(this).find('tr')

    var id = tr.find('input[data=id' + $('input[id=idModif]').val() + ']').val();

    if (id !== undefined) {
      //Modifier contact
      if(checkDouble($('input[id=portable]').val(),$('input[id=email]').val())){
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
      }else{

        $('input[data=id' + id + ']').val($('input[id=idModif]').val())
        $('input[data=civilite' + id + ']').val($('.civilite').val())
        $('input[data=civiliteText' + id + ']').val($('.civilite option[value="'+civiliteVal+'"]').text())
        $('input[data=nom' + id + ']').val($('input[id=nom]').val())
        $('input[data=prenom' + id + ']').val($('input[id=prenom]').val())
        $('input[data=fonction' + id + ']').val($('input[id=fonction]').val())
        $('input[data=portable' + id + ']').val($('input[id=portable]').val())
        $('input[data=email' + id + ']').val($('input[id=email]').val())
        $('input[data=indicator' + id + ']').val($('input[id=indicator]').val())

        EmptyChamp();
        store_email = "";
        store_telephone="";
      }
    
    } else {

       //Ajouter contact
      if(checkDouble($('input[id=portable]').val(),$('input[id=email]').val())){

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

      }else{
       

          // $('.table tbody tr').last().after(
          //   '<tr id="produit' +count +'">' + '<td style="color: #203A79CC; display:none;">' +'<input type="text" style="border:none;" value="' +count +'"  data="id' + count + '"/>' +'</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" readonly="true"  style="border:none; " value="' +  civiliteText +'"  data="civiliteText" /> <input type="text"  style="border:none; display:none;" value="' +  civiliteVal +'" name="tab[' +count +'][civilite]" data="civilite'+ '"/>' + '</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" readonly="true"  style="border:none;" value="' + nom +'" name="tab['+ count +'][nom]" data="nom' + count + '" />' + '</td>' +
          //         '<td style="color: #203A79CC;">' +'<input type="text" readonly="true"  style="border:none;" value="' + prenom +'" name="tab[' + count + '][prenom]" data="prenom' + count + '" />' + '</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" readonly="true"  style="border:none;" value="' + fonction + '" name="tab[' + count +'][fonction]" data="fonction' + count + '" />' +'</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" readonly="true"  style="border:none;" value="' + portable + '"    name="tab[' + count +'][portable]" data="portable' + count + '" />' +'</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" readonly="true"   style="border:none;" value="' + email + '" name="tab[' + count +'][email]" data="email' + count + '" />' +'</td>' +
          //         '<td style="color: #203A79CC;">' + '<input type="text" hidden="hidden" data="interlocuteur' + count +'" name="tab[' + count +'][interlocuteur]" value="0" /> <input type="radio" id="interlocuteur" onclick="changeInterlocuteur('+count+')"  data="rinterlocuteur' + count +'"  style="border:none;" value="' + count + '" name="interlocuteur" data="' + count + '" />' +'</td>' +
          //         '<td style="color: #203A79CC;">' + ' <a href="#"><idisplay:none; class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count +'"><i class="fa fa-trash" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>' +'</td>' +
          //     '</tr>'
          // );

          //Table 
          var t = $('.tableL').DataTable();
          
          var tab1=[
            '<input type="text" class="cacher" style="border:none;" value="' +count +'"  data="id' + count + '"/>',
            '<input type="text" readonly="true"  style="border:none; " value="' +  civiliteText +'"  data="civiliteText' + count + '" /> <input type="text"  style="border:none; display:none;" value="' +  civiliteVal +'" name="tab[' +count +'][civilite]" data="civilite'+ count + '"/>',
            '<input type="text" readonly="true"  style="border:none;" value="' + nom +'" name="tab['+ count +'][nom]" data="nom' + count + '" />',
            '<input type="text" readonly="true"  style="border:none;" value="' + prenom +'" name="tab[' + count + '][prenom]" data="prenom' + count + '" />',
            '<input type="text" readonly="true"  style="border:none;" value="' + fonction + '" name="tab[' + count +'][fonction]" data="fonction' + count + '" />',
            '<input type="text" readonly="true"  style="border:none;" value="' + portable + '"    name="tab[' + count +'][portable]" data="portable' + count + '" />',
            '<input type="text"   style="border:none;" value="' + indicator + '"    name="tab[' + count +'][indicator]" data="indicator' + count + '" />',
            '<input type="text" readonly="true"   style="border:none;" value="' + email + '" name="tab[' + count +'][email]" data="email' + count + '" />',
            '<input type="text" hidden="hidden" data="interlocuteur' + count +'" name="tab[' + count +'][interlocuteur]" value="0" /> <input type="radio" id="interlocuteur" onclick="changeInterlocuteur('+count+')"  data="rinterlocuteur' + count +'"  style="border:none;" value="' + count + '" name="interlocuteur" data="' + count + '" />',
            '<a href="#"><i class="fa fa-edit" id="edit"  data="' + count + '" style="color: #4D6194; font-size: 15px; margin-top: 7px;"></i></a>   <a href="#" data="' + count +'"><i class="flaticon-delete" id="delete" style="color: rgb(246, 78, 96); font-size: 15px; margin-top: 7px;"></i></a>',

          ]; 
          t.row.add(tab1); 
          t.draw(false);
          //Cacher le premier element du tableau
          $('tr td:first-child').hide();
          //Vider les champs
          EmptyChamp();
      }
    }
  })



  count++;

});

//modification
$(document).on('click','#edit',function(){
	 
    let ligne = $(this).attr('data');
    
    $('input[id=ligne]').val(ligne); 
    $('input[id=idModif]').val($('input[data=id'+ligne+']').val());
    // $('input[id=civilite]').val($('input[data=civilite'+ligne+']').val());

    $('.civilite option[value="'+$('input[data=civilite'+ligne+']').val()+'"]').prop('selected',true);
    $('input[id=nom]').val($('input[data=nom'+ligne+']').val());
    $('input[id=prenom]').val($('input[data=prenom'+ligne+']').val());
    $('input[id=fonction]').val($('input[data=fonction'+ligne+']').val());
    $('input[id=portable]').val($('input[data=portable'+ligne+']').val());
    $('input[id=email]').val($('input[data=email'+ligne+']').val());
    $('input[id=indicator]').val($('input[data=indicator'+ligne+']').val());
    $('input[id=no_bd_civilite]').val($('input[data=civilite'+ligne+']').val());
    intlInput ("#portable", $('input[data=indicator'+ligne+']').val(), $('input[data=portable'+ligne+']').val());

});

//suppression
$(document).on('click','#delete',function(){ 
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
            table.row( $(this).parents('tr') )
            .remove()
            .draw();
        }   
    });
});


//interlocuteur
$(document).on('click','#interlocuteur',function(){
	 
  let ligne = $(this).attr('data');
// alert(ligne);
  $('input[data=interlocuteur'+ligne+']').val($('input[data=rinterlocuteur'+ligne+']').val()); 
});

function changeInterlocuteur(counter) { 
  $('input[data=interlocuteur'+counter+']').val(1); 
  for (let index = 0; index < count; index++) {
    if (index != counter) {
      $('input[data=interlocuteur'+index+']').val(0); 
    }

  }
}

function checkDouble(portable,email){

  for (let index = 0; index < count; index++) {

    if ($('input[data=portable'+index+']').val() === portable && portable != store_telephone) {
       return true; 
    }
    if ($('input[data=email'+index+']').val() === email && email != store_email) {
      return true; 
   }
    if (($('input[data=portable'+index+']').val() === portable && $('input[data=email'+index+']').val() === email) && (portable != store_telephone && email != store_email)) {
         return true; 
    }
  }
  return false
}

function EmptyChamp(){
  $('input[id=idModif]').val('')
  $('input[id=civilite]').val('')
  $('input[id=nom]').val('')
  $('input[id=prenom]').val('')
  $('input[id=fonction]').val('')
  $('input[id=portable]').val('')
  $('input[id=email]').val('')
}