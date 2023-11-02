
$(document).on('click', '.cnt', function () {

  var htmlCode = `
    <div class="ccontainer" >
            CONTRAT DE TRAVAIL A DUREE DETERMINEE
  </div>
  <span class="contenu">
       <b>ENTRE</b> <br/>
      <b> La société Nouvelle Génération de Services  (NGSER), </b>
        Société à Responsabilité Limitée, sise à Abidjan-Plateau, Avenue Lamblin, Immeuble MATCA, 4ème étage, Tel/fax : +225 20 22 12 53 – 28 BP 722 Abidjan 28, RC CI- ABJ- 03-2020-M-11141– CC 0909 529Q, représentée par Monsieur ELLEPO Sébastien, en sa qualité de Gérant, dûment habilité aux fins des présentes,
        Ci-après désignée par « l’employeur  ou NGSER »
       <b>D’UNE PART</b> <br/>
      <b>ET </b><br/>
Monsieur  xxxxxxxxxxxxxxxxxxxx né le  xxxxxxxxxx à xxxx, titulaire xxxx numéroxxxx, domicilié à xxxx , ayant tous pouvoirs à l’effet des présentes,      
Ci-après désigné par « l’employé ou le salarié »<br/>
                                                                                                                         D’AUTRE PART<br/>
NGSER et le salarié étant  individuellement désignés « la partie » et collectivement
 « les  parties » 
IL A ETE CONVENU CE QUI SUIT : 

  </span>
`;

  var html = htmlToPdfmake(htmlCode);
  var dd = {
    //pageMargins:[40,40,10,100],
    content: [
      {
        text: html,
      }
    ],
    autoBreaks: true, // Enable automatic page breaks
    footer: function (currentPage, pageCount) {
      return {
        text: `${currentPage}/${pageCount}`,
        alignment: 'center',
        fontSize: 10,
        margin: [0, 20],
      };
    },
  
    styles: {
      ccontainer: {
        alignment: 'center',
        background: '#CCCCCC',
        fontSize: 20
      },
      contenu:{
        marginTop:50
      }

    }
  };


  

  
  var pdfDocGenerator = pdfMake.createPdf(dd);
  pdfDocGenerator.open();



});