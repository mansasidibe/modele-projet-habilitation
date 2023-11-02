
    <!-- js template {{ asset('front/js/langage.js') }}-->
    <!-- PARSLEY -->
    <script>
        window.ParsleyConfig = {
            errorsWrapper: '<span></span>',
            errorTemplate: '<span class="alert alert-danger parsley" role="alert"></span>',
            errorClass: 'has-error',
            successClass: 'has-success'
        };
    </script>
    <script src="https://parsleyjs.org/dist/parsley.js"></script>
    @yield("script")
</body>

</html>
