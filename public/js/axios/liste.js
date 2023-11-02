var token = localStorage.getItem("token");

// editer les données ici
$(document).on('click', '#editData', async function() {
    let id = $(this).attr('data');
    let urlEdit = $(this).attr('urlEdit');
    let urlView = $(this).attr('urlView');

    if (token) {
        await axios.get(urlEdit + id + '/edit')
            .then((response) => {
                console.log(response.data.data);
                // localStorage.setItem("donnee", response.data.data);
                localStorage.setItem('donnee', JSON.stringify(response.data.data));
                window.location.href= urlView + id+"/edit";
            }, (error) => {
                console.log(error);
            })
    } else {
        return {};
    }

})

function getValAxios(){
    var local = localStorage.getItem('donnee');
    var data = JSON.parse(local);
    formulaire(data);
}

// voir les données ici
$(document).on('click', '#showData', async function() {
    let id = $(this).attr('data');
    let urlEdit = $(this).attr('urlEdit');
    let urlView = $(this).attr('urlView');

    if (token) {
        await axios.get(urlEdit + id + '/edit')
            .then((response) => {
                console.log(response.data.data);
                // localStorage.setItem("donnee", response.data.data);
                localStorage.setItem('donnee', JSON.stringify(response.data.data));
                window.location.href= urlView+id+"";
            }, (error) => {
                console.log(error);
            })
    } else {
        return {};
    }

})

$(document).on('click', '#delete', function() {
    Swal.fire({
        text: "Voulez-vous supprimer cette ligne ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4D6194',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }).then((result) => {
        let id = $(this).attr('data');
        let urlDelete = $(this).attr('urlDelete');
        if (result.value && token) {
            axios.delete(urlDelete, { params: { id: id } })
                .then((response) => {
                    console.log(response);
                    if (response.data == 1) {
                        Swal.fire({
                                icon: 'success',
                                text: 'Supprimé avec succès',
                            }),
                            location.reload();
                    }
                }, (error) => {
                    console.log(error);
                })
        } else {
            return {};
        }
    });
});
