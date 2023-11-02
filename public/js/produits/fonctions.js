const reponseSm = async() => {
    if (token) {
        try {
            var repose = $('#repose').val();

            const response = await axios.post(getBaseURL() + 'api/v1/produits/reponse', new FormData(document.getElementById("reponse-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}
const reponseSmProforma = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/proformas/reponse', new FormData(document.getElementById("reponse-proforma-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}
const reponseSmPrecontrat = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/precontrats/reponse', new FormData(document.getElementById("reponse-precontrat-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}


const reponseSmDeclaration = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/ressourcehumaine/delcaration/reponse', new FormData(document.getElementById("reponse-declaration-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}

const reponseSmDeclarationFiscale = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/commercial/delcaration/reponse', new FormData(document.getElementById("reponse-declaration")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}

const reponseSmLivrePaie = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/livrepaie/reponse', new FormData(document.getElementById("reponse-livrepaie-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}
const reponseSmWorkorder = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/commercial/workorders/reponse', new FormData(document.getElementById("reponse-workorder-form")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}

// const reponseSmd = async() => {
//     if (token) {
//         try {
//             var repose = $('#reponse').val();

//             const response = await axios.post(getBaseURL() + 'api/v1/logistique/demandachats/reponse', new FormData(document.getElementById("reponse-form")), {
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
const reponseSmFournisseur = async() => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/tresorerie/fournisseurs-exploitation/reponse', new FormData(document.getElementById("add-fournisseur")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
}

const reponseSmF = async(url, formId) => {
    if (token) {
        try {
            const response = await axios.post(getBaseURL() + url, new FormData(document.getElementById(formId)), {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
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

const reponseSmFactureVente = async(url, formId) => {
    if (token) {
        try {
            var repose = $('#reponse').val();

            const response = await axios.post(getBaseURL() + 'api/v1/commercial/reponse', new FormData(document.getElementById("form-facture-show")), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response;
        } catch (error) {
            console.log(error);
        }
    }
};
