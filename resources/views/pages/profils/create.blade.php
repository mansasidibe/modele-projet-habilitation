@extends('layouts.dash',['title'=>__('messages.CREATION_PROFIL')])

@section('style')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
@endsection
@section('content')
<form class="card">
    <div class="card-header d-flex flex-row-reverse p-3">
        <button type="submit" class="btn btn-success btn-lg-size colgreen p-1 btn_submit">{{ __('langue.CST_BTN_SAVE') }}</button>
        <a href="{{ Route('profil.index') }}" class="btn btn-danger btn_retour btn-lg-size colred mr-5 ">{{ __('langue.CST_BTN_ANNUL') }}</a>
    </div>
    <div class="card-body p-3">
        <div class="row px-2">
            <div class="col-6 d-none">
                <label>{{ __('langue.CST_LIBELLE_CODE_PROFIL') }}</label>
                <input type="text" class="form-control code_profil" placeholder="{{ __('langue.CST_LIBELLE_CODE_PROFIL') }}" style="text-transform:uppercase;">
            </div>
            <div class="col-6">
                <label>{{ __('langue.CST_LIBELLE_PROFIL') }} (FR)</label>
                <input type="text" class="form-control libelle_fr" oninput="this.value=this.value.toUpperCase()" placeholder="{{ __('langue.CST_LIBELLE_PROFIL') }}" class="inputChamp" name="POS_LIBELLE" SIZE="30">
            </div>
            <div class="col-6">
                <label>{{ __('langue.CST_LIBELLE_PROFIL') }} (EN)</label>
                <input type="text" class="form-control libelle_en" oninput="this.value=this.value.toUpperCase()" placeholder="{{ __('langue.CST_LIBELLE_PROFIL') }}" class="inputChamp" name="POS_LIBELLE" SIZE="30">
            </div>
        </div>
        <div class="row py-3 p-6">
            <p class="mr-5"><span style="font-weight:bold;">PR:</span> Menu Principal</p>
            <p><span style="font-weight:bold;">SM:</span> Sous Menu</p>
        </div>
        <div class="table-responsive card pl-5 table_permission" id="table_permission">

        </div>


    </div>
</form>
@endsection

