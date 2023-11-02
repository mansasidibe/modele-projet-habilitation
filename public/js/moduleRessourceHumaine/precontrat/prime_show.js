 let count = 0;
 var locale = document.getElementsByTagName("html")[0].getAttribute("lang");
 var localeJquery = $('html').attr('lang');

 function get_primes(datas) {
     var t = $('.tableL').DataTable();
     t.clear();

     $(datas).each(function(count, item) {

         var tab1 = [
             '<input type="hidden" class="cacher " style="border:none;" value="' + count + '"  data="id' + count + '"/>',
             '<input type="text" readonly="true"  style="border:none;" value="' + item.categorie.libelle_fr + '" name="tab[' + count + '][categorie_id]" data="categorie_id' + count + '" />',
             '<input type="text" readonly="true"  style="border:none;" value="' + formatMoneyJs(item.montant) + '" name="tab[' + count + '][montant]" data="montant' + count + '" />',

         ]

         t.row.add(tab1);



     });
     t.draw(false);
     t.draw(false);
     $('tr td:first-child').hide();
     count++;
     count = datas.length;
 }

 function formatMoneyJs(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
 }