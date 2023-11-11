@extends('layouts.dash',['title'=>'Modification du menu'])

@section('content')
<form class="card" action="{{ url('api/v1/menu/update') }}" method="POST" enctype="multipart/form-data" id="update-menu" >
@csrf
@method('PUT')
    <div class="card-header d-flex flex-row-reverse p-3">
        <button type="submit" class="btn btn-success btn-lg-size colgreen p-1 btn_submit">{{ __('langue.CST_BTN_SAVE') }}</button>
        <a href="{{ Route('menu.index') }}"
            class="btn btn-danger btn_retour btn-lg-size colred mr-5 ">{{ __('langue.CST_BTN_ANNUL') }}</a>
    </div>
    <div class="card-body p-5">
				<div class="row">
                    <input type="hidden" id="id" value="{{$decode}}">
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TYPE') }}</label>
						<select class="form-control input menu" name="menu_id" id="menu_id">

						</select>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_LIBELLE_FR') }}</label>
						<input type="text" id="libelle_fr" value='' name='libelle_fr' class="form-control input" placeholder="{{ __('langue.CST_LIBELLE_FR') }}"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_LIBELLE_EN') }}</label>
						<input type="text" id="libelle_en" name='libelle_en' value='' class="form-control input" required data-parsley-pattern="^[a-zA-Z ]+$" data-parsley-trigger="keyup"  placeholder="{{ __('langue.CST_LIBELLE_EN') }}" data-parsley-maxlength="25" data-parsley-minlength-message="Un peu court ce menu" data-parsley-maxlength-message="Un peu trop long ce menu" data-parsley-validation-threshold="5" data-parsley-minlength="5"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_CODE') }}</label>
						<input type="text" name='code' value='' class="form-control input" id="code" placeholder="{{ __('langue.CST_CODE') }}" required data-parsley-maxlength="3" data-parsley-minlength-message="Le code doit comporter que 3 carateres" data-parsley-maxlength-message="Le code doit comporter que 3 carateres" data-parsley-minlength="3"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_POSITION') }}</label>
						<input type="number" data-parsley-type="integer" name='position' id="position" value='' class="form-control input" placeholder="{{ __('langue.CST_POSITION') }}" required/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">Statut</label>
						<select class="form-control input menu" name="statut" id="statut">
							<option data-id="{ID}" value="1">{{ __('langue.CST_ACTIVER') }}</option>
							<option data-id="{ID}" value="0">{{ __('langue.CST_DESACTIVER') }}</option>
						</select>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_ICONE') }}</label>
						<input type="text" name='icone' class="form-control input" id="icone" value='' placeholder="{{ __('langue.CST_ICONE') }}" required/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TARGET') }}</label>
						<input type="text" name='target' id="target" class="form-control input" value='' placeholder="{{ __('langue.CST_TARGET') }}"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TME') }}</label>
						<select class="form-control input menu" name="typemenu" id="typemenu">
							<option data-id="{ID}" value="PARA">{{ __('langue.CST_MPM') }}</option>
							<option data-id="{ID}" value="SIDE">{{ __('langue.CST_MSP') }}</option>
						</select>
					</div>
				</div>
			</div>
</form>
@endsection
@section('script')
<script language='javascript' src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script language='javascript' src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
<script language='javascript' src="{{ asset('js/axios/update.js') }}"></script>

<script>
$.noConflict();
jQuery(document).ready(function($){

    // recupération de la langue
    let langue ="{{ app()->getLocale() }}";
    var token = localStorage.getItem("token");

    // recupération de l'url
    const getBaseURL=()=>{
        return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    }

    const get_menu_by_id=async(id)=>{
        if (token) {
            const response=await axios.get(`${getBaseURL()}api/menu/${parseInt(id)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });
            try{
                if(response.status==200) return response.data.data
            }catch(error){
                console.log(error);
            }
        }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
    }

    const menus = async () => {
        if(token) {
            try {
            const response = await axios.get(getBaseURL() + 'api/menu',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (response.status == 200) return response.data.data;
            } catch (error) {
                console.log(error);
            }
        }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
    }
    // appel des produits
    menus().then(
        response => {
            $(response).each( function(index, item) {
                var option = $('<option value="'+ item.id+'">'+item.libelle_fr+'</option>');
                $('#menu_id').append(option);
            });
        }
    );

    // recupération de la valeur de l'input caché ID
    let get_men_id=parseInt(document.getElementById('id').value);

    get_menu_by_id(get_men_id)
        .then(response=>{
            console.log(response);
            // selectionner la bonne option
            $('#menu_id').val(response.menu_id);
            $('#libelle_fr').val(response.libelle_fr);
            $('#libelle_en').val(response.libelle_en);
            $('#code').val(response.code);
            $('#position').val(response.position);
            $('#icone').val(response.icone);
            $('#target').val(response.target);
            $('#statut').val(response.statut);
            $('#typemenu').val(response.typemenu);
        });

        // debut modification
        const update_menu = async () => {
            if (token) {
                try {
                const response = await axios.put(getBaseURL() + 'api/menu/'+get_men_id, new FormData(document.getElementById("update-menu")), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    }
                });
                if (response.status == 200) return response;
                } catch (error) {
                    console.log(error);
                }
            }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
        }

        $(document).on('click', '.btn_submit', async function(e) {
            e.preventDefault();
            if (token) {
                try {
                    $(".btn_submit").prop('disabled', true);
                    $(".btn_submit").text('Chargement...');
                await update_menu().then(
                    ()=>{
                        Swal.fire({
                        title: '',
                        text: "{{ __('messages.SUCCES') }}",
                        icon: 'success',
                        confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href = "{{ URL::to('/menu') }}";
                        });
                    }
                );
                } catch (error) {
                    // handle error
                    console.log(`error : ${error}`);
                }
            }else alert(langue == 'fr' ? 'connectez-vous!' : 'get log in');
        });
});
</script>

@endsection
