<div id="kt_header" class="header   header-fixed">
    <!--begin::Container-->
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
        <!--begin::Header Menu Wrapper-->
        <div class="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
            <!--begin::Header Menu-->
            <div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">
                <!--begin::Header Nav-->
                <ul class="menu-nav">
                    
                </ul>
                <!--end::Header Nav-->
            </div>
            <!--end::Header Menu-->
        </div>
        <!--end::Header Menu Wrapper-->
        <!--begin::Topbar-->
        <div class="topbar">
            <!--begin::Search-->
            <div class="dropdown" id="kt_quick_search_toggle">
                <!--begin::Toggle-->
                <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                    <div class="contour btn-clean btn-lg btn-dropdown mr-1">
                        <!--begin::Svg Icon | path:assets/media/svg/icons/General/Search.svg-->
                        <i class="flaticon2-settings icon-2x mbi-color tab-color" style="cursor: pointer;"></i>
                        <!--end::Svg Icon-->
                    </div>
                </div>
                <!--end::Toggle-->

                <!--begin::Dropdown     MENU PARAMETRABLE-->
                <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg param_menu">
                    <div class="quick-search quick-search-dropdown" id="kt_quick_search_dropdown">
                        <!--begin:Form-->
                        <form method="get" class="quick-search-form">
                            <div class="input-group">
                                <li style="color: blue">
                                    {{__('langue.CST_PARAM')}}
                                </li>
                                <hr>
                                <span class="w-100 para scroll-nav">
                                 <p id="menu_para" style="color: black">

                                </p>
                                </span>
                            </div>
                        </form>
                        <!--end::Form-->
                        <!--begin::Scroll-->
                        <div class="quick-search-wrapper scroll" data-scroll="true" data-height="325" data-mobile-height="200"></div>
                        <!--end::Scroll-->
                    </div>
                </div>
                <!--end::Dropdown-->
            </div>
            <!--begin::Search-->
            <div class="dropdown" id="kt_quick_search_toggle">
                <!--begin::Toggle-->
                <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                    <div class="contour btn-clean btn-lg btn-dropdown mr-1 pointer" style="cursor: pointer;">
                        <!--begin::Svg Icon | path:assets/media/svg/icons/General/Search.svg-->
                        <i class="flaticon2-notification icon-2x mbi-color tab-color"></i>
                        <i class="symbol-badge-profil bg-danger d-none"></i>
                        <!--end::Svg Icon-->
                    </div>
                </div>
                <!--end::Toggle-->

                <!--begin::Dropdown     MENU PARAMETRABLE-->
                <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                    <div class="quick-search quick-search-dropdown" id="kt_quick_search_dropdown">
                        <!--begin:Form-->
                        <form method="get" class="quick-search-form">
                            <div class="input-group">

                                <li style="color: blue">
                                    {{__('langue.CST_NOTIFICATIONS')}}
                                </li>
                                <hr />
                                <div id="notify" style="overflow: auto; height: 400px;" class="w-100 scroll-nav">
                                    
                                </div>
                            </div>
                        </form>
                        <!--end::Form-->
                        <!--begin::Scroll-->
                        <div class="quick-search-wrapper scroll" data-scroll="true" data-height="325" data-mobile-height="200"></div>
                        <!--end::Scroll-->
                    </div>
                </div>
                <!--end::Dropdown-->
            </div>
            <!--end::Search-->
            <!--begin::User-->
            <div class="topbar-item">
                <div class="btn btn-icon w-auto btn-clean btn-lg px-2" id="kt_quick_user_toggle">
                    <!--begin::Languages-->
                    <div class="dropdown">
                        <!--begin::Toggle-->
                        <div class="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                            <div class="img-contour  mr-5">
                                <div class="img-profil" style="background-image:url('/assets/media/users/300_21.jpg')"></div>
                            </div>
                        </div>
                        <!--end::Toggle-->
                    </div>
                    <!--end::Languages-->
                    <span class=" font-weight-bolder font-size-base d-none d-md-inline mr-3 btn-txt-option nom">
                        <!-- @guest
                        @else
                        {{ Auth::user()->nom }} {{ Auth::user()->prenom }}
                        @endguest -->

                    </span>
                    <span class="symbol symbol-35 symbol">
                        <span class="symbol-label font-size-h5 font-weight-bold">
                            <i class="flaticon2-next icon-xs"></i>
                        </span>
                    </span>
                </div>
            </div>
            <!--end::User-->
        </div>
        <!--end::Topbar-->
    </div>
    <!--end::Container-->
</div>
