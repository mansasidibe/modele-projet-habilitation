@extends('layouts.dash',['title'=>'Consultation du menu'])

@section('content')
<div class="card">
			<div class="card-header d-flex flex-row-reverse p-3" >
					<a href="{{ Route('menu.index') }}" class="btn btn-danger btn_retour btn-lg-size colred mr-5">{{__('langue.CST_BTN_ANNUL')}}</a>
			</div>
			<div class="card-body p-5">
				<div class="row">
                    <input type="hidden" id="id" value="{{$decode}}">
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_TYPE')}}</label>
                        <input type="text" id='menu_id' value="" class="form-control input" placeholder="{{__('langue.CST_TYPE')}}"  data-parsley-minlength="5" disabled/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_LIBELLE_FR')}}</label>
						<input type="text" id='libelle_fr' id="libelle_fr" class="form-control input" value=""  data-parsley-minlength="5" disabled/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_LIBELLE_EN')}}</label>
						<input type="text" id='libelle_en' id="libelle_en" class="form-control input" value="" disabled  data-parsley-minlength="5"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_CODE')}}</label>
						<input type="text" id='code'  class="form-control input" id="code" value="" disabled required data-parsley-maxlength="3" data-parsley-minlength-message="Le code doit comporter que 3 carateres" data-parsley-maxlength-message="Le code doit comporter que 3 carateres" data-parsley-minlength="3"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_POSITION')}}</label>
						<input id='position' class="form-control input" value="" required type="number" disabled data-parsley-type="integer"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">Statut</label>
						<input id='statut' class="form-control input" value="" disabled/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_ICONE')}}</label>
						<input type="text" id='icone' class="form-control input" value="" disabled/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_TARGET')}}</label>
						<input type="text" id='target' class="form-control input" value="" disabled data-parsley-maxlength="50" required data-parsley-maxlength-message="Un peu trop long"/>
					</div>
					<div class="mb-3 col-md-4">
						<label for="exampleFormControlInput1" class="required form-label titre4">{{__('langue.CST_TME')}}</label>
						<input type="text" id='type_menu' class="form-control input" value="" disabled data-parsley-maxlength="50" required data-parsley-maxlength-message="Un peu trop long"/>
					</div>
				</div>
			</div>
		</div>

@endsection
@section('script')
<script language='javascript' src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
var token = localStorage.getItem("token");

$.noConflict();
jQuery(document).ready(function($){

    let langue ="{{ app()->getLocale() }}";

    const getBaseURL=()=>{
        return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    }

    let data_profil=[];
const get_menu_by_id=async(id)=>{

    const response=await axios.get(`${getBaseURL()}api/v1/menu/${parseInt(id)}`);
    try{
        if(response.status==200) return response.data.data
    }catch(error){
        console.log(error);
    }
}

let get_men_id=parseInt(document.getElementById('id').value);

get_menu_by_id(get_men_id)
    .then(response=>{

        $('#menu_id').val(response.menu != null ? response.menu.libelle_fr : '');
        $('#libelle_fr').val(response.libelle_fr);
        $('#libelle_en').val(response.libelle_en);
        $('#code').val(response.code);
        $('#position').val(response.position);
        $('#icone').val(response.icone);
        $('#target').val(response.target);
        $('#statut').val(response.statut ==1 ? 'activé':'désactivé');
        $('#type_menu').val(response.typemenu);

    });
});
</script>

@endsection
