<header class="position-absolute top-0 mt-1 vw-100 lang-index">
    <a href="#" id="lang" onclick="getComputedStyle(document.getElementById('listlang')).display != 'none' ? document.getElementById('listlang').style.display = 'none' : document.getElementById('listlang').style.display = 'block';"
        class="d-flex align-items-center mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"><img
            src="/front/img/<?=app()->getLocale()?>.svg" style="height: 20px;border-radius: 5px;">&nbsp;{{ Str::upper(app()->getLocale()) }}
    </a>
    <div class="card mt-1 p-1 position-absolute" style="z-index:2; display:none;" id="listlang">
        <a href="{{url('/setlocale/fr')}}" class="d-flex col-lg-4 mb-4 mb-lg-0 link-dark text-decoration-none lang lang_list"
            data-h="fr"><img src="{{ asset('/front/img/fr.svg') }}"
                style="height: 15px;margin-top: 2px;border-radius: 3px;">&nbsp;{{ __('langue.CST_FRANCAIS') }}</a>
        <a href="{{url('/setlocale/en')}}" class="d-flex col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none lang lang_list"
            data-h="en"><img src="{{ asset('/front/img/en.svg') }}"
                style="height: 15px;margin-top: 2px;border-radius: 3px;">&nbsp;{{ __('langue.CST_ANGLAIS') }}</a>
    </div>
</header>

<script>
 const elements  = document.getElementsByClassName('lang_list');
//localStorage . setItem('ngsys_lang', 'fr');
function setCookie(name, value, days) {
  var expires = '';

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function handleClick() {
    if(this.textContent.trim()==="{{ __('langue.CST_ANGLAIS') }}") {
        
        setCookie('ngsys_lang', 'en', 7);

    }else{
        setCookie('ngsys_lang', 'fr', 7);

    } ;
}
for (var i = 0; i < elements.length; i++) {
  var element = elements[i];
  element.addEventListener('click', handleClick);
}
</script>