@section('script')
<script language='javascript' src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.6/axios.js" integrity="sha512-SjwdpP6ljFy32hbO7xH/8Yx7JtKvh/tu+NtYGmMAGKe8hjYU548NH5mle1ObS3r/97PE6jy9sD+fSXPpnmeWAw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    $.noConflict();
    jQuery(document).ready(function($) {

        let langue = "{{ app()->getLocale() }}";

        const getBaseURL = () => {
            return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
        }
        //GET TOKEN
        const token = window.localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

        const get_actions = async () => {
            const response = await axios.get(`${getBaseURL()}api/action/all`)
            try {
                if (response.status == 200) return response.data
            } catch (error) {
                console.log(error);
            }
        }

        const get_menus = async () => {
            const response = await axios.get(`${getBaseURL()}api/menu`)
            try {

                if (response.status == 200) return response.data.data
            } catch (error) {
                console.log(error);
            }
        }

        const getUserProfil = async () => {
            try {
                const response = await axios.get(getBaseURL() + 'api/user/connexion', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status == 200) return response.data.data;

            } catch (error) {
                console.log(error);
            }
        }

        let get_pro_id;

        const create_permission = async (profil_id, choices) => {

            const json = JSON.stringify({
                profil_id,
                choices
            });

            try {
                const response = await axios.post(getBaseURL() + 'api/permission/new', json, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status == 200) return response;
            } catch (error) {
                console.log(error);
            }
        }

        const create_profil = async (libelle_fr, libelle_en, choices) => {

            const json = JSON.stringify({
                libelle_fr,
                libelle_en
            });

            try {
                const response_profil = await axios.post(getBaseURL() + 'api/profil/new', json, {
                    headers: {
                        // Overwrite Axios's automatically set Content-Type
                        'Content-Type': 'application/json'
                    }
                });

                get_pro_id = response_profil.data.id;

                if (choices.length > 0) {
                    await create_permission(get_pro_id, choices);
                } else {
                    $(".btn_submit").prop('disabled', false);
                    Swal.fire({
                        icon: 'error',
                        text: "{{ __('messages.CHECK_ACTION') }}",

                    })
                }

                if (response_profil.status == 200) return response_profil.data;
            } catch (error) {
                console.log(error);
            }
        }

        get_actions().then(resp_actions => {
            if (resp_actions.data.length > 0) {
                get_menus().then(resp_menus => {
                    if (resp_menus.length > 0) {
                        //Template liste des actions et menus
                        var lib_action = '';
                        var lib_menu = '';

                        var out_table = ``;
                        out_table += `<table id="example" class="table table-striped custom-table tab_profil tableL" > `;
                        out_table += `    <thead>
                                        <tr>
                                            <th>Menu</th>`;
                        resp_actions.data.map(dt_action => {
                            langue == "en" ? lib_action = dt_action.libelle_en : lib_action = dt_action.libelle_fr
                            out_table += `<th class="text-center">${lib_action}</th>`;
                        });

                        out_table += `        </tr>
                                    </thead>
                                    <tbody> `;
                        resp_menus.map(dt_menu => {

                            out_table += `       <tr> `;
                            langue == "en" ? lib_menu = dt_menu.libelle_en : lib_menu = dt_menu.libelle_fr
                            out_table += `<td>${lib_menu}</td> `;
                            resp_actions.data.map(dt_action => {
                                out_table += `        <td class="text-center">
                                                            <label class="checkbox checkbox-primary">
                                                                <input type="checkbox" name="menu_action[]" class="cbk" value="${dt_menu.id}|${dt_action.id}" >
                                                            &nbsp;<span class="border border-primary"></span>
                                                            </label>
                                                </td> `;
                            });

                            out_table += `       </tr> `;
                        });
                        out_table += `
                                    </tbody>
                                </table>`;
                        document.getElementById("table_permission").innerHTML = out_table;
                        $('#example').dataTable({
                            scroller: true,
                            scrollX: true,
                            scrollCollapse: true,
                            lengthMenu: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                            order: [
                                [0, 'desc']
                            ],
                            language: { //langue debut
                                "emptyTable": langue == "en" ? "NO DATA FOUND" : "Aucune donn\u00e9e disponible dans le tableau",
                                "zeroRecords": langue == "en" ? "NO DATA FOUND" : "AUCUNE DONN\u00c9E TROUV\u00c9E",
                                "paginate": {
                                    "previous": langue == "en" ? "Previous" : "Pr\u00e9c\u00e9dent",
                                    "next": langue == "en" ? "Next" : "Suivant"
                                },
                                "info": langue == "en" ? "Showing _START_ to _END_ of _TOTAL_ items" : "Affichage de _START_ a _END_ sur _TOTAL_ \u00e9l\u00e9ments",
                                "infoEmpty": langue == "en" ? "Showing 0 to 0 of 0 item" : "Affichage de 0 a 0 sur 0 \u00e9l\u00e9ments",
                                "infoFiltered": langue == "en" ? "(filter of _MAX_ elements in total)" : "(filtres de _MAX_ \u00e9l\u00e9ments au total)",
                                "searchPlaceholder": langue == "en" ? "Search" : "Recherche",
                                "search": "",
                                "sLengthMenu": langue == "en" ? "Display _MENU_ records" : "Affichage de _MENU_ \u00e9l\u00e9ments",
                            } //langue fin
                        });

                    }
                });
            }
        });
        
        $(document).on('click', '.btn_submit', async function(e) {
            e.preventDefault();
            try {

                var libelle_fr = $('.libelle_fr').val();
                var libelle_en = $('.libelle_en').val();

                var choices = []; //Recuperation des choix cochez
                var checkedcollection = $('#example').dataTable({
                    retrieve: true
                }).$(".cbk:checked", {
                    "page": "all"
                });
                checkedcollection.each(function(index, elem) {
                    choices.push($(elem).val());
                });

                $(".btn_submit").text("{{ __('messages.TEXT_SUBMIT') }}");

                create_profil(libelle_fr, libelle_en, choices).then(response => {
                    // console.log('In response : ',response)
                });

                setTimeout(() => {

                    Swal.fire({
                        title: '',
                        text: "{{ __('messages.ADD_PROFIL') }}",
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Rediriger l'utilisateur
                        window.location.href = "{{ URL::to('/profil') }}";
                    });
                }, 10000);

            } catch (error) {
                // handle error
            }
        });
    });
</script>



@endsection