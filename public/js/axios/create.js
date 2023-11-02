var token = localStorage.getItem("token");

function createAxios(message, form, index) {

    $(form).on('submit', async function(event) {
        event.preventDefault();
        var url = $(this).attr('action');
        if (token) {
            await axios.post(url, new FormData(this), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    text: message,
                });
                champs();

                //  window.location.href = index,
            }).catch(
                error => console.log(error)
            )
        } else {
            return {};
        }
    });

}
