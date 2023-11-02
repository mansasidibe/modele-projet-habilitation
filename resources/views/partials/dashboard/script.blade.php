<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
    var HOST_URL = "https://keenthemes.com/metronic/tools/preview";
</script>
<!--begin::Global Config(global config for global JS scripts)-->
<script>
    var KTAppSettings = {
        "breakpoints": {
            "sm": 576,
            "md": 768,
            "lg": 992,
            "xl": 1200,
            "xxl": 1200
        },
        "colors": {
            "theme": {
                "base": {
                    "white": "#ffffff",
                    "primary": "#3699FF",
                    "secondary": "#E5EAEE",
                    "success": "#1BC5BD",
                    "info": "#8950FC",
                    "warning": "#FFA800",
                    "danger": "#F64E60",
                    "light": "#F3F6F9",
                    "dark": "#212121"
                },
                "light": {
                    "white": "#ffffff",
                    "primary": "#E1F0FF",
                    "secondary": "#ECF0F3",
                    "success": "#C9F7F5",
                    "info": "#EEE5FF",
                    "warning": "#FFF4DE",
                    "danger": "#FFE2E5",
                    "light": "#F3F6F9",
                    "dark": "#D6D6E0"
                },
                "inverse": {
                    "white": "#ffffff",
                    "primary": "#ffffff",
                    "secondary": "#212121",
                    "success": "#ffffff",
                    "info": "#ffffff",
                    "warning": "#ffffff",
                    "danger": "#ffffff",
                    "light": "#464E5F",
                    "dark": "#ffffff"
                }
            },
            "gray": {
                "gray-100": "#F3F6F9",
                "gray-200": "#ECF0F3",
                "gray-300": "#E5EAEE",
                "gray-400": "#D6D6E0",
                "gray-500": "#B5B5C3",
                "gray-600": "#80808F",
                "gray-700": "#464E5F",
                "gray-800": "#1B283F",
                "gray-900": "#212121"
            }
        },
        "font-family": "Poppins"
    };
</script>
<!--end::Global Config-->
<!--begin::Global Theme Bundle(used by all pages)-->
<script src="{{ asset('/assets/plugins/global/plugins.bundle.js') }}"></script>
<script src="{{ asset('/assets/plugins/custom/prismjs/prismjs.bundle.js') }}"></script>
<script src="{{ asset('/assets/js/scripts.bundle.js') }}"></script>
<!--end::Global Theme Bundle-->
<script src="https://parsleyjs.org/dist/parsley.js"></script>
<script src="{{asset('/assets/pasley/i18n/<?=app()->getLocale()?>.js'}}"></script>
<!--begin::Page Vendors(used by this page)-->
<script src="{{ asset('/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js') }}"></script>

<script src="{{ asset('/assets/js/pages/widgets.js') }}"></script>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="toastr.js"></script>
<script src="https://js.pusher.com/7.2/pusher.min.js"></script>
<script src="{{ asset('js/notification.js') }}"></script>
<script src="{{ asset('js/menus/fonctions.js') }}"></script>
<script src="https://unpkg.com/filepond@^4/dist/filepond.js"></script>

<script>

    function myFunction() {
        //deconnexion user connecté
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.href = "/auth/login";
    }

    async function getUser() {
        var token = localStorage.getItem("token");
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        await this.axios
           .get(`${getBaseURL()}api/v1/user/connexion`, config)
            .then((response) => {
                // console.log(response);
                this.user = response.data;
                // console.log(this.user);
                // alert(this.user.data.id)
                $(".nom").html(this.user.data.nom +" "+ this.user.data.prenom);
                $(".email").html(this.user.data.email);
                $(".departement").html(this.user.data.departement);
                $(".profil").html(this.user.data.profil.libelle_fr);

            })
            .catch((error) => {
                console.log(error);
                this.user = [];
            });
    }

    getUser();
</script>
@yield("script")
