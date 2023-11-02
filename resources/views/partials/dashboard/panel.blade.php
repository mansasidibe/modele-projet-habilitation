<div id="kt_quick_user" class="offcanvas offcanvas-right p-10" style="background-image: url('/assets/images/dashOption.png'); background-size: cover; background-repeat: round;">
    <!--begin::Content-->
    <div class="offcanvas-content pr-5 mr-n5">
        <div class="offcanvas-header d-flex align-items-center justify-content-end pb-5" kt-hidden-height="40">

            <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
                <i class="ki ki-close icon-xs text-muted"></i>
            </a>
        </div>
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5 informations">
            <div class="symbol symbol-100 mr-5">
                <div class="symbol-label" style="background-image:url('/assets/media/users/300_21.jpg'); border-radius: 50%;"></div>
                <i class="symbol-badge bg-success"></i>
            </div>
            <div class="d-flex flex-column">
                <a href="#" class="text-muted mt-1 btn-txt-panel nom"></a>
                <div class="text-muted mt-1 btn-txt-panel email"></div>
                <div class="text-muted mt-1 profil"></div>
                <div class="navi mt-2">
                    <a href="#" class="navi-item">
                        <span class="navi-text text-muted text-hover-primary btn-txt-panel departement"></span>
                    </a>
                </div>

            </div>
        </div>
        <!--end::Header-->
        <!--begin::Separator-->
        <div class="separator separator-solid mt-8 mb-5"></div>
        <!--end::Separator-->
        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0">
            <!--begin::Item-->
            <a href="" class="navi-item">
                <div class="navi-link">
                    <div class="symbol symbol-40 bg-light mr-3">
                        <div class="symbol-label">
                            <span class="svg-icon svg-icon-md svg-icon-success">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Notification2.svg-->
                                <i class="flaticon2-user icon-2x"></i>
                                <!--end::Svg Icon-->
                            </span>
                        </div>
                    </div>
                    <div class="navi-text">
                        <div class="btn-txt-panel2">{{__('langue.CST_PROFIL')}}</div>
                        <div class="btn-txt-panel2-2">{{__('langue.CST_PROFIL_ST')}}</div>
                    </div>
                </div>
            </a>
            <!--end:Item-->
            <!--begin::Item-->
            <a href="custom/apps/user/profile-3.html" class="navi-item">
                <div class="navi-link">
                    <div class="symbol symbol-40 bg-light mr-3">
                        <div class="symbol-label">
                            <span class="svg-icon svg-icon-md svg-icon-password">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Chart-bar1.svg-->
                                <i class="flaticon2-lock  icon-2x"></i>
                                <!--end::Svg Icon-->
                            </span>
                        </div>
                    </div>
                    <div class="navi-text">
                        <div class="btn-txt-panel2">{{__('langue.CST_LIBELLE_PWD')}}</div>
                        <div class="btn-txt-panel2-2">{{__('langue.CST_PASSE_ST')}}</div>
                    </div>
                </div>
            </a>
            <a href="custom/apps/userprofile-1/overview.html" class="navi-item">
                <div class="navi-link">
                    <div class="symbol symbol-40 bg-light mr-3">
                        <div class="symbol-label">
                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-opened.svg-->
                                <i class="flaticon2-file-1  icon-2x"></i>
                                <!--end::Svg Icon-->
                            </span>
                        </div>
                    </div>
                    <div class="navi-text">
                        <div class="btn-txt-panel2">{{__('langue.CST_FICHE_POSTE')}}</div>
                        <div class="btn-txt-panel2-2">{{__('langue.CST_FICHE_POSTE_ST')}}</div>
                    </div>
                </div>
            </a>
            <!--end:Item-->
            <!--begin::Item-->
            <a href="custom/apps/userprofile-1/overview.html" class="navi-item">
                <div class="navi-link">
                    <div class="symbol symbol-40 bg-light mr-3">
                        <div class="symbol-label">
                            <span class="svg-icon svg-icon-md svg-icon-primary">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-opened.svg-->
                                <i class="flaticon2-writing  icon-2x"></i>
                                <!--end::Svg Icon-->
                            </span>
                        </div>
                    </div>
                    <div class="navi-text">
                        <div class="btn-txt-panel2">{{__('langue.CST_FICHE_CONTRAT')}}</div>
                        <div class="btn-txt-panel2-2">{{__('langue.CST_FICHE_CONTRAT_ST')}}</div>
                    </div>
                </div>
            </a>
            <!--end:Item-->
        </div>
        <!--end::Nav-->
        <!--begin::Separator-->
        <!--end::Separator-->
        <!--begin::Notifications-->
        <div>
            <a class="btn btn-primary btn-txt btn-block account-btn " href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                {{ __('Logout') }}
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
            <!-- <a href="javascript:void(0);" onClick="myFunction()" class="btn btn-primary btn-txt btn-block account-btn ">{{ __("langue.CST_DECONNEXION") }}</a> -->
        </div>

        <header class="position-absolute top-0" style="background-color: transparent !important; width: 0px;">
            <a href="#" id="lang" class="d-flex align-items-center mb-2 mb-lg-0 link-dark text-decoration-none text-primary"><img src="{{ asset('/assets/images/{CST_LANG}.svg') }}" style="height: 20px;border-radius: 5px;">&nbsp;{{__('langue.CST_MAJ_LANG')}} </a>
            <div class="card mt-2 position-absolute" style="z-index:2; display:none" id="listlang">
                <a href="#" class="d-flex col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none lang text-primary" data-h="fr"><img src="{{ asset('/assets/images/fr.svg') }}" style="height: 15px;margin-top: 5px;border-radius: 3px;">&nbsp;{{__('langue.CST_FRANCAIS')}}</a>
                <a href="#" class="d-flex col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none lang text-primary" data-h="en"><img src="{{ asset('/assets/images/en.svg') }}" style="height: 15px;margin-top: 5px;border-radius: 3px;">&nbsp;{{__('langue.CST_ANGLAIS')}}</a>
            </div>
        </header>
        <!--end::Notifications-->
    </div>
    <!--end::Content-->
</div>