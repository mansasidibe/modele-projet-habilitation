 let count = 0;
 var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
 var localeJquery = $('html').attr('lang');

 function get_contact(datas) {
     var t = $('.tableL').DataTable();
     t.clear();

     console.log("datas", datas.length);

     $(datas).each(function(count, item) {

         let r_checked = "";
         if (item.interlocuteur == 1) r_checked = "checked";

         var tab1 = [
             '<input type="hidden" class="cacher " style="border:none;" value="' + count + '"  data="id' + count + '"/>',
             item.civilite.libelle_fr + '<input type="hidden" class="cacher " readonly="true"  style="border:none;" value="' + item.civilite.id + '" name="tab[' + count + '][civilite]" data="civilite' + count + '" />',

             '<input type="text" readonly="true"  style="border:none;" value="' + item.nom + '" name="tab[' + count + '][nom]" data="nom' + count + '" />',

             '<input type="text" readonly="true"  style="border:none;" value="' + item.prenom + '" name="tab[' + count + '][prenom]" data="prenom' + count + '" />',

             '<input type="text" readonly="true"  style="border:none;" value="' + item.fonction + '" name="tab[' + count + '][fonction]" data="fonction' + count + '" />',

             '<input type="text" readonly="true"  style="border:none;" value="' + item.portable + '" name="tab[' + count + '][portable]" data="portable' + count + '" />',

             '<input type="text"  readonly="true"  style="border:none;" value="' + item.pays.alpha + '" name="tab[' + count + '][indicator]" data="indicator' + count + '" />',

             '<input type="text" readonly="true"  style="border:none;" value="' + item.email + '" name="tab[' + count + '][email]" data="email' + count + '" />',

             '<input type="hidden" readonly="true"  name="tab[' + count + '][interlocuteur]" data="interlocuteur' + count + '" value="' + item.interlocuteur + '" /><input type="radio" id="interlocuteur" disabled="disabled" name="interlocuteur"   style="border:none;" data="rinterlocuteur' + count + '" value="' + item.interlocuteur + '" ' + r_checked + ' / > ',


         ]

         t.row.add(tab1);



     });
     t.draw(false);
     t.draw(false);
     $('tr td:first-child').hide();
     count++;
     count = datas.length;
 }