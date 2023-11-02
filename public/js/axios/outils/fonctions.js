const reponseSm = async () =>{
    if(token) {
        try {
            var repose = $('#repose').val();

            const response = await axios.post(getBaseURL() + 'api/v1/outils/reponse', new FormData(document.getElementById("reponse-form")), {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});
        if (response.status == 200) return response;
        }catch (error) {
            console.log(error);
        }
    }
}
