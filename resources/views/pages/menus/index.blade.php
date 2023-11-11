@extends('layouts.dash',['title'=>'Liste des menus'])
@section('style')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
@endsection
@section('content')
<!--begin::Container-->
<div class="card card-custom">
    <!--begin::card-header-->
    <div class="card-header flex-wrap border-0 pt-0 pb-0">
        <div class="card-title">
        </div>
        <div class="card-toolbar">
            <!--begin::Dropdown-->
            <div class="inline mr-2">
                <a href="{{ Route('menu.create') }}" class="btn btn-success" style="width: 141px; height:35px;">{{ __('langue.CST_BTN') }}</a>
            </div>
        </div>
    </div>
    <!--end::card-header-->
    <!--begin::card-body-->
    <div class="card-body">
        <table id="example" class="row-border dt-responsive tableM" style="width:100%; border-color: transparent; text-align: left;">
            <thead>
                <tr style="border-color: #1C9BD8; text-align: left;">
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_LIBELLE_FR')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_LIBELLE_EN')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_ICONE')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_TARGET')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_CODE')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_POSITION')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">{{ __('langue.CST_TYPE')}}</th>
                    <th style="color: #203A79CC; font-weight: bold; border-color: transparent transparent #1C9BD8 transparent;">Action</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <!--end::card-body-->
</div>
<!--end::Container-->
@endsection
@section('script')
<script language='javascript' src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.6/axios.js" integrity="sha512-SjwdpP6ljFy32hbO7xH/8Yx7JtKvh/tu+NtYGmMAGKe8hjYU548NH5mle1ObS3r/97PE6jy9sD+fSXPpnmeWAw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="{{ asset('js/menus/fonctions.js') }}" ></script>
<script>
    var token = localStorage.getItem("token");

    $.noConflict();
    jQuery(document).ready(function($) {

        let langue = "{{ app()->getLocale() }}";
        $('#example').DataTable({
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

        let t = $('.tableM').DataTable();
        t.clear();

        const getBaseURL = () => {
            return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
        }

        const getMenu_list = async () => {
                if (token) {
                    try {
                    const response = await axios.get(getBaseURL() + 'api/menu', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    if (response.status == 200) return response.data;
                    } catch (error) {
                        console.log(error);
                }
            }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
        }

        const getMenu_delete = async (param_id) => {
            if (token) {
                try {
                const response = await axios.delete(getBaseURL() + 'api/menu/'+param_id, {
                    headers: {
                        accept: 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
                if (response.status == 200) return response.data;
                } catch (error) {
                    console.log(error);
                }
            }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
        }

        getMenu_list().then(
            response => {

                if (response.data.length > 0) {

                    response.data.map(data => {
                        t.row.add([
                            "<span style='color: #203A79CC;'>" + data.libelle_fr + "</span>",
                            "<span style='color: #203A79CC;'>" + data.libelle_en + "</span>",
                            "<span style='color: #203A79CC;'>" + data.icone + "</span>",
                            "<span style='color: #203A79CC;'>" + data.target + "</span>",
                            "<span style='color: #203A79CC;'>" + data.code + "</span>",
                            "<span style='color: #203A79CC;'>" + data.position + "</span>",
                            "<span style='color: #203A79CC;'>" + data.typemenu + "</span>",
                            "<div class='d-flex justify-content-center' >" +
                            "<a href='/menu/" + btoa(data.id) + "/edit' >" +
                            "<i title='modifier' class='fa fa-edit' style='color: #4D6194; font-size: 15px; margin-top: 7px;'></i>" +
                            "</a>" +
                            "<a href='/menu/" + btoa(data.id) + "' class='mt-1'>" +
                            "<i title='voir' class='flaticon-eye' style='margin-left: 7px; color:#4D6194; font-size: 20px;'></i>" +
                            "</a> " +
                            "<a href='javascript:void(0);' class='mx-2 delete my-2'>" +
                            "<i title='supprimer' class='flaticon-delete' id='delete' data=" + data.id + " style='font-size: 15px; margin-top: 7px; color: red;'></i>" +
                            "</a>" +
                            "</div>",
                        ])

                    });
                    t.draw();
                }
            }
        );

    $(document).on('click', '#delete', function() {
        Swal.fire({
            text: "{{ __('messages.MEN_DELETE') }}",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#4D6194',
            cancelButtonColor: '#d33',
            confirmButtonText: "{{ __('messages.YES') }}",
            cancelButtonText: "{{ __('messages.NO') }}"
        }).then((result) => {
            let id = $(this).attr('data');
            if (result.value) {

                console.log(getMenu_delete(id));
                location.reload();

            }
        });
    });

});
</script>

@endsection
