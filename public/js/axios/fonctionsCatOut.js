
// // récuperation des constantes
// const token = localStorage.getItem("token");
// const getBaseURL = () => {
//     return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
// }

function datalist(url, id_datalist, id_input_datalist, id_data) {

    const get_cat_data = async () => {
        try {
            const response = await axios.get(getBaseURL() + url, {
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

    get_cat_data().then(
        // mapping et affichage
        response => {
            // console.log("reponse-categorie:",response.data.data);
            $(response.data.data).each(function (index, item) {
                if (item.libelle_fr != null) {
                    if(item.slug == "OUT"){
                    var option = $('<option data-id="' + item.id + '" value="' + item.libelle_fr + '"></option>');
                    $(id_datalist).append(option);
                    }
                }
            });
            // // recupération de l'id
            $(document).on("change", id_input_datalist, function () {
                var val = $(id_input_datalist).val();

                var id = $(id_datalist + ' option').filter(function () {
                    return this.value == val;
                }).data('id');

                $(id_data).val(id);

            });
        }
    );
}
