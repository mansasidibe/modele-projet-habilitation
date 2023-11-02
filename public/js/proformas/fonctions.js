
// const getBaseURL=()=>{
//     return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
// }

const create_proforma = async () => {
    if(token) {
        try {
        const response = await axios.post(getBaseURL() + 'api/v1/proformas', new FormData(document.getElementById("add-proforma")), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status == 200) return response.data;
        } catch (error) {
            console.log(error);
        }
    }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
}

$(document).on('click', '#btn_submit', async function(e) {
    e.preventDefault();

    if (($('#client').val() ==='' && $('#contact').val() ==='') || ($('#delai_paiement').val() === '' && $('#mode_paiement').val() ==='' || $('#selectVlDevis').val() === '')) {
        Swal.fire({
            title: langue = 'fr' ? 'Veuillez reseigner les champs obligatoire.' : 'Please fill in the mandatory fields.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }else{
        try {
            $(".btn_submit").prop('disabled', true);
            $(".btn_submit").text(langue == 'fr' ? 'Chargement...' : 'Loading...');
        await create_proforma().then(
            response => {
                console.log(response);
                if(response.statut ==true){
                    Swal.fire({
                    title: '',
                    text: langue == 'fr' ? 'La proforma a été enregistré avec succès.' : 'The pro forma has been successfully registered.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Rediriger l'utilisateur
                    window.location.href = "/marketing/proformas";
                });
                }
            }
        );

    } catch (error) {
        // handle error
        console.log(`error : ${error}`);
    }
    }
});


