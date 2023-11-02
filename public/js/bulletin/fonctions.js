
function datalist(url, id_datalist, id_input_datalist, id_data) {

  const get_data = async () => {
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
  get_data().then(
    // mapping et affichage
    response => {
      $(response.data.data).each(function (index, item) {
        var option = $('<option data-id="' + item.id + '" value="' + item.libelle_fr + '"></option>');
        $(id_datalist).append(option);
      });
      // recupération de l'id
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


