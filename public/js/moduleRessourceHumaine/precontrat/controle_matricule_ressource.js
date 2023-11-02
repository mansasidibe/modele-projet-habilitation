const get_matricule = async(matricule) => {
    const response = await axios.post(`${getBaseURL()}api/v1/check_matricule`, { matricule: matricule }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    try {
        if (response.status == 200) return response.data;
    } catch (error) {
        console.log(error);
    }
}

$("#matricule").on("keyup", function() {
    var mat = document.querySelector("#matricule").value;

    get_matricule(mat).then(
        retour => {
            console.log(retour);
            if (retour.statut == true) {
                $(".btn_submit").prop('disabled', true);
                $('#matricule_message').text('Ce matricule existe déjà.');
            } else {
                $(".btn_submit").prop('disabled', false);
                $('#matricule_message').text('');
            }
        }
    );
});