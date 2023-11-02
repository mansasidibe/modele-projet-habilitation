let getSynthese = async (param_id) => {
    try {
        const response = await axios.get(getBaseURL() + 'api/v1/commercial/workorders/synthese/' + param_id, {
            headers: {
                accept: 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}
 
$(document).on('click', '.telechargement', async function () {

    let id_tel = $(this).attr('data');
 
    var doc = new jsPDF({
        orientation: 'l',
    })
    doc.setProperties({
        title: 'Work Order',
    });
    //FOOTER 
    var totalPagesExp = "{total_pages_count_string}";
    // Global variables to track page numbering
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

    var data = [
        ['Nom projet', 'U900_5_22', 'Produits', '16 054 876'],
        ['N° WO', 'WONOK01020122', 'Charges', '9 012 125'],
        ['Nombre de ressource', '10', 'Marges', '6 501 202'],
        ['Nombre de sites', 'NA', '%', '69%'],
        ['Region/Pays', 'Abidjan', '', ''],
        ['Date de début', '09/05/2023', '', ''],
        ['Date de fin', '09/06/2023', '', ''],
        ['Durée de la mission', '25', '', ''],
    ];
    var ressources = [];
    var logistiques = [];
    var outils = [];
    var totaux = [];
    let nom_proj = '';
    let num_wor = '';
    let st_produit = 0;
    let st_tot_charge = 0;
    let st_nbre_res = 0;
    let st_somme_marge = 0;
    let st_nbre_sites = 0;
    let st_pg_marge = 0;
    let st_pays_region = '';
    let st_dt_debut = '';
    let st_dt_fin = '';
    let st_duree = 0;
    let tot10=0;
    let tot11=0;
    let tot13 = 0;
    let tot14 = 0;
    let tot15 = 0;
    let tot16 = 0;
    let tot17 = 0;
    await getSynthese(id_tel).then(
        response => {
          
            
            if (response.data.length>0){
                if (response.data[0].syntheses.length>0){
                    
                    nom_proj = response.data[0].syntheses[0].nom_projet; 
                    num_wor = response.data[0].syntheses[0].num_wor; 
                    st_nbre_res = response.data[0].syntheses[0].nbre_ressource; 
                    st_nbre_sites = response.data[0].syntheses[0].nombre_sites; 
                    st_pays_region = $.cookie("ngsys_lang") == 'fr' ? response.data[0].syntheses[0].pays_region_fr : response.data[0].syntheses[0].pays_region_en; 
                    st_dt_debut = response.data[0].syntheses[0].date_debut;
                    st_dt_fin= response.data[0].syntheses[0].date_fin;
                    st_duree = response.data[0].syntheses[0].duree;
                    
                   
                }
                if (response.data[0].total.length > 0) {
                    st_produit = response.data[0].total[0].somme_tot_produit;
                    st_tot_charge = response.data[0].total[0].somme_tot_charge;
                    st_somme_marge = response.data[0].total[0].somme_marge; 
                    st_pg_marge = response.data[0].total[0].marge_pourcentage; 
                    // total
                    tot10 = response.data[0].total[0].somme_mtn_carburant; 
                    tot11 = response.data[0].total[0].somme_mtn_mat_r; 
                    tot13 = response.data[0].total[0].somme_crr; 
                    tot14 = response.data[0].total[0].somme_tot_charge; 
                    tot15 = response.data[0].total[0].somme_tot_produit; 
                    tot16 = response.data[0].total[0].somme_marge; 
                    tot17 = response.data[0].total[0].marge_pourcentage; 
                    const obj_tot = {
                        tot: 'TOTAL',
                        tot1: '',
                        tot2: '',
                        tot3: '',
                        tot4: '',
                        tot5: '',
                        tot6: '',
                        tot7: '',
                        tot8: '',
                        tot9: '',
                        tot10: tot10,
                        tot11: tot11 ,
                        tot12:'',
                        tot13: tot13,
                        tot14: tot14,
                        tot15: tot15,
                        tot16: tot16,
                        tot17: tot17
                    };

                    totaux.push(obj_tot)
                }
      
                data = [
                    ['Nom projet', nom_proj, 'Produits', st_produit],
                    ['N° WO', num_wor, 'Charges', st_tot_charge],
                    ['Nombre de ressource', st_nbre_res, 'Marges', st_somme_marge],
                    ['Nombre de sites', st_nbre_sites, '%', `${st_pg_marge} %`],
                    ['Region/Pays', st_pays_region, '', ''],
                    ['Date de début', st_dt_debut, '', ''],
                    ['Date de fin', st_dt_fin, '', ''],
                    ['Durée de la mission', st_duree, '', ''],
                ];


                /****  LISTE DES RESSOURCES HUMAINES  ******/
                if (response.data[0].rh.length > 0) {
                    response.data[0].rh.map(resp=>{
                      
                       
                        const obj_rh = { 
                            ressources: resp.ressources,
                            date_debut:resp.date_debut,
                            date_fin: resp.date_fin,
                            duree_js:resp.duree_js,
                            duree_sm:resp.duree_sm,
                            mission:resp.mission,
                            mode_facturation:resp.mode_facturation,
                            pu_sm:resp.pu_sm,
                            travel_js:resp.travel_js,
                            km:resp.km,
                            mtn_carb:resp.mtn_carb,
                            mtn_mat_r:resp.mtn_mat_r,
                            am_outil: resp.am_outil,
                            crr:resp.crr,
                            total_charges:resp.total_charges,
                            total_produit: resp.total_produit,
                            marge:resp.marge,
                            percentage:resp.percentage,
                            team_number: resp.team_number
                        };
                        
                        ressources.push(obj_rh)
                    })
                }
                /****  FIN LISTE  DES RESSOURCES HUMAINES  ******/
                /****  LISTE  DES RESSOURCES LOGISTIQUES  ******/
            if (response.data[0].four.length > 0) {
                    response.data[0].four.map(resp => {
                        const obj_four = {
                            ressources: resp.ressources,
                            date_debut: resp.date_debut,
                            date_fin: resp.date_fin,
                            duree_js: resp.duree_js,
                            duree_sm: resp.duree_sm,
                            mission: resp.mission,
                            mode_facturation: resp.mode_facturation,
                            pu_sm: resp.pu_sm,
                            travel_js: resp.travel_js,
                            km: resp.km,
                            mtn_carb: resp.mtn_carb,
                            mtn_mat_r: resp.mtn_mat_r,
                            am_outil: resp.am_outil,
                            crr: resp.crr,
                            total_charges: resp.total_charges,
                            total_produit: resp.total_produit,
                            marge: resp.marge,
                            percentage: resp.percentage,
                            team_number: resp.team_number
                        };
                        logistiques.push(obj_four)
                    })
                }
                /****  FIN LISTE DES LOGISTIQUES  ******/

                /****  LISTE DES OUTILS  ******/
                if (response.data[0].outil.length > 0) {
                    response.data[0].outil.map(resp => {
                        const obj_outil = {
                            ressources: resp.ressources,
                            date_debut: resp.date_debut,
                            date_fin: resp.date_fin,
                            duree_js: resp.duree_js,
                            duree_sm: resp.duree_sm,
                            mission: resp.mission,
                            mode_facturation: resp.mode_facturation,
                            pu_sm: resp.pu_sm,
                            travel_js: resp.travel_js,
                            km: resp.km,
                            mtn_carb: resp.mtn_carb,
                            mtn_mat_r: resp.mtn_mat_r,
                            am_outil: resp.am_outil,
                            crr: resp.crr,
                            total_charges: resp.total_charges,
                            total_produit: resp.total_produit,
                            marge: resp.marge,
                            percentage: resp.percentage,
                            team_number: resp.team_number
                        };
                        outils.push(obj_outil)
                    })
                }
                /****  FIN LISTE DES OUTILS  ******/


            }
    });
  
    doc.printingHeaderRow = true;
    //TABLEAU 1
    doc.autoTable({
        startX: 5,
        startY: 2,
        margin: { right: 2, left: 2 },
        tableLineColor: [0, 191, 255],
        tableLineWidth: 0.1,
        theme: "plain",
        head: data,
        rowPageBreak: 'avoid',
        styles: {
            overflow: 'linebreak',
            fontSize: 8
        },
        didParseCell: function (data) {
            var colIndex = data.column.index;
            // Set fill color for header cells
            // Change text color and make it bold for the first and third columns in the header
            if ((data.row.index === 2 && (colIndex === 3)) || (data.row.index === 3 && (colIndex === 3))) {
                doc.setDrawColor(0, 191, 255);
                data.cell.styles.fontStyle = 'bold';
                //data.cell.styles.fillColor = [216, 78, 75];   //Background color RED
                data.cell.styles.fillColor = [242, 238, 105];   //Background color YELLOW
                data.cell.styles.textColor = [21, 21, 21]; // Blue color for text

            } else {
                data.cell.styles.fontStyle = 'normal';
                doc.setDrawColor(0, 191, 255); // Default color for other cells
            }
            if (colIndex === 0 || colIndex === 2) {
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.textColor = [0, 101, 163]; // Blue color for text
            }

        },
        didDrawCell: function (data) {
            var colIndex = data.column.index;
            // Draw vertical lines for each column except the last one
            if (colIndex < data.table.columns.length - 1) {
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            }
            // Draw horizontal line for the header row
            if (data.row.index === 0) {
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            } else {
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            }
        },
    });


    //TABLEAU 2
    var data_header = [
        ['Ressources', 'Debut', 'Fin', 'Durée en jours', 'Durée en semaine',
            'missions', 'Mode de facturation', 'PU/Semaine', 'Travel(Jrs)', 'KM',
            'Montant carburant', 'Montant materiel roulant', 'Amortissement outils de travail',
            'Cout de revient de la ressource', 'Total charges', 'Total produits', 'Marge', '%'
        ]
    ];

    // Generate body data with 200 elements
    // Generate body data with 1000 elements for two different resources
    var data_body = [];
    // Create array 'outils' with sample data
 
   

    var groupedResources = {};

    if (ressources.length > 0) {
        for (var i = 0; i < ressources.length; i++) {
            
            var objRessource = ressources[i];

            // Check if the team_number exists in the groupedResources object, if not, create an empty array
            if (!groupedResources[objRessource.team_number]) {
                groupedResources[objRessource.team_number] = [];
            }
            
            var rowDataRessource = [
                objRessource.ressources,
                objRessource.date_debut,
                objRessource.date_fin,
                objRessource.duree_js,
                objRessource.duree_sm,
                objRessource.mission,
                objRessource.mode_facturation,
                objRessource.pu_sm,
                objRessource.travel_js,
                objRessource.km,
                objRessource.mtn_carb,
                objRessource.mtn_mat_r,
                objRessource.am_outil,
                objRessource.crr,
                objRessource.total_charges,
                objRessource.total_produit,
                objRessource.marge,
                objRessource.percentage
            ];

            // Add the resource to the corresponding team_number array
            groupedResources[objRessource.team_number].push(rowDataRessource);
        }
    }

    // Push the grouped resources into data_body
    for (var teamNumber in groupedResources) {
        if (groupedResources.hasOwnProperty(teamNumber)) {
            var teamResources = groupedResources[teamNumber];
            data_body.push(...teamResources); // Use the spread operator to push the elements of teamResources individually
        }
    }


    if (outils.length > 0) {
        for (var i = 0; i < outils.length; i++) {
            var objOutils = outils[i];
            var rowDataOutils = [
                objOutils.ressources,
                objOutils.date_debut,
                objOutils.date_fin,
                objOutils.duree_js,
                objOutils.duree_sm,
                objOutils.mission,
                objOutils.mode_facturation,
                objOutils.pu_sm,
                objOutils.travel_js,
                objOutils.km,
                objOutils.mtn_carb,
                objOutils.mtn_mat_r,
                objOutils.am_outil,
                objOutils.crr,
                objOutils.total_charges,
                objOutils.total_produit,
                objOutils.marge,
                objOutils.percentage
            ];
            data_body.push(rowDataOutils);
        }
    }

    if (logistiques.length > 0) {
        for (var i = 0; i < logistiques.length; i++) {
            var objLogistiques = logistiques[i];
            var rowDataLogistiques = [
                objLogistiques.ressources,
                objLogistiques.date_debut,
                objLogistiques.date_fin,
                objLogistiques.duree_js,
                objLogistiques.duree_sm,
                objLogistiques.mission,
                objLogistiques.mode_facturation,
                objLogistiques.pu_sm,
                objLogistiques.travel_js,
                objLogistiques.km,
                objLogistiques.mtn_carb,
                objLogistiques.mtn_mat_r,
                objLogistiques.am_outil,
                objLogistiques.crr,
                objLogistiques.total_charges,
                objLogistiques.total_produit,
                objLogistiques.marge,
                objLogistiques.percentage
            ];
            data_body.push(rowDataLogistiques);
        }
    }

    if (totaux.length > 0) {
        for (var i = 0; i < totaux.length; i++) {
            var objTotal = totaux[i];
            var rowDataTotal = [
                objTotal.tot,
                objTotal.tot1,
                objTotal.tot2,
                objTotal.tot3,
                objTotal.tot4,
                objTotal.tot5,
                objTotal.tot6,
                objTotal.tot7,
                objTotal.tot8,
                objTotal.tot9,
                objTotal.tot10,
                objTotal.tot11,
                objTotal.tot12,
                objTotal.tot13,
                objTotal.tot14,
                objTotal.tot15,
                objTotal.tot16,
                objTotal.tot17,
            ]
            data_body.push(rowDataTotal);
        }
    }

    doc.autoTable({
        startX: 5,
        startY: 58,
        margin: { right: 2, left: 2 },
        tableLineColor: [0, 191, 255],
        tableLineWidth: 0.1,
        styles: {
            overflow: 'linebreak',
            fontSize: 5
        },
        showHead: 'everyPage',
        theme: "plain",
        head: data_header.slice(0, 1),  // Header data
        body: data_body,  // Body data
        rowPageBreak: 'avoid',
        didParseCell: function (data) {

            if (data.row.index === 0 && data.cell.section !== 'body') {
                doc.setDrawColor(0, 191, 255);
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.textColor = [0, 101, 163]; // Blue color for text
            }
           
            if (data.cell.section === 'body') {
                if (data.row.raw[0] === 'TOTAL') {
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.fillColor = [207, 210, 212];   //Background color YELLOW
                    data.cell.styles.textColor = [21, 21, 21]; // Blue color for text
                }
            }
           
        },
        didDrawCell: function (data) {
            var colIndex = data.column.index;
            var rowIndex = data.row.index;

            // Draw vertical lines for each column except the last one
            if (colIndex < data.table.columns.length - 1) {
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x + data.cell.width, data.cell.y, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
            }

            // TRACER LA FIN DE LINE DU HEADER SANS LE BODY
            //if (data.row.index === 0 && data.section !== 'body')
            /*if (data.row.index === 0 )
             { */
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
          //  }
             // FIN TRACER LA FIN DE LINE DU HEADER SANS LE BODY
           // console.log(data);


         
            
            //CHANGEMENT DE COULEUR PAR TEAM 
            // Check if it's the end of a new team
            /*var isEndOfTeam = data.row.index > 0 && data.section !== 'head' && data.row.index !== data_body.length && data_body[data.row.index][0] !== data_body[data.row.index - 1][0];
            var lineY = data.cell.y + data.cell.height;
            if (isEndOfTeam) {
                // Draw yellow line
                doc.setDrawColor(255, 255, 0); // Yellow color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, lineY + 1, data.cell.x + data.cell.width, lineY + 1);
                // Draw blue line
                doc.setDrawColor(0, 191, 255); // Blue color for border
                doc.setLineWidth(0.1);
                doc.line(data.cell.x, lineY, data.cell.x + data.cell.width, lineY);
            } */
             
            
        
          

            

             //END CHANGEMENT DE COULEUR PAR TEAM
        },
        
    });





    // Call the addFooter function to add the footer on each page
    addFooter();

    window.open(doc.output('bloburl', { filename: 'work_order.pdf' }), '_blank');

 

});
