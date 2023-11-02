
$(document).on('click', '.fourn_inv', function () {

    Swal.fire({
        text: "Voulez-vous télécharger la facture ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: "Oui",
        cancelButtonText: "Non"
    }).then((result) => {
        if (result.value) {

            var doc = new jsPDF();
            doc.setProperties({
                title: 'Fournisseur',
            });

            const centuryGothicFont = {
                fontFamily: 'CenturyGothic',
                fontStyle: 'normal',
                fontWeightBold: 'bold',
                fontWeightItalic: 'italic'
            };

                // jsPDF.API.events.push(['addFonts', callAddFont])
            var totalPages = 0;
            // Function to add footer on each page
            function addFooter() {
                var pageCount = doc.internal.getNumberOfPages();

                // Update the total pages count
                totalPages = pageCount;

                // Iterate over each page
                for (var i = 1; i <= pageCount; i++) {
                    doc.setPage(i); // Set the current page

                    // Set position and styling for footer text
                    var footerX = doc.internal.pageSize.getWidth() / 2;
                    var footerY = doc.internal.pageSize.getHeight() - 10;
                    doc.setFontSize(5);
                    doc.text(i + " / " + totalPages, footerX, footerY, { align: "center" });
                }
            }
            //END FOOTER

                //******************DEBUT CONTENU*************************/

            // Le titre du contrat
            var headerText = "FACTURE FOURNISSEUR D'INVESTISSEMENT";
            var backgroundColor = "#DDDDDD";
            var borderColor = "#000000";
            var marginLeft = 20; // Marge à gauche
            var marginRight = 20; // Marge à droite
            var rectWidth = doc.internal.pageSize.getWidth() - marginLeft - marginRight;
            var rectHeight = 10;
            var rectX = marginLeft;
            var rectY = 10;
            var textY = rectY + rectHeight / 3 + 3;
            doc.setFillColor(backgroundColor);
            doc.setDrawColor(borderColor);
            doc.rect(rectX, rectY, rectWidth, rectHeight, "FD");

            doc.setTextColor("#000000");
            doc.setFontSize(12);
            doc.setFont(centuryGothicFont.fontFamily, centuryGothicFont.fontStyle, centuryGothicFont.fontWeightItalic);


            var textWidth = doc.getTextWidth(headerText);
            var textX = rectX + (rectWidth - textWidth) / 2; // Calcul de la position horizontale centrée à l'intérieur de la marge
            doc.text(textX, textY, headerText);
            //Fin Le titre du contrat

            //Element  1er
            const content = `Facture N° 001 :`;
                    const splitContent = doc.splitTextToSize(content, 180); // Adjust the width as needed (180 in this example)
                    doc.setFontSize(12);
                    doc.text(splitContent, 10, 30);
                    // for (let i = 0; i < splitContent.length; i++) {
                    //     if (splitContent[i].includes("Monsieur xxxxxxxxxxxxxxxxxxx")) {
                    //         // Set the font style to bold for the specified text
                    //         doc.setFont("helvetica", "bold");
                    //     } else {
                    //         // Set the font style to normal for other content
                    //         doc.setFont("helvetica", "normal");
                    //     }
                    //     doc.text(splitContent[i], 10, 10 + i * 10); // Adjust the X and Y position as needed
                    // }
            //Fin Element  1er


            //*******************FIN CONTENU****************************/


            // Call the addFooter function to add the footer on each page
            addFooter();

            window.open(doc.output('bloburl', { filename: 'facture_investissement.pdf' }), '_blank');


        }
    });

});
