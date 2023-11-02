@include('partials.front.header')

<div class="row vh-100 g-0">
    <div class="h-100 g-0 content">
        @include('partials.front.lang')
        <div id="app"></div>
        <footer class="position-absolute bottom-0 w-100 text-center">
            <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content:  center;">
                <div>
                    <a class="mr-5 titre5" href="javascript:void(0)" style="text-decoration: none;">
                        {{ __('langue.CST_NEED_HELP') }} ?
                    </a>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                    <a class="ml-5 titre5" href="javascript:void(0)" style="text-decoration: none;">
                        {{ __('langue.CST_PRIVACY_POLICY') }}
                    </a>
                </div>


            </div>
        </footer>
    </div>
    <div class="position-fixed colors pull-right mbi-display">
        <div class="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
        </div>
    </div>
</div>

@include('partials.front.footer')
