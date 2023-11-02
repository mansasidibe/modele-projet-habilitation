// const reponseSm = async() => {
//     if (token) {
//         try {
//             var repose = $('#repose').val();

//             const response = await axios.post(getBaseURL() + 'api/v1/demandachats/reponse', new FormData(document.getElementById("reponse-form")), {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + token,
//                 }
//             });
//             if (response.status == 200) return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

const reponseSmF = async (url, formId) => {
    if (token) {
        try {
            alert('okkk');
            const response = await axios.post(getBaseURL() + url, new FormData(document.getElementById(formId)), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }
};

