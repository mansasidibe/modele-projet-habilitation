<div class="back-g content d-flex flex-column flex-column-fluid" id="kt_content" style="padding: 0px; background-image: url('/assets/images/dash.png'); background-size: contain; background-repeat: round; ">

    <!--begin::Subheader-->
    @include('partials.dashboard.fil_ariane')
    <!--end::Subheader-->
    <!--begin::Entry-->
    <div id='container' class="m-5">
        @yield("content")  
    </div>
    <!--end::Entry-->
</div>