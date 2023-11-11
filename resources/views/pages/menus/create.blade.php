@extends('layouts.dash',['title'=>'Creation d\'un menu'])
@section('style')
 <style>
 </style>
@endsection

@section('content')
<form action="{{ url('/api/v1/menu') }}" method="POST" enctype="multipart/form-data" id="add-menu" class="card">
@csrf
    <div class="card-header d-flex flex-row-reverse p-3">
        <button type="submit" class="btn btn-success btn-lg-size colgreen p-1 btn_submit">{{ __('langue.CST_BTN_SAVE') }}</button>
        <!-- <a class="btn btn-success btn-lg-size colgreen mr-5" id="addMenu">{{ __('langue.CST_BTN_SAVE') }}</a> -->
        <a href="{{ Route('menu.index') }}"
            class="btn btn-danger btn_retour btn-lg-size colred mr-5 ">{{ __('langue.CST_BTN_ANNUL') }}</a>
    </div>
    <div class="card-body p-5">
				<div class="row">
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TYPE') }}</label>
						<select class="form-control input menu" name="menu_id" id="menu_id">
                            <option value="0"> Principal</option>
                            @foreach ($menus as $menu)
                            <option value="{{ $menu->id }}">{{ $menu->libelle_fr }}</option>
                            @endforeach
						</select>
                        {{--  <input class="form-control input" name="menu_id" list="GFGOptions" id="GFGDataList" placeholder="{{ __('langue.CST_TYPE') }}">
                        <datalist id="GFGOptions">
                        <option value="Principal">
                        @foreach ($menus as $menu)
                        <option value="{{ $menu->libelle_fr }}">
                        @endforeach
                        </datalist>  --}}
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_LIBELLE_FR') }}</label>
						<input type="text" name='libelle_fr' id="libelle_fr"  data-parsley-pattern="^[a-zA-Z ]+$" data-parsley-trigger="keyup"  class="form-control input" data-parsley-maxlength="25" data-parsley-minlength-message="Un peu court ce menu" data-parsley-maxlength-message="Un peu trop long ce menu" data-parsley-validation-threshold="5" data-parsley-minlength="5" placeholder="{{ __('langue.CST_LIBELLE_FR') }}"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_LIBELLE_EN') }}</label>
						<input type="text" name='libelle_en' id="libelle_en" class="form-control input"  data-parsley-pattern="^[a-zA-Z ]+$" data-parsley-trigger="keyup"  placeholder="{{ __('langue.CST_LIBELLE_EN') }}" data-parsley-maxlength="25" data-parsley-minlength-message="Un peu court ce menu" data-parsley-maxlength-message="Un peu trop long ce menu" data-parsley-validation-threshold="5" data-parsley-minlength="5"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_CODE') }}</label>
						<input type="text" name='code' class="form-control input" id="code" placeholder="{{ __('langue.CST_CODE') }}"  data-parsley-maxlength="3" data-parsley-minlength-message="Le code doit comporter que 3 carateres" data-parsley-maxlength-message="Le code doit comporter que 3 carateres" data-parsley-minlength="3"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_POSITION') }}</label>
						<input type="number" data-parsley-type="integer" name='position' id="position" class="form-control input" placeholder="{{ __('langue.CST_POSITION') }}"/>
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
						<input type="text" name='icone' id="icone" class="form-control input" placeholder="{{ __('langue.CST_ICONE') }}" />
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TARGET') }}</label>
						<input type="text" name='target' id="target" class="form-control input" placeholder="{{ __('langue.CST_TARGET') }}"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{ __('langue.CST_TME') }}</label>
						<select class="form-control input menu" name="typemenu" id="">
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
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js"></script>
<script language='javascript' src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>

<script>
$.noConflict();
jQuery(document).ready(function($){

    let langue ="{{ app()->getLocale() }}";
    var token = localStorage.getItem("token");

    const getBaseURL=()=>{
        return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    }

        const create_menu = async () => {
            if(token) {
                try {
                const response = await axios.post(getBaseURL() + 'api/menu/', new FormData(document.getElementById("add-menu")), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
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

            try {
                $(".btn_submit").prop('disabled', true);
                $(".btn_submit").text('Chargement...');
                await create_menu().then(
                    response => {
                        console.log(response.data.statut);
                        if(response.data.statut ==true){
                            Swal.fire({
                            title: '',
                            text: "{{ __('messages.CREATE_SUCCES') }}",
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Rediriger l'utilisateur
                            window.location.href = "{{ URL::to('/menu') }}";
                        });
                        }
                    }
                );

            } catch (error) {
                // handle error
                console.log(`error : ${error}`);
            }
        });
});
</script>

@endsection
