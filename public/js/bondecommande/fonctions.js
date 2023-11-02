const reponseSm = async () => {
    var token = localStorage.getItem("token");
    let langue = "{{app()->getLocale()}}";
    const getBaseURL = () => {
        return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    }
    var token = localStorage.getItem("token");

    if (token) {
        try {
            var repose = $('#reponse').val();
            var id = $('#id').val();
            var motifrejet = $('#motifrejet').val();
            // motifrejet ==""?"":motifrejet;
            if (motifrejet != null) {
                const response = await axios.post(getBaseURL() + 'api/v1/commercial/reponse',
                    {
                        reponse: repose,
                        id: id,
                        w3review: motifrejet
                    }
                    ,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    if (response.status == 200) return response;
            } else {
                const response = await axios.post(getBaseURL() + 'api/v1/commercial/reponse',
                    {
                        reponse: repose,
                        id: id
                    }
                    ,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    if (response.status == 200) return response;
            }

            
        } catch (error) {
            console.log(error);
        }
    }
}
