// recupération de l'url
const getBaseURL=()=>{
    return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
}
var token = localStorage.getItem("token");

// recupération des canaux
const get_channel = async(canal)=>{
    const response=await axios.post(`${getBaseURL()}api/v1/canaux`,{canal: canal}, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }});
    try{
        if(response.status==200) return response.data.data
    }catch(error){
        console.log(error);
    }
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "showDuration": "500",
    "hideDuration": "2000",
    "timeOut": "5000",
    "extendedTimeOut": "2000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

toastr.options.onclick = function redirectTo(url) {
    console.log(url);
}

// coordonnées pusher
var pusher = new Pusher('7c96b2ecb008ec5dbe01', {
    cluster: 'eu',
    encrypted: true
});

// souscription
var channel = pusher.subscribe('canal-appngsys');

channel.bind('event-appngsys', function(data) {
    get_channel(data.canal).then(
        response =>{
            if (response != null) {
                toastr.success(response.message_fr,  response.titre_fr);
                // redirectTo(response.target);
                notified();
                setTimeout(function(){
                    location.reload();
                }, 5000);
            }
        }
    );
});

// notifier l'utilisateur
function notified() {
    axios.get(`${getBaseURL()}api/v1/notified`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }})
  .then(function (response) {
    if (response.data.statut == true) {
        $(".symbol-badge-profil").removeClass("d-none");
    }else{
        $(".symbol-badge-profil").addClass("d-none");
    }
  });
}

notified();
